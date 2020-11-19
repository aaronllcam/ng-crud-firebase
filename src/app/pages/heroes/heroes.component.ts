import { Component, OnInit } from '@angular/core';
import { HeroesService } from './../../services/heroes.service';
import { HeroModel } from './../../models/hero.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  public heroes: HeroModel[] = [];
  loading:boolean = true;

  constructor(private _heroesService:HeroesService) { 
  }
  
  ngOnInit(): void {
    this.getHeroes();
    console.log(this.heroes);
  }

  getHeroes(){

    return this._heroesService.getHeroes().subscribe( heroes => {
      this.heroes = heroes
      this.loading = false;
    })

  }
  deleteHero(id:string, idx:number){

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.heroes.splice(idx,1);
        this._heroesService.deleteHero(id).subscribe();
        Swal.fire(
          'Borrado!',
          'Your file has been deleted.',
          'success'
        )
      }
    })

    
  }

}
