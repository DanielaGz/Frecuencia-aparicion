import { Component, OnInit } from '@angular/core';
import { CodificationService } from '../codification.service';

@Component({
  selector: 'app-voltage',
  templateUrl: './voltage.component.html',
  styleUrls: ['./voltage.component.css'],
})
export class VoltageComponent {
  constructor(private codificacionService: CodificationService) {}

  generateKeys() {
    return Array.from(this.codificacionService.codification.frec.keys());
  }

  generateEntries() {
    let interval_array = this.codificacionService.codification.intervals;
    let segments_array = this.codificacionService.codification.segments;
    let array_print: string[] = [];
    this.codificacionService.codification.frec.forEach(
      (value: object, key: string) => {
        let binary = Object.values(value)[4];
        let seg = binary.substring(1, this.codificacionService.getSeg() + 1);
        let inter = binary.substring(
          this.codificacionService.getSeg() + 1,
          this.codificacionService.codification.bits
        );
        let signo = binary.substring(0, 1) == '1' ? '-' : '+';
        Object.defineProperty(value, 'voltage', {
          value:
            signo +
            (segments_array[this.Binary_to_Decimal(seg)] +
              interval_array[this.Binary_to_Decimal(inter)]),
          enumerable: true,
        });
        array_print.push(Object.values(value)[5]);
      }
    );

    return array_print;
  }

  Binary_to_Decimal(num: String) {
    let sum = 0;
    var numReverse = num.split('').reverse().join('');

    for (var i = 0; i < numReverse.length; i++) {
      sum = sum + parseInt(numReverse[i]) * 2 ** i;
    }
    return sum;
  }
}
