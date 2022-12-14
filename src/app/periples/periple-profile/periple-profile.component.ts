import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap, take } from 'rxjs';
import { PeripleService } from 'src/app/services/periple.service';
import { Periple } from 'src/app/shared/models/network';

@Component({
  selector: 'app-periple-profile',
  templateUrl: './periple-profile.component.html',
  styleUrls: ['./periple-profile.component.scss']
})
export class PeripleProfileComponent implements OnInit {

  constructor(private peripleService: PeripleService, private route: ActivatedRoute, private router: Router) { }

  public periple$: Observable<Periple> = new Observable();

  ngOnInit(): void {
    this.periple$ = this.route.params.pipe(switchMap(params => {
      return this.peripleService.getPeriple((params as any).peripleId);
    }))
  }

  public startPath = (): void => {
    this.periple$.pipe(take(1)).subscribe(periple => {
      this.router.navigate([`./path/${periple.nodes[0].id}`], {relativeTo: this.route});
    });
  }

}
