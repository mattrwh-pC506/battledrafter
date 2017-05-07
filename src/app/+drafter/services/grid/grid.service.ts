import { DrawInterface } from "../../interfaces/draw.interface";


export abstract class GridService implements DrawInterface {
  abstract cellSize: number;
  abstract draw(ctx): void;
}
