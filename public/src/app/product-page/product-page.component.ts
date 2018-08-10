import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  products : any[];
  constructor(private _httpService: HttpService) {}

  ngOnInit() {
    let obs = this._httpService.getProducts();
    obs.subscribe(data => {
      this.products = data['data'];
    });
  }

  onClickDelete(id) {
    let obs = this._httpService.deleteProduct(id);
    obs.subscribe(data => {
      this.ngOnInit();
    });
  }

}
