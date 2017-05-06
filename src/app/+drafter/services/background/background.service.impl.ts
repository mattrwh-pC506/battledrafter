import { Injectable } from "@angular/core";
import { BackgroundService } from "./background.service";


@Injectable()
export class ConcreteBackgroundService implements BackgroundService {

  public draw(canvas, ctx): void {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
  }
}

export const backgroundServiceProvision = {
  provide: BackgroundService,
  useClass: ConcreteBackgroundService,
}
