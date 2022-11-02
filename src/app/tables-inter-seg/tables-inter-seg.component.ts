import { Component, Input, OnInit } from '@angular/core';
import { CodificationService } from '../codification.service';
import { DecodificationService } from '../decodification.service';

@Component({
  selector: 'app-tables-inter-seg',
  templateUrl: './tables-inter-seg.component.html',
  styleUrls: ['./tables-inter-seg.component.css']
})
export class TablesInterSegComponent{

  @Input() codificacionService: CodificationService;

  constructor(codificacionService: CodificationService) {
    this.codificacionService = new CodificationService();
   }

  generateIntValues(){
    let cant_interval = this.codificacionService.codification.getInterval();
    let cant_segments = this.codificacionService.codification.getSegments();
    let tam_intervalo = 1 / (cant_interval * cant_segments);
    let interval_array = [];
    let tam = Number(tam_intervalo)*1000;

    for (var i = 0; i <= cant_interval; i++) {
      interval_array.push(Number(i * tam));
    }
    this.codificacionService.codification.intervals = interval_array

    let array_print : string[] = []
    for (let i = 1; i < interval_array.length; i++) {
      array_print.push(interval_array[i-1]+' - '+interval_array[i]);
    }
    return array_print
  }

  generateSegValues(){
    let cant_interval = this.codificacionService.codification.getInterval();
    let cant_segments = this.codificacionService.codification.getSegments();
    let tam_intervalo = 1 / (cant_interval * cant_segments);
    let segments_array = [0,];
    let tam = (Number(tam_intervalo)*1000) * cant_interval;

    for (var i = 1; i <= cant_segments; i++) {
      segments_array.push(Number(i * tam));
    }
    this.codificacionService.codification.segments = segments_array
    let array_print : string[] = []
    for (let i = 1; i < segments_array.length; i++) {
      array_print.push(segments_array[i-1]+' - '+segments_array[i]);
    }

    return array_print
  }

}
