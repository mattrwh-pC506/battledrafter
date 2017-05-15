import {
  Component, ViewChild, Input,
  ElementRef, ViewEncapsulation,
} from "@angular/core";

import { Observable } from "rxjs/Observable";
import { select } from "@angular-redux/store";

import { ActiveToolService } from "../services/active-tool/active-tool.service";
import { ClickStateService } from "../services/click-state/click-state.service";
import { MapViewCtxService } from "../services/map-view-ctx/map-view-ctx.service";
import { RendererService } from "../services/renderer/renderer.service";
import { ZoomService } from "../services/zoom/zoom.service";

import { CanvasComponent } from "../canvas/canvas.component";
import { PaperActionCreators } from "../store/paper/paper.actions";
import { Palette } from "../store/palette/palette.types";


@Component({
  selector: 'drafter-cursor-img',
  templateUrl: "cursor-img.component.html",
  styleUrls: ["./cursor-img.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class CursorImgComponent {
  @ViewChild("cursorImg", { read: ElementRef }) private _el: ElementRef;
  @Input("canvas") private canvasComponent: CanvasComponent;
  @select("palette") public palette: Observable<Palette>;
  private iconImageTop: number = -1000;
  private iconImageLeft: number = -1000;
  public url: string = "";
  public displayCursorIfPossible: boolean = true;
  public isToolActive: boolean = false;
  public drawing: boolean = false;

  constructor(
    private clickStateService: ClickStateService,
    private paperActionCreators: PaperActionCreators,
    private mapViewCtxService: MapViewCtxService,
    private rendererService: RendererService,
    private zoomService: ZoomService,
  ) { }

  public ngAfterViewInit() {
    this.palette.subscribe((state: Palette) => {
      this.url = state.selectedSwatchUrl;
      this.isToolActive = Object.keys(state.types).some((paletteType) => state.types[paletteType].active);
      this.displayCursorIfPossible = state.bindSwatchToCursor;
    });
  }

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
    return this.isToolActive &&
      this.displayCursorIfPossible;
  }

  public centeredCoord(coord: number, dimension: number) {
    return coord - dimension / 2
  }

  public onMouseDown(e) {
    this.drawing = true;
    if (this.isToolActive) {
      let realX = e.clientX - (this.el.width / 2) + (this.mapViewCtxService.offsetX * -1);
      let realY = e.clientY - (this.el.height / 2) + (this.mapViewCtxService.offsetY * -1);
      if (realX % 2 !== 0) {
        realX += 1;
      }
      if (realY % 2 !== 0) {
        realY += 1;
      }
      this.paperActionCreators.drawArtToPaper({
        src: this.el.src,
        realHeight: this.el.height / this.zoomService.zoomLevel,
        realWidth: this.el.width / this.zoomService.zoomLevel,
        realX: realX,
        realY: realY,
        realZoom: this.zoomService.zoomLevel,
      });
      this.rendererService.render(this.canvasComponent.ctx, this.canvasComponent.canvas);
    }
  }

  public onMouseUp() {
    this.drawing = false;
  }

  public onMouseMove(e) {
    if (this.isToolActive &&
      !!this.isCursorImageInitialized) {
      this.followCursor(e);
    }
    if (!!this.drawing) {
      this.onMouseDown(e);
    }
  }

}
