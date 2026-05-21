"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCode = void 0;
const crypto_1 = require("crypto");
class generateCode {
    prefix;
    constructor(prefix) {
        this.prefix = prefix;
    }
    generate() {
        return this.compose(this.prefix, this.today(), this.random(2));
    }
    short() {
        return this.compose(this.prefix, this.random(2));
    }
    long() {
        return this.compose(this.prefix, this.today(), this.random(3));
    }
    tag(value) {
        return this.compose(this.prefix, this.today(), this.sanitize(value), this.random(2));
    }
    today() {
        return new Date().toISOString().slice(0, 10).replace(/-/g, '');
    }
    random(bytes) {
        return (0, crypto_1.randomBytes)(bytes).toString('hex').toUpperCase();
    }
    sanitize(value) {
        return value
            .trim()
            .toUpperCase()
            .replace(/[^A-Z0-9]/g, '');
    }
    compose(...parts) {
        return parts.join('-');
    }
}
exports.generateCode = generateCode;
//# sourceMappingURL=generateCode.js.map