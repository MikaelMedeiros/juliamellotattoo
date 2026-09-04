import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ImageModule } from 'primeng/image';
import { ButtonModule } from 'primeng/button';
import { Banner } from './model/banner.model';
import { BannerImageService } from './banner.service';

declare var fbq: any;

@Component({
  selector: 'app-banner-site',
  imports: [ImageModule, ButtonModule],
  templateUrl: './banner-site.component.html',
  styleUrl: './banner-site.component.css'
})
export class BannerSiteComponent {
  @Output() clickScroll = new EventEmitter<string>();

  private defaultTitle = 'Artes minimalistas e sofisticadas, criadas para valorizar seu corpo e destacar sua essência.';
  private defaultButtonLabel = 'Quero um orçamento';
  private defaultButtonSection = 'formSite';

  private readonly banners: Banner[] = [
  {
    image: 'https://res.cloudinary.com/xlgjkgsg/image/upload/julia-mello-tattoo/banner'
  },
  {
    image: 'https://res.cloudinary.com/xlgjkgsg/image/upload/julia-mello-tattoo/banner/slot-01'
  },
  {
    image: 'https://res.cloudinary.com/xlgjkgsg/image/upload/julia-mello-tattoo/banner/slot-02'
  },
  {
    image: 'https://res.cloudinary.com/xlgjkgsg/image/upload/julia-mello-tattoo/banner/slot-03'
  }
];

  availableBanners: Banner[] = [];

  currentSlide = 0;

  private slideInterval?: ReturnType<typeof setInterval>;

  private bannerImageService = inject(BannerImageService);

  ngOnInit(): void {
    this.bannerImageService
    .filterExistingImages(
      this.banners,
      this.defaultTitle,
      this.defaultButtonLabel,
      this.defaultButtonSection
    )
    .subscribe(banners => {
      this.availableBanners = banners;

      if (this.availableBanners.length > 1) {
        this.startCarousel();
      }
    });
  }

  private startCarousel(): void {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 8000);
  }

  ngOnDestroy(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  nextSlide(): void {
    this.currentSlide =
      (this.currentSlide + 1) % this.banners.length;
  }

  private queroOrcamentoClicado = false; 

  scrollToSection(section: string) {
    this.trackCliqueOrcamento();
    this.clickScroll.emit(section);
  }

  trackCliqueOrcamento(): void {
    if (!this.queroOrcamentoClicado) {
      if (typeof fbq !== 'undefined') {
        fbq('trackCustom', 'CliqueBotaoQueroOrcamento');
      }
    }
  }  
}
