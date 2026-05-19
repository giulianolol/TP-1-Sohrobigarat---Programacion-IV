import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { LoginComponent } from './pages/login/login';
import { Registro} from './pages/registro/registro';
import { QuienSoy } from './pages/quien-soy/quien-soy';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: Registro },
  { path: 'quien-soy', component: QuienSoy }
];
