import {
  Component, ViewChild,
  ElementRef, ViewEncapsulation,
} from "@angular/core";

import { ActiveToolService } from "../services/active-tool/active-tool.service";


@Component({
  selector: 'drafter-cursor-img',
  templateUrl: "cursor-img.component.html",
  styleUrls: ["./cursor-img.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class CursorImgComponent {
  @ViewChild("cursorImg", { read: ElementRef }) private _el: ElementRef;
  private iconImageTop: number = -1000;
  private iconImageLeft: number = -1000;
  public url: string = "";
  public displayCursorIfPossible: boolean = true;

  constructor(
    private activeToolService: ActiveToolService,
  ) { }

  public get isCursorImageInitialized(): boolean {
    return !!this._el;
  }

  public get el() {
    return this._el.nativeElement;
  }

  public followCursor(e) {
    if (this.isCursorImageInitialized) {
      this.iconImageTop = e.clientY;
      this.iconImageLeft = e.clientX;
    }
  }

  public get displayCursorImage() {
    return this.activeToolService.isToolActive &&
      this.displayCursorIfPossible;
  }

  public toggleCursorIcon() {
    this.displayCursorIfPossible = !this.displayCursorIfPossible;
  }

  public clearCursor(): void {
    this.activeToolService.deactivate();
    this.url = "";
  }

  public setCursor(url: string) {
    this.activeToolService.activate();
    this.url = url;
  }

}
