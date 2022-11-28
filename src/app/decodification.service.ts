import { EventEmitter, Injectable } from '@angular/core';
import { DeCodification } from './decodification.model';

@Injectable()
export class DecodificationService {
  decodification: DeCodification = new DeCodification('', 8);
  text_lenght : number = 0

  constructor() {}

  //------------------------------------DECODER------------------------

  decoder() {
    var startTime = performance.now();
    this.decodification.text = this.decodification.text.split(" ").join("");
    this.decodification.text = this.decodification.text.replace(/(\r\n|\n|\r)/gm, "");
    this.iniciarproceso();
    var endTime = performance.now()
    this.decodification.time= (endTime - startTime)/1000
    this.decodification.show_time = true;
  }

  selectKeysMethod(method: string) :any{
    switch(method) {
      case 'get_info': {
         return this.getInfo();
      }
   }
  }

  selectValuesMethod(method: string) :any{
    switch(method) {
      case 'get_info': {
         return [];
      }
   }
  }

  getInfo(){
    type element = {
      [key: string] : any;
    }

    return [];
  }

  iniciarproceso(){

    let caracter_info = this.decodification.text.split('/');
    let cantsymbols = Number(caracter_info.shift());
    this.decodification.cantsymbols = cantsymbols;
    type element = {
      [key: string] : any;
      cant: number;
      position: number[];
      frec: number;
      vol: string[];
      symbol: string;
      
    }
    let frecMapping = new Map<string, element>();
    let bloque = 1;
    this.decodification.tramas = caracter_info.length -1;
    for (let i = 0; i < caracter_info.length; i++) {
      if(caracter_info[i] != ""){
        let trama = caracter_info[i].split('|');
        let vols = trama[0].split(',')
        vols.pop();
        let key = i+"";
        let cant = Number(trama[1]);
        let position = JSON.parse(trama[2]);
        
        this.decodification.createTables(1); //proceso alternativo
        let symbols = "";

        for (let i = 0; i < vols.length; i++) {
          symbols += this.decodification.getletra(vols[i])+"";
        }
      
        frecMapping.set(
          key,
          {
            cant: cant,
            position: position,
            frec: Number((cant/cantsymbols)),
            vol: vols,
            symbol: symbols
          }
        )
      }
    }
    
    this.decodification.frec = frecMapping;

    this.decodification.getmensaje2();
  }


}
