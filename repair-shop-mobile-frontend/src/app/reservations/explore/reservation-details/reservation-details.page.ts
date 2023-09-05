import { Component, OnInit } from '@angular/core';
import { Reservation } from '../../reservation.model';
import { ActivatedRoute } from '@angular/router';
import {
  LoadingController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { ReservationsService } from '../../reservations.service';
import { ReservationModalComponent } from '../../reservation-modal/reservation-modal.component';

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.page.html',
  styleUrls: ['./reservation-details.page.scss'],
})
export class ReservationDetailsPage implements OnInit {
  reservation: Reservation;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private reservationService: ReservationsService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController
  ) {
    console.log(
      this.reservationService.getReservation(
        this.route.snapshot.params?.['reservationId']
      )
    );
    this.reservation = new Reservation(
      '1',
      '25.12.2023 10:00',
      'BG1468OI',
      'Oil change',
      'Djordje Petrovic',
      '1'
    );
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('reservationId')) {
        this.navCtrl.navigateBack('/cars/tabs/explore');
        return;
      }

      this.reservationService
        .getReservation(paramMap.get('reservationId'))
        .subscribe((reservation) => {
          this.reservation = reservation;
        });
    });
  }

  async onEditReservation() {
    const modal = await this.modalCtrl.create({
      component: ReservationModalComponent,
      componentProps: {
        title: 'Edit reservation',
        date: this.reservation.date,
        license_plate: this.reservation.license_plate,
        description: this.reservation.description,
        mechanic_name: this.reservation.mechanic_name,
      },
    });

    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.reservationService
        .editReservation(
          this.reservation.id!,
          data.reservationData.date,
          data.reservationData.license_plate,
          data.reservationData.description,
          data.reservationData.mechanic_name,
          this.reservation.userId
        )
        .subscribe((res) => {
          this.reservation.date = data.reservationData.date;
          this.reservation.license_plate = data.reservationData.license_plate;
          this.reservation.description = data.reservationData.description;
          this.reservation.mechanic_name = data.reservationData.mechanic_name;
        });
    }
  }
}
