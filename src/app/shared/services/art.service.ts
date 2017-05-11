import { Observable } from "rxjs/Observable";


export abstract class ArtService {
  abstract getArt(artType): Observable<string[]>;
}
