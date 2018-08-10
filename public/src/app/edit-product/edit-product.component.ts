import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router'

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  product : any;
  errors : any[];
  productID : string;
  constructor(
    private _httpService: HttpService,
    private _route : ActivatedRoute,
    private _router : Router) { }

  ngOnInit() {
    this.product = {title: "", price : "", imageURL: ""}
    this.errors = [];
    this._route.params.subscribe((params: Params) => {
      let obs = this._httpService.getSingleProduct(params['id']);
      this.productID = params['id'];
      obs.subscribe(data => {
        this.product = data['data'];
      });
    });
  }

  onSubmit() {
    let obs = this._httpService.updateProduct(this.productID, this.product);
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

  onClickDelete(id) {
    let obs = this._httpService.deleteProduct(id);
    obs.subscribe(data => {
      this._router.navigate(['/products']);
    });
  }

}
