import {
  Component, ViewEncapsulation, Input
} from "@angular/core";

import { ActiveToolService } from "../services/active-tool/active-tool.service";
import { BGTextureService } from "../services/bg-textures/bg-textures.service";
import { ClipartService } from "../services/clipart/clipart.service";
import { GridService } from "../services/grid/grid.service";
import { MapViewCtxService } from "../services/map-view-ctx/map-view-ctx.service";
import { RendererService } from "../services/renderer/renderer.service";
import { ZoomService } from "../services/zoom/zoom.service";

import { CanvasComponent } from "../canvas/canvas.component";
import { CursorImgComponent } from "../cursor-img/cursor-img.component";


@Component({
  selector: 'drafter-toolbar',
  templateUrl: "toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"],
  encapsulation: ViewEncapsulation.None,
  host: {
    "class": "c-toolbar-buttons"
  }
})
export class ToolbarComponent {
  @Input("canvas") private canvasComponent: CanvasComponent;
  @Input("cursorImg") private cursorImg: CursorImgComponent;

  public isSavedMapsMenuVisible: boolean = false;

  constructor(
    private activeToolService: ActiveToolService,
    private clipartService: ClipartService,
    private bgTextureService: BGTextureService,
    private gridService: GridService,
    private mapViewCtxService: MapViewCtxService,
    private rendererService: RendererService,
    private zoomService: ZoomService,
  ) { }

  public onZoom(zoomType: string) {
    let oldZoom: number = this.zoomService.zoomLevel;

    if (zoomType === "in") {
      this.zoomService.zoomLevel += 2;
    } else if (zoomType === "out" && this.zoomService.zoomLevel !== 2) {
      this.zoomService.zoomLevel += -2;
    } else {
      return;
    }

    this.clipartService.onZoom(this.zoomService.zoomLevel, oldZoom);
    this.mapViewCtxService.offsetX = Math.floor(
      Math.floor(this.mapViewCtxService.width / this.gridService.cellSize) / 2);
    this.mapViewCtxService.offsetY = Math.floor(
      Math.floor(this.mapViewCtxService.height / this.gridService.cellSize) / 2);
    this.rendererService.render(this.canvasComponent.ctx, this.canvasComponent.canvas);
  }

  public selectClipart(): void {
    if (this.clipartService.toolActive) {
      this.clipartService.deactivateTool()
      this.cursorImg.clearCursor();
    } else {
      this.deactivateOpenMenu();
      this.bgTextureService.deactivateTool();
      this.clipartService.activateTool();
      let selection = this.clipartService.curSelection;
      this.cursorImg.setCursor(selection);
    }
  }

  public selectBGTexture(): void {
    if (this.bgTextureService.toolActive) {
      this.bgTextureService.deactivateTool();
      this.cursorImg.clearCursor();
    } else {
      this.deactivateOpenMenu();
      this.clipartService.deactivateTool();
      this.bgTextureService.activateTool();
      let selection = this.bgTextureService.curSelection;
      this.cursorImg.setCursor(selection, );
    }
  }

  public get toolPalletes(): string[] {
    if (this.clipartService.toolActive) {
      return this.clipartService.clipart;
    } else if (this.bgTextureService.toolActive) {
      return this.bgTextureService.textures;
    }
  }

  public palleteIsSelected(index: number) {
    if (this.clipartService.toolActive) {
      return this.clipartService.selectedIndex === index;
    } else if (this.bgTextureService.toolActive) {
      return this.bgTextureService.selectedIndex === index;
    }
  }

  public selectPallete(index: number): void {
    if (this.clipartService.toolActive) {
      this.clipartService.select(index);
      this.cursorImg.url = this.clipartService.curSelection;
    } else if (this.bgTextureService.toolActive) {
      this.bgTextureService.select(index);
      this.cursorImg.url = this.bgTextureService.curSelection;
    }
  }

  public get displayMenu(): boolean {
    return this.activeToolService.isToolActive;
  }

  public saveMap(): void {
    this.clipartService.save();
  }

  public toggleSavedMaps(): void {
    this.clipartService.deactivateTool();
    this.bgTextureService.deactivateTool();
    this.isSavedMapsMenuVisible = !this.isSavedMapsMenuVisible;
  }

  public deactivateOpenMenu(): void {
    this.isSavedMapsMenuVisible = false;
  }

  public openMap(index: number) {
    this.clipartService.open(index);
    this.rendererService.render(this.canvasComponent.ctx, this.canvasComponent.canvas);
  }

  public savedMaps(): any[] {
    if (this.clipartService.savedMaps()) {
      let maps = JSON.parse(this.clipartService.savedMaps());
      return maps;
    } else {
      return [];
    }
  }

  public toggleCursorIcon() {
    this.cursorImg.toggleCursorIcon();
  }

  public get isBGTextureMenuOpen(): boolean {
    return this.bgTextureService.toolActive;
  }

  public get isClipartMenuOpen(): boolean {
    return this.clipartService.toolActive;
  }
}
