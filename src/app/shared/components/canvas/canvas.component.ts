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

  private zoomLevel: number = 4;

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
    for (let i = 5 * this.zoomLevel; i < this.cw; i += 5 * this.zoomLevel) {
      this.ctx.moveTo(.5 + i, 0);
      this.ctx.lineWidth = 1;
      this.ctx.lineTo(.5 + i, this.ch);
    }

    for (let x = 5 * this.zoomLevel; x < this.ch; x += 5 * this.zoomLevel) {
      this.ctx.moveTo(0, .5 + x);
      this.ctx.lineWidth = 1;
      this.ctx.lineTo(this.cw, .5 + x);
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
}
