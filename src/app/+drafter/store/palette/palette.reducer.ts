import { Palette, PaletteActions } from "./palette.types";


const INITIAL_STATE: Palette = {
  selectedSwatchUrl: "",
  bindSwatchToCursor: true,
  types: {
    texture: {
      images: [],
      active: false,
      selectedIndex: 0,
    },
    clipart: {
      images: [],
      active: false,
      selectedIndex: 0,
    }
  }
};

export const paletteActionsReducer = (state: Palette = INITIAL_STATE, action) => {
  switch (action.type) {
    case PaletteActions.PALETTE_LOADED:
      state.types[action.paletteType].images = action.payload;
      return { ...state };
    case PaletteActions.ACTIVE_PALETTE_SET:
      let mostRecentIndex: number = state.types[action.paletteType].selectedIndex;
      state.selectedSwatchUrl = state.types[action.paletteType].images[mostRecentIndex];
      state.types[action.paletteType].active = action.payload;
      state = deactivateAllOtherPalettes(state, action.paletteType);
      return { ...state };
    case PaletteActions.SWATCH_SELECTED:
      state.selectedSwatchUrl = state.types[action.paletteType].images[action.payload];
      state.types[action.paletteType].selectedIndex = action.payload;
      return { ...state };
    case PaletteActions.TOGGLE_CURSOR_SWATCH_BINDING:
      state.bindSwatchToCursor = !state.bindSwatchToCursor;
      return { ...state };
    case PaletteActions.DEACTIVATE_ALL_PALETTES:
      state = deactivateAllOtherPalettes(state, "");
      return { ...state };
    default:
      return state;
  }
}

function deactivateAllOtherPalettes(state, palettedToIgnore): Palette {
  Object.keys(state.types).forEach((key) => {
    if (key !== palettedToIgnore) {
      state.types[key].active = false;
    }
  });
  return state;
}
