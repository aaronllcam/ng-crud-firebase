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

  getHeroes(){
    return  this._http.get(`${this._url}/heroes.json`)
                .pipe(
                  map(this.mapHeroesResponse)
                );
  }

  mapHeroesResponse(heroesObj:object):HeroModel[]{
    const heroes: HeroModel[] = [];

    if(heroesObj == null) return [];

    Object.keys(heroesObj).forEach( heroID => {
      const hero: HeroModel = heroesObj[heroID];
      hero.id = heroID; 
      heroes.push(heroesObj[heroID]);
    })

    return heroes;

  }

  getHeroById(id:string){

    return this._http.get(`${this._url}/heroes/${id}.json`);

  }

  createHero(hero: HeroModel){
    return  this._http.post(`${this._url}/heroes.json`, hero)
                      .pipe(
                        map((res:any) => {
                          hero.id = res.name;
                          return hero;
                        })
                      )
  }

  updateHero(hero: HeroModel){
    const heroToSend = { ...hero };
    delete heroToSend.id;
    return this._http.put(`${this._url}/heroes/${hero.id}.json`, heroToSend);
  }

  deleteHero( id:string){
    return this._http.delete(`${this._url}/heroes/${id}.json`);
  }
}
