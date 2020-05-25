import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // Prueba de logeo con Google OAuth
  { path: 'login', loadChildren: () => import('src/app/auth/auth.module').then(m => m.AuthModule) },
  // Comente la linea anterior y descomente esta Linea para Prueba de logeo tradicional
  // { path: 'login', loadChildren: () => import('src/app/user/user.module').then(m => m.UserModule) },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
