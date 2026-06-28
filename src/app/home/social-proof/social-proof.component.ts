import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { SocialProofService } from './social-proof.service';
import { SocialProofImage } from './social-proof.model';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-social-proof',
  imports: [AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './social-proof.component.html',
  styleUrls: ['./social-proof.component.css'],
})
export class SocialProofComponent {

  title = 'O que as pessoas estão falando';
  subtitle = 'feedback das minhas clientes';

  images$: Observable<SocialProofImage[]>;

  selectedImage: SocialProofImage | null = null;

  @ViewChild('carousel', { static: false })
  carouselRef!: ElementRef<HTMLDivElement>;

  constructor(private socialProofService: SocialProofService) {
    this.images$ = this.socialProofService.getImages();
  }

  scrollLeft(): void {
    this.carouselRef.nativeElement.scrollBy({
      left: -300,
      behavior: 'smooth',
    });
  }

  scrollRight(): void {
    this.carouselRef.nativeElement.scrollBy({
      left: 300,
      behavior: 'smooth',
    });
  }

  openImage(image: SocialProofImage): void {
    this.selectedImage = image;
  }

  closeImage(): void {
    this.selectedImage = null;
  }
}
