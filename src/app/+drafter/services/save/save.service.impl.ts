import { Injectable } from "@angular/core";
import { SaveService } from "./save.service";
import { ClipartService } from "../clipart/clipart.service";
import { BGTextureService } from "../bg-textures/bg-textures.service";


@Injectable()
export class ConcreteSaveService implements SaveService {

  constructor(
    private clipartService: ClipartService,
    private bgTextureService: BGTextureService,
  ) { }

  public save(): void {
    let existingMaps: any[] = [];
    if (this.savedMaps()) {
      existingMaps = JSON.parse(this.savedMaps());
    }
    existingMaps.push(this.clipartService.getStore());
    localStorage.setItem("vp-battlemaps", JSON.stringify(existingMaps));
  }

  public open(index: number): void {
    let maps: any = [];
    if (this.savedMaps()) {
      maps = JSON.parse(this.savedMaps());
      this.clipartService.setStore(maps[index]);
    }
  }

  public savedMaps(): string {
    return localStorage.getItem("vp-battlemaps");
  }
}

export const saveServiceProvision = {
  provide: SaveService,
  useClass: ConcreteSaveService,
}
