import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';
import { drag } from "d3-drag";
import { NetworkService } from 'src/app/services/network.service';
import { NetworkNode, Periple, PositionnedNode } from 'src/app/shared/models/network';

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

  private svg: d3.Selection<any, any, any, any> = null as any;
  private positionnedNodes: PositionnedNode[] = [];
  public width: number = 0;
  public height: number = 0;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['network'] && changes['network']['currentValue']) {

      this.positionnedNodes = this.setInitialPosition(this.network?.nodes || []);

      setTimeout(() => {
        this.initSvg();

        const mainGroup = this.svg.append('g').attr('class', 'per-group');
        const linksGroup = mainGroup.append('g').attr('class', 'per-links');
        const nodesGroup = mainGroup.append('g').attr('class', 'per-nodes');
        
        this.initNodes(nodesGroup);
        this.initLinks(linksGroup);
        this.initDrag(nodesGroup);
        this.initZoom(mainGroup);
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
  }

  private initNodes = (group: d3.Selection<any, any, any, any>): void => {
    group.selectAll('.per-node').data((this.positionnedNodes || [])).enter()
    .append('foreignObject').attr('class', 'per-node').attr('id', d => `_${d.id}`)
    .attr('x', d => `${d.x}px`).attr('y', d => `${d.y}px`)
    .append("xhtml:div")
    .html(d => `<div class="per-node-html-container"><img src="${d.album.coverUrl}"></div>`);
  }

  private initLinks = (group: d3.Selection<any, any, any, any>): void => {
    group.selectAll('.per-link').data((this.network?.links || [])).enter()
    .append('line').attr('class', 'per-link');

    this.updateLinksPositions(this.positionnedNodes);
  }

  private initDrag = (group: d3.Selection<any, any, any, any>): void => {
    const handler: any = drag();
    
    group.selectAll(".per-node").call(
      handler
        .on('start', this.networkService.dragstarted)
        .on('drag', (event: DragEvent, datum: PositionnedNode) => {
          this.networkService.dragged(this.svg, event, datum);
          this.updateLinksPositions(this.positionnedNodes);
        })
        .on('end', this.networkService.dragended)
    );
  }

  private initZoom = (group: d3.Selection<any, any, any, any>): void => {
  this.svg.call(d3.zoom()
    .scaleExtent([0.6, 1])
    .on("zoom", (e) => {
      group.attr('transform', e.transform)
    }));
  }

  private getSVGBoundingRect = (): DOMRect | null => {
    return (this.el.nativeElement as HTMLElement).querySelector('#canvas')?.getBoundingClientRect() || null;
  }

  private updateLinksPositions = (nodes: PositionnedNode[]): void => {
    this.svg.select('.per-links').selectAll('.per-link')
    .attr('x1', (d: any) => `${this.networkService.getLinkNodes(nodes, d).from?.x}px`)
    .attr('y1', (d: any) => `${this.networkService.getLinkNodes(nodes, d).from?.y}px`)
    .attr('x2', (d: any) => `${this.networkService.getLinkNodes(nodes, d).to?.x}px`)
    .attr('y2', (d: any) => `${this.networkService.getLinkNodes(nodes, d).to?.y}px`)
  }
}
