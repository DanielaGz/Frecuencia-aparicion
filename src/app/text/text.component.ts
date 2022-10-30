import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CodificationService } from '../codification.service';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent implements OnInit, AfterViewInit{

  @Input() text: string;
  @Input() title: string;
  @Input() plot: boolean;
  constructor(
    public codificacionService: CodificationService,
    private cd : ChangeDetectorRef
  ) {
    this.text = '';
    this.title = '';
    this.plot = false;
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }
}
