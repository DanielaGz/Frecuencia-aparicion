import { Component } from '@angular/core';
import { Codification } from './codification.model';
import { CodificationService } from './codification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Frecuencia-aparicion';
  codificacion : Codification = new Codification('',0);

  constructor(
    private codificacionService: CodificationService
  ){ }

  ngOnInit(): void {
    this.codificacion = this.codificacionService.codification;
  }
}
