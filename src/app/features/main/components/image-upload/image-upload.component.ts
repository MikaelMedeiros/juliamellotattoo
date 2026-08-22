import { Component, inject, Input } from '@angular/core';
import { FileUploadHandlerEvent, FileUploadModule } from 'primeng/fileupload';

import {
  UPLOAD_CONFIG,
  UploadSection
} from './model/image-upload.config';
import { ImageService } from './image.service';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [FileUploadModule],
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.css'
})
export class ImageUploadComponent {

  private readonly imageService = inject(ImageService);

  @Input({ required: true })
  section!: UploadSection;

  uploadedFiles: any[] = [];

  get config() {
    return UPLOAD_CONFIG[this.section];
  }

  public onUpload(event: FileUploadHandlerEvent): void {

    for (const file of event.files) {

      this.imageService.upload(file, this.section)
        .subscribe({
          next: image => {

            this.uploadedFiles.push(image);

            console.log('Imagem enviada:', image);
          },

          error: error => {

            console.error(
              'Erro ao enviar imagem:',
              error
            );
          }
        });
    }
  }
}