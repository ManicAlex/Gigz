import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDetailsService {

  constructor() { }

  data = {}

  getData() {
    return this.data;
  }

  setData(data) {
    this.data = data;
  }
  
}
