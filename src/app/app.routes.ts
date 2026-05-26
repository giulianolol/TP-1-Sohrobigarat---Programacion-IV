import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { LoginComponent } from './pages/login/login';
import { Registro } from './pages/registro/registro';
import { QuienSoy } from './pages/quien-soy/quien-soy';
import { Encuesta } from './pages/encuesta/encuesta';
import { ResultadosEncuesta } from './pages/resultados-encuesta/resultados-encuesta';

import { authGuard } from './guards/auth-guard';
import { guestGuard } from './guards/guest-guard';
import { adminGuard } from './guards/admin-guard';

export const routes: Routes = [
  { path: '', component: Home },

  {
    path: 'login',
    component: LoginComponent,
    canActivate: [guestGuard]
  },

  {
    path: 'registro',
    component: Registro,
    canActivate: [guestGuard]
  },

  {
    path: 'quien-soy',
    component: QuienSoy,
    canActivate: [authGuard]
  },

  {
    path: 'encuesta',
    component: Encuesta
  },

  {
    path: 'resultados-encuesta',
    component: ResultadosEncuesta,
    canActivate: [adminGuard]
  },

  {
    path: 'ahorcado',
    loadComponent: () =>
      import('./pages/ahorcado/ahorcado')
      .then(m => m.AhorcadoComponent)
  },

  {
    path: 'mayor-menor',
    loadComponent: () =>
      import('./pages/mayor-menor/mayor-menor')
      .then(m => m.MayorMenorComponent)
  },

  {
    path: 'chat',
    loadComponent: () =>
      import('./pages/chat/chat')
      .then(m => m.ChatComponent)
  },

  {
    path: 'preguntados',
    loadComponent: () =>
      import('./pages/preguntados/preguntados')
      .then(m => m.PreguntadosComponent)
  },

  {
  path: 'pong',
  loadComponent: () =>
    import('./pages/pong/pong')
    .then(m => m.PongComponent)
},

  {
    path: 'resultados',
    loadComponent: () =>
      import('./pages/resultados/resultados')
      .then(m => m.ResultadosComponent)
  }
];