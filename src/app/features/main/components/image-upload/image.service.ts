import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ImageUploadResponse } from "./model/image-upload.response";
import { UploadSection } from "./model/image-upload.config";

@Injectable({
  providedIn: 'root',
})
export class ImageService {

  private readonly http = inject(HttpClient);

  private readonly api = `${environment.apiUrl}/api`;
  private readonly resource = `${this.api}/images`;

    upload(file: File, section: UploadSection): Observable<ImageUploadResponse> {

        const formData = new FormData();
        
        formData.append('file', file);
        formData.append('section', section);

        return this.http.post<ImageUploadResponse>(
            this.resource,
            formData
        );
    }

    getImages(section: UploadSection): Observable<ImageUploadResponse[]> {
        return this.http.get<ImageUploadResponse[]>(
            `${this.resource}/${section}`
        );
    }

    removeImage(imageId: string): Observable<void> {
        return this.http.delete<void>(
            `${this.resource}/${imageId}`
        );
    }

    updateImage(imageId: string, file: File, section: UploadSection): Observable<ImageUploadResponse> {
        const formData = new FormData();
        formData.append('file', file);  
        formData.append('section', section);
      
        return this.http.put<ImageUploadResponse>(
          `${this.resource}/${imageId}`,
          formData
        );
    } 
}