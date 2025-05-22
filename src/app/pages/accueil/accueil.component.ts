import { Component, OnInit } from '@angular/core';
import Marche from '../../models/marche.model';
import { MarchesService } from '../../services/marches.service';
import { PreloadAllModules, RouterLink } from '@angular/router';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent implements OnInit
{
  marches!: Marche[];
  imgUrl = "https://127.0.0.1:8000/images/"

  constructor(private marchesServices: MarchesService) {}

  ngOnInit(): void 
  {
   this.marchesServices.getMarchesAccueil().subscribe((data) => {this.marches = data})
  }
}
