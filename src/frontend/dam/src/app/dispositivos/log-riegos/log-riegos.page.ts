import { Component, OnInit } from '@angular/core';
import { Observable, interval, map } from 'rxjs';
import { LogRiegosService } from 'src/app/services/log-riegos.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-log-riegos',
  templateUrl: './log-riegos.page.html',
  styleUrls: ['./log-riegos.page.scss'],
})

export class LogRiegosPage implements OnInit {

  riegos!: any[];
  idLogRiego!: number;
  observable$: Observable<any>

  constructor(private _actRouter: ActivatedRoute, private _logRiegos: LogRiegosService) {
    this.observable$ = interval(1000);

    const valuePlusTen$ = this.observable$.pipe(map((val) => val + 10));
   }

  ngOnInit() {
    this._actRouter.params.subscribe((params: { [key: string]: string }) => {
      this.idLogRiego = +params['id'];
      this.cargarRiegos();
    });
  }

  cargarRiegos() {
    this._logRiegos.getLogRiegoById(this.idLogRiego).then((data: any[]) => {
      this.riegos = data;
    });
  }

  ionViewWillEnter() {
    console.log(`Me llegó el id: ${Number(this._actRouter.snapshot.paramMap.get('id'))}`)
  }

  ngOnDestroy(): void {
  }

}
