import { Component, EventEmitter, Output } from '@angular/core';
import { ImageModule } from 'primeng/image';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-banner-site',
  imports: [ImageModule, ButtonModule],
  templateUrl: './banner-site.component.html',
  styleUrl: './banner-site.component.css'
})
export class BannerSiteComponent {
  @Output() clickScroll = new EventEmitter<void>();

  scrollParaDestino() {
    this.clickScroll.emit();
  }

}
