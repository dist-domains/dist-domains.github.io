import punycode from "punycode/";

export function encodeLabel(label) {
    return punycode.toASCII(label);
}

export function decodeLabel(label) {
    return punycode.toUnicode(label);
}

export function decodeDomain(domain) {
    let parts = domain.split(".");
    let ret = "";
    for (let i=0; i<parts.length;i++) {
        parts[i] = punycode.toUnicode(parts[i]);
    }
    ret = parts.join(".");
    return ret;
}