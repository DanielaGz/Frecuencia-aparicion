import { Component } from '@angular/core';
import { CodificationService } from '../codification.service';

@Component({
  selector: 'app-info-quantity',
  templateUrl: './info-quantity.component.html',
  styleUrls: ['./info-quantity.component.css']
})
export class InfoQuantityComponent {

  constructor(
    private codificacionService: CodificationService
  ) {
  }

  generateKeys(){
    return Object.keys(this.codificacionService.codification.frec)
  }

  generateEntries(){
    return this.generateQuantity(Object.values(this.codificacionService.codification.frec))
  }

  generateQuantity(potencies : string[]){
    let quantity_array = [];
    for (let potency of potencies){
      quantity_array.push(this.getLogBase(1/Number(potency)));
    }
    return quantity_array;
  }

  getLogBase(val: number) {
    return (Math.log(val) / Math.log(2)).toFixed(3);
  }
}
