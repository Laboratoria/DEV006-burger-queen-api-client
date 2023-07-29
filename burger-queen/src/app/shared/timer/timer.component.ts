import { Component, OnDestroy, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { Order } from 'src/app/interfaces/orderInterface';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, OnDestroy {
  @Input() order!: Order;

  @Output() markReady: EventEmitter<number> = new EventEmitter<number>();


  private timer: any;
  public tiempoTranscurrido: number = 0;

  ngOnInit(): void {
    this.tiempoTranscurrido = 0;
    this.startTimer()
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  calculateTimeDifference():number {
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    const dateEntryInSeconds = Math.floor(new Date(this.order.dateEntry).getTime() / 1000);
    return currentTimeInSeconds - dateEntryInSeconds;
  }

  startTimer() {
      this.tiempoTranscurrido = this.calculateTimeDifference();
      this.timer = setInterval(() => {
        this.tiempoTranscurrido++;
        // console.log('Inicio', this.isRunning, this.timer, this.tiempoTranscurrido)
      }, 1000);
  }

  stopTimer() {
      console.log('Se detuvo',this.timer)
      clearInterval(this.timer);

  }

  formatearTiempo(tiempo: number): string {
    const dias = Math.floor(tiempo / 86400);
    const horas = Math.floor((tiempo % 86400) / 3600);
    const minutos = Math.floor((tiempo % 3600) / 60);
    const segundos = tiempo % 60;

    return `${this.dosDigitos(horas)}:${this.dosDigitos(minutos)}:${this.dosDigitos(segundos)}`;
  }

  dosDigitos(numero: number): string {
    return numero < 10 ? `0${numero}` : `${numero}`;
  }

  markOrderReady(orderId: number) {
    this.markReady.emit(orderId);
  }
}
