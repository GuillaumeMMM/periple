import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { NetworkLink, NetworkNode, PositionnedNode } from '../shared/models/network';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor() { }

  public dragstarted(that: SVGRectElement, event: MouseEvent, d: any) {
    const element: SVGRectElement = this as any;
    d3.select(element).raise().classed("dragging", true);
  }

  public dragged = (svg: d3.Selection<any, any, any, any>, event: DragEvent, datum: PositionnedNode) => {
    const element: HTMLElement = svg.select(`.per-nodes`).select(`#_${datum.id}`).node() as HTMLElement;
    d3.select(element)
    .attr("x", (d: any) => {
      return d.x = event.x;
    })
    .attr("y", (d: any) => {
      return d.y = event.y;
    });
  }

  public dragended(event: MouseEvent, d: any) {
    const element: SVGRectElement = this as any;
    d3.select(element).classed("dragging", false);
  }

  public getLinkNodes = (nodes: PositionnedNode[], link: NetworkLink): {from: PositionnedNode | undefined, to: PositionnedNode | undefined} => {
    return {
      from: (nodes || []).find(n => n.id === link.from),
      to: (nodes || []).find(n => n.id === link.to),
    }
  }
}
