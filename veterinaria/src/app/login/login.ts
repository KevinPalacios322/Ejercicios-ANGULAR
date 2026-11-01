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

  usuario = '';
  clave = '';
  router = inject(Router)
  SesionIniciada=false;

  IniciarSesion(){

    if (this.usuario === 'veterinario' && this.clave === 'mascotas123'){
      this.SesionIniciada = true;
      localStorage.setItem('sesionVeterinaria', 'activa');
      this.router.navigate(['/Mascota']);



    }else 
    {

      alert("Contraseña o Usuario Incorrecto")

    }

  }


}
