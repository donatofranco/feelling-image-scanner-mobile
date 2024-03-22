import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PhotoTO } from './PhotoTO';
import { HttpResponse } from '@capacitor/core';
import { ServerResponse } from 'src/app/home/home.page';

@Injectable({
  providedIn: 'root'
})
export class FeelingImageScannerService {

  url: string = 'http://localhost:9090/api/feeling-image-scanner/scan-image';

  constructor(private http: HttpClient) { }

  sendPhoto(photo: PhotoTO): Observable<ServerResponse> {
    return this.http.post<ServerResponse>(this.url, photo);
  }
}
