import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { escapeRegExp } from '@angular/compiler';

@Component({
  imports: [FormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login{
  usuario = '';
  clave = '';
  SesionIniciada = false;
  router = inject(Router)

  


  IniciarSesion(){
    
   if(this.usuario === 'registro' && this.clave === 'alumnos123'){
      this.SesionIniciada = true;
      this.router.navigate(['/Estudiantes'],{state : {SesionIniciada : this.SesionIniciada}});

    }else{
      alert("Usuario o Contraseña Incorrecta");

    }
  }


}
