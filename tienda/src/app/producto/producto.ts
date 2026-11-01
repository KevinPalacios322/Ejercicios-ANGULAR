import { Component, inject } from '@angular/core';
import { Login } from '../login/login';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';


interface Item {

  id : number;
  codigo: string;
  nombre: string; 
  precio: number ;
  existencia: number

}


@Component({
  imports: [],
  selector: 'app-producto',
  styleUrl: './producto.css',
  templateUrl: './producto.html',
})
export class Producto implements OnInit {
 
  SesionIniciada = false;
  public router = inject(Router)
 
 
  ngOnInit(): void {
    this.SesionIniciada = history.state?.SesionIniciada === true;

    if(!this.SesionIniciada){

      this.router.navigate([''], {state : {SesionIniciada: this.SesionIniciada} });

    }
  }

   CerrarSesion(){

    this.SesionIniciada = false;
    this.router.navigate([''], {state : {SesionIniciada: this.SesionIniciada} });

  }


}
