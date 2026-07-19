import { Routes } from '@angular/router';
import { GiftComponent } from './features/gift/gift.component';
import { HomeComponent } from './home/home.component';
import { ClaimComponent } from './features/gift/claim/claim.component'
import { ValidateComponent } from './features/gift/validate/validate.component';
import { LoginComponent } from './features/login/login.component';
import { authGuard } from 'src/core/auth/auth.guard';
import { AdminComponent } from './features/admin/admin.component';
import { QuoteComponent } from './features/quote/quote.component';
import { MainComponent } from './features/main/main.component';
import { ListComponent } from './features/gift/list/list.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },  
  {
    path: 'claim/:giftId',
    component: ClaimComponent
  },
  {
    path: 'validate/:giftId',
    canActivate: [authGuard],
    component: ValidateComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'auth/callback',
    component: LoginComponent
  },  
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard],
    children: [      
      {
        path: 'gift',
        component: GiftComponent
      },
      {
        path: 'gift/list',
        component: ListComponent
      },      
      {
        path: 'main',
        component: MainComponent
      },
      {
        path: 'quote',
        component: QuoteComponent

      },
      {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
