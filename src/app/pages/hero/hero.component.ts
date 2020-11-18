import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HeroModel } from './../../models/hero.model';
import { HeroesService } from './../../services/heroes.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  hero: HeroModel = new HeroModel();

  constructor(private _heroesService:HeroesService) { }

  ngOnInit(): void {
  }

  save(form: NgForm){

    if(form.invalid){
      console.log("form no valido");
      return;
    }

    this._heroesService.createHero(this.hero).subscribe( hero => console.log(hero));

    console.log("Submit disparado");

  }

}
