import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { FormComponent } from '../form/form.component';
import { CodificationService } from '../codification.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css'],
})
export class ContainerComponent implements AfterViewInit {
  @ViewChild(FormComponent)
  form: FormComponent;



  constructor(
    private codificacionService: CodificationService
  ) {
    this.form = new FormComponent(codificacionService);
  }

  ngAfterViewInit() {

  }

  hide(){
    this.codificacionService.codification.show_time = false;
  }

  show_time(){
    return this.codificacionService.codification.show_time
  }

  time(){
    return this.codificacionService.codification.time
  }
}
