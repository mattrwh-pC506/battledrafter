import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Declaration, Import, Provider } from "lupine-angular/src/app/types/angular.type";

import { activeToolServiceProvision } from "./services/active-tool/active-tool.service.impl";
import { backgroundServiceProvision } from './services/background/background.service.impl';
import { bgTextureServiceProvision } from "./services/bg-textures/bg-textures.service.impl";
import { clipartServiceProvision } from "./services/clipart/clipart.service.impl";
import { gridServiceProvision } from './services/grid/grid.service.impl';
import { mapViewCtxServiceProvision } from './services/map-view-ctx/map-view-ctx.service.impl';
import { rendererServiceProvision } from './services/renderer/renderer.service.impl';
import { resetServiceProvision } from './services/reset/reset.service.impl';
import { zoomServiceProvision } from './services/zoom/zoom.service.impl';

import { DrafterComponent } from "./drafter.component";
import { CanvasComponent } from "./canvas/canvas.component";
import { CursorImgComponent } from "./cursor-img/cursor-img.component";
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { routing } from "./drafter.routing";


const DRAFTER_DECLARATIONS: Declaration[] = [
  CanvasComponent,
  CursorImgComponent,
  ToolbarComponent,
  DrafterComponent,
];

const DRAFTER_IMPORTS: Import[] = [
  CommonModule,
  routing,
];

const DRAFTER_PROVIDERS: Provider[] = [
  activeToolServiceProvision,
  backgroundServiceProvision,
  bgTextureServiceProvision,
  clipartServiceProvision,
  gridServiceProvision,
  mapViewCtxServiceProvision,
  rendererServiceProvision,
  resetServiceProvision,
  zoomServiceProvision,
];

@NgModule({
  declarations: DRAFTER_DECLARATIONS,
  imports: DRAFTER_IMPORTS,
  providers: DRAFTER_PROVIDERS,
  exports: DRAFTER_DECLARATIONS,
})
export class DrafterModule { }


