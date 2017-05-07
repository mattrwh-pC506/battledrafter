import { Injectable } from "@angular/core";
import { RendererService } from "./renderer.service";
import { ResetService } from "../reset/reset.service";
import { BackgroundService } from "../background/background.service";
import { ClipartService } from "../clipart/clipart.service";
import { GridService } from "../grid/grid.service";
import { MapViewCtxService } from "../map-view-ctx/map-view-ctx.service";
import { ZoomService } from "../zoom/zoom.service";


@Injectable()
export class ConcreteRendererService implements RendererService {
  private canvas: any;
  private ctx: any;

  constructor(
    private resetService: ResetService,
    private backgroundService: BackgroundService,
    private clipartService: ClipartService,
    private gridService: GridService,
    private mapViewCtxService: MapViewCtxService,
    private zoomService: ZoomService,
  ) { }

  public render(ctx, canvas): void {
    this.resetService.clear(canvas, ctx);
    this.backgroundService.draw(canvas, ctx);
    this.clipartService.drawAll(
      ctx,
      this.mapViewCtxService.offsetX,
      this.mapViewCtxService.offsetY,
      this.zoomService.zoomLevel,
    );
    this.gridService.draw(ctx);
  }
}

export const rendererServiceProvision = {
  provide: RendererService,
  useClass: ConcreteRendererService,
}
