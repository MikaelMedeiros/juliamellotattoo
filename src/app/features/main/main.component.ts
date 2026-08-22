import { Component, OnInit } from '@angular/core';
import { SiteSectionCard } from './components/section-card/site-section-card.component'
import { DrawerModule } from 'primeng/drawer';
import { ImageUploadComponent } from "./components/image-upload/image-upload.component";
import { UploadSection } from './components/image-upload/model/image-upload.config';

@Component({
  selector: 'app-main',
  imports: [SiteSectionCard, DrawerModule, ImageUploadComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',  
})
export class MainComponent {

  visible = false;
  selectedSectionType: {section: UploadSection, label: string} = {section: 'banner', label: 'Banner'};
  bannerImage = 'https://juliamellotattoo.com.br/media/bannerprincipal-ZAXVVQVV.png';

  public openBannerEditor() {
    this.visible = true;
    this.selectedSectionType = {section: 'banner', label: 'Alterar Banner'};
  }
}
