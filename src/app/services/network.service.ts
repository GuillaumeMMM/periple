import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { NetworkLink, NetworkNode, PositionnedNode } from '../shared/models/network';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor() { }

  public dragstarted = (element: any): void => {
    d3.select(element).raise().classed("dragging", true);
  }

  public dragged = (element: any, event: DragEvent) => {
    console.log(event.x)
    d3.select(element)
    .attr("x", (d: any) => {
      return d.x = +event.x;
    })
    .attr("y", (d: any) => {
      return d.y = +event.y;
    });
  }

  public dragended = (element: any) => {
    d3.select(element).classed("dragging", false);
  }

  public getLinkNodes = (nodes: PositionnedNode[], link: NetworkLink): {from: PositionnedNode | undefined, to: PositionnedNode | undefined} => {
    return {
      from: (nodes || []).find(n => n.id === link.from),
      to: (nodes || []).find(n => n.id === link.to),
    }
  }
}
