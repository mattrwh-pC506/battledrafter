import { DrawInterface } from "../../interfaces/draw.interface";


export abstract class GridService implements DrawInterface {
  abstract draw(ctx, offsetX, offsetY, cellSize, zoomLevel, cw, ch): void;
}
