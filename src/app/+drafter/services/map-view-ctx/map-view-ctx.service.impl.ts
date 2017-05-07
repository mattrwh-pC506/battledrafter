import { Injectable } from "@angular/core";
import { MapViewCtxService } from "./map-view-ctx.service";


@Injectable()
export class ConcreteMapViewCtxService implements MapViewCtxService {
  public offsetX: number = 0;
  public offsetY: number = 0;
  public height: number = window.innerHeight;
  public width: number = window.innerWidth;
}

export const mapViewCtxServiceProvision = {
  provide: MapViewCtxService,
  useClass: ConcreteMapViewCtxService,
}
