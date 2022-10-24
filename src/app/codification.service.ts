import { EventEmitter, Injectable } from "@angular/core";
import { Codification } from "src/codification.model";

@Injectable()
export class CodificationService{
  codification: Codification = new Codification('', 0,[]);
  frecuencies = {
    '8': {
      A: '0.1253',
      B: '0.0142',
      C: '0.0468',
      D: '0.0586',
      E: '0.1368',
      F: '0.0069',
      G: '0.0101',
      H: '0.0070',
      I: '0.0625',
      J: '0.0044',
      K: '0.0002',
      L: '0.0497',
      M: '0.0315',
      N: '0.0671',
      Ñ: '0.0031',
      O: '0.0868',
      P: '0.0251',
      Q: '0.0088',
      R: '0.0687',
      S: '0.0098',
      T: '0.0463',
      U: '0.0393',
      V: '0.0090',
      W: '0.0001',
      X: '0.0022',
      Y: '0.0090',
      Z: '0.0052',
    },
    '9':{

    },
    '10':{

    }
  }

  constructor(){
  }

  setFrecuency(){
    this.codification.frec = Object(this.frecuencies)[this.codification.bits]
  }
}
