type element = {
  [key: string] : any;
  cant: number;
  position: number[];
  frec: number;
  vol: string[];
  symbol: string;
  
}
export class DeCodification{

  frec :Map<string,element>
  intervals : number[]
  segments : number[]
  show_time: boolean
  time: number
  cantsymbols: number
  tramas: number
  mensaje: string

  bits_config = {
    "8": {
      "intervals" : 16,
      "segments" : 8,
      "seg" : 3,
      "int" : 4
    },
    "9": {
      "intervals" : 16,
      "segments" : 16,
      "seg" : 4,
      "int" : 4
    },
    "10": {
      "intervals" : 16,
      "segments" : 32,
      "seg" : 5,
      "int" : 4
    }
  }

  constructor(
    public text: string,
    public bits: number,
  ){
    type element = {
      [key: string] : any;
      cant: number;
      position: number[];
      frec: number;
      vol: string[];
      symbol: string;
    }
    this.frec = new Map<string, element>()
    this.intervals = []
    this.segments = []
    this.show_time = false;
    this.time = 0;
    this.cantsymbols = 0;
    this.tramas = 0;
    this.mensaje = ""
  }

  getmensaje(){
    /*this.mensaje = ""
    let textfinal = new Array(this.cantsymbols)
    this.frec.forEach(element => {
      let vol = element.vol
      this.createTables(1);
      let binario = this.vol_to_binary(vol);
      let num = this.binaryToDecimal(binario)
      let letra = this.num_to_asciiletters(num+"")
      //element.symbol = letra
      for(const p of element.position){
        textfinal[p] = letra
      }

    });

    this.mensaje += textfinal.join('');*/
  }

  getmensaje2(){
    this.mensaje = ""
    let textfinal = new Array(this.cantsymbols)
    this.frec.forEach(element => {
      for(const p of element.position){
        textfinal[p] = element.symbol+""
      }

    });

    this.mensaje += textfinal.join('');

  }

  getletra(vol: string){
    let binario = this.vol_to_binary(vol);
    let num = this.binaryToDecimal(binario)
    return this.num_to_asciiletters(num+"")
  }

  vol_to_binary(vol: string){
    let binario = ""
    if (vol.substring(0, 1) == '+'){ //signo positivo
      binario += "0";
    }else{ //signo negativo
        binario += "1";
    }
    let mun_segmento = -1;
    for (var i = 0; i < (this.segments.length-1); i++) { //buscar segmento
        //binary_text += i + " s:" +segments_array[i] + " v:" +parseFloat(vol.substring(1)) + " sig:" + segments_array[i+1]+ " "
        if(this.segments[i]<=parseFloat(vol.substring(1)) && this.segments[i+1]>parseFloat(vol.substring(1))){
            mun_segmento = i
            break;
        }
    }
    if(mun_segmento == -1){//verifcar que encontro un segmento -> mun_segmenyo
        mun_segmento = (this.segments.length-1);
    }

    // buscar intervalo
    let mun_intervalo = -1;
    let aux = Number((parseFloat(vol.substring(1)) - Number(this.segments[mun_segmento])).toFixed(5));

    for (var i = 0; i <= (this.intervals.length); i++) { //buscar segmento
      let interv = Number(Number(this.intervals[i]).toFixed(3))
      let next_interv = Number(Number(this.intervals[i+1]).toFixed(3))
          if(interv<=aux && next_interv>aux){
            mun_intervalo = i
              break;
            }
    }
    if(mun_intervalo == -1){//verifcar que encontro un intervalo -> mun_intervalo, sino significa que es el ultimo
          mun_intervalo = (this.intervals.length);
    }
    // tocar pasar el mun_segmenyo a binario si es 8bits, entonees solo puete tener 3 ceros -> 1 = 001, 4 = 100
    let seg_binario = this.to_by(mun_segmento, this.getArrayBits((this.bits_config as any)[this.bits]['seg'])); //pasar a binario
    let intr_binario = this.to_by(mun_intervalo, this.getArrayBits((this.bits_config as any)[this.bits]['int'])); //pasar a binario

    binario += seg_binario+""+intr_binario+"";


    return binario
  }

  to_by(x: Number, bits_array: Number[]) {
    let val = x
    let message = ""
    for (const bit of bits_array) {
      if (val >= bit) {
        message += '1'
        val = Number(val) - Number(bit)
      } else {
        message += '0'
      }
    }
    return message
  }

  getArrayBits(num : number){
    let bits_array = []

    for (var i = (num - 1); i >= 0; i--) {
      bits_array.push(Math.pow(2, i))
    }

    return bits_array
  }



  createTables(voltage : number){
    let cant_interval = (this.bits_config as any)[this.bits]['intervals'];
    //console.log(cant_interval)
    let segments_array = (this.bits_config as any)[this.bits]['segments']; //8
    let interval_array = [cant_interval]; //16
    let tam_interval = voltage / (cant_interval * segments_array) //x, vol =
    segments_array = this.to_segmento(tam_interval);

    this.segments = segments_array
    interval_array = this.to_interval(tam_interval);

    this.intervals = interval_array
  }

  to_interval(tam_intervalo: Number) {
    let cant_interval = (this.bits_config as any)[this.bits]['intervals'];
    let interval_array = [];
    let tam = Number(tam_intervalo)*1000;

    for (var i = 0; i <= cant_interval; i++) {
      interval_array.push(Number(i * tam));
    }
    return interval_array
  }

  to_segmento(tam_intervalo: Number) {
    let cant_interval = (this.bits_config as any)[this.bits]['intervals'];
    let cant_segments= (this.bits_config as any)[this.bits]['segments'];

    let segments_array = [0,];

    let tam = (Number(tam_intervalo)*1000) * cant_interval;

    for (var i = 1; i <= cant_segments; i++) {
      segments_array.push(Number(i * tam));
    }
    return segments_array
  }

  getInterval(){
    return (this.bits_config as any)[this.bits]['intervals'];
  }

  getSegments(){
    return (this.bits_config as any)[this.bits]['segments'];
  }

  getInt(){
    return (this.bits_config as any)[this.bits]['int'];
  }

  getSeg(){
    return (this.bits_config as any)[this.bits]['seg'];
  }

  getLogBase(val: number) {
    return (Math.log(val) / Math.log(2)).toFixed(3);
  }

  binaryToDecimal(num: String) {
    let sum = 0;
    var numReverse = num.split('').reverse().join('');

    for (var i = 0; i < numReverse.length; i++) {
      sum = sum + parseInt(numReverse[i]) * 2 ** i;
    }
    return sum;
  }

  decimalToBinary(x: Number) {
    let bits_array = this.generate_bits_array();
    let val = x;
    let message = '';
    for (const bit of bits_array) {
      if (val >= bit) {
        message += '1';
        val = Number(val) - Number(bit);
      } else {
        message += '0';
      }
    }
    return message;
  }

  generate_bits_array() {
    let bits = this.bits;
    let bits_array = [];

    for (var i = bits - 1; i >= 0; i--) {
      bits_array.push(Math.pow(2, i));
    }

    return bits_array;
  }

  num_to_asciiletters(num: string){

    return String.fromCharCode(parseInt(num))+"";
  }
}
