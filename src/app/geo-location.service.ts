import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeoLocationService {
  constructor() {}

  public getCurrentPos(): Observable<any> {
    return new Observable((observer) => {
      navigator.geolocation.watchPosition((pos: Position) => {
        observer.next(pos);
      });
    });
  }
}
