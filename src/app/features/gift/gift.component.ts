import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { GiftService } from './gift.service';
import { QRCodeComponent } from 'angularx-qrcode';
import { Clipboard } from '@angular/cdk/clipboard';
import { PasswordModule } from 'primeng/password';
import { Gift } from './model/gift.model';


@Component({
  selector: 'app-gift',
  imports: [CardModule, ButtonModule, DialogModule,
     InputTextModule, FormsModule, QRCodeComponent,
    PasswordModule],
  templateUrl: './gift.component.html',
  styleUrl: './gift.component.css'
})
export class GiftComponent implements OnInit {

  validateDialog = false;

  giftCode = '';

  qrVisible = false;

  qrValue = '';

  logged: boolean = true;
  private readonly KEY = 'gift-admin-key';

  validating: boolean = false;
  generating: boolean = false;
  severityButtonValidating: 'success' |
  'info' |
  'warn' |
  'danger' |
  'help' |
  'primary' |
  'secondary' |
  'contrast' = 'help';
  labelButtonValidate: string = 'Validar Gift';
  iconButtonValidating: string = 'pi pi-search';
  
  key: string = '';
  giftOwner?: Gift;

  constructor(
    private giftService: GiftService,
    private clipboard: Clipboard
  ) {}

  ngOnInit(): void {
    if(!localStorage.getItem(this.KEY)) {
      this.logged = false; 
    }
  }

  generateGift() {    
    this.generating = true; 
    this.giftService
    .createGift()
    .subscribe({
      next: response => {        
        setTimeout(() => {
            this.generating = false      
            
            this.qrValue =
              `${window.location.origin}/claim/${response.giftId}`;

            this.qrVisible = true;                  
          }, 2000);          
      },
      error: err => {
        window.alert(err.error.error);
        this.generating = false;
      }
    });

  }

  showValidateDialog() {
    this.validateDialog = true;
    this.severityButtonValidating = 'help';
    this.labelButtonValidate = 'Validar'
    this.iconButtonValidating = 'pi pi-search'
  }

  consultGift() {    
    if(this.giftCode){

      this.giftService
      .validateGift(this.giftCode)
      .subscribe({
        next: response => {
          this.validating = true;
  
          setTimeout(() => {
              this.validating = false
              this.severityButtonValidating = 'success';
              this.labelButtonValidate = 'Validado'
              this.iconButtonValidating = 'pi pi-check'

              this.giftOwner = response;
          }, 2000);       
        },
        error: err => {        
          window.alert(err.error.error);
          this.severityButtonValidating = 'danger';
          this.labelButtonValidate = 'Inválido'
          this.iconButtonValidating = 'pi pi-times'
        }
      });
    }
  }

  copyLink() {
    this.clipboard.copy(this.qrValue);
  }

  storageKey() {
    if(this.key) {
      window.localStorage.setItem(this.KEY, this.key);
      this.logged = true;
    }
  }

  logout() {
    window.localStorage.removeItem(this.KEY);
    this.logged = false;
  }
}
