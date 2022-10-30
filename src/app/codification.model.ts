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
}
