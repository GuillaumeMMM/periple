import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { PeriplePathsNodeComponent } from './periples/periple-paths/periple-paths-node/periple-paths-node.component';
import { PeriplePathsComponent } from './periples/periple-paths/periple-paths.component';
import { PeripleProfileComponent } from './periples/periple-profile/periple-profile.component';
import { PeriplesListComponent } from './periples/periples-list/periples-list.component';
import { PeriplesComponent } from './periples/periples.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'periples',
    component: PeriplesComponent,
    children: [
      {
        path: '',
        component: PeriplesListComponent
      },
      {
        path: ':peripleId',
        component: PeripleProfileComponent,
      },
      {
        path: ':peripleId/path',
        component: PeriplePathsComponent,
        children: [
          {
            path: ':pathNodeId',
            component: PeriplePathsNodeComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
