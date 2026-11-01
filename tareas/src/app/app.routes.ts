import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Tarea } from './tarea/tarea';

export const routes: Routes = [
    {path: '', component : Login },
    {path: 'Tarea', component : Tarea}

];
