import { Component } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../services/hero.service';
import { PowerService } from '../services/power-service.service';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.less']
})
export class HeroFormComponent {
  public submitted: boolean = false;
  public model!: Hero;
  public powers: string[] = [];

  constructor(private heroService: HeroService, private powerService: PowerService) {
    this.powerService.getPowers().subscribe(powers => this.powers = powers);
    this.model = {
      id: 1,
      name: "",
      alterEgo: "",
      power: this.powers[0]
    }
  }

  public onSubmit = () => {
    this.submitted = true;
  }
}
