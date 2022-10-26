import { Component, OnInit } from '@angular/core';
import { CodificationService } from '../codification.service';

@Component({
  selector: 'app-to-binary',
  templateUrl: './to-binary.component.html',
  styleUrls: ['./to-binary.component.css'],
})
export class ToBinaryComponent {
  constructor(private codificacionService: CodificationService) {}

  generateKeys() {
    return Array.from(this.codificacionService.codification.frec.keys());
  }

  generateValues() {
    let array_values: number[] = [];
    this.codificacionService.codification.frec.forEach(
      (value: object, key: string) => {
        Object.defineProperty(value, 'binary', {
          value: this.to_by(Object.values(value)[3]),
          enumerable: true,
        });
        array_values.push(Object.values(value)[4]);
      }
    );
    return array_values;
  }

  to_by(x: Number) {
    let bits_array = this.generate_bits_array();
    let val = x;
    let message = '';
    for (const bit of bits_array) {
      if (val >= bit) {
        message += '1';
        val = Number(val) - Number(bit);
      } else {
        message += '0';
      }
    }
    return message;
  }

  generate_bits_array() {
    let bits = this.codificacionService.codification.bits;
    let bits_array = [];

    for (var i = bits - 1; i >= 0; i--) {
      bits_array.push(Math.pow(2, i));
    }

    return bits_array;
  }
}
