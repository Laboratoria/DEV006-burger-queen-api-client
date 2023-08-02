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

  constructor(
    private totalCalculator: OrdersFnService,
    public ordersService: OrdersServiceService) { }

  private timer: any;
  public tiempoTranscurrido: number = 0;


  ngOnInit(): void {
    // debugger;
    this.tiempoTranscurrido = this.calculateTimeDifference();
    this.order.currentTime = this.formatearTiempo(this.tiempoTranscurrido)
    if(this.order.status !== 'ready') {
      this.startTimer()
    }
  }
  
  ngOnDestroy(): void {
    this.stopTimer();
  }
  
  startTimer() {
      this.timer = setInterval(() => {
        this.tiempoTranscurrido++;
      }, 1000);
  }

  updateCurrentTime() {
    this.ordersService.updateOrder(this.order).subscribe(
      (res) => {
        console.log(res, "Actualizado")
      }
    )
  }

  stopTimer() {
      clearInterval(this.timer);
      console.log('Se detuvo')

  }
  calculateTimeDifference():number {
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    const dateEntryInSeconds = Math.floor(new Date(this.order.dateEntry).getTime() / 1000);
    return currentTimeInSeconds - dateEntryInSeconds;
  }

  // calculateTimeDifference(): { dias: number, horas: number, minutos: number, segundos: number } {
  //   const currentTimeInSeconds = Math.floor(Date.now() / 1000);
  //   const dateEntryInSeconds = Math.floor(new Date(this.order.dateEntry).getTime() / 1000);
  //   const timeDifference = currentTimeInSeconds - dateEntryInSeconds;
  
  //   const dias = Math.floor(timeDifference / 86400);
  //   const horas = Math.floor((timeDifference % 86400) / 3600);
  //   const minutos = Math.floor((timeDifference % 3600) / 60);
  //   const segundos = timeDifference % 60;
  
  //   return { dias, horas, minutos, segundos };
  // }

  formatearTiempo(tiempo: number): string {
    const dias = Math.floor(tiempo / 86400);
    const horas = Math.floor((tiempo % 86400) / 3600);
    const minutos = Math.floor((tiempo % 3600) / 60);
    const segundos = tiempo % 60;

    const days = dias > 0 ? `${dias}d ` : '';
    const hrs = horas > 0 ? `${horas}h ` : '';
    const mins = minutos > 0 ? `${minutos}m ` : '';
    const secs = segundos > 0 ? `${segundos}s` : '';


    return `${days}${hrs}${mins}${secs}`;
  }

  markOrderReady(orderId: number) {
    this.markReady.emit(orderId);
    this.updateCurrentTime()
  }


  markOrderDelivered(orderId: number) {
    this.orderDelivered.emit(orderId)
    this.updateCurrentTime()
  }

  calcularTotal(orderItems: MenuItem[]) {
    return this.totalCalculator.calcularTotal(orderItems);
  }

}
