import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginSignupModule } from './login-signup/login-signup.module';

const routes: Routes = [
  { path: '', redirectTo: 'cover', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {path:'cover',loadChildren: ()=>import('./login-signup/login-signup.module').then(c=>c.LoginSignupModule)}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
