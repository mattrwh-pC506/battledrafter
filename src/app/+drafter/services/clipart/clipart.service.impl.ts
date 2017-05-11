import { environment as env } from "../../../../environments/environment";

import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { Provider } from "lupine-angular/src/app/types/angular.type";
import { ClipartService } from "./clipart.service";

import { ArtService } from "../../../shared/services/art.service";


@Injectable()
export class ConcreteClipartService implements ClipartService {

  public clipart: string[] = [];
  public selectedIndex: number = 0;
  private _store: any[] = [];
  private cursorIcon: string = "";

  public constructor(
    private artService: ArtService,
  ) {
    this.getAllArt();
  }

  public get toolActive(): boolean {
    return this.cursorIcon !== "";
  }

  public activateTool() {
    this.cursorIcon = this.curSelection;
  }

  public deactivateTool() {
    this.cursorIcon = "";
  }

  public select(index: number): void {
    this.selectedIndex = index;
  }

  public get curSelection(): string {
    return this.clipart[this.selectedIndex];
  }

  public drawAll(ctx, offsetX, offsetY, zoomLevel): any {
    for (let i = 0; i < this._store.length; i++) {
      let clip = this._store[i];
      this.draw(clip, ctx, offsetX, offsetY, zoomLevel);
    };
  }

  public draw(item, ctx, offsetX, offsetY, zoomLevel): void {
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
    if (this.savedMaps()) {
      maps = JSON.parse(this.savedMaps());
      this._store = maps[index];
    }
  }

  public savedMaps(): string {
    return localStorage.getItem("vp-battlemaps");
  }

  public getAllArt() {
    this.artService.getArt("clipart").subscribe(clipart => this.clipart = clipart);
  }
}

export const clipartServiceProvision: Provider = {
  provide: ClipartService,
  useClass: ConcreteClipartService,
}
