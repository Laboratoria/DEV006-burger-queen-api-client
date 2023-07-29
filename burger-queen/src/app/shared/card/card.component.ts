import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventEmitter, Input, Output } from '@angular/core';
import { Order } from 'src/app/interfaces/orderInterface';
import { OrdersFnService } from 'src/app/services/orders-fn.service';
import { OrdersServiceService } from 'src/app/services/orders-service.service';
import { MenuItem } from 'src/app/interfaces/menuInterface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, OnDestroy {
  @Input() order!: Order;
  pendingOrders: Order[] = [];
  readyOrders: Order[] = [];

  @Output() markReady: EventEmitter<number> = new EventEmitter<number>();
  @Output() seeOrders: EventEmitter<number> = new EventEmitter<number>();
  @Output() seeOrderschef: EventEmitter<number> = new EventEmitter<number>();
  @Output() orderDelivered: EventEmitter<number> = new EventEmitter<number>();
  @Output() currentTimeUpdated: EventEmitter<number> = new EventEmitter<number>();
  //  @Output() timer: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private totalCalculator: OrdersFnService,
    public ordersService: OrdersServiceService) { }

  private timer: any;
  public tiempoTranscurrido: number = 0;

  ngOnInit(): void {
    this.startTimer();
  }
  
  ngOnDestroy(): void {
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
        // console.log('Inicio')
      }, 1000);
  }

  stopTimer() {
      clearInterval(this.timer);
      this.currentTimeUpdated.emit(this.tiempoTranscurrido);
      console.log('Se detuvo')

  }

  formatearTiempo(tiempo: number): string {
    const dias = Math.floor(tiempo / 86400);
    const horas = Math.floor((tiempo % 86400) / 3600);
    const minutos = Math.floor((tiempo % 3600) / 60);
    const segundos = tiempo % 60;

    return `${this.dosDigitos(dias)}:${this.dosDigitos(horas)}:${this.dosDigitos(minutos)}:${this.dosDigitos(segundos)}`;
  }

  dosDigitos(numero: number): string {
    return numero < 10 ? `0${numero}` : `${numero}`;
  }

  markOrderReady(orderId: number) {
    this.markReady.emit(orderId);
  }


  markOrderDelivered(orderId: number) {
    this.orderDelivered.emit(orderId)
  }

  calcularTotal(orderItems: MenuItem[]) {
    return this.totalCalculator.calcularTotal(orderItems);
  }

}
