import { Injectable } from "@angular/core";
import { BGTextureService } from "../bg-textures.service";


@Injectable()
export class ConcreteBGTextureService implements BGTextureService {
  private cursorIcon: string = "";

  public textures: string[] = [
    "assets/images/bg-textures/grass-powder-1.png",
    "assets/images/bg-textures/grass-powder-2.png",
    "assets/images/bg-textures/dead-grass-powder-1.png",
  ];

  private _selectedTexture: string = this.textures[0];

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
    this._selectedTexture = this.textures[index];
  }

  public get curSelection(): string {
    return this._selectedTexture;
  }
}

export const bgTextureServiceProvision = {
  provide: BGTextureService,
  useClass: ConcreteBGTextureService,
}
