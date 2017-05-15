import { Injectable } from "@angular/core";
import { NgRedux } from "@angular-redux/store";

import { AppStateStore } from "../../drafter.types";
import { SaveService } from "./save.service";
import { PaperService } from "../paper/paper.service";


@Injectable()
export class ConcreteSaveService implements SaveService {

  constructor(
    private ngRedux: NgRedux<AppStateStore>,
    private paperService: PaperService,
  ) { }

  public save(): void {
    let existingMaps: any[] = [];
    if (this.savedMaps()) {
      existingMaps = JSON.parse(this.savedMaps());
    }
    existingMaps.push(this.paperService.get());
    localStorage.setItem("vp-battlemaps", JSON.stringify(existingMaps));
  }

  public open(index: number): void {
    let maps: any = [];
    if (this.savedMaps()) {
      maps = JSON.parse(this.savedMaps());
      this.paperService.set(maps[index]);
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
