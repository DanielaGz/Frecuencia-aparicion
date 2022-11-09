import { Component, AfterViewInit, ViewChild, ChangeDetectorRef, OnInit } from '@angular/core';
import { FormComponent } from '../form/form.component';
import { CodificationService } from '../codification.service';
import { Codification } from '../codification.model';
import { DeCodification } from '../decodification.model';
import { DecodificationService } from '../decodification.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css'],
})
export class ContainerComponent implements OnInit, AfterViewInit{

  constructor(
    public codificacionService: CodificationService,
    public decodificacionService: DecodificationService,
    private cd: ChangeDetectorRef
  ) {}

  hide(){
    this.codificacionService.codification.show_time = false;
    this.decodificacionService.decodification.show_time = false;
  }

  show_time(){
    if(this.codificacionService.codification.show_time || this.decodificacionService.decodification.show_time){
      return true
    }
    return false
  }

  time(){
    return this.codificacionService.codification.time
  }

  generateFunction(data : string){
    switch(Object.values(data)[0]) {
      case 'codification': {
        this.codificacionService = new CodificationService()
        this.codificacionService.codification = new Codification(Object.values(data)[2], Number(Object.values(data)[1]))
        this.codificacionService.encoder();
        break;
      }
      case 'decodification': {
        this.decodificacionService = new DecodificationService()
        this.decodificacionService.decodification = new DeCodification(Object.values(data)[2], Number(Object.values(data)[1]))
        this.decodificacionService.decoder();
        break;
      }
      default :{
        break;
      }
   }
  }

  getPlot(){
    return this.codificacionService.getPlot();
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }
}
