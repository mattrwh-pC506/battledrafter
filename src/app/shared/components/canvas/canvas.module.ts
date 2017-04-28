import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BatMapCanvasComponent } from "./canvas.component"
import { Declaration, Import } from "../../types/angular.type";


const BATTLE_MAP_DECLARATIONS: Declaration[] = [
  BatMapCanvasComponent,
];

const BATTLE_MAP_IMPORTS: Import[] = [
  CommonModule,
];

@NgModule({
  declarations: BATTLE_MAP_DECLARATIONS,
  imports: BATTLE_MAP_IMPORTS,
  exports: [BatMapCanvasComponent,],
})
export class BatMapCanvasModule { }


