export class Codification{

  frec :Map<string,object>
  intervals : number[]
  segments : number[]
  show_time: boolean
  time: number

  constructor(
    public text: string,
    public bits: number,
  ){
    this.frec = new Map<string, object>()
    this.intervals = []
    this.segments = []
    this.show_time = false;
    this.time = 0;
  }
}
