import { Component, inject, OnInit } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CardModule } from 'primeng/card';
import { GiftService } from '../gift.service';
import { ActivatedRoute } from '@angular/router';
import { Gift } from '../model/gift.model';

@Component({
  selector: 'app-validate',
  imports: [ProgressSpinnerModule, CardModule],
  templateUrl: './validate.component.html',
  styleUrl: './validate.component.css'
})
export class ValidateComponent implements OnInit {
    
    header: string = '';
    content: string = '';
    validated: boolean = false;
    erroMessage: string = '';
    color: any = { color: '#4ade80'};

    private giftService = inject(GiftService);
    private router = inject(ActivatedRoute);
    giftOwner?: Gift;

    ngOnInit(): void {
      const giftId = this.router.snapshot.paramMap.get('giftId') ?? '';
      this.giftService
      .validateGift(giftId)
      .subscribe({
        next: response => {
          this.giftOwner = response;
          this.header = 'Gift Válido'  
          this.validated = true;
          this.color = { color: '#4ade80'};
        }, 
        error: err => {
          this.header = 'Gift Inválido' 
          this.erroMessage = err.error.error;
          this.validated = true;
          this.color = { color: '#de4a4a'};
        }
      })         
    }

    


}
