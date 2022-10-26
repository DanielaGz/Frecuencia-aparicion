import { Component, Input, OnInit } from '@angular/core';
import { elementAt } from 'rxjs';
import { CodificationService } from '../codification.service';

@Component({
  selector: 'app-frecuency',
  templateUrl: './frecuency.component.html',
  styleUrls: ['./frecuency.component.css'],
})
export class FrecuencyComponent {
  constructor(private codificacionService: CodificationService) {}

  setFrecuency() {
    let charts = this.codificacionService.codification.text.split('');
    let tam = this.codificacionService.codification.text.length;
    type element = {
      [key: string] : any;
      cant: number;
      position: number[];
      frec: number;
    }
    let frecMapping = new Map<string, element>();
    for (let i = 0; i < charts.length; i++) {
      if(frecMapping.has(charts[i])){
        let value = frecMapping.get(charts[i])?.cant;
        let pos =frecMapping.get(charts[i])?.position;
        let fre =frecMapping.get(charts[i])?.frec;
        pos?.push(i)
        frecMapping.set(
          charts[i],
          {
            cant: value ? value+1 : 0,
            position: pos ? pos : [],
            frec: value ? Number(((value+1)/tam).toFixed(3)) : 0,
          }
        )
      }else{
        frecMapping.set(
          charts[i],
          {
            cant: 1,
            position: [i],
            frec: Number((1/tam).toFixed(3))
          }
        )
      }
    }
    this.codificacionService.codification.frec = frecMapping;
  }

  generateKeys() {
    return Array.from(this.codificacionService.codification.frec.keys());
  }

  generateEntries() {
    let obj = this.codificacionService.codification.frec;
    let array_values : string[] = [];
    obj.forEach((value: object, key: string) => {
        array_values.push(((Object.values(value)[2]*100)).toFixed(3));
    });
    return array_values;
  }
}
