import { Injectable } from '@angular/core';
import { BehaviorSubject, map, switchMap, take, tap } from 'rxjs';
import { Service } from './service.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment';

interface ServiceData {
  name: string;
  price: string;
  userId: string;
}

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  private _services = new BehaviorSubject<Service[]>([]);

  constructor(private http: HttpClient, private authService: AuthService) {
    this.getServices();
  }

  get services() {
    return this._services.asObservable();
  }

  addService(name: string, price: string) {
    let generatedId: string | null;
    let newService: Service;
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
        newService = new Service(null, name, price, fetchedUserId!);
        return this.http.post<{ name: string }>(
          `https://repair-shop-87578-default-rtdb.europe-west1.firebasedatabase.app/services.json?auth=${token}`,
          newService
        );
      }),
      take(1),
      switchMap((resData) => {
        generatedId = resData.name;
        return this.services;
      }),
      take(1),
      tap((services) => {
        newService.id = generatedId;
        this._services.next(services.concat(newService));
      })
    );
  }

  getServices() {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http.get<{ [key: string]: ServiceData }>(
          `https://repair-shop-87578-default-rtdb.europe-west1.firebasedatabase.app/services.json?auth=${token}`
        );
      }),
      map((servicesData) => {
        const services: Service[] = [];

        for (const key in servicesData) {
          if (servicesData.hasOwnProperty(key)) {
            services.push(
              new Service(
                key,
                servicesData[key].name,
                servicesData[key].price,
                servicesData[key].userId
              )
            );
          }
        }
        this._services.next(services);
        return services;
      }),
      tap((services) => {
        this._services.next(services);
      })
    );
  }

  getService(id: string | null) {
    return this.http
      .get<ServiceData>(
        `${environment.firebaseRealtimeDatabaseUrl}/services/${id}.json?auth=` +
          this.authService.getToken()
      )
      .pipe(
        map((resData) => {
          return new Service(id, resData.name, resData.price, resData.userId);
        })
      );
  }

  deleteService(id: string) {
    console.log(
      `${
        environment.firebaseRealtimeDatabaseUrl
      }/services/${id}.json?auth=${this.authService.getToken()}`
    );
    return this.http
      .delete(
        `${
          environment.firebaseRealtimeDatabaseUrl
        }/services/${id}.json?auth=${this.authService.getToken()}`
      )
      .pipe(
        switchMap(() => {
          return this.services;
        }),
        take(1),
        tap((services) => {
          this._services.next(services.filter((q) => q.id !== id));
        })
      );
  }

  editService(serviceId: string, name: string, price: string, userId: string) {
    return this.http
      .put(
        `${
          environment.firebaseRealtimeDatabaseUrl
        }/services/${serviceId}.json?auth=${this.authService.getToken()}`,
        {
          name,
          price,
          userId,
        }
      )
      .pipe(
        switchMap(() => this.services),
        take(1),
        tap((services) => {
          const updatedServiceIndex = services.findIndex(
            (q) => q.id === serviceId
          );
          const updatedServices = [...services];
          updatedServices[updatedServiceIndex] = new Service(
            serviceId,
            name,
            price,
            userId
          );
          this._services.next(updatedServices);
        })
      );
  }
}
