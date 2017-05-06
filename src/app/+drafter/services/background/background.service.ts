import { DrawInterface } from "../../interfaces/draw.interface";


export abstract class BackgroundService implements DrawInterface {
  abstract draw(canvas, ctx): void;
}
