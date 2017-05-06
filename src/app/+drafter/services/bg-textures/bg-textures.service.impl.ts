import { Injectable } from "@angular/core";
import { BGTextureService } from "./bg-textures.service";


@Injectable()
export class ConcreteBGTextureService implements BGTextureService {
  private cursorIcon: string = "";

  public textures: string[] = [
    "assets/images/bg-textures/grass-powder-1.png",
    "assets/images/bg-textures/grass-powder-2.png",
    "assets/images/bg-textures/dead-grass-powder-1.png",
  ];

  public selectedIndex: number = 0;

  public get toolActive(): boolean {
    return this.cursorIcon !== "";
  }

  public activateTool() {
    this.cursorIcon = this.curSelection;
  }

  public deactivateTool() {
    this.cursorIcon = "";
  }

  public select(index: number): void {
    this.selectedIndex = index;
  }

  public get curSelection(): string {
    return this.textures[this.selectedIndex];
  }
}

export const bgTextureServiceProvision = {
  provide: BGTextureService,
  useClass: ConcreteBGTextureService,
}
