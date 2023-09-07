import { format, parseISO } from 'date-fns';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReservationsService } from '../reservations.service';
import { Car } from 'src/app/cars/car.model';
import { CarsService } from 'src/app/cars/cars.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  addReservationForm: FormGroup;
  cars: Car[] = [
    new Car(
      '1',
      'BG1468',
      'Audi',
      'A5',
      '2006',
      'AUTOMATIC',
      'BLACK',
      '140',
      '1932',
      '1'
    ),
  ];

  constructor(
    private reservationService: ReservationsService,
    private carService: CarsService
  ) {
    this.addReservationForm = new FormGroup({
      date: new FormControl(null, Validators.required),
      license_plate: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      mechanic_name: new FormControl(null, Validators.required),
    });
  }

  ngOnInit() {
    this.carService.getCars().subscribe((cars) => {
      this.cars = cars;
    });
  }

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
