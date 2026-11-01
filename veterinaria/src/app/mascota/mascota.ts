import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-mascota',
  styleUrl: './mascota.css',
  templateUrl: './mascota.html',
})
export class Mascota implements OnInit {

  SesionIniciada=false;
  router = inject(Router)

  ngOnInit(): void {
    
    this.SesionIniciada = history.state?.SesionIniciada === true;

    if (!this.SesionIniciada){

      this.router.navigate([''],{state : {SesionIniciada : this.SesionIniciada}})


    }
    

  }



}
