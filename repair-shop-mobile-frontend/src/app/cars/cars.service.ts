import { Injectable } from '@angular/core';
import { BehaviorSubject, map, switchMap, take, tap } from 'rxjs';
import { Car } from './car.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment';

interface CarData {
  license_plate: string;
  brand_name: string;
  model_name: string;
  year: string;
  transmission: string;
  color: string;
  engine_horse_power: string;
  engine_capacity: string;
  userId: string;
}

@Injectable({
  providedIn: 'root',
})
export class CarsService {
  private _cars = new BehaviorSubject<Car[]>([]);

  constructor(private http: HttpClient, private authService: AuthService) {
    this.getCars();
  }

  get cars() {
    return this._cars.asObservable();
  }

  addCar(
    license_plate: string,
    brand_name: string,
    model_name: string,
    year: string,
    transmission: string,
    color: string,
    engine_horse_power: string,
    engine_capacity: string
  ) {
    let generatedId: string | null;
    let newCar: Car;
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
        newCar = new Car(
          null,
          license_plate,
          brand_name,
          model_name,
          year,
          transmission,
          color,
          engine_horse_power,
          engine_capacity,
          fetchedUserId!
        );
        return this.http.post<{ name: string }>(
          `https://repair-shop-87578-default-rtdb.europe-west1.firebasedatabase.app/cars.json?auth=${token}`,
          newCar
        );
      }),
      take(1),
      switchMap((resData) => {
        generatedId = resData.name;
        return this.cars;
      }),
      take(1),
      tap((cars) => {
        newCar.id = generatedId;
        this._cars.next(cars.concat(newCar));
      })
    );
  }

  // DO OVDE SAM STAO

  getCars() {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http.get<{ [key: string]: CarData }>(
          `https://repair-shop-87578-default-rtdb.europe-west1.firebasedatabase.app/cars.json?auth=${token}`
        );
      }),
      map((carsData) => {
        const cars: Car[] = [];

        for (const key in carsData) {
          if (carsData.hasOwnProperty(key)) {
            cars.push(
              new Car(
                key,
                carsData[key].license_plate,
                carsData[key].brand_name,
                carsData[key].model_name,
                carsData[key].year,
                carsData[key].transmission,
                carsData[key].color,
                carsData[key].engine_horse_power,
                carsData[key].engine_capacity,
                carsData[key].userId
              )
            );
          }
        }
        this._cars.next(cars);
        return cars;
      }),
      tap((cars) => {
        this._cars.next(cars);
      })
    );
  }

  getCar(id: string | null) {
    return this.http
      .get<CarData>(
        `${environment.firebaseRealtimeDatabaseUrl}/cars/${id}.json?auth=` +
          this.authService.getToken()
      )
      .pipe(
        map((resData) => {
          return new Car(
            id,
            resData.license_plate,
            resData.brand_name,
            resData.model_name,
            resData.year,
            resData.transmission,
            resData.color,
            resData.engine_horse_power,
            resData.engine_capacity,
            resData.userId
          );
        })
      );
  }

  deleteCar(id: string) {
    console.log(
      `${
        environment.firebaseRealtimeDatabaseUrl
      }/cars/${id}.json?auth=${this.authService.getToken()}`
    );
    return this.http
      .delete(
        `${
          environment.firebaseRealtimeDatabaseUrl
        }/cars/${id}.json?auth=${this.authService.getToken()}`
      )
      .pipe(
        switchMap(() => {
          return this.cars;
        }),
        take(1),
        tap((cars) => {
          this._cars.next(cars.filter((q) => q.id !== id));
        })
      );
  }

  editCar(
    carId: string,
    license_plate: string,
    brand_name: string,
    model_name: string,
    year: string,
    transmission: string,
    color: string,
    engine_horse_power: string,
    engine_capacity: string,
    userId: string
  ) {
    return this.http
      .put(
        `${
          environment.firebaseRealtimeDatabaseUrl
        }/cars/${carId}.json?auth=${this.authService.getToken()}`,
        {
          license_plate,
          brand_name,
          model_name,
          year,
          transmission,
          color,
          engine_horse_power,
          engine_capacity,
          userId,
        }
      )
      .pipe(
        switchMap(() => this.cars),
        take(1),
        tap((cars) => {
          const updatedCarIndex = cars.findIndex((q) => q.id === carId);
          const updatedCars = [...cars];
          updatedCars[updatedCarIndex] = new Car(
            carId,
            license_plate,
            brand_name,
            model_name,
            year,
            transmission,
            color,
            engine_horse_power,
            engine_capacity,
            userId
          );
          this._cars.next(updatedCars);
        })
      );
  }
}
