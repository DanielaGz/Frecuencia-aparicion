import { Component, OnInit } from '@angular/core';
import { CodificationService } from '../codification.service';

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.css']
})
export class PlotComponent{

  constructor(private codificacionService: CodificationService) { }

  getPlot(){
    let long = this.codificacionService.codification.text.length
    let plot_text = ""

    this.codificacionService.codification.frec.forEach((value: object, key: string) => {
      plot_text += long+'|'+Object.values(value)[5]+'|'+Object.values(value)[0]+'|['+Object.values(value)[1]+']/';
    });

    return plot_text;
  }

}
