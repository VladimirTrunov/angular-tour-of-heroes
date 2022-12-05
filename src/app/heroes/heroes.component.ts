import { Component, OnInit } from '@angular/core';
import { HeroService } from '../services/hero.service';
import { Hero } from '../hero';
import { PowerService } from '../services/power-service.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  public heroes: Hero[] = [];
  public powers: string[] = [];

  constructor(
    private heroService: HeroService,
    private powerService: PowerService,
  ) { }
  ngOnInit(): void {
    this.getHeroes();
    this.getPowers();
  }

  getHeroes = (): void => {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  getPowers = (): void => {
    this.powerService.getPowers().subscribe(powers => this.powers = powers);
  }

  add = (name: string): void => {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero).subscribe(hero => { this.heroes.push(hero) });
  }

  delete = (hero: Hero): void => {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
