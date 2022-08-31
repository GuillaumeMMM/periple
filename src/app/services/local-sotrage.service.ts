import { Injectable } from '@angular/core';
import { Periple } from '../shared/models/network';

@Injectable({
  providedIn: 'root'
})
export class LocalSotrageService {

  constructor() { }

  public saveNetwork = (network: Periple) => {
    const savedPeriples: {[key: string]: Periple} = JSON.parse(localStorage.getItem('periples') || '{}');
    savedPeriples[network.id] = network;
    localStorage.setItem('periples', JSON.stringify(savedPeriples));
  }

  public getPeriple = (id: string): Periple => {
    const savedPeriples: {[key: string]: Periple} = JSON.parse(localStorage.getItem('periples') || '{}');
    return savedPeriples[id];
  }

  public getPeriples = (): Periple[] => {
    const savedPeriples: {[key: string]: Periple} = JSON.parse(localStorage.getItem('periples') || '{}');
    return Object.keys(savedPeriples).map(key => savedPeriples[key]);
  }
}
