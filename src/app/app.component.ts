import { Component, OnInit } from '@angular/core';
import { ProductsService } from './services/products.service';
import './models/products-response'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'wishlist-app';
  products = Array<Product>();

  constructor(private service: ProductsService) {
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.service.list().then((res:ProductsResponse) => {
      this.products = res.products;
    })
  }
}
