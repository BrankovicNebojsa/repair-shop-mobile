import { Component, OnInit } from '@angular/core';
import { Reservation } from '../reservation.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ReservationsService } from '../reservations.service';

@Component({
  selector: 'app-reservation-modal',
  templateUrl: './reservation-modal.component.html',
  styleUrls: ['./reservation-modal.component.scss'],
})
export class ReservationModalComponent implements OnInit {
  reservation: Reservation;

  editReservationForm: FormGroup;

  title: string = 'Edit reservation';

  constructor(
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private reservationService: ReservationsService
  ) {
    this.editReservationForm = new FormGroup({
      date: new FormControl(null, [Validators.required]),
      license_plate: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      mechanic_name: new FormControl(null, [Validators.required]),
    });
    this.reservation = new Reservation(
      '1',
      '23.12.2023 10:00',
      'BG1468OI',
      'Oil change',
      'Djordje Petrovic',
      '1'
    );
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('reservationId')) {
        this.navCtrl.navigateBack('/reservations/tabs/explore');
        return;
      }

      this.reservationService
        .getReservation(paramMap.get('reservationId'))
        .subscribe((reservation) => {
          this.reservation = reservation;
        });
    });
  }

  isFormValid() {
    if (this.editReservationForm.valid) {
      return false;
    } else {
      return true;
    }
  }

  onCancel() {
    this.modalCtrl.dismiss();
  }

  onSubmit() {
    if (!this.editReservationForm.valid) {
      return;
    }

    this.modalCtrl.dismiss(
      {
        reservationData: {
          date: this.editReservationForm.get('date')?.value,
          license_plate: this.editReservationForm.get('license_plate')?.value,
          description: this.editReservationForm.get('description')?.value,
          mechanic_name: this.editReservationForm.get('mechanic_name')?.value,
        },
      },
      'confirm'
    );
  }
}
