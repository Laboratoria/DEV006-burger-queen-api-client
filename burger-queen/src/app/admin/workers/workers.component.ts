import { Component, OnInit } from '@angular/core';
import { Worker, CreateWorker } from 'src/app/interfaces/workers-interface';
import { UsersServiceService } from 'src/app/services/users-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.css']
})
export class WorkersComponent implements OnInit {
  workers: Worker[] = [];
  showAddWorkerModal = false;

  constructor(
    private workersService: UsersServiceService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadWorkers();
  }

  loadWorkers(): void { 
    this.workersService.getWorkers().subscribe(
      (workers) => {
        console.log(workers)
        this.workers = workers
      },
      (error) => {
        console.log('Error loading users:', error);
      }
    )
  }  

  openAddWorkerModal(): void {
    this.showAddWorkerModal = true
    console.log('modal')
  }

  closeAddWorkerModal(): void {
    this.showAddWorkerModal = false;
  }

  onAddWorker(newWorker: CreateWorker): void {
    if (!newWorker.name || !newWorker.email || !newWorker.role) {
      console.log('Por favor, completa todos los campos del formulario.');
      return;
  }
  this.workersService.addWorker(newWorker).subscribe(
    (createdWorker) => {
      this.workers.push(createdWorker);
      this.closeAddWorkerModal();
      this.loadWorkers();
      console.log('Se agrego trabajador', createdWorker)
    },
    (error) => {
      console.log('Error al agregar trabajador', error)
    }
  )
}

goToProducts() {
  this.router.navigate(['admin/products'])
}
}
