import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { dateTimestampProvider } from 'rxjs/internal/scheduler/dateTimestampProvider';

@Component({
  imports: [FormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
  
})
export class Login {

  public router = inject(Router)

  usuario = '';
  clave = '';
  SesionIniciada = false;


  IniciarSesion(){

    if(this.usuario === "vendedor" && this.clave === "tienda123"){
      this.SesionIniciada = true;


      this.router.navigate(['/producto'], {state : {SesionIniciada: this.SesionIniciada} });
      
      
    }

    


  }

 

}
