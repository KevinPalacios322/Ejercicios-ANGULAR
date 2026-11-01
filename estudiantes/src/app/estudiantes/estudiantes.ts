import { Component, inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Estudiante {
  id: number;
  cuenta: string;
  nombre: string;
  carrera: string;
  fechaIngreso: string;
}

@Component({
  imports: [FormsModule],
  selector: 'app-estudiantes',
  styleUrl: './estudiantes.css',
  templateUrl: './estudiantes.html',
})
export class Estudiantes implements OnInit {
  SesionIniciada = false;
  router = inject(Router);
  id: number = 0;
  cuenta: string = '';
  nombre: string = '';
  carrera: string = '';
  fechaIngreso: string = '';
  estudiantes: Estudiante[] = [];
  idEditar: number | null = null;

  GuardarEstudiante() {
    if (this.cuenta.trim() === '' || this.nombre.trim() === '' ||
      this.carrera.trim() === '' || this.fechaIngreso === '') {
      return;
    }

    const nuevoEstudiante = {
      id: this.estudiantes.length + 1,
      cuenta: this.cuenta,
      nombre: this.nombre,
      carrera: this.carrera,
      fechaIngreso: this.fechaIngreso
    };

    this.estudiantes.push(nuevoEstudiante);
    localStorage.setItem('registrosEstudiantes', JSON.stringify(this.estudiantes));

    this.cuenta = '';
    this.nombre = '';
    this.carrera = '';
    this.fechaIngreso = '';
  }

  EditarEstudiante(estudiante: Estudiante) {
    this.idEditar = estudiante.id;
    this.cuenta = estudiante.cuenta;
    this.nombre = estudiante.nombre;
    this.carrera = estudiante.carrera;
    this.fechaIngreso = estudiante.fechaIngreso;
  }

  ActualizarEstudiante() {
    if (this.idEditar === null) {
      return;
    }

    if (this.cuenta.trim() === '' || this.nombre.trim() === '' ||
      this.carrera.trim() === '' || this.fechaIngreso === '') {
      return;
    }

    const estudiante = this.estudiantes.find((e: Estudiante) => e.id === this.idEditar);

    if (estudiante) {
      estudiante.cuenta = this.cuenta;
      estudiante.nombre = this.nombre;
      estudiante.carrera = this.carrera;
      estudiante.fechaIngreso = this.fechaIngreso;

      localStorage.setItem('registrosEstudiantes', JSON.stringify(this.estudiantes));

      this.idEditar = null;
      this.cuenta = '';
      this.nombre = '';
      this.carrera = '';
      this.fechaIngreso = '';

      alert('Estudiante actualizado correctamente');
    }
  }

  CancelarEdicion() {
    this.idEditar = null;
    this.cuenta = '';
    this.nombre = '';
    this.carrera = '';
    this.fechaIngreso = '';
  }

  EliminarEstudiante(estudiante: Estudiante) {
    if (!confirm(`¿Eliminar el estudiante "${estudiante.nombre}"?`)) {
      return;
    }

    this.estudiantes = this.estudiantes.filter((e: Estudiante) => e.id !== estudiante.id);
    localStorage.setItem('registrosEstudiantes', JSON.stringify(this.estudiantes));

    if (this.idEditar === estudiante.id) {
      this.CancelarEdicion();
    }

    alert('Estudiante eliminado correctamente');
  }

  ngOnInit(): void {
    this.SesionIniciada = localStorage.getItem('sesionEstudiantes') === 'activa';

    if (!this.SesionIniciada){
      this.router.navigate([''], {state : {SesionIniciada: this.SesionIniciada}});
      return;
    }

    const datos = localStorage.getItem('registrosEstudiantes');
    if (datos) {
      this.estudiantes = JSON.parse(datos);
    } else {
      this.estudiantes = [
        {
          id: 1,
          cuenta: '0000001',
          nombre: 'Ana Ejemplo',
          carrera: 'Ingeniería en Sistemas',
          fechaIngreso: '2026-09-14'
        },
        {
          id: 2,
          cuenta: '0000002',
          nombre: 'Luis Ejemplo',
          carrera: 'Administración',
          fechaIngreso: '2026-09-15'
        }
      ];
      localStorage.setItem('registrosEstudiantes', JSON.stringify(this.estudiantes));
    }
  }


}
