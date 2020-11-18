import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { HeroModel } from './../models/hero.model';


@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private _url:string = "https://heroescrud-e3f9b.firebaseio.com";

  constructor(private _http:HttpClient) { }

  createHero(hero: HeroModel){
    return  this._http.post(`${this._url}/heroes.json`, hero)
                      .pipe(
                        map((res:any) => {
                          hero.id = res.name;
                          return hero;
                        })
                      )
  }
}
