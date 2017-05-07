export abstract class ActiveToolService {
  abstract isToolActive: boolean;
  abstract toggleToolState(): void;
  abstract activate(): void;
  abstract deactivate(): void;
}
