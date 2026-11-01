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
  ListaTareasD : tarea[]=[]; 
  IdEl: number = 0;
  

  IngresarTarea(){

    if(this.titulo.trim() === '' || this.descripcion.trim() === '' || this.FechaLimite.trim() === '' || this.estado.trim() === ''){

      alert("Error al Ingresar: Campos vacios")

      return
    }

    let UltId =0;
    for (let x = 0; x < this.ListaTareasD.length; x++)
      {
        if (UltId < this.ListaTareasD[x].id)
          UltId = this.ListaTareasD[x].id;

      } 
    

    const NuevaTarea = {
      id :  UltId + 1,
      titulo : this.titulo,
      descripcion : this.descripcion,
      FechaLimite : this.FechaLimite,
      estado: this.estado

    }
    
    this.ListaTareasD.push(NuevaTarea)
    localStorage.setItem('RegistrosTareasD',JSON.stringify(this.ListaTareasD))


   }

   EliminarTarea(id:number){
    if(!confirm("Desea eliminar la tarea?")){
      return;

    }

    for (let y=0; y < this.ListaTareasD.length ;y++){

      if(id === this.ListaTareasD[y].id ){

        this.ListaTareasD.splice(y,1);
        break;
       }
    }
    localStorage.setItem('RegistrosTareasD', JSON.stringify(this.ListaTareasD));
   }
  ngOnInit(): void {
    
    const datos = localStorage.getItem('RegistrosTareasD')
    this.ListaTareasD = JSON.parse(datos || '[]');

    if(localStorage.getItem('sesionTareas') !== 'true'){

      
      this.router.navigate(['']);
      return
    }

  }

}



