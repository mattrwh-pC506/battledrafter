import { Paper } from "./store/paper/paper.types";
import { Palette } from "./store/palette/palette.types";
import { AppStateStore } from "../shared/store";


export interface AppStateStore {
  paper?: Paper;
  palette?: Palette;
}
