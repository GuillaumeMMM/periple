import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';
import { NetworkService } from 'src/app/services/network.service';
import { NetworkLink, NetworkNode, Periple } from 'src/app/shared/models/network';

@Component({
  selector: 'app-periple-network',
  templateUrl: './periple-network.component.html',
  styleUrls: ['./periple-network.component.scss']
})
export class PeripleNetworkComponent implements OnInit, OnChanges {

  constructor(private el: ElementRef, private networkService: NetworkService) { }

  ngOnInit(): void {
  }

  @Input() network: Periple = {id: '', links: [], nodes: [], name: ''};
  @Input() editing: boolean = true;

  private svg: d3.Selection<any, any, any, any> = null as any;
  public width: number = 0;
  public height: number = 0;
  public MEDIA_SIZE: number = 80;

  private mainGroup: d3.Selection<any, any, any, any> | null = null;
  private linksGroup: d3.Selection<any, any, any, any> | null = null;
  private nodesGroup: d3.Selection<any, any, any, any> | null = null;
  private dragHandler: d3.DragBehavior<any, any, any> = d3.drag();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['network'] && changes['network']['currentValue']) {
      this.initDragHandler();

      setTimeout(() => {
        this.initSvg();

        this.mainGroup = this.svg.append('g').attr('class', 'per-group');
        this.linksGroup = this.mainGroup.append('g').attr('class', 'per-links');
        this.nodesGroup = this.mainGroup.append('g').attr('class', 'per-nodes');

        this.updateNodes();
        this.updateLinks();
      });
    }
  }

  private initSvg = (): void => {
    if (this.svg) {
      this.svg.remove();
    }
    const rect: DOMRect | undefined = (this.el.nativeElement as HTMLElement).querySelector('#canvas')?.getBoundingClientRect();
    this.width = rect?.width || 0;
    this.height = rect?.height || 0;

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
        const newNode: NetworkNode = this.networkService.createNode(event);
        const newLink: NetworkLink = this.networkService.createLink(newNode.id, this.network.nodes[0].id);
        this.network?.nodes.push(newNode);
        this.network?.links.push(newLink);

        this.updateNodes();
        this.updateLinks();
      })
  }

  private initDragHandler = () => {
    this.dragHandler
      .on('start', (event, d) => {
        this.networkService.dragstarted(this.nodesGroup?.select(`.per-node#_${d.id}`).node());
      })
      .on('drag', (event: any, d: NetworkNode) => {
        const newPosition: { x: number, y: number } = { x: d.position.x + event.dx, y: d.position.y + event.dy };
        d.position.x = newPosition.x;
        d.position.y = newPosition.y;
        this.networkService.dragged(this.nodesGroup?.select(`.per-node#_${d.id}`).node(), newPosition);
        this.updateLinks();
      })
      .on('end', (event, d) => {
        this.networkService.dragended(this.nodesGroup?.select(`.per-node#_${d.id}`).node())
      });
  }

  private updateNodes = (): void => {
    this.nodesGroup?.selectAll('.per-node').data((this.network?.nodes || []))
      .join(
        function (enter) {
          const foreignObject = enter.append('foreignObject').attr('class', 'per-node').attr('id', d => `_${d.id}`)
            .attr('x', d => `${d.position.x}px`).attr('y', d => `${d.position.y}px`)
          
          foreignObject.append("xhtml:div")
            .html(d => `
            <div class="per-node-html-container" id="node-html-container">
              <img src="${d.album.coverUrl}">
            </div>`);

          return foreignObject;
        },
        function (update) {
          return update.select('per-node')
            .attr('x', d => `${d.position.x}px`).attr('y', d => `${d.position.y}px`);
        }
      ).call(
        this.dragHandler
      );
      this.nodesGroup?.selectAll('.per-node').each((d, i, selection) => {
        const deleteButton = document.createElement('button');
        deleteButton.appendChild(document.createTextNode('delete'));
        deleteButton.setAttribute('type', 'button');
        deleteButton.classList.add('per-node-delete');
        deleteButton.addEventListener('click', () => {
          this.deleteNode((d as any).id);
        });
        (selection[i] as HTMLElement)?.querySelector('#node-html-container')?.appendChild(deleteButton);
      });
  }

  private updateLinks = (): void => {
    this.linksGroup?.selectAll('.per-link').data((this.network?.links || [])).enter()
      .append('line').attr('class', 'per-link');

    this.svg.select('.per-links').selectAll('.per-link')
      .attr('x1', (d: any) => `${this.networkService.getLinkNodes(this.network.nodes, d).from?.position?.x}px`)
      .attr('x2', (d: any) => `${this.networkService.getLinkNodes(this.network.nodes, d).to?.position?.x}px`)
      .attr('y1', (d: any) => `${this.networkService.getLinkNodes(this.network.nodes, d).from?.position?.y}px`)
      .attr('y2', (d: any) => `${this.networkService.getLinkNodes(this.network.nodes, d).to?.position?.y}px`)
  }

  private deleteNode = (nodeId: string) => {
    this.network.nodes = this.network.nodes.filter(n => n.id !== nodeId);
    this.updateNodes();
  }
}
