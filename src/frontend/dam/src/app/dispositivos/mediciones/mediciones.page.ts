import { Component, OnInit } from '@angular/core';
import { Observable, interval, map } from 'rxjs';
import { MedicionesService } from 'src/app/services/mediciones.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-mediciones',
  templateUrl: './mediciones.page.html',
  styleUrls: ['./mediciones.page.scss'],
})

export class MedicionesPage implements OnInit {

  mediciones!: any[];
  idDispositivo!: number;
  observable$: Observable<any>

  constructor(private _actRouter: ActivatedRoute, private _medicionesService: MedicionesService) {
    this.observable$ = interval(1000);

    const valuePlusTen$ = this.observable$.pipe(map((val) => val + 10));
  }

  ngOnInit() {
    this._actRouter.params.subscribe((params: { [key: string]: string }) => {
      this.idDispositivo = +params['id'];
      this.cargarMediciones();
    });
  }


  cargarMediciones() {
    this._medicionesService.getMedicionesById(this.idDispositivo).then((data: any[]) => {
      this.mediciones = data;
    });
  }

  ionViewWillEnter() {
    console.log(`Me llegó el id: ${Number(this._actRouter.snapshot.paramMap.get('id'))}`)
  }

  ngOnDestroy(): void {
  }

}
