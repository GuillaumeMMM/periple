import { Component, OnInit } from '@angular/core';
import { PeripleService } from './services/periple.service';
import * as periples from './shared/mock/periples.json';
import { Periple } from './shared/models/network';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor(private peripleService: PeripleService) {}

  ngOnInit() {
    this.peripleService.setPeriples((periples as any).default as Periple[]);
  }
}
