import { Injectable } from "@angular/core";
import { ZoomService } from "./zoom.service";
import { PaperService } from "../paper/paper.service";


@Injectable()
export class ConcreteZoomService implements ZoomService {
  public zoomLevel: number = 10;
  constructor(private paperService: PaperService) { }

  public onZoom(oldZoom) {
    let zoomPercentage = this.zoomLevel / oldZoom;
    this.paperService.get().drawnItems.forEach((item) => {
      item.realX *= zoomPercentage;
      item.realY *= zoomPercentage;
      item.realZoom = this.zoomLevel;
    });
  }
}

export const zoomServiceProvision = {
  provide: ZoomService,
  useClass: ConcreteZoomService,
}
