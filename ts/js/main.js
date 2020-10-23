"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _stored, _print;
let labors = [];
class Events {
    constructor() {
        _stored.set(this, void 0);
        _print.set(this, void 0);
        __classPrivateFieldSet(this, _stored, new Stored());
        __classPrivateFieldSet(this, _print, new Print());
        this.read();
        this.search();
    }
    search() {
        let searcher = document.getElementById('input-searcher');
        searcher === null || searcher === void 0 ? void 0 : searcher.addEventListener('keyup', () => {
            __classPrivateFieldGet(this, _print).travel(searcher === null || searcher === void 0 ? void 0 : searcher.value, labors);
        });
    }
    write() {
    }
    read() {
        labors = __classPrivateFieldGet(this, _stored).read();
        __classPrivateFieldGet(this, _print).travel('', labors);
    }
    delete() {
    }
}
_stored = new WeakMap(), _print = new WeakMap();
new Events();
