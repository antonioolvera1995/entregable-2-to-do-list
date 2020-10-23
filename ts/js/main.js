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
        this.events();
    }
    events() {
        var _a;
        (_a = document.querySelector('body')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (e) => {
            let targe = e.target;
            let name = targe.getAttribute('name');
            let id = targe.getAttribute('id');
            try {
                if (name === 'edit' && id) {
                    this.edit(Number(id));
                }
                else if (name === 'trash' && id) {
                    this.delete(Number(id));
                }
                else if (name === 'add') {
                    this.write();
                }
            }
            catch (error) {
            }
        });
    }
    search() {
        let searcher = document.getElementById('input-searcher');
        searcher === null || searcher === void 0 ? void 0 : searcher.addEventListener('keyup', () => {
            __classPrivateFieldGet(this, _print).travel(searcher === null || searcher === void 0 ? void 0 : searcher.value, labors);
        });
    }
    write() {
        let num = 0;
        let block = true;
        while (block) {
            block = false;
            for (const item of labors) {
                if (item.id === num) {
                    num++;
                }
            }
            for (const item of labors) {
                if (item.id === num) {
                    block = true;
                }
            }
        }
        let obNew = { text: '', date: __classPrivateFieldGet(this, _stored).getDate(), id: num };
        __classPrivateFieldGet(this, _stored).write(obNew);
        __classPrivateFieldGet(this, _print).printNew(obNew);
    }
    read() {
        labors = __classPrivateFieldGet(this, _stored).read();
        __classPrivateFieldGet(this, _print).travel('', labors);
    }
    delete(id) {
        __classPrivateFieldGet(this, _stored).delete(id, labors);
        this.read();
    }
    edit(id) {
        let text = prompt('Introduce el texto deseado');
        __classPrivateFieldGet(this, _stored).edit(id, text, labors);
        this.read();
    }
}
_stored = new WeakMap(), _print = new WeakMap();
new Events();
