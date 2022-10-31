import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CodificationService } from '../codification.service';
import { DecodificationService } from '../decodification.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {

  array_method = [
    'frecuency',
    'percent_frecuency',
    'quantity',
    'unicode',
    'binary',
    'voltage'
  ]

  @Input() codificacionService:CodificationService | DecodificationService

  constructor(
    private cd: ChangeDetectorRef
  ) {
    this.codificacionService = new CodificationService()
  }

  ngOnInit(): void {

  }

  getHeader(){
    return this.codificacionService.selectKeysMethod('frecuency');
  }

  loadMethod(method: string){
    return this.codificacionService.selectValuesMethod(method);
  }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }
}
