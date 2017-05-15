export type PaletteMenu = {
  images: string[];
  active: boolean;
  selectedIndex: number;
}


export type Palette = {
  selectedSwatchUrl: string;
  bindSwatchToCursor: boolean;
  types: {
    texture: PaletteMenu;
    clipart: PaletteMenu;
  }
};

export const PaletteActions = {
  PALETTE_LOADED: "PALETTE_LOADED",
  ACTIVE_PALETTE_SET: "ACTIVE_PALETTE_SET",
  DEACTIVATE_ALL_PALETTES: "DEACTIVATE_ALL_PALETTES",
  SWATCH_SELECTED: "SWATCH_SELECTED",
  TOGGLE_CURSOR_SWATCH_BINDING: "TOGGLE_CURSOR_SWATCH_BINDING",
};
