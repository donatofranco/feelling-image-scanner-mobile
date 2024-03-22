import { Injectable } from '@angular/core';

import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { FeelingImageScannerService } from '../server/feeling-image-scanner.service';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  public photo: UserPhoto = new UserPhoto()

  constructor(private feelingImageScannerService: FeelingImageScannerService) { }

  public async takePhoto() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });
    const savedImageFile = await this.savePicture(capturedPhoto);
  this.photo = savedImageFile;
  }

  private async savePicture(photo: Photo) {
    const fileName = 'IMAGE' + Date.now();
    return {
      filepath: fileName,
      webviewPath: photo.webPath,
      base64Data: await this.readAsBase64(photo)
    };
  }

  private async readAsBase64(photo: Photo) {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();
  
    return await this.convertBlobToBase64(blob) as string;
  }

  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
}

export class UserPhoto {
  filepath?: string;
  webviewPath?: string;
  base64data?: string;
}
