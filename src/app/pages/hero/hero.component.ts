import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HeroModel } from './../../models/hero.model';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  hero: HeroModel = new HeroModel();

  constructor() { }

  ngOnInit(): void {
  }

  save(form: NgForm){
    console.log("2Submit disparado");
    console.log(form);
  }

}
