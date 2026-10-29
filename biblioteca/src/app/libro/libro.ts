import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-libro',
  styleUrl: './libro.css',
  templateUrl: './libro.html',
})
export class LibroComponent {
  constructor(private router: Router) {
    if (localStorage.getItem('sesionBiblioteca') !== 'activa') {
      this.router.navigate(['/login']);
    }
  }
}
