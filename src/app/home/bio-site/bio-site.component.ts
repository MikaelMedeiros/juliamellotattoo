import { Component, OnInit, inject } from '@angular/core';
import { ImageExtensionService } from '../../shared/image-extension.service';

@Component({
  selector: 'app-bio-site',
  imports: [],
  templateUrl: './bio-site.component.html',
  styleUrl: './bio-site.component.css'
})
export class BioSiteComponent implements OnInit {
  private readonly imageExtensionService =
    inject(ImageExtensionService);
  private readonly imagePath =
    '/julia-mello-tattoo/bio/slot-01';

  urlImageBio: string | null = null;

  ngOnInit(): void {
    this.imageExtensionService
      .findImageUrl(this.imagePath)
      .subscribe(url => this.urlImageBio = url);
  }
}
