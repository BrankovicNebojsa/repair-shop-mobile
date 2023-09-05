import { Injectable } from '@angular/core';
import { BehaviorSubject, map, switchMap, take, tap } from 'rxjs';
import { Model } from './model.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment';

interface ModelData {
  brand_name: string;
  model_name: string;
  userId: string;
}

@Injectable({
  providedIn: 'root',
})
export class ModelsService {
  private _models = new BehaviorSubject<Model[]>([]);

  constructor(private http: HttpClient, private authService: AuthService) {
    this.getModels();
  }

  get models() {
    return this._models.asObservable();
  }

  addModel(brand_name: string, model_name: string) {
    let generatedId: string | null;
    let newModel: Model;
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
        newModel = new Model(null, brand_name, model_name, fetchedUserId!);
        return this.http.post<{ name: string }>(
          `https://repair-shop-87578-default-rtdb.europe-west1.firebasedatabase.app/models.json?auth=${token}`,
          newModel
        );
      }),
      take(1),
      switchMap((resData) => {
        generatedId = resData.name;
        return this.models;
      }),
      take(1),
      tap((models) => {
        newModel.id = generatedId;
        this._models.next(models.concat(newModel));
      })
    );
  }

  getModels() {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http.get<{ [key: string]: ModelData }>(
          `https://repair-shop-87578-default-rtdb.europe-west1.firebasedatabase.app/models.json?auth=${token}`
        );
      }),
      map((modelsData) => {
        const models: Model[] = [];

        for (const key in modelsData) {
          if (modelsData.hasOwnProperty(key)) {
            models.push(
              new Model(
                key,
                modelsData[key].brand_name,
                modelsData[key].model_name,
                modelsData[key].userId
              )
            );
          }
        }
        this._models.next(models);
        return models;
      }),
      tap((models) => {
        this._models.next(models);
      })
    );
  }

  getModel(id: string | null) {
    return this.http
      .get<ModelData>(
        `${environment.firebaseRealtimeDatabaseUrl}/models/${id}.json?auth=` +
          this.authService.getToken()
      )
      .pipe(
        map((resData) => {
          return new Model(
            id,
            resData.brand_name,
            resData.model_name,
            resData.userId
          );
        })
      );
  }

  deleteModel(id: string) {
    console.log(
      `${
        environment.firebaseRealtimeDatabaseUrl
      }/models/${id}.json?auth=${this.authService.getToken()}`
    );
    return this.http
      .delete(
        `${
          environment.firebaseRealtimeDatabaseUrl
        }/models/${id}.json?auth=${this.authService.getToken()}`
      )
      .pipe(
        switchMap(() => {
          return this.models;
        }),
        take(1),
        tap((models) => {
          this._models.next(models.filter((q) => q.id !== id));
        })
      );
  }

  editModel(
    modelId: string,
    brand_name: string,
    model_name: string,
    userId: string
  ) {
    return this.http
      .put(
        `${
          environment.firebaseRealtimeDatabaseUrl
        }/models/${modelId}.json?auth=${this.authService.getToken()}`,
        {
          brand_name,
          model_name,
          userId,
        }
      )
      .pipe(
        switchMap(() => this.models),
        take(1),
        tap((models) => {
          const updatedModelIndex = models.findIndex((q) => q.id === modelId);
          const updatedModels = [...models];
          updatedModels[updatedModelIndex] = new Model(
            modelId,
            brand_name,
            model_name,
            userId
          );
          this._models.next(updatedModels);
        })
      );
  }
}
