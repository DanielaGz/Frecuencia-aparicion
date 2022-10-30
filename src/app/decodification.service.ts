import { EventEmitter, Injectable } from '@angular/core';
import { Codification } from './codification.model';

@Injectable()
export class DecodificationService {
  codification: Codification = new Codification('3|+757.813|1|[0]/3|+898.438|1|[1]/3|+781.250|1|[2]/', 8);
  text_lenght : number = 0

  constructor() {}

  //------------------------------------DECODER------------------------

  decoder() {
    console.log('hola');
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
    let frecMapping = new Map<string, element>();
    let caracter_info = this.codification.text.split('/')
    caracter_info.pop()
    caracter_info.forEach((value: string)=>{
      let letra_info = value.split('|')
        frecMapping.set(
          letra_info[1],
          {
            position:  letra_info[3],
            frec: letra_info[2],
          }
        )
    })
    console.log(frecMapping)
    return [];
  }
}
