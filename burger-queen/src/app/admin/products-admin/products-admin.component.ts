import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'src/app/interfaces/menuInterface';
import { ProductsServiceService } from 'src/app/services/products-service.service';

@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  styleUrls: ['./products-admin.component.css']
})
export class ProductsAdminComponent implements OnInit {
  products: MenuItem[] = [];

  constructor(
    private productsServices :ProductsServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();  
  }

  loadProducts() {
    this.productsServices.getAllProducts().subscribe(
      (products) => {
        console.log("products",products);
        this.products = products
      },
      (error) => {
        console.log(error)
      }
    )
  }

  goToWorkers() {
    this.router.navigate(['admin/workers'])
  }

}
