import { Component, OnInit } from '@angular/core';
import { CodificationService } from '../codification.service';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent{

  constructor(private codificacionService: CodificationService) { }

  getText(){
    return this.codificacionService.codification.text;
  }
}
