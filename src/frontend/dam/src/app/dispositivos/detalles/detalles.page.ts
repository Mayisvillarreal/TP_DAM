import { Component, OnInit } from '@angular/core';
import { Observable, interval, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import * as Highcharts from 'highcharts';
declare var require: any;
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);

import { MedicionesService } from 'src/app/services/mediciones.service';
import { LogRiegosService } from 'src/app/services/log-riegos.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
})
export class DetallesPage implements OnInit {

  observable$: Observable<any>

  private valorObtenido: number = 0;
  public myChart: any;
  private chartOptions: any;
  private sensorId: string;
  valvulaAbierta: boolean = false;


  constructor(private _actRouter: ActivatedRoute, private _medicionesService: MedicionesService, private _logRiegos: LogRiegosService) {
    this.observable$ = interval(1000)

    const valuePlusTen$ = this.observable$.pipe(map((val) => val + 10))

    this.sensorId = this._actRouter.snapshot.paramMap.get('id') ?? '';
    console.log('ID', this.sensorId);
    


    setTimeout(() => {
      console.log("Cambio el valor del sensor");
      this.valorObtenido;
      //llamo al update del chart para refrescar y mostrar el nuevo valor
      this.myChart.update({
        series: [{
          name: 'kPA',
          data: [this.valorObtenido],
          tooltip: {
            valueSuffix: ' kPA'
          }
        }]
      });
    }, 6000);
  }

  ngOnInit() {
    this._medicionesService.getUltimaMedicion(parseInt(this.sensorId)).then(async (mediciones) => {
      if (mediciones.length > 0) {
        this.valorObtenido = parseFloat(mediciones[0].valor);
        console.log('valor', this.valorObtenido);
      }
    });
  }

  ionViewDidEnter() {
    this.generarChart();
  }

  toggleValve() {
    this.valvulaAbierta = !this.valvulaAbierta;
    var mensaje = this.valvulaAbierta ? 1 : 0;
    console.log(mensaje);

    if (mensaje == 1) {
      this.insertarMedicion();
    }

    this.insertarLogRiego(mensaje);
  }

  generarChart() {
    this.chartOptions = {
      chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false
      }
      , title: {
        text: `Sensor N° ${this.sensorId}`
      }
      , credits: { enabled: false }


      , pane: {
        startAngle: -150,
        endAngle: 150
      }
      // the value axis
      , yAxis: {
        min: 0,
        max: 100,

        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: 'inside',
        minorTickColor: '#666',

        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
          step: 2,
          rotation: 'auto'
        },
        title: {
          text: 'kPA'
        },
        plotBands: [{
          from: 0,
          to: 10,
          color: '#55BF3B' // green
        }, {
          from: 10,
          to: 30,
          color: '#DDDF0D' // yellow
        }, {
          from: 30,
          to: 100,
          color: '#DF5353' // red
        }]
      }
      ,

      series: [{
        name: 'kPA',
        data: [this.valorObtenido],
        tooltip: {
          valueSuffix: ' kPA'
        }
      }]

    };
    this.myChart = Highcharts.chart('highcharts', this.chartOptions);
  }

  insertarMedicion() {
    const fecha = new Date();
    const valor = Math.floor(Math.random() * 101);
    const dispositivoId = parseFloat(this.sensorId);

    this._medicionesService.insertarMedicion(fecha, valor, dispositivoId).then(
      () => {
        console.log('Medición insertada correctamente');
      },
      error => {
        console.error('Error al insertar la medición:', error);
      }
    );
    console.log(fecha, valor, dispositivoId)
  }

  insertarLogRiego(apertura: number) {
    const valor = apertura;
    const fecha = new Date();
    const electrovalvulaId = parseFloat(this.sensorId);

    this._logRiegos.insertarLogRiego(valor, fecha, electrovalvulaId).then(
      () => {
        console.log('LogRiego insertado correctamene');
      },
      error => {
        console.error('Error al insertar el LogRiego');
      }
    );
    console.log(valor, fecha, electrovalvulaId)
  }


  ionViewWillEnter() {

    console.log(`Me llegó el id: ${Number(this._actRouter.snapshot.paramMap.get('id'))}`)
  }



  ngOnDestroy(): void {
  }

}
