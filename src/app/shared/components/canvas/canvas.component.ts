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
  private baseCellSize: number = 5;
  private rootY: number = 0;
  private rootX: number = 0;
  private mouseClickState: string = "up";

  private zoomLevel: number = 15;

  public ngAfterViewInit() {
    this.drawGrid();
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event) {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      this.drawGrid();
    }, 20);
  }

  public get cellSize() {
    return this.zoomLevel * this.baseCellSize;
  }

  public zoom(increment: number) {
    this.zoomLevel += increment;
    this.zoomLevel = this.zoomLevel || 1;
    this.clearGrid();
    this.drawGrid();
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

  public drawGrid() {
    this.clearGrid();
    this.setBackgroundColor();
    for (
      let x = 0 * this.zoomLevel;
      x < this.cw;
      x += this.cellSize) {
      this.ctx.moveTo(this.rootX + .5 + x, 0);
      this.ctx.lineWidth = 1;
      this.ctx.lineTo(this.rootX + .5 + x, this.ch);
    }

    for (
      let y = 0 * this.zoomLevel;
      y < this.ch;
      y += this.cellSize) {
      this.ctx.moveTo(0, this.rootY + .5 + y);
      this.ctx.lineWidth = 1;
      this.ctx.lineTo(this.cw, this.rootY + .5 + y);
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
      let imageHeight = this.cursorImage.getBoundingClientRect().height;
      let imageWidth = this.cursorImage.getBoundingClientRect().width;
      this.ctx.imageSmoothingEnabled = false;
      this.ctx.drawImage(this.cursorImage, e.clientX - imageWidth / 2, e.clientY - imageHeight / 2);
    }
  }

  public onMouseUp(e) {
    this.mouseClickState = "up";
  }

  public onMouseMove(e) {
    if (this.mouseClickState === "up") {
      return;
    } else if (this.mouseClickState === "down") {

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

      this.drawGrid();
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
      let imageHeight = this.cursorImage.getBoundingClientRect().height;
      let imageWidth = this.cursorImage.getBoundingClientRect().width;
      this.iconImageTop = e.clientY - imageHeight / 2;
      this.iconImageLeft = e.clientX - imageWidth / 2;
    }
  }

  public onCursorMove(e) {
    if (this.mouseClickState !== "up") {
      return;
    } else if (this.isImageSelected && e.clientY > 125) {
      this.followCursor(e);
    }
  }

}
