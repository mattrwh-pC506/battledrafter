import { Injectable } from "@angular/core";


@Injectable()
export abstract class ClipartService {
  abstract clipart: string[];
  abstract select(index: number): void;
  abstract curSelection: string;
  abstract placeClipart(clip: any): void;
  abstract drawAll(ctx, offsetX, offsetY, zoomLevel): void;
  abstract draw(clip, ctx, offsetX, offsetY, zoomLevel): void;
  abstract toolActive: boolean;
  abstract activateTool(): void;
  abstract deactivateTool(): void;
  abstract onZoom(curZoom: number, oldZoom: number): void;
  abstract save(): void;
  abstract open(index: number): void;
  abstract savedMaps(): string;
}
