import {
  Component, ViewChild,
  ElementRef, HostListener,
  ViewEncapsulation, Input,
} from "@angular/core";

import { ActiveToolService } from "../services/active-tool/active-tool.service";
import { ClipartService } from "../services/clipart/clipart.service";
import { GridService } from "../services/grid/grid.service";
import { MapViewCtxService } from "../services/map-view-ctx/map-view-ctx.service";
import { RendererService } from "../services/renderer/renderer.service";
import { ZoomService } from "../services/zoom/zoom.service";

import { CursorImgComponent } from "../cursor-img/cursor-img.component";


@Component({
  selector: 'drafter-canvas',
  templateUrl: "canvas.component.html",
  styleUrls: ["./canvas.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class CanvasComponent {
  @ViewChild("canvasRef", { read: ElementRef })
  public _canvas: ElementRef;

  @Input("cursorImg") private cursorImg: CursorImgComponent;

  private resizeTimeout: any;
  private mouseClickState: string = "up";

  constructor(
    private activeToolService: ActiveToolService,
    private clipartService: ClipartService,
    private gridService: GridService,
    private mapViewCtxService: MapViewCtxService,
    private rendererService: RendererService,
    private zoomService: ZoomService,
  ) { }

  public ngAfterViewInit() {
    this.ctx.mozImageSmoothingEnabled = false;
    this.ctx.imageSmoothingQuality = "Medium";
    this.ctx.webkitImageSmoothingEnabled = false;
    this.ctx.msImageSmoothingEnabled = false;
    this.ctx.imageSmoothingEnabled = false;
    this.rendererService.render(this.ctx, this.canvas);
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event) {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      this.mapViewCtxService.width = this.canvas.getBoundingClientRect().width;
      this.mapViewCtxService.height = this.canvas.getBoundingClientRect().height;
      this.rendererService.render(this.ctx, this.canvas);
    }, 20);
  }


  public get viewPortWidth() {
    return window.innerWidth && document.documentElement.clientWidth ?
      Math.min(window.innerWidth, document.documentElement.clientWidth) :
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.getElementsByTagName('body')[0].clientWidth;
  }

  public get viewPortHeight() {
    return window.innerHeight && document.documentElement.clientHeight ?
      Math.min(window.innerHeight, document.documentElement.clientHeight) :
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.getElementsByTagName('body')[0].clientHeight;
  }

  public get canvas(): any {
    return this._canvas.nativeElement;
  }

  // stays
  public get ctx(): any {
    return this.canvas.getContext('2d');
  }

  public onMouseDown(e) {
    this.mouseClickState = "down";
    if (this.activeToolService.isToolActive) {
      let realX = e.clientX + 10 + (this.mapViewCtxService.offsetX * -1);
      let realY = e.clientY + 10 + (this.mapViewCtxService.offsetY * -1);
      if (realX % 2 !== 0) {
        realX += 1;
      }
      if (realY % 2 !== 0) {
        realY += 1;
      }
      this.clipartService.placeClipart({
        src: this.cursorImg.el.src,
        realHeight: this.cursorImg.el.height / this.zoomService.zoomLevel,
        realWidth: this.cursorImg.el.width / this.zoomService.zoomLevel,
        realX: realX,
        realY: realY,
        realZoom: this.zoomService.zoomLevel,
      });
      this.clipartService.drawAll(
        this.ctx,
        this.mapViewCtxService.offsetX,
        this.mapViewCtxService.offsetY,
        this.zoomService.zoomLevel,
      );
      this.rendererService.render(this.ctx, this.canvas);

    }
  }

  public onMouseUp(e) {
    this.mouseClickState = "up";
    this.gridService.draw(this.ctx);

  }

  private evNum: number = 0;
  public onMouseMove(e) {
    this.evNum += 1;
    if (this.evNum % 5 !== 0) {
      return;
    }
    if (this.mouseClickState === "up") {
      return;
    } else if (this.mouseClickState === "down") {
      this.mapViewCtxService.offsetX += e.movementX * 5;
      this.mapViewCtxService.offsetY += e.movementY * 5;
      this.rendererService.render(this.ctx, this.canvas);
    }
  }

  public onCursorMove(e) {
    if (this.mouseClickState !== "up") {
      return;
    } else if (this.activeToolService.isToolActive &&
      e.clientY > 125 &&
      !!this.cursorImg.isCursorImageInitialized) {
      this.cursorImg.followCursor(e);
    }
  }
}
