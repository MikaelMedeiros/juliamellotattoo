import { Component, OnInit } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ImageExtensionService } from '../../shared/image-extension.service';
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
export class MainComponent implements OnInit {

  visible = false;

  selectedSectionType: {
    section: UploadSection;
    label: string;
  } = {
    section: 'banner',
    label: 'Alterar Banner'
  };

  private readonly defaultSectionImage = '/assi_juliabranco.png';

  sections = Object.entries(UPLOAD_CONFIG).map(([section, config]) => ({
    section: section as UploadSection,
    ...config,
    image: this.defaultSectionImage
  }));

  constructor(
    private readonly imageExtensionService: ImageExtensionService
  ) {}

  ngOnInit(): void {
    for (const section of this.sections) {
      const path = this.getSectionImage(section.section);

      this.imageExtensionService.findImageUrl(path).subscribe(image => {
        section.image = image ?? this.defaultSectionImage;
      });
    }
  }

  private getSectionImage(section: UploadSection): string {
    const images: Partial<Record<UploadSection, string>> = {
      banner: 'julia-mello-tattoo/banner/slot-01',
      bio: 'julia-mello-tattoo/bio/slot-01',
      'avatar-chat': 'julia-mello-tattoo/avatar-chat',
      'social-proof': 'julia-mello-tattoo/social-proof/slot-01',
      portfolio: 'julia-mello-tattoo/portfolio/slot-01'
    };

    return images[section] ?? this.defaultSectionImage;
  }

  openEditor(section: UploadSection, label: string) {
    this.selectedSectionType = {
      section,
      label: `Alterar ${label}`
    };

    this.visible = true;
  }


}