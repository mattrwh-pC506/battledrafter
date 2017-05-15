import { Injectable } from "@angular/core";
import { RendererService } from "./renderer.service";
import { ResetService } from "../reset/reset.service";
import { BackgroundService } from "../background/background.service";
import { GridService } from "../grid/grid.service";
import { MapViewCtxService } from "../map-view-ctx/map-view-ctx.service";
import { PaperService } from "../paper/paper.service";
import { ZoomService } from "../zoom/zoom.service";


@Injectable()
export class ConcreteRendererService implements RendererService {
  private canvas: any;
  private ctx: any;

  constructor(
    private resetService: ResetService,
    private backgroundService: BackgroundService,
    private gridService: GridService,
    private mapViewCtxService: MapViewCtxService,
    private paperService: PaperService,
    private zoomService: ZoomService,
  ) { }

  public render(ctx, canvas): void {
    this.resetService.clear(canvas, ctx);
    this.backgroundService.draw(canvas, ctx);
    this.drawAll(
      ctx,
      this.mapViewCtxService.offsetX,
      this.mapViewCtxService.offsetY,
      this.zoomService.zoomLevel,
    );
    this.gridService.draw(ctx);
  }

  private drawAll(ctx, offsetX, offsetY, zoomLevel): any {
    for (let i = 0; i < this.paperService.get().drawnItems.length; i++) {
      let clip = this.paperService.get().drawnItems[i];
      this.draw(clip, ctx, offsetX, offsetY, zoomLevel);
    };
  }

  private draw(item, ctx, offsetX, offsetY, zoomLevel): void {
    let img = new Image();
    img.src = item.src;
    ctx.drawImage(
      img,
      (item.realX + offsetX),
      (item.realY + offsetY),
      item.realWidth * zoomLevel,
      item.realHeight * zoomLevel,
    );
  }
}

export const rendererServiceProvision = {
  provide: RendererService,
  useClass: ConcreteRendererService,
}
