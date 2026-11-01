import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';

@Component({
  imports: [FormsModule],
  selector: 'app-mascota',
  styleUrl: './mascota.css',
  templateUrl: './mascota.html',
})
export class Mascota implements OnInit {

  SesionIniciada=false;
  router = inject(Router)
  nombre: string = '';
  especie: string = '';
  edad: number = 0;
  propietario: string = '';
  mascotas: any[] = [];
  idEditar: number | null = null;

  GuardarMascota() {

    if (this.nombre.trim() === '' || this.especie.trim() === '' ||
      !Number.isInteger(this.edad) || this.edad < 0 || this.propietario.trim() === '') {
      alert("Error al ingresar los datos");
      return;
    }

    const nuevaMascota = {
      id: this.mascotas.length + 1,
      nombre: this.nombre,
      especie: this.especie,
      edad: this.edad,
      propietario: this.propietario
    };

    this.mascotas.push(nuevaMascota);
    localStorage.setItem('mascotasVeterinaria', JSON.stringify(this.mascotas));

    this.nombre = '';
    this.especie = '';
    this.edad = 0;
    this.propietario = '';
  }

  EditarMascota(mascota: any) {
    this.idEditar = mascota.id;
    this.nombre = mascota.nombre;
    this.especie = mascota.especie;
    this.edad = mascota.edad;
    this.propietario = mascota.propietario;
  }

  ActualizarMascota() {
    if (this.idEditar === null) {
      return;
    }

    if (this.nombre.trim() === '' || this.especie.trim() === '' ||
      !Number.isInteger(this.edad) || this.edad < 0 || this.propietario.trim() === '') {
      alert("Error al ingresar los datos");
      return;
    }

    const mascota = this.mascotas.find((m: any) => m.id === this.idEditar);

    if (mascota) {
      mascota.nombre = this.nombre;
      mascota.especie = this.especie;
      mascota.edad = this.edad;
      mascota.propietario = this.propietario;

      localStorage.setItem('mascotasVeterinaria', JSON.stringify(this.mascotas));

      this.idEditar = null;
      this.nombre = '';
      this.especie = '';
      this.edad = 0;
      this.propietario = '';

      alert('Mascota actualizada correctamente');
    }
  }

  CancelarEdicion() {
    this.idEditar = null;
    this.nombre = '';
    this.especie = '';
    this.edad = 0;
    this.propietario = '';
  }

  EliminarMascota(id: number) {
    const confirmar = confirm('¿Desea eliminar esta mascota?');

    if (!confirmar) {
      return;
    }

    this.mascotas = this.mascotas.filter((mascota: any) => mascota.id !== id);
    localStorage.setItem('mascotasVeterinaria', JSON.stringify(this.mascotas));

    if (this.idEditar === id) {
      this.CancelarEdicion();
    }
  }

  ngOnInit(): void {
    
    this.SesionIniciada = localStorage.getItem('sesionVeterinaria') === 'activa';

    if (!this.SesionIniciada){

      this.router.navigate([''],{state : {SesionIniciada : this.SesionIniciada}})
      return;
    }
    
    const datos = localStorage.getItem('mascotasVeterinaria');

    if (datos) {
      this.mascotas = JSON.parse(datos);
    } else {
      this.mascotas = [
        { id: 1, nombre: 'Luna', especie: 'Gato', edad: 0, propietario: 'Ana Ejemplo' },
        { id: 2, nombre: 'Rocky', especie: 'Perro', edad: 3, propietario: 'Luis Ejemplo' }
      ];
      localStorage.setItem('mascotasVeterinaria', JSON.stringify(this.mascotas));
    }

  }



}
