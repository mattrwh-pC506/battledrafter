import {
  Component, ViewChild,
  ElementRef, HostListener,
  ViewEncapsulation,
} from "@angular/core";

import { ClipartService } from "./clipart.service";
import { BGTextureService } from "./bg-textures.service";
import { GridService } from "./grid.service";


@Component({
  selector: 'batmap-canvas',
  templateUrl: "canvas.component.html",
  styleUrls: ["./canvas.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class BatMapCanvasComponent {
  @ViewChild("batMapCanvas", { read: ElementRef })
  public _canvas: ElementRef;

  public isToolActive: boolean = false;
  public cursorImageUrl: string = "";
  public displayCursorIfPossible: boolean = true;
  public isSavedMapsMenuVisible: boolean = false;

  private resizeTimeout: any;
  private baseCellSize: number = 10;
  private mouseClickState: string = "up";
  private zoomLevel: number = 10;
  private mapOffsetX: number = 0;
  private mapOffsetY: number = 0;

  public get activeClipartIcon(): string {
    return this.clipartService.curSelection || "";
  };

  public get activeBGTextureIcon(): string {
    return this.bgTextureService.curSelection || "";
  }

  constructor(
    private clipartService: ClipartService,
    private bgTextureService: BGTextureService,
    private gridService: GridService,
  ) { }

  public ngAfterViewInit() {
    this.ctx.mozImageSmoothingEnabled = false;
    this.ctx.imageSmoothingQuality = "Medium";
    this.ctx.webkitImageSmoothingEnabled = false;
    this.ctx.msImageSmoothingEnabled = false;
    this.ctx.imageSmoothingEnabled = false;
    this.render();
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event) {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      this.render();
    }, 20);
  }

  public get cellSize() {
    return this.zoomLevel * this.baseCellSize;
  }

  public onZoom(zoomType: string) {
    let oldZoom: number = this.zoomLevel;

    if (zoomType === "in") {
      this.zoomLevel += 2;
    } else if (zoomType === "out" && this.zoomLevel !== 2) {
      this.zoomLevel += -2;
    } else {
      return;
    }

    this.clipartService.onZoom(this.zoomLevel, oldZoom);
    this.mapOffsetX = Math.floor(Math.floor(this.cw / this.cellSize) / 2);
    this.mapOffsetY = Math.floor(Math.floor(this.ch / this.cellSize) / 2);
    this.render();
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

  public get ctx(): any {
    return this.canvas.getContext('2d');
  }

  public get ch() {
    return this.canvas.getBoundingClientRect().height;
  }

  public get cw() {
    return this.canvas.getBoundingClientRect().width;
  }

  public drawBackground() {
    this.setBackgroundColor();
  }

  public setBackgroundColor() {
    this.ctx.fillStyle = "ghostwhite";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  public onMouseDown(e) {
    this.mouseClickState = "down";
    if (this.isToolActive) {
      let realX = e.clientX + 10 + (this.mapOffsetX * -1);
      let realY = e.clientY + 10 + (this.mapOffsetY * -1);
      if (realX % 2 !== 0) {
        realX += 1;
      }
      if (realY % 2 !== 0) {
        realY += 1;
      }
      this.clipartService.placeClipart({
        src: this.cursorImage.src,
        realHeight: this.cursorImage.height / this.zoomLevel,
        realWidth: this.cursorImage.width / this.zoomLevel,
        realX: realX,
        realY: realY,
        realZoom: this.zoomLevel,
      });
      this.clipartService.drawAll(
        this.ctx,
        this.mapOffsetX,
        this.mapOffsetY,
        this.zoomLevel,
      );
      this.render();
    }
  }

  public onMouseUp(e) {
    this.mouseClickState = "up";
    this.gridService.draw(this.ctx, this.mapOffsetX, this.mapOffsetY, this.cellSize, this.zoomLevel, this.cw, this.ch);

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
      this.mapOffsetX += e.movementX * 5;
      this.mapOffsetY += e.movementY * 5;
      this.render();
    }
  }

  @ViewChild("cursorImage", { read: ElementRef })
  public _cursorImage: ElementRef;
  private iconImageTop: number = -1000;
  private iconImageLeft: number = -1000;

  public get cursorImage(): any {
    return this._cursorImage.nativeElement;
  }

  public selectClipart(): void {
    if (this.clipartService.toolActive) {
      this.clipartService.deactivateTool();
      this.clearCursor();
    } else {
      this.clipartService.activateTool();
      let selection = this.clipartService.curSelection;
      this.setCursor(selection);
    }
  }

  public selectBGTexture(): void {
    if (this.bgTextureService.toolActive) {
      this.bgTextureService.deactivateTool();
      this.clearCursor();
    } else {
      this.bgTextureService.activateTool();
      let selection = this.bgTextureService.curSelection;
      this.setCursor(selection, );
    }
  }

  public followCursor(e) {
    if (!!this._cursorImage) {
      this.iconImageTop = e.clientY;
      this.iconImageLeft = e.clientX;
    }
  }

  public onCursorMove(e) {
    if (this.mouseClickState !== "up") {
      return;
    } else if (this.isToolActive && e.clientY > 125) {
      this.followCursor(e);
    }
  }

  public centeredCoord(coord: number, dimension: number) {
    return coord - dimension / 2
  }

  public clearCursor(): void {
    this.isToolActive = false;
    this.cursorImageUrl = "";
  }

  public setCursor(url: string) {
    this.isToolActive = true;
    this.cursorImageUrl = url;
  }

  public get toolPalletes(): string[] {
    if (this.clipartService.toolActive) {
      return this.clipartService.clipart;
    } else if (this.bgTextureService.toolActive) {
      return this.bgTextureService.textures;
    }
  }

  public palleteIsSelected(selection: string) {
    if (this.clipartService.toolActive) {
      return this.clipartService.curSelection === selection;
    } else if (this.bgTextureService.toolActive) {
      return this.bgTextureService.curSelection === selection;
    }
  }

  public selectPallete(index: number): void {
    if (this.clipartService.toolActive) {
      this.clipartService.select(index);
      this.cursorImageUrl = this.clipartService.curSelection;
    } else if (this.bgTextureService.toolActive) {
      this.bgTextureService.select(index);
      this.cursorImageUrl = this.bgTextureService.curSelection;
    }
  }

  public toggleCursorIcon() {
    this.displayCursorIfPossible = !this.displayCursorIfPossible;
  }

  public saveMap(): void {
    this.clipartService.save();
  }

  public toggleSavedMaps(): void {
    this.isSavedMapsMenuVisible = !this.isSavedMapsMenuVisible;
  }

  public openMap(index: number) {
    console.log(index)
    this.clipartService.open(index);
    this.render();
  }

  public savedMaps(): any[] {
    if (this.clipartService.savedMaps()) {
      let maps = JSON.parse(this.clipartService.savedMaps());
      return maps;
    } else {
      return [];
    }
  }

  public render() {
    this.gridService.clear(this.canvas, this.ctx);
    this.drawBackground();
    this.clipartService.drawAll(
      this.ctx,
      this.mapOffsetX,
      this.mapOffsetY,
      this.zoomLevel,
    );
    this.gridService.draw(this.ctx, this.mapOffsetX, this.mapOffsetY, this.cellSize, this.zoomLevel, this.cw, this.ch);
  }
}
