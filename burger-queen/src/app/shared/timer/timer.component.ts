import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, OnDestroy {

  private timer: any;
  public tiempoTranscurrido: number = 0;
  public isRunning: boolean = false;

  ngOnInit(): void {
    this.tiempoTranscurrido = 0;
    this.startTimer()
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  startTimer() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.timer = setInterval(() => {
        this.tiempoTranscurrido++;
        // console.log('Inicio', this.isRunning, this.timer, this.tiempoTranscurrido)
      }, 1000);
    }
  }

  stopTimer() {
    if (this.isRunning) {
      this.isRunning = false;
      clearInterval(this.timer);
      // console.log('Se detuvo', this.isRunning, this.timer)
    }
  }

  resetTimer() {
    this.stopTimer();
    this.tiempoTranscurrido = 0;
  }

  formatearTiempo(tiempo: number): string {
    const horas = Math.floor(tiempo / 3600);
    const minutos = Math.floor((tiempo % 3600) / 60);
    const segundos = tiempo % 60;

    return `${this.dosDigitos(horas)}:${this.dosDigitos(minutos)}:${this.dosDigitos(segundos)}`;
  }

  dosDigitos(numero: number): string {
    return numero < 10 ? `0${numero}` : `${numero}`;
  }
}
