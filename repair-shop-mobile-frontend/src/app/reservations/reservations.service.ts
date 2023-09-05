import { Injectable } from '@angular/core';
import { BehaviorSubject, map, switchMap, take, tap } from 'rxjs';
import { Reservation } from './reservation.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment';

interface ReservationData {
  date: string;
  license_plate: string;
  description: string;
  mechanic_name: string;
  userId: string;
}

@Injectable({
  providedIn: 'root',
})
export class ReservationsService {
  private _reservations = new BehaviorSubject<Reservation[]>([]);

  constructor(private http: HttpClient, private authService: AuthService) {
    this.getReservations();
  }

  get reservations() {
    return this._reservations.asObservable();
  }

  addReservation(
    date: string,
    license_plate: string,
    description: string,
    mechanic_name: string
  ) {
    let generatedId: string | null;
    let newReservation: Reservation;
    let fetchedUserId: string | null;

    return this.authService.userId.pipe(
      take(1),
      switchMap((userId) => {
        fetchedUserId = userId;
        return this.authService.token;
      }),
      take(1),
      switchMap((token) => {
        console.log(`${token}`);
        newReservation = new Reservation(
          null,
          date,
          license_plate,
          description,
          mechanic_name,
          fetchedUserId!
        );
        return this.http.post<{ name: string }>(
          `https://repair-shop-87578-default-rtdb.europe-west1.firebasedatabase.app/reservations.json?auth=${token}`,
          newReservation
        );
      }),
      take(1),
      switchMap((resData) => {
        generatedId = resData.name;
        return this.reservations;
      }),
      take(1),
      tap((reservations) => {
        newReservation.id = generatedId;
        this._reservations.next(reservations.concat(newReservation));
      })
    );
  }

  getReservations() {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http.get<{ [key: string]: ReservationData }>(
          `https://repair-shop-87578-default-rtdb.europe-west1.firebasedatabase.app/reservations.json?auth=${token}`
        );
      }),
      map((reservationsData) => {
        const reservations: Reservation[] = [];

        for (const key in reservationsData) {
          if (reservationsData.hasOwnProperty(key)) {
            reservations.push(
              new Reservation(
                key,
                reservationsData[key].date,
                reservationsData[key].license_plate,
                reservationsData[key].description,
                reservationsData[key].mechanic_name,
                reservationsData[key].userId
              )
            );
          }
        }
        this._reservations.next(reservations);
        return reservations;
      }),
      tap((reservations) => {
        this._reservations.next(reservations);
      })
    );
  }

  getReservation(id: string | null) {
    return this.http
      .get<ReservationData>(
        `${environment.firebaseRealtimeDatabaseUrl}/reservations/${id}.json?auth=` +
          this.authService.getToken()
      )
      .pipe(
        map((resData) => {
          return new Reservation(
            id,
            resData.date,
            resData.license_plate,
            resData.description,
            resData.mechanic_name,
            resData.userId
          );
        })
      );
  }

  deleteReservation(id: string) {
    console.log(
      `${
        environment.firebaseRealtimeDatabaseUrl
      }/reservations/${id}.json?auth=${this.authService.getToken()}`
    );
    return this.http
      .delete(
        `${
          environment.firebaseRealtimeDatabaseUrl
        }/reservations/${id}.json?auth=${this.authService.getToken()}`
      )
      .pipe(
        switchMap(() => {
          return this.reservations;
        }),
        take(1),
        tap((reservations) => {
          this._reservations.next(reservations.filter((q) => q.id !== id));
        })
      );
  }

  editReservation(
    reservationId: string,
    date: string,
    license_plate: string,
    description: string,
    mechanic_name: string,
    userId: string
  ) {
    return this.http
      .put(
        `${
          environment.firebaseRealtimeDatabaseUrl
        }/reservations/${reservationId}.json?auth=${this.authService.getToken()}`,
        {
          date,
          license_plate,
          description,
          mechanic_name,
          userId,
        }
      )
      .pipe(
        switchMap(() => this.reservations),
        take(1),
        tap((reservations) => {
          const updatedReservationIndex = reservations.findIndex(
            (q) => q.id === reservationId
          );
          const updatedReservations = [...reservations];
          updatedReservations[updatedReservationIndex] = new Reservation(
            reservationId,
            date,
            license_plate,
            description,
            mechanic_name,
            userId
          );
          this._reservations.next(updatedReservations);
        })
      );
  }
}
