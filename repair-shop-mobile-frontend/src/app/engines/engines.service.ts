import { Injectable } from '@angular/core';
import { BehaviorSubject, map, switchMap, take, tap } from 'rxjs';
import { Engine } from './engine.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment';

interface EngineData {
  horse_power: string;
  engine_capacity: string;
  number_of_cylinders: string;
  userId: string;
}

@Injectable({
  providedIn: 'root',
})
export class EnginesService {
  private _engines = new BehaviorSubject<Engine[]>([]);

  constructor(private http: HttpClient, private authService: AuthService) {
    this.getEngines();
  }

  get engines() {
    return this._engines.asObservable();
  }

  addEngine(
    horse_power: string,
    engine_capacity: string,
    number_of_cylinders: string
  ) {
    let generatedId: string | null;
    let newEngine: Engine;
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
        newEngine = new Engine(
          null,
          horse_power,
          engine_capacity,
          number_of_cylinders,
          fetchedUserId!
        );
        return this.http.post<{ name: string }>(
          `https://repair-shop-87578-default-rtdb.europe-west1.firebasedatabase.app/engines.json?auth=${token}`,
          newEngine
        );
      }),
      take(1),
      switchMap((resData) => {
        generatedId = resData.name;
        return this.engines;
      }),
      take(1),
      tap((engines) => {
        newEngine.id = generatedId;
        this._engines.next(engines.concat(newEngine));
      })
    );
  }

  getEngines() {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http.get<{ [key: string]: EngineData }>(
          `https://repair-shop-87578-default-rtdb.europe-west1.firebasedatabase.app/engines.json?auth=${token}`
        );
      }),
      map((enginesData) => {
        const engines: Engine[] = [];

        for (const key in enginesData) {
          if (enginesData.hasOwnProperty(key)) {
            engines.push(
              new Engine(
                key,
                enginesData[key].horse_power,
                enginesData[key].engine_capacity,
                enginesData[key].number_of_cylinders,
                enginesData[key].userId
              )
            );
          }
        }
        this._engines.next(engines);
        return engines;
      }),
      tap((engines) => {
        this._engines.next(engines);
      })
    );
  }

  getEngine(id: string | null) {
    return this.http
      .get<EngineData>(
        `${environment.firebaseRealtimeDatabaseUrl}/engines/${id}.json?auth=` +
          this.authService.getToken()
      )
      .pipe(
        map((resData) => {
          return new Engine(
            id,
            resData.horse_power,
            resData.engine_capacity,
            resData.number_of_cylinders,
            resData.userId
          );
        })
      );
  }

  deleteEngine(id: string) {
    console.log(
      `${
        environment.firebaseRealtimeDatabaseUrl
      }/engines/${id}.json?auth=${this.authService.getToken()}`
    );
    return this.http
      .delete(
        `${
          environment.firebaseRealtimeDatabaseUrl
        }/engines/${id}.json?auth=${this.authService.getToken()}`
      )
      .pipe(
        switchMap(() => {
          return this.engines;
        }),
        take(1),
        tap((engines) => {
          this._engines.next(engines.filter((q) => q.id !== id));
        })
      );
  }

  editEngine(
    engineId: string,
    horse_power: string,
    engine_capacity: string,
    number_of_cylinders: string,
    userId: string
  ) {
    return this.http
      .put(
        `${
          environment.firebaseRealtimeDatabaseUrl
        }/engines/${engineId}.json?auth=${this.authService.getToken()}`,
        {
          horse_power,
          engine_capacity,
          number_of_cylinders,
          userId,
        }
      )
      .pipe(
        switchMap(() => this.engines),
        take(1),
        tap((engines) => {
          const updatedEngineIndex = engines.findIndex(
            (q) => q.id === engineId
          );
          const updatedEngine = [...engines];
          updatedEngine[updatedEngineIndex] = new Engine(
            engineId,
            horse_power,
            engine_capacity,
            number_of_cylinders,
            userId
          );
          this._engines.next(updatedEngine);
        })
      );
  }
}
