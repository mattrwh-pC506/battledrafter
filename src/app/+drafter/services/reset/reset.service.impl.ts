import { Injectable } from "@angular/core";
import { ResetService } from "./reset.service";


@Injectable()
export class ConcreteResetService implements ResetService {
  public clear(canvas, ctx): void {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
  }
}

export const resetServiceProvision = {
  provide: ResetService,
  useClass: ConcreteResetService,
}
