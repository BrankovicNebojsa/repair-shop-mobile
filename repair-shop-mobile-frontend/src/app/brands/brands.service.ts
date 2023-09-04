import { Injectable } from '@angular/core';
import { Brand } from './brand.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

interface BrandData {
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  _brands: Brand[] = [];

  constructor(private http: HttpClient) {
    this.getBrands();
  }

  get brands(): Brand[] {
    return this._brands;
  }

  addBrand(name: string) {
    return this.http
      .post<{ name: string }>(
        `https://repair-shop-87578-default-rtdb.europe-west1.firebasedatabase.app/brands.json`,
        { name }
      )
      .pipe(
        map((resData) => {
          this._brands.push({
            id: resData.name,
            name,
          });
          return this._brands;
        })
      );
  }

  getBrands() {
    return this.http
      .get<{ [key: number]: BrandData }>(
        `https://repair-shop-87578-default-rtdb.europe-west1.firebasedatabase.app/brands.json`
      )
      .pipe(
        map((brandsData) => {
          const brands: Brand[] = [];

          for (const key in brandsData) {
            if (brandsData.hasOwnProperty(key)) {
              brands.push({
                id: key,
                name: brandsData[key].name,
              });
            }
          }
          this._brands = brands;
          return brands;
        })
      );
  }

  getBrand(id: string) {
    return this._brands.find((b) => b.id === id);
  }

  deleteBrand(id: string) {
    this.http.delete('https://repair-shop-87578-default-rtdb.europe-west1.firebasedatabase.app/brands.json/{{id}}')
        .subscribe(() => console.log('Delete successful'));  
  }
}
