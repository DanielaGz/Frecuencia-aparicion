import { Component, EventEmitter, Output } from '@angular/core';
import { CodificationService } from '../codification.service';
import { FrecuencyComponent } from '../frecuency/frecuency.component';
import { InfoQuantityComponent } from '../info-quantity/info-quantity.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  text: string;
  bits: number;
  frec : object;

  document: File | null;

  file: any;

  voltage: number;

  bits_array: Number[];
  binary_text: string;
  ascii_text: string;
  vol_text: string;
  recept_vol_text: string;
  recept_num_text: string;
  recept_letters_text: string;

  segments: string[];
  intervals: string[];

  time: number;
  show_time : boolean;

  imgUrl: any;

  select_file : boolean;
  constructor(
    private codificacionService: CodificationService
  ) {
    this.text = "";
    this.bits = 8;
    this.frec = {};

    this.document = null;

    this.file = null;

    this.voltage = 1;

    this.bits_array = [];
    this.binary_text = "";
    this.ascii_text = "";
    this.vol_text = "";
    this.recept_vol_text = "";
    this.recept_num_text = "";
    this.recept_letters_text = "";
    this.intervals = [];
    this.segments = [];
    this.time = 0;
    this.show_time = false;
    this.select_file = false;
  }

  selectFile(event : any) {
    this.select_file = event.target.checked
  }

  generar(){
    this.codificacionService.codification.text = this.text;
    this.codificacionService.codification.bits = this.bits;
    new FrecuencyComponent(this.codificacionService).setFrecuency();
  }
}
