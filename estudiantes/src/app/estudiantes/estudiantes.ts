import { Component, inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-estudiantes',
  styleUrl: './estudiantes.css',
  templateUrl: './estudiantes.html',
})
export class Estudiantes implements OnInit {
  SesionIniciada = false;
  router = inject(Router);

  ngOnInit(): void {
    
    this.SesionIniciada = history.state?.SesionIniciada === true;

    if (!this.SesionIniciada){
      this.router.navigate([''], {state : {SesionIniciada: this.SesionIniciada}});
    }

  }


}
