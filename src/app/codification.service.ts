import { EventEmitter, Injectable } from "@angular/core";
import { Codification } from "./codification.model";

@Injectable()
export class CodificationService{
  codification: Codification = new Codification('', 8);

  bits = {
    "8": {
      "intervals" : 16,
      "segments" : 8,
      "seg" : 3,
      "int" : 4
    },
    "9": {
      "intervals" : 16,
      "segments" : 16,
      "seg" : 4,
      "int" : 4
    },
    "10": {
      "intervals" : 16,
      "segments" : 32,
      "seg" : 5,
      "int" : 4
    }
  }

  constructor(){
  }

  getInterval(){
    return (this.bits as any)[this.codification.bits]['intervals'];
  }

  getSegments(){
    return (this.bits as any)[this.codification.bits]['segments'];
  }

  getInt(){
    return (this.bits as any)[this.codification.bits]['int'];
  }

  getSeg(){
    return (this.bits as any)[this.codification.bits]['seg'];
  }
}
