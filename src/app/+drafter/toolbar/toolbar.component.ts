import {
  Component, ViewChild,
  ElementRef, HostListener,
  ViewEncapsulation,
} from "@angular/core";

import { BackgroundService } from "../services/background";
import { BGTextureService } from "../services/bg-textures";
import { ClipartService } from "../services/clipart";
import { GridService } from "../services/grid";
import { ResetService } from "../services/reset";


@Component({
  selector: 'drafter-toolbar',
  templateUrl: "toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ToolbarComponent {

  public isToolActive: boolean = false;
  public cursorImageUrl: string = "";
  public displayCursorIfPossible: boolean = true;

  private baseCellSize: number = 10;
  private zoomLevel: number = 10;
  private mapOffsetX: number = 0;
  private mapOffsetY: number = 0;

  constructor(
    private activeToolService: ActiveToolService,
  ) { }

  public ngAfterViewInit() { }

  public get cellSize() {
    return this.zoomLevel * this.baseCellSize;
  }

  // KEEP
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
}
