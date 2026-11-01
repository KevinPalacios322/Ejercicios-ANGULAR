import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Estudiantes } from './estudiantes/estudiantes';

export const routes: Routes = [
    {path : '',component:  Login  },
    {path : 'Estudiantes',component: Estudiantes}



];
