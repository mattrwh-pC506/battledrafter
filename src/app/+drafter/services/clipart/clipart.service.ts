import { DrawInterface } from "../../interfaces/draw.interface";


export abstract class ClipartService implements DrawInterface {
  abstract clipart: string[];
  abstract select(index: number): void;
  abstract selectedIndex: number;
  abstract curSelection: string;
  abstract placeClipart(clip: any): void;
  abstract drawAll(ctx, offsetX, offsetY, zoomLevel): void;
  abstract draw(item, ctx, offsetX, offsetY, zoomLevel): void;
  abstract toolActive: boolean;
  abstract activateTool(): void;
  abstract deactivateTool(): void;
  abstract onZoom(curZoom: number, oldZoom: number): void;
  abstract save(): void;
  abstract open(index: number): void;
  abstract savedMaps(): string;
}
