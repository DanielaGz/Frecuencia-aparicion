import { Component, Input, OnInit } from '@angular/core';
import { CodificationService } from '../codification.service';

@Component({
  selector: 'app-card-table',
  templateUrl: './card-table.component.html',
  styleUrls: ['./card-table.component.css']
})
export class CardTableComponent implements OnInit{

  @Input() title : string;
  @Input() method : string;

  @Input() keys : string[];
  @Input() values: string[];

  constructor(private codificacionService: CodificationService) {
    this.title = '';
    this.method = '';
    this.keys = [];
    this.values = [];
  }

  ngOnInit(): void {

  }


}
