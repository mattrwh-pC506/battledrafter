import { DrawInterface } from "../../interfaces/draw.interface";


export abstract class ActiveToolService implements DrawInterface {
  abstract draw(ctx, offsetX, offsetY, cellSize, zoomLevel, cw, ch): void;
}
