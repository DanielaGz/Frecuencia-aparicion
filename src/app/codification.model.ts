export class Codification{

  frec :Map<string,object>
  intervals : number[]
  segments : number[]
  show_time: boolean
  time: number

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
    public blocks: number
  ){
    this.frec = new Map<string, object>()
    this.intervals = []
    this.segments = []
    this.show_time = false;
    this.time = 0;
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

  generateIntValues(){
    let cant_interval = this.getInterval();
    let cant_segments = this.getSegments();
    let tam_intervalo = 1 / (cant_interval * cant_segments);
    let interval_array = [];
    let tam = Number(tam_intervalo)*1000;

    for (var i = 0; i <= cant_interval; i++) {
      interval_array.push(Number(i * tam));
    }
    this.intervals = interval_array

    let array_print : string[] = []
    for (let i = 1; i < interval_array.length; i++) {
      array_print.push(interval_array[i-1]+' - '+interval_array[i]);
    }
  }

  generateSegValues(){
    let cant_interval = this.getInterval();
    let cant_segments = this.getSegments();
    let tam_intervalo = 1 / (cant_interval * cant_segments);
    let segments_array = [0,];
    let tam = (Number(tam_intervalo)*1000) * cant_interval;

    for (var i = 1; i <= cant_segments; i++) {
      segments_array.push(Number(i * tam));
    }
    this.segments = segments_array
    let array_print : string[] = []
    for (let i = 1; i < segments_array.length; i++) {
      array_print.push(segments_array[i-1]+' - '+segments_array[i]);
    }
  }
}
