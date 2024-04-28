import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ValvulasService {

  apiUrl = 'http://localhost:8000';

  constructor(private _http: HttpClient) { }

  getValvulas (): Promise<any> {
    return firstValueFrom(this._http.get(`${this.apiUrl}/dispositivos`))
  }

  getValvulasById(dispositivoId: number): Promise<any>{
    return firstValueFrom(this._http.get(`${this.apiUrl}/mediciones/${dispositivoId}`))
  }
}
