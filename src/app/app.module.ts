import { environment as env } from "../environments/environment";


import { NgModule } from '@angular/core';
import {
  Location, LocationStrategy,
  HashLocationStrategy,
} from "@angular/common";

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NgRedux, NgReduxModule, DevToolsExtension } from "@angular-redux/store";
import { combineReducers } from 'redux';

import { AppComponent } from './app.component';
import { appRoutingProviders, routing } from "./app.routing";
import { allReducers, AppStateStore } from "./shared/store";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgReduxModule,
    routing,
  ],
  providers: [
    appRoutingProviders,
    Location,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private ngRedux: NgRedux<AppStateStore>,
    private devTools: DevToolsExtension
  ) {
    let middleware = [];
    let enhancers = [];
    if (env.production === false && devTools.isEnabled()) {
      enhancers.push(devTools.enhancer());
    }
    let rootReducer = combineReducers(allReducers);
    ngRedux.configureStore(rootReducer, {}, middleware, enhancers);
  }
}
