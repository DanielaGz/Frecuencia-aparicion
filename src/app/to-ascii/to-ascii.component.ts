import { Component, OnInit } from '@angular/core';
import { CodificationService } from '../codification.service';

@Component({
  selector: 'app-to-ascii',
  templateUrl: './to-ascii.component.html',
  styleUrls: ['./to-ascii.component.css']
})
export class ToAsciiComponent {

  constructor(private codificacionService: CodificationService
  ) { }

  generateKeys(){
    return Array.from(this.codificacionService.codification.frec.keys())
  }

  generateValues(){
    let array_values : number[] = [];
    this.codificacionService.codification.frec.forEach((value: object, key: string) => {
        Object.defineProperty(value, "ascii",{
          value : key.charCodeAt(0),
          enumerable: true
        })
        array_values.push(key.charCodeAt(0))
    });

    return array_values
  }

}
