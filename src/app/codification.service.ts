import { AfterViewInit, ChangeDetectorRef, Injectable } from "@angular/core";
import { Codification } from "./codification.model";

@Injectable()
export class CodificationService{
  codification: Codification = new Codification('', 8);
  next :boolean = false;


  constructor(){
  }


  //------------------------------------ENCODER------------------------

  encoder(){
    var startTime = performance.now();
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

  selectValuesMethod(method: string) :any{
    switch(method) {
      case 'frecuency': {
         return this.getFrecuencyValues();
      }
      case 'percent_frecuency': {
        return this.getPercentFrecuencyValues();
      }
      case 'quantity': {
        return this.getQuantityValues();
      }
      case 'unicode': {
        return this.generateUnicodeValues();
      }
      case 'binary': {
        return this.getBinaryValues();
      }
      case 'voltage': {
        return this.getVoltageValues();
      }
   }
  }

  // FRECUENCY

  setFrecuency() {
    let charts = this.codification.text.split('');
    let tam = this.codification.text.length;
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
    this.codification.frec = frecMapping;
  }

  getFrecuencyKeys() {
    return Array.from(this.codification.frec.keys());
  }

  getFrecuencyValues(){
    let obj = this.codification.frec;
    let array_values : string[] = [];
    obj.forEach((value: object, key: string) => {
        array_values.push(Object.values(value)[0]);
    });
    return array_values;
  }

  //FRECUENCY PERCENT

  getPercentFrecuencyKeys() {
    return Array.from(this.codification.frec.keys());
  }

  getPercentFrecuencyValues(){
    let obj = this.codification.frec;
    let array_values : string[] = [];
    obj.forEach((value: object, key: string) => {
        array_values.push(((Object.values(value)[2]*100)).toFixed(3)+' %');
    });
    return array_values;
  }

  // INFO QUANTITY

  getQuantityKeys(){
    return Array.from(this.codification.frec.keys())
  }

  getQuantityValues(){
    let obj = this.codification.frec;
    let array_values : string[] = [];
    obj.forEach((value: object, key: string) => {
        array_values.push(((Object.values(value)[2])).toFixed(3));
    });
    return this.generateQuantity(array_values)
  }

  generateQuantity(potencies : string[]){
    let quantity_array = [];
    for (let potency of potencies){
      quantity_array.push(this.codification.getLogBase(1/Number(potency)));
    }
    return quantity_array;
  }

  // UNICODE

  generateUnicodeKeys(){
    return Array.from(this.codification.frec.keys())
  }

  generateUnicodeValues(){
    let array_values : number[] = [];
    this.codification.frec.forEach((value: object, key: string) => {
        Object.defineProperty(value, "ascii",{
          value : key.charCodeAt(0),
          enumerable: true
        })
        array_values.push(key.charCodeAt(0))
    });

    return array_values
  }

  // BINARY

  getBinaryKeys() {
    return Array.from(this.codification.frec.keys());
  }

  getBinaryValues() {
    let array_values: number[] = [];
    this.codification.frec.forEach(
      (value: object, key: string) => {
        Object.defineProperty(value, 'binary', {
          value: this.codification.decimalToBinary(Object.values(value)[3]),
          enumerable: true,
          configurable: true,
        });
        array_values.push(Object.values(value)[4]);
      }
    );
    return array_values;
  }


  // VOLTAGE

  getVoltageKeys() {
    return Array.from(this.codification.frec.keys());
  }

  getVoltageValues() {
    let interval_array = this.codification.intervals;
    let segments_array = this.codification.segments;
    let array_print: string[] = [];
    this.codification.frec.forEach(
      (value: object, key: string) => {
        let binary = Object.values(value)[4];
        let seg = binary.substring(1, this.codification.getSeg() + 1);
        let inter = binary.substring(
          this.codification.getSeg() + 1,
          this.codification.bits
        );
        let signo = binary.substring(0, 1) == '1' ? '-' : '+';
        Object.defineProperty(value, 'voltage', {
          value:
          signo +
            (segments_array[this.codification.binaryToDecimal(seg)] +
              interval_array[this.codification.binaryToDecimal(inter)]).toFixed(3),
          enumerable: true,
          configurable: true,
        });
        array_print.push(Object.values(value)[5]);
      }
    );

    this.next = true;

    return array_print;
  }

  //PLOT

  getPlot(){
    if(!this.next){
      return '';
    }
    let long = this.codification.text.length
    let plot_text = ""

    this.codification.frec.forEach((value: object, key: string) => {
      plot_text += long+'|'+Object.values(value)[5]+'|'+Object.values(value)[0]+'|['+Object.values(value)[1]+']/';
    });

    return plot_text;
  }

}
