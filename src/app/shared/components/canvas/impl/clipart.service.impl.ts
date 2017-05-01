import { Injectable } from "@angular/core";
import { Provider } from "../../../types/angular.type";
import { ClipartService } from "../";


@Injectable()
export class ConcreteClipartService implements ClipartService {

  public clipart: string[] = [
    "assets/images/clipart/tree-01.svg",
    "assets/images/clipart/tree-02.png",
    "assets/images/clipart/tree-03.png",
    "assets/images/clipart/tree-05.png",
    "assets/images/clipart/tree-06.png",
    "assets/images/clipart/tree-07.png",
  ];
  private _selectedClipart: string = this.clipart[0];
  private _store: any[] = [];
  private cursorIcon: string = "";

  public get toolActive(): boolean {
    return this.cursorIcon !== "";
  }

  public activateTool() {
    this.cursorIcon = this._selectedClipart;
  }

  public deactivateTool() {
    this.cursorIcon = "";
  }

  public select(index: number): void {
    this._selectedClipart = this.clipart[index];
  }

  public get curSelection(): string {
    return this._selectedClipart;
  }

  public drawAll(ctx, offsetX, offsetY, zoomLevel): void {
    for (let i = 0; i < this._store.length; i++) {
      let clip = this._store[i];
      this.draw(clip, ctx, offsetX, offsetY, zoomLevel);
    };
  }

  public draw(clip, ctx, offsetX, offsetY, zoomLevel): void {
    let img = new Image();
    img.src = clip.src;

    ctx.drawImage(
      img,
      (clip.realX + offsetX),
      (clip.realY + offsetY),
      clip.realHeight * zoomLevel,
      clip.realWidth * zoomLevel,
    );
  }

  public placeClipart(clip: any): void {
    this._store.push(clip);
  }

  public onZoom(curZoom: number, oldZoom) {
    let zoomPercentage = curZoom / oldZoom;
    this._store.forEach((item) => {
      item.realX *= zoomPercentage;
      item.realY *= zoomPercentage;
      item.zoomLevel = curZoom;
    });
  }

  public save(): void {
    let existingMaps: any[] = [];
    if (this.savedMaps()) {
      existingMaps = JSON.parse(this.savedMaps());
    }
    existingMaps.push(this._store);
    localStorage.setItem("vp-battlemaps", JSON.stringify(existingMaps));
  }

  public open(index: number): void {
    let maps: any = [];
    console.log(this.savedMaps());
    if (this.savedMaps()) {
      maps = JSON.parse(this.savedMaps());
      console.log(maps, index, maps[index]);
      this._store = maps[index];
    }
  }

  public savedMaps(): string {
    return localStorage.getItem("vp-battlemaps");
  }
}

export const clipartServiceProvision: Provider = {
  provide: ClipartService,
  useClass: ConcreteClipartService,
}
