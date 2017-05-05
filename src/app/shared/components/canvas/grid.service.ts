export abstract class GridService {
  abstract draw(ctx, offsetX, offsetY, cellSize, zoomLevel, cw, ch): void;
  abstract clear(canvas, ctx): void;
}
