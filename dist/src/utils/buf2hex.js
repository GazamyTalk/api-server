"use strict";
// https://stackoverflow.com/questions/40031688/javascript-arraybuffer-to-hex
Object.defineProperty(exports, "__esModule", { value: true });
function buf2hex(buffer) {
    return [...new Uint8Array(buffer)]
        .map(x => x.toString(16).padStart(2, '0'))
        .join('');
}
exports.default = buf2hex;
