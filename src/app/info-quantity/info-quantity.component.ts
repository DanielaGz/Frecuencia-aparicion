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
    return Array.from(this.codificacionService.codification.frec.keys())
  }

  generateEntries(){
    let obj = this.codificacionService.codification.frec;
    let array_values : string[] = [];
    obj.forEach((value: object, key: string) => {
        array_values.push(((Object.values(value)[2])).toFixed(3));
    });
    return this.generateQuantity(array_values)
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
