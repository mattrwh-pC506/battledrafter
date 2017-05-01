export abstract class BGTextureService {
  abstract textures: string[];
  abstract select(index: number): void;
  abstract curSelection: string;
  abstract toolActive: boolean;
  abstract deactivateTool(): void;
  abstract activateTool(): void;
}
