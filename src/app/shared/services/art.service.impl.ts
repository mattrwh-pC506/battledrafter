import { environment as env } from "../../../environments/environment";

import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

import { ArtService } from "./art.service";


@Injectable()
export class BaseArtService {

  constructor(
    private http: Http
  ) { }

  public getArt(artType): Observable<string[]> {
    return this.http.get(`${env.BASE_API}/art`, { search: { type: artType } })
      .map((res) => res.json())
      .map((body) => body.data)
      .map((data) => data.map((art) => `${env.BASE_API}/media/${art.file}`));
  }

}

export const provideBaseArtService = {
  provide: ArtService,
  useClass: BaseArtService,
}
