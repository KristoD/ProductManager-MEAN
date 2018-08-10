import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http : HttpClient) {}

  getProducts() {
    return this._http.get('/api/products');
  }

  getSingleProduct(id) {
    return this._http.get('/api/product/' + id);
  }

  createProduct(product) {
    return this._http.post('/api/newProduct', product);
  }

  updateProduct(id, product) {
    return this._http.put('/api/product/' + id, product);
  }

  deleteProduct(id) {
    return this._http.delete('/api/product/' + id + '/delete');
  }

}
