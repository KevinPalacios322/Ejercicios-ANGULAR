import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  imports: [FormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class LoginComponent {
  usuario = '';
  clave = '';
  error = '';

  constructor(private router: Router) {}

  iniciarSesion(): void {
    if (this.usuario === 'bibliotecario' && this.clave === 'biblio123') {
      localStorage.setItem('sesionBiblioteca', 'activa');
      this.router.navigate(['/libros']);
      return;
    }

    this.error = 'Usuario o contraseña incorrectos.';
  }
}
