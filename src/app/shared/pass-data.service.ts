import { Injectable } from '@angular/core';

@Injectable()
export class PassDataService {

  public sharedData = {
    // properties
    navBarSearchText: ''
  };

  constructor() { }

  getSharedData() {
    return this.sharedData;
  }

  setSharedData(data) {
    this.sharedData = data;
  }

}
