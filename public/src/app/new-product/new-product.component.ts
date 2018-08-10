import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  product: any;
  errors : any[]
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) {}

  ngOnInit() {
    this.errors = [];
    this.product = {title: "", imageURL: "", price: ""}
  }

  onSubmit() {
    let obs = this._httpService.createProduct(this.product);
    obs.subscribe(data => {
      if(this.product.title.length < 4) {
        this.errors.push("Title must be 4 or more characters!");
      } else if (this.product.price.length < 1) {
        this.errors.push("Must enter a price!");
      } else {
        this.ngOnInit();
        this._router.navigate(['/products']);
      }
    });
  }

}
