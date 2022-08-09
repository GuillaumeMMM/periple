import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PeripleService } from 'src/app/services/periple.service';
import { Periple } from 'src/app/shared/models/network';

@Component({
  selector: 'app-periples-list',
  templateUrl: './periples-list.component.html',
  styleUrls: ['./periples-list.component.scss']
})
export class PeriplesListComponent implements OnInit {

  constructor(private peripleService: PeripleService) { }

  public periples$: Observable<Periple[]> = new Observable();

  ngOnInit(): void {
    this.periples$ = this.peripleService.getPeriples();
  }

}
