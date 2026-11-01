import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Mascota } from './mascota/mascota';


export const routes: Routes = [
    {path : '', component : Login},
    {path : 'Mascota', component : Mascota}
    
];
