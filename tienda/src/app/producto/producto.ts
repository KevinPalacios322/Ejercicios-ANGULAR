import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';


interface Item {

  id : number;
  codigo: string;
  nombre: string; 
  precio: number ;
  existencia: number

}


@Component({
  imports: [FormsModule],
  selector: 'app-producto',
  styleUrl: './producto.css',
  templateUrl: './producto.html',
})
export class Producto implements OnInit {
 
  SesionIniciada = false;
  public router = inject(Router);
  id : number = 0;
  codigo : string='' ;
  nombre : string = '';
  precio : number = 0 ;
  existencia : number = 0;
  idEditar :number | null = null;
  productos: any[] = []

  GuardarProducto(){

    if(this.existencia <= 0 || this.codigo.trim() === '' || this.nombre.trim() === '' || this.precio<= 0 ){

      return
    }

    

    const nuevoProducto = {

      
      id: this.productos.length + 1,
      codigo: this.codigo,
      nombre: this.nombre,
      precio: this.precio,
      existencia: this.existencia

    }

    this.productos.push(nuevoProducto);
    localStorage.setItem('productos',JSON.stringify(this.productos));

  }

  EditarProducto(producto:any){

    this.idEditar =producto.id;
    this.codigo = producto.codigo;
    this.nombre = producto.nombre;
    this.precio = producto.precio;
    this.existencia = producto.existencia; 


  }

  ActualizarProducto() {
  if (this.idEditar === null) {
    return;
  }

  const producto = this.productos.find((p: any) => p.id === this.idEditar);

  if (producto) {
    producto.codigo = this.codigo;
    producto.nombre = this.nombre;
    producto.precio = this.precio;
    producto.existencia = this.existencia;

    localStorage.setItem('productos',JSON.stringify(this.productos));

    this.idEditar = null;

    this.codigo = '';
    this.nombre = '';
    this.precio = 0;
    this.existencia = 0;

    alert('Producto actualizado correctamente');
  }
}



  ngOnInit(): void {
    const datos =localStorage.getItem('productos');
    if (datos){

      this.productos = JSON.parse(datos);

    }
    this.SesionIniciada = history.state?.SesionIniciada === true;

    if(!this.SesionIniciada){

      this.router.navigate([''], {state : {SesionIniciada: this.SesionIniciada} });

    }
  }

   CerrarSesion(){

    this.SesionIniciada = false;
    this.router.navigate([''], {state : {SesionIniciada: this.SesionIniciada} });

  }


}
