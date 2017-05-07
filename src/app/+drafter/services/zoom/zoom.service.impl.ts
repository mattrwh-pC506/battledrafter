import { Injectable } from "@angular/core";
import { ZoomService } from "./zoom.service";


@Injectable()
export class ConcreteZoomService implements ZoomService {
  public zoomLevel: number = 10;
}

export const zoomServiceProvision = {
  provide: ZoomService,
  useClass: ConcreteZoomService,
}
