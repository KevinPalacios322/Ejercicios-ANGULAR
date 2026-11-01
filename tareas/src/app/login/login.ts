import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {

  router = inject(Router);
  usuario = '';
  clave = '';
  


  IniciarSesion(){

    if(this.usuario === 'usuario' && this.clave === 'tareas123'){

      localStorage.setItem('sesionTareas','true');
      this.router.navigate(['/Tarea']);
      


    }else{

      alert("Contraseña o Usuario Incorrectos")

    }


  }



}
