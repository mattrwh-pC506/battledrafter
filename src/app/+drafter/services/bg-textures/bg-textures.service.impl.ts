import { Injectable } from "@angular/core";
import { BGTextureService } from "./bg-textures.service";

import { ArtService } from "../../../shared/services/art.service";


@Injectable()
export class ConcreteBGTextureService implements BGTextureService {
  private cursorIcon: string = "";
  public textures: string[] = [];
  public selectedIndex: number = 0;

  constructor(
    private artService: ArtService
  ) {
    this.getAllArt();
  }

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

  public getAllArt() {
    this.artService.getArt("texture").subscribe(textures => this.textures = textures);
  }
}

export const bgTextureServiceProvision = {
  provide: BGTextureService,
  useClass: ConcreteBGTextureService,
}
