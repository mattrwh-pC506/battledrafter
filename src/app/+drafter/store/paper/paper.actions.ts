import { Injectable } from "@angular/core";
import { NgRedux } from "@angular-redux/store";
import { Paper, DrawnItem, PaperActions } from "./paper.types";
import { AppStateStore } from "../../../shared/store";


@Injectable()
export class PaperActionCreators {
  constructor(
    private ngRedux: NgRedux<AppStateStore>,
  ) { }

  public drawArtToPaper(art: DrawnItem) {
    this.ngRedux.dispatch({
      type: PaperActions.ART_DRAWN,
      payload: art,
    });
  }

  public drawExistingDraftToPaper(draft: Paper) {
    this.ngRedux.dispatch({
      type: PaperActions.DRAFT_LOADED,
      payload: draft,
    });
  }
}
