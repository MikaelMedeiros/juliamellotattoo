import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { CardModule } from 'primeng/card';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { GiftService } from '../gift.service';
import { ActivatedRoute  } from '@angular/router';
import { Gift } from '../model/gift.model';
import { QRCodeComponent } from 'angularx-qrcode';


@Component({
  selector: 'app-claim',
  imports: [QRCodeComponent, ReactiveFormsModule, MessageModule, CardModule, InputGroupModule, InputGroupAddonModule, InputMaskModule, ButtonModule],
  templateUrl: './claim.component.html',
  styleUrl: './claim.component.css'
})
export class ClaimComponent implements OnInit {

  private router = inject(ActivatedRoute );
  private fb = inject(FormBuilder);
  private giftService = inject(GiftService);

  private giftId = '';
  giftMessage = '';
  severityMessage = 'info';
  showMessage = false;
  validGift = true;
  qrValue = '';
  qrVisible = false;

  ngOnInit(): void {
    const giftId =
     this.router.snapshot.paramMap.get('giftId');

     if (!giftId) {
      this.manageMessage('GiftId não informado', 'error', true);
      throw new Error('GiftId não informado');
     }

     this.giftId = giftId;
     this.loadGift();
  }

  private loadGift() {
    this.giftService
    .getGift(this.giftId)
    .subscribe({
      next: response => {        
        this.validateGift(response);        
      },
      error: err => {  
        if(err.status == 401)            {
          this.validGift = true;
        } else {
          this.manageMessage(err.error.error, 'error', true);
          this.validGift = false;
        }
      }
      
    });
  }

  validateGift(response: Gift): void {

    if (response.used) {
      this.manageMessage('Infelizmente esse gift já foi utilizado ):', 'warn', true);
      this.validGift = false;
      return;
    }

    if (response.claimed) {
      this.manageMessage('Infelizmente já resgataram essse gift ):', 'warn', true);
      this.validGift = false;
      return;
    }    

    

    this.validGift = true;
  }

  form = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required]
  });

  claimGift() {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    console.log(this.form.value);

    const name = this.form.value.name + '';
    const phone = this.form.value.phone + '';

    this.giftService
    .claimGift(this.giftId, name, phone)
    .subscribe({
      next: response => {                
        this.manageMessage("Uhul! Gift capturado!", 'success', true);
        this.qrValue = `${window.location.origin}/validate/${response.id}`;
        this.qrVisible = true;
      },
      error: err => {        
        this.giftMessage = "Poxa... Algo deu errado. Poderia tentar novamente mais tarde?";
        this.manageMessage(err.error.error, 'error', true);
      }
    });    
  }

  private manageMessage(message: string, severity: string, show: boolean) {
    this.giftMessage = message;
    this.severityMessage = severity;
    this.showMessage = show;
  }
}
