import { Injectable } from "@angular/core";
import { NgRedux } from "@angular-redux/store";

import { AppStateStore } from "../../drafter.types";
import { PaperService } from "./paper.service";
import { PaperActionCreators } from "../../store/paper/paper.actions";


@Injectable()
export class ConcretePaperService implements PaperService {

  constructor(
    private ngRedux: NgRedux<AppStateStore>,
    private paperActionCreators: PaperActionCreators,
  ) { }

  public get() {
    return this.ngRedux.getState().paper;
  }

  public set(paper: any) {
    this.paperActionCreators.drawExistingDraftToPaper(paper);
  }

}

export const paperServiceProvision = {
  provide: PaperService,
  useClass: ConcretePaperService,
}
