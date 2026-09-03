import { Component } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { SiteSectionCard } from './components/section-card/site-section-card.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import {
  UploadSection,
  UPLOAD_CONFIG
} from './components/image-upload/model/image-upload.config';

@Component({
  selector: 'app-main',
  imports: [
    SiteSectionCard,
    DrawerModule,
    ImageUploadComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {

  visible = false;

  selectedSectionType: {
    section: UploadSection;
    label: string;
  } = {
    section: 'banner',
    label: 'Alterar Banner'
  };

  sections = Object.entries(UPLOAD_CONFIG).map(([section, config]) => ({
    section: section as UploadSection,
    ...config,
    image: this.getSectionImage(section as UploadSection)
  }));

  private getSectionImage(section: UploadSection): string {
    const images: Partial<Record<UploadSection, string>> = {
      banner: 'https://res.cloudinary.com/xlgjkgsg/image/upload/julia-mello-tattoo/banner.png',
      bio: 'https://res.cloudinary.com/xlgjkgsg/image/upload/julia-mello-tattoo/bio/slot-01.png',
      'avatar-chat': 'https://res.cloudinary.com/xlgjkgsg/image/upload/julia-mello-tattoo/avatar-chat/slot-01.png',
      'social-proof': 'https://res.cloudinary.com/xlgjkgsg/image/upload/julia-mello-tattoo/social-proof/slot-02.png',
      portfolio: 'https://res.cloudinary.com/xlgjkgsg/image/upload/julia-mello-tattoo/portfolio/slot-01.png'
    };

    return images[section] ?? 'assi_juliabranco.png';
  }

  openEditor(section: UploadSection, label: string) {
    this.selectedSectionType = {
      section,
      label: `Alterar ${label}`
    };

    this.visible = true;
  }


}