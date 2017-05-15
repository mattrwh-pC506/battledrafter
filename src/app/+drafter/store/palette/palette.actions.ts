import { Injectable } from "@angular/core";
import { NgRedux } from "@angular-redux/store";
import { Palette, PaletteActions } from "./palette.types";
import { ArtService } from "../../../shared/services/art.service";
import { AppStateStore } from "../../../shared/store";


@Injectable()
export class PaletteActionCreators {
  constructor(
    private ngRedux: NgRedux<AppStateStore>,
    private artService: ArtService,
  ) { }

  public loadPalette(paletteType: string) {
    this.artService.getArt(paletteType)
      .subscribe((images) => {
        this.ngRedux.dispatch({
          type: PaletteActions.PALETTE_LOADED,
          paletteType,
          payload: images,
        });
      });
  }

  public setActivePalette(paletteType: string, active: boolean) {
    this.ngRedux.dispatch({
      type: PaletteActions.ACTIVE_PALETTE_SET,
      paletteType,
      payload: active,
    });
  }

  public selectSwatch(paletteType: string, index: number) {
    this.ngRedux.dispatch({
      type: PaletteActions.SWATCH_SELECTED,
      paletteType,
      payload: index,
    });
  }

  public toggleCursorSwatchBinding() {
    this.ngRedux.dispatch({
      type: PaletteActions.TOGGLE_CURSOR_SWATCH_BINDING,
    });
  }

  public deactivateAllPalettes() {
    this.ngRedux.dispatch({
      type: PaletteActions.DEACTIVATE_ALL_PALETTES,
    });
  }
}
