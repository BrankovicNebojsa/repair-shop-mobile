import { Component, Input, OnInit } from '@angular/core';
import { Reservation } from '../reservation.model';
import { ActivatedRoute } from '@angular/router';
import {
  AlertController,
  LoadingController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { ReservationsService } from '../reservations.service';

@Component({
  selector: 'app-reservation-element',
  templateUrl: './reservation-element.component.html',
  styleUrls: ['./reservation-element.component.scss'],
})
export class ReservationElementComponent implements OnInit {
  @Input() reservation: Reservation = {
    id: '4',
    date: '23.12.2023 10:00',
    license_plate: 'BG1468OI',
    description: 'Oil change',
    mechanic_name: 'Djordje Petrovic',
    userId: '1',
  };
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private reservationService: ReservationsService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  openAlert() {
    this.alertController
      .create({
        header: 'Delete reservation',
        message: 'Are you sure you want to delete this reservation?',
        buttons: [
          {
            text: 'Delete',
            handler: () => {
              this.deleteReservation();
              console.log('Deleted!');
            },
          },
          {
            text: 'Cancel',
            handler: () => {
              console.log('Canceled!');
            },
          },
        ],
      })
      .then((alert: HTMLIonAlertElement) => {
        alert.present();
      });
  }

  async deleteReservation() {
    const loading = await this.loadingCtrl.create({ message: 'Deleting...' });
    await loading.present();

    this.reservationService
      .deleteReservation(this.reservation.id!)
      .subscribe(async () => {
        await loading.dismiss();
        this.navCtrl.navigateBack('/reservations/tabs/explore');
      });
  }
}
