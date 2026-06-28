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
  @Output() clickScroll = new EventEmitter<string>();

  currentSlide = 0;
  totalSlides = 2; // Atualize conforme o número de slides
  slideInterval: any;

  ngOnInit() {
    // Inicia o carrossel automático
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000); // Troca de slide a cada 5 segundos
  }

  ngOnDestroy() {
    // Limpa o intervalo ao destruir o componente
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
  }

  scrollToSection(section: string) {
    this.clickScroll.emit(section);
  }

}
