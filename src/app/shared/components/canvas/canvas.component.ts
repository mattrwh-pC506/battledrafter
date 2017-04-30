import {
  Component, ViewChild,
  ElementRef, HostListener,
  ViewEncapsulation,
} from "@angular/core";


@Component({
  selector: 'batmap-canvas',
  templateUrl: "canvas.component.html",
  styleUrls: ["./canvas.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class BatMapCanvasComponent {
  @ViewChild("batMapCanvas", { read: ElementRef })
  private _canvas: ElementRef;

  private resizeTimeout: any;
  private baseCellSize: number = 10;
  private rootY: number = 0;
  private rootX: number = 0;
  private mouseClickState: string = "up";
  private zoomLevel: number = 10;
  private mapOffsetX: number = 0;
  private mapOffsetY: number = 0;

  private gridX: number = 0;
  private gridY: number = 0;
  private clipX: number = 0;
  private clipY: number = 0;

  private store: any[] = [];

  public ngAfterViewInit() {
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

    let zoomPercentage = this.zoomLevel / oldZoom;
    let onZoom = true;
    this.store.forEach((item) => {
      item.realX += this.mapOffsetX - (this.mapOffsetX % 100);
      item.realY += this.mapOffsetY - (this.mapOffsetY % 100);
      item.realX *= zoomPercentage;
      item.realY *= zoomPercentage;
      item.zoomLevel = this.zoomLevel;
    });
    this.rootX = 0;
    this.rootY = 0;
    this.mapOffsetX = 0;
    this.mapOffsetY = 0;
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

  public offsetGrid(e: any): void {
    if (this.rootX > this.cellSize) {
      this.rootX = 0;
    } else if (this.rootX < 0) {
      this.rootX = this.cellSize;
    } else {
      this.rootX += e.movementX;
    }

    if (this.rootY > this.cellSize) {
      this.rootY = 0;
    } else if (this.rootY < 0) {
      this.rootY = this.cellSize;
    } else {
      this.rootY += e.movementY;
    }
    console.log("Roots!", this.rootX, this.rootY)
  }

  public drawBackground() {
    this.clearGrid();
    this.setBackgroundColor();
  }

  public panLeft() {

  }

  public drawGrid() {
    let offsetX = this.mapOffsetX % 100;
    let offsetY = this.mapOffsetY % 100;
    for (
      let x = 0 * this.zoomLevel;
      x < this.cw;
      x += this.cellSize) {
      this.ctx.moveTo(offsetX + .5 + x, 0);
      this.ctx.lineWidth = 1;
      this.ctx.lineTo(offsetX + .5 + x, this.ch);
    }

    for (
      let y = 0 * this.zoomLevel;
      y < this.ch;
      y += this.cellSize) {
      this.ctx.moveTo(0, offsetY + .5 + y);
      this.ctx.lineWidth = 1;
      this.ctx.lineTo(this.cw, offsetY + .5 + y);
    }

    this.ctx.strokeStyle = "#b7b7b7";
    this.ctx.stroke();
  }

  public setBackgroundColor() {
    this.ctx.fillStyle = "ghostwhite";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  public clearGrid() {
    this.ctx.beginPath();
  }

  public onMouseDown(e) {
    this.mouseClickState = "down";
    if (this.isImageSelected) {
      let realX = e.clientX + (this.mapOffsetX * -1);
      let realY = e.clientY + (this.mapOffsetY * -1);
      if (realX % 2 !== 0) {
        realX += 1;
      }
      if (realY % 2 !== 0) {
        realY += 1;
      }
      this.store.push({
        src: this.cursorImage.src,
        realHeight: this.cursorImage.height / this.zoomLevel,
        realWidth: this.cursorImage.width / this.zoomLevel,
        realX: realX,
        realY: realY,
        realZoom: this.zoomLevel,
      });
      this.drawAllClipart();
      this.drawGrid();
    }
  }

  public left() {
    this.paneX(-5);
  }

  public right() {
    this.paneX(5);
  }

  public up() {
    this.paneY(-5);
  }

  public down() {
    this.paneY(5);
  }

  public paneX(increment: number) {
    this.mapOffsetX += increment;
    this.rootX += increment;
    this.render();
  }

  public paneY(increment: number) {
    this.mapOffsetY += increment;
    this.rootY += increment;
    this.render();
  }

  public onMouseUp(e) {
    this.mouseClickState = "up";
    this.drawGrid();
  }

  public eventNumber: number = 0;
  public onMouseMove(e) {
    if (this.mouseClickState === "up") {
      return;
    } else if (this.mouseClickState === "down") {
      this.mapOffsetX += e.movementX;
      this.mapOffsetY += e.movementY;
      this.offsetGrid(e);
      this.render();
    }
  }

  @ViewChild("cursorImage", { read: ElementRef })
  private _cursorImage: ElementRef;
  private iconImageUrl: string = "";
  private iconImageTop: number = -1000;
  private iconImageLeft: number = -1000;

  public get cursorImage(): any {
    return this._cursorImage.nativeElement;
  }

  public get isImageSelected(): boolean {
    return this.iconImageUrl !== "";
  }

  public selectIcon(iconImageUrl, e): void {
    this.iconImageUrl = iconImageUrl
  }

  public deselectIcon(): void {
    this.iconImageUrl = "";
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
    } else if (this.isImageSelected && e.clientY > 125) {
      this.followCursor(e);
    }
  }

  public centeredCoord(coord: number, dimension: number) {
    return coord - dimension / 2
  }

  public drawAllClipart(onZoom?: boolean): void {
    for (let i = 0; i < this.store.length; i++) {
      this.drawClipart(i);
    };
  }

  public drawClipart(index: number) {
    if (index >= this.store.length) {
      return;
    }
    let item = this.store[index];
    let img = new Image();
    img.src = item.src;


    this.ctx.drawImage(
      img,
      (item.realX + this.mapOffsetX),
      (item.realY + this.mapOffsetY),
      item.realHeight * this.zoomLevel,
      item.realWidth * this.zoomLevel,
    );
  }

  public render() {
    this.drawBackground();
    this.drawAllClipart();
    this.drawGrid();
  }
}
