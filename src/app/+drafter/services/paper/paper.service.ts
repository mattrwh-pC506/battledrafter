import { Paper } from "../../store/paper/paper.types";


export abstract class PaperService {
  abstract get(): Paper;
  abstract set(paper: Paper): void;
}
