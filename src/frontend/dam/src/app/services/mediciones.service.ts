import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';



@Injectable({
  providedIn: 'root'
})


export class MedicionesService {

  apiUrl = 'http://localhost:8000'; 

  constructor(private _http: HttpClient) { }

  getMediciones (): Promise<any> {
    return firstValueFrom(this._http.get(`${this.apiUrl}/mediciones`))
  }

  getMedicionesById(dispositivoId: number): Promise<any>{
    return firstValueFrom(this._http.get(`${this.apiUrl}/mediciones/${dispositivoId}`))
  }

  getUltimaMedicion(dispositivoId: number): Promise<any>{
    return firstValueFrom(this._http.get(`${this.apiUrl}/mediciones/${dispositivoId}/ultima`))
  }

  insertarMedicion(fecha: Date, valor: number, dispositivoId: number): Promise<any> {
    return firstValueFrom(this._http.post(`${this.apiUrl}/registrar-medicion`, { fecha, valor, dispositivoId }));
  }

}
