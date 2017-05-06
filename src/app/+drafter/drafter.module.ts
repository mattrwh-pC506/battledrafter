import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Declaration, Import, Provider } from "lupine-angular/src/app/types/angular.type";

import { backgroundServiceProvision } from './services/background';
import { bgTextureServiceProvision } from "./services/bg-textures"
import { clipartServiceProvision } from "./services/clipart";
import { gridServiceProvision } from './services/grid';
import { resetServiceProvision } from './services/reset';
import { zoomServiceProvision } from './services/zoom';

import { DrafterComponent } from "./drafter.component";
import { CanvasComponent } from "./canvas";
import { ToolbarComponent } from "./toolbar";
import { routing } from "./drafter.routing";


const DRAFTER_DECLARATIONS: Declaration[] = [
  CanvasComponent,
  DrafterComponent,
  ToolbarComponent
];

const DRAFTER_IMPORTS: Import[] = [
  CommonModule,
  routing,
];

const DRAFTER_PROVIDERS: Provider[] = [
  backgroundServiceProvision,
  bgTextureServiceProvision,
  clipartServiceProvision,
  gridServiceProvision,
  resetServiceProvision,
  zoomServiceProvision,
];

@NgModule({
  declarations: DRAFTER_DECLARATIONS,
  imports: DRAFTER_IMPORTS,
  providers: DRAFTER_PROVIDERS,
  exports: [DrafterComponent,],
})
export class DrafterModule { }


