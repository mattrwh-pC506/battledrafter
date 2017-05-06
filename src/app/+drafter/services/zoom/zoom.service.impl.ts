import { Injectable } from "@angular/core";
import { ZoomService } from "./zoom.service";


@Injectable()
export class ConcreteZoomService implements ZoomService {
}

export const zoomServiceProvision = {
  provide: ZoomService,
  useClass: ConcreteZoomService,
}
