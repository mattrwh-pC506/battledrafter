import { Paper } from "../../store/paper/paper.types";


export abstract class SaveService {
  abstract save(): void;
  abstract open(index: number): void;
  abstract savedMaps(): string;
}
