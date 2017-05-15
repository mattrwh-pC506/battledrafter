import { environment as env } from "../../../environments/environment";

import { Component, Input, AfterViewInit } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { NgRedux, select } from "@angular-redux/store";
import { AppStateStore } from "../drafter.types";
import { Palette } from "../store/palette/palette.types";
import { PaletteActionCreators } from "../store/palette/palette.actions";
import { ActiveToolService } from "../services/active-tool/active-tool.service";
import { UploadService } from "../../shared/services/upload-file.service";


@Component({
  selector: "drafter-palette",
  templateUrl: "./palette.component.html",
  styleUrls: ["./palette.component.scss"],
  host: {
    "class": "c-toolbar-menu-link",
  },
})
export class PaletteComponent implements AfterViewInit {
  @Input("paletteType") public paletteType: string = "";
  @Input("paletteIcon") public paletteIcon: string = "";
  @select("palette") public palette: Observable<Palette>;

  public toolActive: boolean = false;
  public swatches: string[] = [];
  public selectedIndex: number = 0;

  public constructor(
    private paletteActionCreators: PaletteActionCreators,
    private ngRedux: NgRedux<AppStateStore>,
    private activeToolService: ActiveToolService,
    private uploadService: UploadService,
  ) { }

  public ngAfterViewInit() {
    this.paletteActionCreators.loadPalette(this.paletteType);
    this.palette.subscribe((state) => {
      this.swatches = state.types[this.paletteType].images;
      this.toolActive = state.types[this.paletteType].active;
      this.selectedIndex = state.types[this.paletteType].selectedIndex;
    });
  }

  public togglePalette() {
    if (this.toolActive) {
      this.deactivateTool();
    } else {
      this.activateTool();
    }
  }

  public displayMenu() {
    return this.activeToolService.isToolActive;
  }

  public activateTool() {
    this.paletteActionCreators.setActivePalette(this.paletteType, true);
  }

  public deactivateTool() {
    this.paletteActionCreators.setActivePalette(this.paletteType, false);
  }

  public get curSelection(): string {
    return this.ngRedux.getState().palette.types[this.paletteType][this.selectedIndex];
  }

  public swatchIsSelected(index: number) {
    return this.selectedIndex === index;
  }

  public selectSwatch(index: number): void {
    this.paletteActionCreators.selectSwatch(this.paletteType, index);
  }

  public uploadFile(e) {
    let inputEl = e.target;
    let path: string = `${env.BASE_API}/art`;
    let file: File = inputEl.files[0];
    let data: any = { label: file.name, type: this.paletteType };

    this.uploadService.makeFileRequest(path, file, data)
      .then(() => console.log("file uploaded"))
      .then(() => {
        this.paletteActionCreators.loadPalette(this.paletteType);
      })
      .catch(() => console.log("file not uploaded"));
  }
}
