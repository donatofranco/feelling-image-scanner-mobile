import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon, IonLabel, IonGrid, IonRow, IonCol, IonImg, IonFooter, AlertController, IonicSafeString } from '@ionic/angular/standalone';
import { PhotoService, UserPhoto } from '../services/photo/photo.service';
import { FeelingImageScannerService } from '../services/server/feeling-image-scanner.service';
import { PhotoTO } from '../services/server/PhotoTO';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonFooter, IonImg, IonCol, IonRow, IonGrid, IonLabel, IonIcon, IonFabButton, IonFab, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {

  constructor(public photoService: PhotoService, 
    public feelingImageScannerService: FeelingImageScannerService,
    private alertController: AlertController) {}

  addPhotoToGallery() {
    this.photoService.takePhoto();
  }

  sendPhotoToServer(photo: UserPhoto) {
    this.feelingImageScannerService.sendPhoto(new PhotoTO(photo.filepath, photo.base64data)).subscribe(
      (response: ServerResponse) => {
        console.log(response);
        this.photoService.photo = new UserPhoto();
        this.presentAlert(response.data);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  async presentAlert(feeling: string) {
    const alert = await this.alertController.create({
      header: 'Result',
      subHeader: 'A feeling was detected in the image',
      message: feeling,
      buttons: ['OK'],
    });

    await alert.present();
  }
}

export interface ServerResponse {
  data: string;
}
