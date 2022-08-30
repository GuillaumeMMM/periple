import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';
import { drag } from "d3-drag";
import { NetworkService } from 'src/app/services/network.service';
import { NetworkNode, Periple, PositionnedNode } from 'src/app/shared/models/network';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-periple-network',
  templateUrl: './periple-network.component.html',
  styleUrls: ['./periple-network.component.scss']
})
export class PeripleNetworkComponent implements OnInit, OnChanges {

  constructor(private el: ElementRef, private networkService: NetworkService) { }

  ngOnInit(): void {
  }

  @Input() network: Periple | null = null;
  @Input() editing: boolean = true;

  private svg: d3.Selection<any, any, any, any> = null as any;
  private positionnedNodes: PositionnedNode[] = [];
  public width: number = 0;
  public height: number = 0;
  public MEDIA_SIZE: number = 80;

  private mainGroup: d3.Selection<any, any, any, any> | null = null;
  private linksGroup: d3.Selection<any, any, any, any> | null = null;
  private nodesGroup: d3.Selection<any, any, any, any> | null = null;
  private dragHandler: d3.DragBehavior<any, any, any> = d3.drag();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['network'] && changes['network']['currentValue']) {

      this.positionnedNodes = this.setInitialPosition(this.network?.nodes || []);

      setTimeout(() => {
        this.initSvg();

        this.mainGroup = this.svg.append('g').attr('class', 'per-group');
        this.linksGroup = this.mainGroup.append('g').attr('class', 'per-links');
        this.nodesGroup = this.mainGroup.append('g').attr('class', 'per-nodes');
        
        this.updateNodes(this.positionnedNodes);
        this.initLinks(this.linksGroup);
        this.initZoom(this.mainGroup);
      });
    }
  }

  private setInitialPosition = (nodes: NetworkNode[]): PositionnedNode[] => {
    return nodes.map(node => {
      return {
        ...node,
        x: Math.random() * 500,
        y: Math.random() * 500,
      }
    })
  }

  private initSvg = (): void => {
    if (this.svg) {
      this.svg.remove();
    }
    this.width = this.getSVGBoundingRect()?.width || 0;
    this.height = this.getSVGBoundingRect()?.height || 0;
    
    this.svg = d3.select(this.el?.nativeElement)
    .select(".periple-network-container > #canvas")
    .append("svg")
    .attr('width', `100%`)
    .attr('height', `100%`);

    this.svg.append('rect')
    .attr('width', `100%`)
    .attr('height', `100%`).attr('fill', 'none')
    .attr('x', 0).attr('y', 0).attr('pointer-events', 'visible')
    .attr('class', 'periple-network-background')
    .on('click', (event: PointerEvent) => {
      this.createNode({x: event.offsetX, y: event.offsetY});
    })
  }

  private updateNodes = (data: PositionnedNode[]): void => {
    if (this.dragHandler) {
      this.nodesGroup?.selectAll(".per-node").call(
        this.dragHandler.on('start', null).on('drag', null).on('end', null)
      );
    }
    
    this.nodesGroup?.selectAll('.per-node').data((data || []))
    .join(
      function(enter) {
        return enter.append('foreignObject').attr('class', 'per-node').attr('id', d => `_${d.id}`)
        .attr('x', d => `${d.x}px`).attr('y', d => `${d.y}px`)
        .append("xhtml:div")
        .html(d => `<div class="per-node-html-container"><img src="${d.album.coverUrl}"></div>`);
      },
      function(update) {
        return update.select('per-node')
        .attr('x', d => `${d.x}px`).attr('y', d => `${d.y}px`);
      }
    ).call(
      this.dragHandler
        .on('start', (event, d) => {
          this.networkService.dragstarted(this.nodesGroup?.select(`.per-node#_${d.id}`).node());
        })
        .on('drag', (event: DragEvent, d: PositionnedNode) => {
          this.networkService.dragged(this.nodesGroup?.select(`.per-node#_${d.id}`).node(), event);
          this.updateLinksPositions(data);
        })
        .on('end', (event, d) => this.networkService.dragended(this.nodesGroup?.select(`.per-node#_${d.id}`).node()))
    );;
  }

  private initLinks = (group: d3.Selection<any, any, any, any>): void => {
    group.selectAll('.per-link').data((this.network?.links || [])).enter()
    .append('line').attr('class', 'per-link');

    this.updateLinksPositions(this.positionnedNodes);
  }

  private initZoom = (group: d3.Selection<any, any, any, any> | null): void => {
  this.svg.call(d3.zoom().translateExtent([[-500, -500], [this.width + 500, this.height + 500]])
    .scaleExtent([0.6, 1])
    .on("zoom", (e) => {
      group?.attr('transform', e.transform)
    }));
  }

  private getSVGBoundingRect = (): DOMRect | null => {
    return (this.el.nativeElement as HTMLElement).querySelector('#canvas')?.getBoundingClientRect() || null;
  }

  private updateLinksPositions = (nodes: PositionnedNode[]): void => {
    this.svg.select('.per-links').selectAll('.per-link')
    .attr('x1', (d: any) => {
      const linkNodes: {from: PositionnedNode | undefined, to: PositionnedNode | undefined} = this.networkService.getLinkNodes(nodes, d);
      if (!linkNodes.from || !linkNodes.to) {
        return 0;
      }
      const fromNode: PositionnedNode = linkNodes.from;
      const toNode: PositionnedNode = linkNodes.to;
      return `${fromNode?.x + (this.MEDIA_SIZE / 2)}px`;
    })
    .attr('y1', (d: any) => {
      const linkNodes: {from: PositionnedNode | undefined, to: PositionnedNode | undefined} = this.networkService.getLinkNodes(nodes, d);
      if (!linkNodes.from || !linkNodes.to) {
        return 0;
      }
      const fromNode: PositionnedNode = linkNodes.from;
      const toNode: PositionnedNode = linkNodes.to;
      return `${fromNode?.y + (this.MEDIA_SIZE / 2)}px`;
    })
    .attr('x2', (d: any) => {
      const linkNodes: {from: PositionnedNode | undefined, to: PositionnedNode | undefined} = this.networkService.getLinkNodes(nodes, d);
      if (!linkNodes.from || !linkNodes.to) {
        return 0;
      }
      const fromNode: PositionnedNode = linkNodes.from;
      const toNode: PositionnedNode = linkNodes.to;
      return `${toNode?.x + (this.MEDIA_SIZE / 2)}px`;
    })
    .attr('y2', (d: any) => {
      const linkNodes: {from: PositionnedNode | undefined, to: PositionnedNode | undefined} = this.networkService.getLinkNodes(nodes, d);
      if (!linkNodes.from || !linkNodes.to) {
        return 0;
      }
      const fromNode: PositionnedNode = linkNodes.from;
      const toNode: PositionnedNode = linkNodes.to;
      return `${toNode?.y + (this.MEDIA_SIZE / 2)}px`;
    });
  }

  private createNode = (position: {x: number, y: number}): void => {
    const id: string = uuidv4();
    const newNode: NetworkNode = {
      album: {
        name: 'Unknown',
        coverUrl: 'https://i.scdn.co/image/ab67616d00001e0285e087e2715d317c33f71a31'
      },
      id: id
    }
    this.positionnedNodes.push({...newNode, x: position.x, y: position.y});
    this.updateNodes(this.positionnedNodes);
    this.updateLinksPositions(this.positionnedNodes);
  }
}
