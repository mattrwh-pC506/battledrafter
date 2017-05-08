import { Injectable } from "@angular/core";
import { ClickStateService } from "./click-state.service";
import { MapViewCtxService } from "../map-view-ctx/map-view-ctx.service";
import { ZoomService } from "../zoom/zoom.service";


@Injectable()
export class ConcreteClickStateService implements ClickStateService {
  public mouseClickState: "up" | "down" = "up";
}

export const clickStateServiceProvision = {
  provide: ClickStateService,
  useClass: ConcreteClickStateService,
}
