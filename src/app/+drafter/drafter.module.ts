import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgRedux } from "@angular-redux/store";
import { Declaration, Import, Provider } from "lupine-angular/src/app/types/angular.type";

import { activeToolServiceProvision } from "./services/active-tool/active-tool.service.impl";
import { backgroundServiceProvision } from './services/background/background.service.impl';
import { clickStateServiceProvision } from './services/click-state/click-state.service.impl';
import { gridServiceProvision } from './services/grid/grid.service.impl';
import { mapViewCtxServiceProvision } from './services/map-view-ctx/map-view-ctx.service.impl';
import { paperServiceProvision } from './services/paper/paper.service.impl';
import { rendererServiceProvision } from './services/renderer/renderer.service.impl';
import { resetServiceProvision } from './services/reset/reset.service.impl';
import { saveServiceProvision } from "./services/save/save.service.impl";
import { zoomServiceProvision } from './services/zoom/zoom.service.impl';

import { provideBaseArtService } from "../shared/services/art.service.impl";
import { provideBaseUploadService } from "../shared/services/upload-file.service.impl";

import { Paper } from "./store/paper/paper.types";
import { PaperActionCreators } from "./store/paper/paper.actions";
import { PaletteActionCreators } from "./store/palette/palette.actions";
import { paletteActionsReducer } from "./store/palette/palette.reducer";
import { paperActionsReducer } from "./store/paper/paper.reducer";
import { mergeReducers } from "../shared/store";
import { AppStateStore } from "./drafter.types";

import { DrafterComponent } from "./drafter.component";
import { CanvasComponent } from "./canvas/canvas.component";
import { CursorImgComponent } from "./cursor-img/cursor-img.component";
import { PaletteComponent } from "./palette/palette.component";
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { routing } from "./drafter.routing";


const DRAFTER_DECLARATIONS: Declaration[] = [
  CanvasComponent,
  CursorImgComponent,
  PaletteComponent,
  ToolbarComponent,
  DrafterComponent,
];

const DRAFTER_IMPORTS: Import[] = [
  CommonModule,
  routing,
];

const DRAFTER_PROVIDERS: Provider[] = [
  PaperActionCreators,
  PaletteActionCreators,
  activeToolServiceProvision,
  backgroundServiceProvision,
  clickStateServiceProvision,
  gridServiceProvision,
  mapViewCtxServiceProvision,
  paperServiceProvision,
  rendererServiceProvision,
  resetServiceProvision,
  saveServiceProvision,
  zoomServiceProvision,
  provideBaseArtService,
  provideBaseUploadService,
];

@NgModule({
  declarations: DRAFTER_DECLARATIONS,
  imports: DRAFTER_IMPORTS,
  providers: DRAFTER_PROVIDERS,
  exports: DRAFTER_DECLARATIONS,
})
export class DrafterModule {
  constructor(private ngRedux: NgRedux<AppStateStore>) {
    mergeReducers(
      ngRedux,
      {
        paper: paperActionsReducer,
        palette: paletteActionsReducer,
      }
    );
  }
}


