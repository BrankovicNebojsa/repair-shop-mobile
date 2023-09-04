import { Injectable } from '@angular/core';
import { Brand } from './brand.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, switchMap, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment';

interface BrandData {
  name: string;
  userId: string;
}

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  private _brands = new BehaviorSubject<Brand[]>([]);

  constructor(private http: HttpClient, private authService: AuthService) {
    this.getBrands();
  }

  get brands() {
    return this._brands.asObservable();
  }

  addBrand(name: string) {
    let generatedId: string | null;
    let newBrand: Brand;
    let fetchedUserId: string | null;

    return this.authService.userId.pipe(
      take(1),
      switchMap((userId) => {
        fetchedUserId = userId;
        return this.authService.token;
      }),
      take(1),
      switchMap((token) => {
        newBrand = new Brand(null, name, fetchedUserId!);
        return this.http.post<{ name: string }>(
          `https://repair-shop-87578-default-rtdb.europe-west1.firebasedatabase.app/brands.json?auth=${token}`,
          newBrand
        );
      }),
      take(1),
      switchMap((resData) => {
        generatedId = resData.name;
        return this.brands;
      }),
      take(1),
      tap((brands) => {
        newBrand.id = generatedId;
        this._brands.next(brands.concat(newBrand));
      })
    );
  }

  getBrands() {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http.get<{ [key: string]: BrandData }>(
          `https://repair-shop-87578-default-rtdb.europe-west1.firebasedatabase.app/brands.json?auth=${token}`
        );
      }),
      map((brandsData) => {
        const brands: Brand[] = [];

        for (const key in brandsData) {
          if (brandsData.hasOwnProperty(key)) {
            brands.push(
              new Brand(key, brandsData[key].name, brandsData[key].userId)
            );
          }
        }
        this._brands.next(brands);
        return brands;
      }),
      tap((brands) => {
        this._brands.next(brands);
      })
    );
  }

  getBrand(id: string | null) {
    return this.http
      .get<BrandData>(
        `${environment.firebaseRealtimeDatabaseUrl}/brands/${id}.json?auth=` +
          this.authService.getToken()
      )
      .pipe(
        map((resData) => {
          return new Brand(id, resData.name, resData.userId);
        })
      );
  }

  deleteBrand(id: string) {
    console.log(`${environment.firebaseRealtimeDatabaseUrl}/brands/${id}.json?auth=${this.authService.getToken()}`);
    return this.http
      .delete(`${environment.firebaseRealtimeDatabaseUrl}/brands/${id}.json?auth=${this.authService.getToken()}`)
      .pipe(
        switchMap(() => {
          return this.brands;
        }),
        take(1),
        tap((brands) => {
          this._brands.next(brands.filter((q) => q.id !== id));
        })
      );
  }

  editBrand(brandId: string, name: string, userId: string) {
    return this.http
      .put(`${environment.firebaseRealtimeDatabaseUrl}/brands/${brandId}.json?auth=${this.authService.getToken()}`,
        {name, userId})
      .pipe(
        switchMap(() => this.brands),
        take(1),
        tap((brands) => {
          const updatedBrandIndex = brands.findIndex((q) => q.id === brandId);
          const updatedBrands = [...brands];
          updatedBrands[updatedBrandIndex] = new Brand(
            brandId,
            name,
            userId
          );
          this._brands.next(updatedBrands);
        })
      );
  }
  
}
