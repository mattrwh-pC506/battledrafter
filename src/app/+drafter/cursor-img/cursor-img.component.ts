import {
  Component, ViewChild, Input,
  ElementRef, ViewEncapsulation,
} from "@angular/core";

import { ActiveToolService } from "../services/active-tool/active-tool.service";
import { ClickStateService } from "../services/click-state/click-state.service";
import { ClipartService } from "../services/clipart/clipart.service";
import { MapViewCtxService } from "../services/map-view-ctx/map-view-ctx.service";
import { RendererService } from "../services/renderer/renderer.service";
import { ZoomService } from "../services/zoom/zoom.service";

import { CanvasComponent } from "../canvas/canvas.component";


@Component({
  selector: 'drafter-cursor-img',
  templateUrl: "cursor-img.component.html",
  styleUrls: ["./cursor-img.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class CursorImgComponent {
  @ViewChild("cursorImg", { read: ElementRef }) private _el: ElementRef;
  @Input("canvas") private canvasComponent: CanvasComponent;
  private iconImageTop: number = -1000;
  private iconImageLeft: number = -1000;
  public url: string = "";
  public displayCursorIfPossible: boolean = true;

  constructor(
    private activeToolService: ActiveToolService,
    private clickStateService: ClickStateService,
    private clipartService: ClipartService,
    private mapViewCtxService: MapViewCtxService,
    private rendererService: RendererService,
    private zoomService: ZoomService,
  ) { }

  public get isCursorImageInitialized(): boolean {
    return !!this._el;
  }

  public get el() {
    return this._el.nativeElement;
  }

  public followCursor(e) {
    if (this.isCursorImageInitialized) {
      this.iconImageTop = e.clientY;
      this.iconImageLeft = e.clientX;
    }
  }

  public get displayCursorImage() {
    return this.activeToolService.isToolActive &&
      this.displayCursorIfPossible;
  }

  public toggleCursorIcon() {
    this.displayCursorIfPossible = !this.displayCursorIfPossible;
  }

  public clearCursor(): void {
    this.activeToolService.deactivate();
    this.url = "";
  }

  public setCursor(url: string) {
    this.activeToolService.activate();
    this.url = url;
  }

  public onCursorMove(e) {
    if (this.clickStateService.mouseClickState !== "up") {
      return;
    } else if (this.activeToolService.isToolActive &&
      !!this.isCursorImageInitialized) {
      this.followCursor(e);
    }
  }

  public centeredCoord(coord: number, dimension: number) {
    return coord - dimension / 2
  }

  public onMouseDown(e) {
    if (this.activeToolService.isToolActive) {
      let realX = e.clientX - (this.el.width / 2) + (this.mapViewCtxService.offsetX * -1);
      let realY = e.clientY - (this.el.height / 2) + (this.mapViewCtxService.offsetY * -1);
      if (realX % 2 !== 0) {
        realX += 1;
      }
      if (realY % 2 !== 0) {
        realY += 1;
      }
      this.clipartService.placeClipart({
        src: this.el.src,
        realHeight: this.el.height / this.zoomService.zoomLevel,
        realWidth: this.el.width / this.zoomService.zoomLevel,
        realX: realX,
        realY: realY,
        realZoom: this.zoomService.zoomLevel,
      });
      this.clipartService.drawAll(
        this.canvasComponent.ctx,
        this.mapViewCtxService.offsetX,
        this.mapViewCtxService.offsetY,
        this.zoomService.zoomLevel,
      );
      this.rendererService.render(this.canvasComponent.ctx, this.canvasComponent.canvas);

    }
  }

}
