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
    {
      name: 'frecuency',
      value: 0
    },
    {
      name: 'percent_frecuency',
      value: 2
    },
    {
      name : 'quantity',
      value : 6
    },
    {
      name: 'unicode',
      value: 3
    },
    {
      name: 'binary',
      value: 4
    },
    {
      name: 'voltage',
      value: 5
    }
  ]

  @Input() codificacionService:CodificationService

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

  loadMethod(method: number){
    let obj = this.codificacionService.codification.frec;
    let array_values : string[] = [];
    obj.forEach((value: object, key: string) => {
        array_values.push(Object.values(value)[method]);
    });
    return array_values;
  }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }
}
