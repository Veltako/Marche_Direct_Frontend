import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-rgpd',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './rgpd.component.html',
  styleUrl: './rgpd.component.css'
})
export class RgpdComponent 
{
  email: string = "securitydata@mail.com"
}
