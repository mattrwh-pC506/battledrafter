import { Injectable } from "@angular/core";
import { GridService } from "./grid.service";
import { MapViewCtxService } from "../map-view-ctx/map-view-ctx.service";
import { ZoomService } from "../zoom/zoom.service";


@Injectable()
export class ConcreteGridService implements GridService {

  private baseCellSize: number = 10;

  constructor(
    private mapViewCtxService: MapViewCtxService,
    private zoomService: ZoomService,
  ) { }

  public get cellSize() {
    return this.zoomService.zoomLevel * this.baseCellSize;
  }

  public draw(ctx) {
    let offsetX = this.mapViewCtxService.offsetX % this.cellSize;
    let offsetY = this.mapViewCtxService.offsetY % this.cellSize;

    for (
      let x = -1 * this.zoomService.zoomLevel;
      x < this.mapViewCtxService.width + this.cellSize;
      x += this.cellSize) {
      ctx.moveTo(offsetX + .5 + x, 0);
      ctx.lineWidth = 1;
      ctx.lineTo(offsetX + .5 + x, this.mapViewCtxService.height);
    }

    for (
      let y = -1 * this.zoomService.zoomLevel;
      y < this.mapViewCtxService.height + this.cellSize;
      y += this.cellSize) {
      ctx.moveTo(0, offsetY + .5 + y);
      ctx.lineWidth = 1;
      ctx.lineTo(this.mapViewCtxService.width, offsetY + .5 + y);
    }

    ctx.strokeStyle = "#b7b7b7";
    ctx.stroke();
  }
}

export const gridServiceProvision = {
  provide: GridService,
  useClass: ConcreteGridService,
}
