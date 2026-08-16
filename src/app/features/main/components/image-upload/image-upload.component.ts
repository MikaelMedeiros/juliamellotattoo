import { Component, Input } from '@angular/core';
import { FileUploadEvent, FileUploadHandlerEvent, FileUploadModule } from 'primeng/fileupload';

import {
  UPLOAD_CONFIG,
  UploadSection
} from './image-upload.config';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [FileUploadModule],
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.css'
})
export class ImageUploadComponent {

  @Input({ required: true })
  type!: UploadSection;

  uploadedFiles: any[] = [];

  get config() {
    return UPLOAD_CONFIG[this.type];
  }

  public onUpload(event: any): void {
    console.log("chama!");
    for(let file of event.files) {
            this.uploadedFiles.push(file);
        }
    console.log({
      type: this.type,
      files: event
    });
  }
}