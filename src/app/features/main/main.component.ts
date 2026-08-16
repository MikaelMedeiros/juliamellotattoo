import { Component, OnInit } from '@angular/core';
import { SiteSectionCard } from './components/section-card/site-section-card.component'

@Component({
  selector: 'app-main',
  imports: [SiteSectionCard],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',  
})
export class MainComponent {

  bannerImage = 'https://juliamellotattoo.com.br/media/bannerprincipal-ZAXVVQVV.png';

  public openBannerEditor() {

  }
}
