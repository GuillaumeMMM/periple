import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { NetworkLink, NetworkNode, PositionnedNode } from '../shared/models/network';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor() { }

  public dragstarted = (element: any): void => {
    d3.select(element).raise().classed("dragging", true);
  }

  public dragged = (element: any, pos: {x: number, y: number}) => {
    d3.select(element)
    .attr("x", (d: any) => {
      return pos.x;
    })
    .attr("y", (d: any) => {
      return pos.y;
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

  public createNode = (event: PointerEvent): PositionnedNode => {
    const id: string = uuidv4();
    const newNode: PositionnedNode = {
      album: {
        name: 'Unknown',
        coverUrl: 'https://i.scdn.co/image/ab67616d00001e0285e087e2715d317c33f71a31'
      },
      id: id,
      x: event.offsetX, y: event.offsetY
    }
    return newNode;
  }

  public createLink = (id1: string, id2: string): NetworkLink => {
    const link: NetworkLink = { from: id1, to: id2 };
    return link;
  }
}
