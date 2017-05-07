import { Injectable, Optional, SkipSelf } from "@angular/core";

import { ActiveToolService } from "./active-tool.service";



@Injectable()
export class ConcreteActiveToolService implements ActiveToolService {
  public isToolActive: boolean = false;

  public toggleToolState(): void {
    this.isToolActive = !this.isToolActive;
  }

  public deactivate(): void {
    this.isToolActive = false;
  }

  public activate(): void {
    this.isToolActive = true;
  }
}

export const activeToolServiceProvision = {
  provide: ActiveToolService,
  useClass: ConcreteActiveToolService,
}
