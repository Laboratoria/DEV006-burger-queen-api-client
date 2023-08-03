import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateProduct, Product } from 'src/app/interfaces/menuInterface';
import { ProductsServiceService } from 'src/app/services/products-service.service';

@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  styleUrls: ['./products-admin.component.css']
})
export class ProductsAdminComponent implements OnInit {
  products: Product[] = [];
  showAddProductModal = false;

  constructor(
    private productsService :ProductsServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();  
  }

  loadProducts() {
    this.productsService.getAllProducts().subscribe(
      (products) => {
        console.log("products",products);
        this.products = products
      },
      (error) => {
        console.log(error)
      }
    )
  }

  openAddProductModal():void {
    this.showAddProductModal = true;
  }

  closeAddProductModal(): void {
    this.showAddProductModal = false;
  }

  onAddProduct(newProduct: CreateProduct): void {
    if(!newProduct.name || !newProduct.price || !newProduct.type || !newProduct.image) {
      console.log('Por favor ingresa todos lo campos del formulario')
      return;
    }
    this.productsService.addProduct(newProduct).subscribe(
      (createProduct) => {
        this.products.push(createProduct);
        this.closeAddProductModal();
        this.loadProducts();
        console.log('Se agrego el producto', createProduct);
      },
      (error) => {
        console.log('error al agregar producto', error)
      }
    )
  }

  goToWorkers() {
    this.router.navigate(['admin/workers'])
  }

}
