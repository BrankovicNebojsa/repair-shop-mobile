import { format, parseISO } from 'date-fns';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReservationsService } from '../reservations.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  addReservationForm: FormGroup;

  constructor(private reservationService: ReservationsService) {
    this.addReservationForm = new FormGroup({
      date: new FormControl(null, Validators.required),
      license_plate: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      mechanic_name: new FormControl(null, Validators.required),
    });
  }

  ngOnInit() {}

  onAddReservation() {
    this.reservationService
      .addReservation(
        format(
          parseISO(this.addReservationForm.get('date')?.value),
          'dd.MM.yyyy HH:mm'
        ),
        this.addReservationForm.get('license_plate')?.value,
        this.addReservationForm.get('description')?.value,
        this.addReservationForm.get('mechanic_name')?.value
      )
      .subscribe((res) => {
        console.log(res);
      });
    this.resetForm();
  }

  resetForm() {
    this.addReservationForm = new FormGroup({
      date: new FormControl(null, Validators.required),
      license_plate: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      mechanic_name: new FormControl(null, Validators.required),
    });
  }
}
