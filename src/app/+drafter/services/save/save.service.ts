export abstract class SaveService {
  abstract save(): void;
  abstract open(index: number): void;
  abstract savedMaps(): string;
}
