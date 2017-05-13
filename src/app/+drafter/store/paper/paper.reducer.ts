import { Paper, PaperActions } from "./paper.types";


const INITIAL_STATE: Paper = { drawnItems: [] };

export const paperActionsReducer = (state: Paper = INITIAL_STATE, action) => {
  switch (action.type) {
    case PaperActions.ART_DRAWN:
      return {
        ...state,
        drawnItems: [...state.drawnItems, action.payload],
      };
    case PaperActions.DRAFT_LOADED:
      return action.payload;
    default:
      return state;
  }
}
