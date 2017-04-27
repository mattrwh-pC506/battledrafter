import { NgModule } from "@angular/core";
import { BatMapCanvasComponent } from "./canvas.component"
import { Declaration } from "../../types/angular.type";


const BATTLE_MAP_DECLARATIONS: Declaration[] = [
  BatMapCanvasComponent,
];

@NgModule({
  declarations: BATTLE_MAP_DECLARATIONS,
  exports: [BatMapCanvasComponent,],
})
export class BatMapCanvasModule { }


