import { Injectable } from '@angular/core';
import { Brand } from './brand.model';
import { HttpClient } from '@angular/common/http';

interface BrandData {
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  brands: Brand[] = [
    { id: '1', name: 'Audi' },
    { id: '2', name: 'BMW' },
    { id: '3', name: 'Mercedes-Benz' },
  ];

  constructor(private http: HttpClient) {
    this.setBrands();
  }

  addBrand(name: string) {
    return this.http.post<{ name: string }>(
      `http://localhost:8080/api/v1/brands`,
      { name }
    );
  }

  setBrands() {
    this.getBrands().subscribe((brandsData) => {
      console.log(brandsData);
      const brands: Brand[] = [];

      for (const key in brandsData) {
        if (brandsData.hasOwnProperty(key)) {
          brands.push({
            id: key,
            name: brandsData[key].name,
          });
        }
      }
      this.brands = brands;
    });
  }

  getBrands() {
    return this.http.get<{ [key: number]: BrandData }>(
      `http://localhost:8080/api/v1/brands`
    );
  }

  getBrand(id: string) {
    return this.brands.find((b) => b.id === id);
  }
}
