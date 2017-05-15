import {
  Component, ViewEncapsulation, Input
} from "@angular/core";

import { GridService } from "../services/grid/grid.service";
import { MapViewCtxService } from "../services/map-view-ctx/map-view-ctx.service";
import { RendererService } from "../services/renderer/renderer.service";
import { SaveService } from "../services/save/save.service";
import { ZoomService } from "../services/zoom/zoom.service";

import { CanvasComponent } from "../canvas/canvas.component";

import { PaletteActionCreators } from "../store/palette/palette.actions";


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

  public isSavedMapsMenuVisible: boolean = false;

  constructor(
    private gridService: GridService,
    private mapViewCtxService: MapViewCtxService,
    private paletteActionCreators: PaletteActionCreators,
    private rendererService: RendererService,
    private saveService: SaveService,
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

    this.zoomService.onZoom(oldZoom);
    this.mapViewCtxService.offsetX = Math.floor(
      Math.floor(this.mapViewCtxService.width / this.gridService.cellSize) / 2);
    this.mapViewCtxService.offsetY = Math.floor(
      Math.floor(this.mapViewCtxService.height / this.gridService.cellSize) / 2);
    this.rendererService.render(this.canvasComponent.ctx, this.canvasComponent.canvas);
  }

  public saveMap(): void {
    this.saveService.save();
  }

  public toggleSavedMaps(): void {
    this.paletteActionCreators.deactivateAllPalettes();
    this.isSavedMapsMenuVisible = !this.isSavedMapsMenuVisible;
  }

  public deactivateOpenMenu(): void {
    this.isSavedMapsMenuVisible = false;
  }

  public openMap(index: number) {
    this.saveService.open(index);
    this.rendererService.render(this.canvasComponent.ctx, this.canvasComponent.canvas);
  }

  public savedMaps(): any[] {
    if (this.saveService.savedMaps()) {
      let maps = JSON.parse(this.saveService.savedMaps());
      return maps;
    } else {
      return [];
    }
  }

  public toggleCursorIcon() {
    this.paletteActionCreators.toggleCursorSwatchBinding();
  }
}
