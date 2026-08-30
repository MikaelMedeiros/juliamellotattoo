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

    upload(file: File, section: UploadSection, position: number): Observable<ImageUploadResponse> {

        const formData = new FormData();
        
        formData.append('file', file);        

        return this.http.post<ImageUploadResponse>(
            `${this.resource}/${section}/${position}`,
            formData
        );
    }

    getImages(section: UploadSection): Observable<ImageUploadResponse[]> {
        return this.http.get<ImageUploadResponse[]>(
            `${this.resource}/${section}`
        );
    }

    removeImage(section: UploadSection, position: number): Observable<void> {
        return this.http.delete<void>(
            `${this.resource}/${section}/${position}`
        );
    }

    updateImage(imageId: string, file: File, section: UploadSection, position: number): Observable<ImageUploadResponse> {
        const formData = new FormData();
        formData.append('file', file);  
        formData.append('section', section);
        formData.append('position', `${position}`);
      
        return this.http.put<ImageUploadResponse>(
          `${this.resource}/${imageId}`,
          formData
        );
    } 
}