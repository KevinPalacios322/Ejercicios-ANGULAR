import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Libro {
  id: number;
  codigo: string;
  titulo: string;
  autor: string;
  anio: number;
}

@Component({
  imports: [CommonModule],
  selector: 'app-libro',
  styleUrl: './libro.css',
  templateUrl: './libro.html',
})
export class LibroComponent implements OnInit {
  libros: Libro[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('sesionBiblioteca') !== 'activa') {
      this.router.navigate(['/login']);
      return;
    }

    const guardados = localStorage.getItem('librosBiblioteca');
    if (guardados === null) {
      localStorage.setItem('librosBiblioteca', JSON.stringify([
        { id: 1, codigo: '0001', titulo: 'Introducción a la Web', autor: 'Ana Ejemplo', anio: 2022 },
        { id: 2, codigo: '0002', titulo: 'Fundamentos de HTML', autor: 'Luis Ejemplo', anio: 2024 },
      ]));
    }
    this.cargarLibros();
  }

  cargarLibros(): void {
    this.libros = JSON.parse(localStorage.getItem('librosBiblioteca') ?? '[]') as Libro[];
  }

  cerrarSesion(): void {
    localStorage.removeItem('sesionBiblioteca');
    this.router.navigate(['/login']);
  }
}
