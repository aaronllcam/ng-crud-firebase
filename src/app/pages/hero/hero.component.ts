import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { HeroModel } from './../../models/hero.model';
import { HeroesService } from './../../services/heroes.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  hero: HeroModel = new HeroModel();

  constructor(private _heroesService:HeroesService,
              private router:ActivatedRoute) { }

  ngOnInit(): void {

    this.router.params.subscribe(id => {
      if(id.id !== 'nuevo'){
        this._heroesService.getHeroById(id.id).subscribe((hero:HeroModel) => {
          this.hero = hero;
          this.hero.id = id.id;
        });
      }
      
    })

  }

  save(form: NgForm){

    if(form.invalid){
      Swal.fire({
        title: 'Error!',
        text: 'Formulario no válido',
        icon: 'error',
        showConfirmButton: true,
        confirmButtonText: 'OK',
        allowOutsideClick: true
      })
      console.log("form no valido");
      return;
    }

    Swal.fire({
      title: 'Esprere',
      text: 'Guardando',
      icon: 'info',
      allowOutsideClick: false
    })
    Swal.showLoading();

    if( this.hero.id ){
      //actualizo
      this._heroesService.updateHero(this.hero).subscribe( (hero:HeroModel) => {
         Swal.fire({
          title: `${hero.name} actualizado!!`,
          icon: 'success',
          showConfirmButton: true,
          confirmButtonText: 'OK',
          allowOutsideClick: true
        })
      });
      
    }else{
      //crear hero
      this._heroesService.createHero(this.hero).subscribe( hero => {
        Swal.fire({
          title: `${hero.name} añadido!!`,
          icon: 'success',
          showConfirmButton: true,
          confirmButtonText: 'OK',
          allowOutsideClick: true
        })
      });
    }


    console.log("Submit disparado");

  }

}
