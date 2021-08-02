class ncoder {

    _encoder = new TextEncoder();
    _decoder = new TextDecoder();

    constructor() {
        if (typeof TextEncoder === "undefined") {
            this.encode = this._jsonDecode;
            this.decode = this._jsonDecode;
        } else {
            this.encode = this._encode;
            this.decode = this._decode;
        }
    }

    // @ts-ignore
    encode(object: any): ArrayBuffer { }
    // @ts-ignore
    decode(buffer: ArrayBuffer): any { }

    _encode(object: { [prop: string]: any }) {
        var string = JSON.stringify(object);
        var uint8_array = this._encoder.encode(string);
        return uint8_array.buffer;
    }

    _decode(buffer: ArrayBuffer) {
        var view = new DataView(buffer, 0, buffer.byteLength);
        var string = this._decoder.decode(view);
        return JSON.parse(string);
    }

    _jsonEncode(input: { [prop: string]: any }): ArrayBuffer {
        // @ts-ignore
        return JSON.stringify(input);
    }

    _jsonDecode(input: ArrayBuffer) {
        // @ts-ignore
        return JSON.parse(input);
    }

    ab2str(buff: ArrayBuffer) {
        let numbers = new Uint8Array(buff);
        let numStr = String.fromCharCode(...numbers);
        return btoa(numStr)
    }

    str2ab(str: string) {
        var binary_string = window.atob(str);
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    }
}

const Codec = new ncoder();

export default Codec;