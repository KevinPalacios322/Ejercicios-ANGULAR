import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Libro {
  id: number;
  codigo: string;
  titulo: string;
  autor: string;
  anio: number;
}

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-libro',
  styleUrl: './libro.css',
  templateUrl: './libro.html',
})
export class LibroComponent implements OnInit {
  libros: Libro[] = [];
  nuevoLibro: Libro = this.libroVacio();
  libroEditandoId: number | null = null;
  mensaje = '';
  error = '';

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

  libroVacio(): Libro {
    return { id: 0, codigo: '', titulo: '', autor: '', anio: 0 };
  }

  guardarLibro(): void {
    this.error = '';
    this.mensaje = '';

    const codigo = this.nuevoLibro.codigo;
    const titulo = this.nuevoLibro.titulo.trim();
    const autor = this.nuevoLibro.autor.trim();
    const anioTexto = String(this.nuevoLibro.anio);
    const anio = Number(this.nuevoLibro.anio);

    if (!codigo.trim() || !titulo || !autor || !/^\d{4}$/.test(anioTexto) || !Number.isInteger(anio) || anio < 1000 || anio > 9999) {
      this.error = 'Complete los campos con valores válidos.';
      return;
    }

    if (this.libroEditandoId === null) {
      const nuevoId = this.libros.reduce((maximo, libro) => Math.max(maximo, libro.id), 0) + 1;
      this.libros.push({ id: nuevoId, codigo, titulo, autor, anio });
      this.mensaje = 'Libro registrado correctamente.';
    } else {
      const indice = this.libros.findIndex(libro => libro.id === this.libroEditandoId);
      if (indice >= 0) {
        this.libros[indice] = { id: this.libroEditandoId, codigo, titulo, autor, anio };
      }
      this.mensaje = 'Libro actualizado correctamente.';
    }

    this.guardarCambios();
    this.cancelarEdicion();
  }

  editarLibro(libro: Libro): void {
    this.libroEditandoId = libro.id;
    this.nuevoLibro = { ...libro };
    this.error = '';
    this.mensaje = '';
  }

  cancelarEdicion(): void {
    this.libroEditandoId = null;
    this.nuevoLibro = this.libroVacio();
  }

  guardarCambios(): void {
    localStorage.setItem('librosBiblioteca', JSON.stringify(this.libros));
  }

  cerrarSesion(): void {
    localStorage.removeItem('sesionBiblioteca');
    this.router.navigate(['/login']);
  }
}
