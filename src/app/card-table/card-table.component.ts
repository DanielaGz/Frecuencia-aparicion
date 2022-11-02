import { Component, Input, OnInit } from '@angular/core';
import { DecodificationService } from '../decodification.service';

@Component({
  selector: 'app-card-table',
  templateUrl: './card-table.component.html',
  styleUrls: ['./card-table.component.css']
})
export class CardTableComponent{

  array_method = [
    'frecuency',
    'percent_frecuency',
    'quantity',
    'unicode',
    'binary',
    'voltage'
  ]

  key: string[]

  @Input() decodificacionService: DecodificationService;

  constructor(decodificacionService: DecodificationService) {
    this.decodificacionService = new DecodificationService();
    this.key = []
   }

  generateSegValues(){

    return this.decodificacionService.decodification.segments

  }

  generateIntValues(){
    
    return this.decodificacionService.decodification.intervals
  }

  getHeader(){
    const values = Array.from(this.decodificacionService.decodification.frec.values());
    return values;
  }

  informacion(num: Number){
    return (Number(num)*Math.log2(1/Number(num)))
  }

  entropia(){
    let sum = 0
    for(let p of this.getHeader()){
      sum += Number(this.informacion(p.frec))
    }
    return sum
  }
  totalsimbolos(){
    return this.decodificacionService.decodification.cantsymbols
  }
  


}
