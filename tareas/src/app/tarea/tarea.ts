import { Component, inject, IterableDiffers } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { isEmpty } from 'rxjs';
import { JsonPipe } from '@angular/common';

interface tarea{
  id: number;
  titulo: string;
  descripcion: string;
  FechaLimite: string;
  estado: string;

}

@Component({
  imports: [FormsModule],
  selector: 'app-tarea',
  styleUrl: './tarea.css',
  templateUrl: './tarea.html',
})


export class Tarea implements OnInit {
  
  router = inject(Router);
  id: number = 0 ;
  titulo: string = '';
  descripcion: string = '';
  FechaLimite: string = '';
  estado: string = '';
  ListaTareas: tarea[]=[]
  ListaTareasD : any[]=[]; 
  

  IngresarEstudiante(){

    if(this.titulo.trim() === '' || this.descripcion.trim() === '' || this.FechaLimite.trim() === '' || this.estado.trim() === ''){

      alert("Error al Ingresar: Campos vacios")

      return
    }else{

      for( let x = 0; x < this.ListaTareasD.length; x++ ){

        if (this.id === this.ListaTareas[x].id){
          this.id ++;

        }

      }

    }

    const NuevaTarea = {
      id :  this.ListaTareas.length + 1,
      titulo : this.titulo,
      descripcion : this.descripcion,
      FechaLimite : this.FechaLimite,
      estado: this.estado

    }
    this.ListaTareas.push(NuevaTarea)
    localStorage.setItem('RegistrosTareas',JSON.stringify(this.ListaTareas))


   }

  ngOnInit(): void {
    
    const datos = localStorage.getItem('RegistrosTareas')
    this.ListaTareasD = JSON.parse(datos || '[]');

    if (datos){

      this.ListaTareas = JSON.parse(datos);


    }
    
    
    if(localStorage.getItem('sesionTareas') !== 'true'){

      
      this.router.navigate(['']);
      return
    }

  }

}



