import { EventEmitter, Injectable } from "@angular/core";
import { Codification } from "./codification.model";

@Injectable()
export class CodificationService{
  codification: Codification = new Codification('', 0);

  constructor(){
  }

  setFrecuency(){
    console.log('hola')
  }
}
