import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class LogRiegosService {

  apiUrl = 'http://localhost:8000'; 

  constructor(private _http: HttpClient) { }


  getLogRiegoById(idValvula: number): Promise<any>{
    return firstValueFrom(this._http.get(`${this.apiUrl}/logRiegos/${idValvula}`))
  }

  insertarLogRiego(apertura: number, fecha: Date, electrovalvulaId: number): Promise<any> {
    return firstValueFrom(this._http.post(`${this.apiUrl}/registrar-logRiegos`, { apertura, fecha, electrovalvulaId }));
  }
}
