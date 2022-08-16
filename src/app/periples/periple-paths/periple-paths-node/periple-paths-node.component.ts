import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { PeripleService } from 'src/app/services/periple.service';
import { NetworkLink, NetworkNode, Periple } from 'src/app/shared/models/network';

@Component({
  selector: 'app-periple-paths-node',
  templateUrl: './periple-paths-node.component.html',
  styleUrls: ['./periple-paths-node.component.scss']
})
export class PeriplePathsNodeComponent implements OnInit {

  constructor(private route: ActivatedRoute, private peripleService: PeripleService) { }

  public periple$: Observable<Periple | null> = new Observable();
  public peripleNode$: Observable<NetworkNode> = new Observable();
  public peripleLinksOut$: Observable<NetworkLink[]> = new Observable();

  ngOnInit(): void {
    this.periple$ = (this.route.parent?.params || of({})).pipe(switchMap((params: any) => {
      const peripleId: string = params?.peripleId;
      if (!peripleId) {
        return of(null);
      }
      return this.peripleService.getPeriple(peripleId);
    }));

    this.peripleNode$ = this.route.params.pipe(switchMap(params => {
      if (!params['pathNodeId']) {
        return of(null as any);
      }
      return this.periple$.pipe(map(periple => {
        return periple?.nodes.find(link => link.id === params['pathNodeId']) as NetworkNode;
      }))
    }));

    this.peripleLinksOut$ = this.route.params.pipe(switchMap(params => {
      if (!params['pathNodeId']) {
        return of([]);
      }
      return this.periple$.pipe(map(periple => {
        return periple?.links.filter(link => link.from === params['pathNodeId']) || [];
      }))
    }));
  }

}
