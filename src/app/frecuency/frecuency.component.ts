import { Component, Input, OnInit } from '@angular/core';
import { CodificationService } from '../codification.service';

@Component({
  selector: 'app-frecuency',
  templateUrl: './frecuency.component.html',
  styleUrls: ['./frecuency.component.css']
})
export class FrecuencyComponent {

  constructor(
    private codificacionService: CodificationService
  ) {
  }

  generateKeys(){
    return Object.keys(this.codificacionService.codification.frec)
  }

  generateEntries(){
    return Object.values(this.codificacionService.codification.frec)
  }

}
