export type DrawnItem = {
  realHeight: number;
  realWidth: number;
  realX: number;
  realY: number;
  realZoom: number;
  zoomLevel: number;
  src: string;
}

export type Paper = {
  drawnItems: DrawnItem[];
};

export const PaperActions = {
  ART_DRAWN: "ART_DRAWN",
  DRAFT_LOADED: "DRAFT_LOADED",
};
