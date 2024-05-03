import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { FavoritesPageComponent } from './pages/favorites-page/favorites-page.component';
import { authGuard } from './services/auth.guard';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'signup',
    component: SignupPageComponent,
  },
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'favorites',
    component: FavoritesPageComponent,
    canActivate: [authGuard],
  },
];
