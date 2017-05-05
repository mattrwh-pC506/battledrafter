import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BatMapCanvasComponent } from "./canvas.component"
import { Declaration, Import, Provider } from "../../types/angular.type";

import {
  bgTextureServiceProvision,
  clipartServiceProvision,
  gridServiceProvision,
} from "./impl";


const BATTLE_MAP_DECLARATIONS: Declaration[] = [
  BatMapCanvasComponent,
];

const BATTLE_MAP_IMPORTS: Import[] = [
  CommonModule,
];

const BATTLE_MAP_PROVIDERS: Provider[] = [
  bgTextureServiceProvision,
  clipartServiceProvision,
  gridServiceProvision,
];

@NgModule({
  declarations: BATTLE_MAP_DECLARATIONS,
  imports: BATTLE_MAP_IMPORTS,
  providers: BATTLE_MAP_PROVIDERS,
  exports: [BatMapCanvasComponent,],
})
export class BatMapCanvasModule { }


