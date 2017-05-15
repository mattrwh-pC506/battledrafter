export abstract class ZoomService {
  abstract zoomLevel: number;
  abstract onZoom(oldZoom: number): void;
}
