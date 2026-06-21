import { Routes } from '@angular/router';
import { GiftComponent } from './gift/gift.component';
import { HomeComponent } from './home/home.component';
import { ClaimComponent } from './gift/claim/claim.component'
import { ValidateComponent } from './gift/validate/validate.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'gift',
    component: GiftComponent
  },
  {
    path: 'claim/:giftId',
    component: ClaimComponent
  },
  {
    path: 'validate/:giftId',
    component: ValidateComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
