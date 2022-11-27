import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { CodificationService } from '../codification.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements AfterViewInit {

  text: string;
  bits: number;
  frec : object;

  document: File | null;
  file: any;
  time: number;
  show_time : boolean;

  imgUrl: any;

  select_file : boolean;
  bloques:string = "";

  @Input() operation : string;
  @Input() title_button : string;
  @Output() generateFunction:  EventEmitter<any> = new EventEmitter();

  constructor(
    private codificacionService: CodificationService,
    private cd : ChangeDetectorRef
  ) {
    this.text = "";
    this.bits = 8;
    this.frec = {};

    this.document = null;

    this.file = null;
    this.time = 0;
    this.show_time = false;
    this.select_file = false;

    this.operation = '';
    this.title_button = '';
  }

  selectFile(event : any) {
    this.select_file = event.target.checked
  }

  handleFileInput(event : any) {
    this.file = event.target.files[0]
    let fileReader = new FileReader();
    const filereader = new FileReader();

    if (this.file.type.includes('image') == true) {

      filereader.readAsDataURL(this.file)
      const that = this;

      filereader.onload = function() {
              that.imgUrl = this.result;
              that.text = typeof(this.result) === 'string' ? this.result : '';
      };


    }else{
      this.imgUrl = "";
      fileReader.readAsText(this.file)
      fileReader.onload = (e) => {
        this.text = typeof(fileReader.result) === 'string' ? fileReader.result : '';
      }

    }

  }

  generar(){
    let obj= {
      operation: this.operation,
      bits: this.bits,
      text: this.text,
      blocks: this.bloques
    }
    this.generateFunction.emit(obj)
  }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }
}
