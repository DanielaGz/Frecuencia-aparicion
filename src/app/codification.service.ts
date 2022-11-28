import { AfterViewInit, ChangeDetectorRef, Injectable } from "@angular/core";
import { Codification } from "./codification.model";

@Injectable()
export class CodificationService{
  codification: Codification = new Codification('', 8, 1);
  next :boolean = false;


  constructor(){
  }


  //------------------------------------ENCODER------------------------

  encoder(){
    var startTime = performance.now();
    this.codification.generateIntValues();
    this.codification.generateSegValues();
    this.setFrecuency();
    var endTime = performance.now()
    this.codification.time= (endTime - startTime)/1000
    this.codification.show_time = true;
  }

  selectKeysMethod(method: string) :any{
    switch(method) {
      case 'frecuency': {
         return this.getFrecuencyKeys();
      }
      case 'percent_frecuency': {
        return this.getPercentFrecuencyKeys();
      }
      case 'quantity': {
        return this.getQuantityKeys();
      }
      case 'unicode': {
        return this.generateUnicodeKeys();
      }
      case 'binary': {
        return this.generateUnicodeKeys();
      }
      case 'binary': {
        return this.getBinaryKeys();
      }
      case 'voltage': {
        return this.getVoltageKeys();
      }
   }
  }

  // FRECUENCY

  setFrecuency() {
    let charts = this.getValuesChar()
    let tam = this.codification.text.length;
    type element = {
      [key: string] : any;
      cant: number;
      position: number[];
      frec: string;
    }
    let frecMapping = new Map<string, element>();
    for (let i = 0; i < charts.length; i++) {
      let val_text = charts[i].split('')
      let ascii = ''
      let binary = ''
      let voltages = ''
      for (let index = 0; index < val_text.length; index++) {
        let ascii_value = val_text[index].charCodeAt(0);
        ascii += ascii_value+',';
        let binary_value = this.codification.decimalToBinary(ascii_value);
        binary += binary_value+','
        voltages += this.getVoltages(binary_value)+','
      }
      let frecuency = Number((1/Math.ceil(tam/this.codification.blocks)))
      if(frecMapping.has(charts[i])){
        let value = frecMapping.get(charts[i])?.cant;
        let pos =frecMapping.get(charts[i])?.position;
        frecuency = value ? (Number((value+1)/Math.ceil(tam/this.codification.blocks))) : (0)
        let quantity = this.codification.getLogBase(1/frecuency)
        pos?.push(i)
        frecMapping.set(
          charts[i],
          {
            cant: value ? value+1 : 0,
            position: pos ? pos : [],
            frec: (frecuency*100).toFixed(3) +'%',
            ascii: ascii,
            binary: binary,
            voltages: voltages,
            quantity: quantity
          }
        )
      }else{  
        let quantity = this.codification.getLogBase(1/frecuency)
        frecMapping.set(
          charts[i],
          {
            cant: 1,
            position: [i],
            frec: (frecuency*100).toFixed(3)+'%',
            ascii: ascii,
            binary: binary,
            voltages: voltages,
            quantity: quantity
          }
        )
      }
    }
    this.codification.frec = frecMapping;
  }

  getVoltages(binary: string){
    let seg = binary.substring(1, this.codification.getSeg() + 1);
    let inter = binary.substring(
      this.codification.getSeg() + 1,
      this.codification.bits
    );
    let signo = binary.substring(0, 1) == '1' ? '-' : '+';
    return signo +
    (this.codification.segments[this.codification.binaryToDecimal(seg)] +
    this.codification.intervals[this.codification.binaryToDecimal(inter)]).toFixed(3)
  }

  getValuesChar(){
    let char = []
    let tam = this.codification.text.length;
    for (let index = 0; index < tam; index = (index+this.codification.blocks)) {
      let tam_max = index+this.codification.blocks
      if(tam_max > tam){
        tam_max = tam;
      }
      char.push(this.codification.text.slice(index, tam_max))
    }
    return char
  }

  getFrecuencyKeys() {
    return Array.from(this.codification.frec.keys());
  }

  //FRECUENCY PERCENT

  getPercentFrecuencyKeys() {
    return Array.from(this.codification.frec.keys());
  }
  // INFO QUANTITY

  getQuantityKeys(){
    return Array.from(this.codification.frec.keys())
  }

  // UNICODE

  generateUnicodeKeys(){
    return Array.from(this.codification.frec.keys())
  }

  // BINARY

  getBinaryKeys() {
    return Array.from(this.codification.frec.keys());
  }

  // VOLTAGE

  getVoltageKeys() {
    return Array.from(this.codification.frec.keys());
  }
  //PLOT

  getPlot(){
    let long = this.codification.text.length
    let plot_text = long+'/'

    this.codification.frec.forEach((value: object, key: string) => {
      plot_text += Object.values(value)[5]+'|'+Object.values(value)[0]+'|['+Object.values(value)[1]+']/';
    });

    return plot_text;
  }

}
