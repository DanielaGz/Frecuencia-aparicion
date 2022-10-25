export class Codification{

  frec :Map<string,object>

  constructor(
    public text: string,
    public bits: number,
  ){
    this.frec = new Map<string, object>()
  }
}
