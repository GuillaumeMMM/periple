import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './layout/home/home.component';
import { PeriplesComponent } from './periples/periples.component';
import { PeriplesListComponent } from './periples/periples-list/periples-list.component';
import { PeripleProfileComponent } from './periples/periple-profile/periple-profile.component';
import { PeriplePathsComponent } from './periples/periple-paths/periple-paths.component';
import { PeriplePathsNodeComponent } from './periples/periple-paths/periple-paths-node/periple-paths-node.component';
import { PeripleNetworkComponent } from './periples/periple-profile/periple-network/periple-network.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PeriplesComponent,
    PeriplesListComponent,
    PeripleProfileComponent,
    PeriplePathsComponent,
    PeriplePathsNodeComponent,
    PeripleNetworkComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
