import { environment as env } from "../../../../environments/environment";

import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { select } from "@angular-redux/store";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { Provider } from "lupine-angular/src/app/types/angular.type";
import { ClipartService } from "./clipart.service";

import { ArtService } from "../../../shared/services/art.service";
import { PaperActionCreators } from "../../store/paper/paper.actions";
import { Paper } from "../../store/paper/paper.types";


@Injectable()
export class ConcreteClipartService implements ClipartService {
  @select("paper") public paper: Observable<Paper>;

  public clipart: string[] = [];
  public selectedIndex: number = 0;
  private _paper: Paper = { drawnItems: [] };
  private cursorIcon: string = "";

  public constructor(
    private artService: ArtService,
    private paperActionCreators: PaperActionCreators,
  ) {
    this.getAllArt();
    this.paper.subscribe((state: Paper) => this._paper = state);
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
    for (let i = 0; i < this._paper.drawnItems.length; i++) {
      let clip = this._paper.drawnItems[i];
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
    this.paperActionCreators.drawArtToPaper(clip);
  }

  public onZoom(curZoom: number, oldZoom) {
    let zoomPercentage = curZoom / oldZoom;
    this._paper.drawnItems.forEach((item) => {
      item.realX *= zoomPercentage;
      item.realY *= zoomPercentage;
      item.zoomLevel = curZoom;
    });
  }

  public getAllArt() {
    this.artService.getArt("clipart").subscribe(clipart => this.clipart = clipart);
  }

  public getPaper() {
    return this._paper;
  }

  public setPaper(paper: any) {
    this.paperActionCreators.drawExistingDraftToPaper(paper);
  }
}

export const clipartServiceProvision: Provider = {
  provide: ClipartService,
  useClass: ConcreteClipartService,
}
