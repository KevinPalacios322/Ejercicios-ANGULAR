import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Producto } from './producto/producto';

export const routes: Routes = [
    {path: '',component: Login},
    {path: 'producto',component: Producto}

];
