import { Injectable } from "@angular/core";
import { GridService } from "./grid.service";


@Injectable()
export class ConcreteGridService implements GridService {

  public draw(ctx, offsetX, offsetY, cellSize, zoomLevel, cw, ch) {
    offsetX = offsetX % cellSize;
    offsetY = offsetY % cellSize;
    for (
      let x = -1 * zoomLevel;
      x < cw + cellSize;
      x += cellSize) {
      ctx.moveTo(offsetX + .5 + x, 0);
      ctx.lineWidth = 1;
      ctx.lineTo(offsetX + .5 + x, ch);
    }

    for (
      let y = -1 * zoomLevel;
      y < ch + cellSize;
      y += cellSize) {
      ctx.moveTo(0, offsetY + .5 + y);
      ctx.lineWidth = 1;
      ctx.lineTo(cw, offsetY + .5 + y);
    }

    ctx.strokeStyle = "#b7b7b7";
    ctx.stroke();
  }
}

export const gridServiceProvision = {
  provide: GridService,
  useClass: ConcreteGridService,
}
