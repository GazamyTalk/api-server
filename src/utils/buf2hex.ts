// https://stackoverflow.com/questions/40031688/javascript-arraybuffer-to-hex

export default function buf2hex(buffer: Uint8Array) {
    return [...new Uint8Array(buffer)]
        .map(x => x.toString(16).padStart(2, '0'))
        .join('');
}