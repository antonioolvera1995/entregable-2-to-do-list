"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
var _stored, _print, _blockEdit, _reveal, _blockReveal;
let labors = [];
class Events {
    constructor() {
        _stored.set(this, void 0);
        _print.set(this, void 0);
        _blockEdit.set(this, false);
        _reveal.set(this, false);
        _blockReveal.set(this, false);
        __classPrivateFieldSet(this, _stored, new Stored());
        __classPrivateFieldSet(this, _print, new Print());
        this.loads();
    }
    loads() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.read();
                this.search();
                this.events();
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    events() {
        var _a;
        (_a = document.querySelector('body')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (e) => {
            let targe = e.target;
            let name = targe.getAttribute('name');
            let id = targe.getAttribute('id');
            if (!__classPrivateFieldGet(this, _blockReveal)) {
                if (targe.getAttribute('nam') === 'textArea') {
                    let scrolH = targe.scrollHeight;
                    if (!__classPrivateFieldGet(this, _reveal)) {
                        targe.style.height = `${scrolH - 10}px`;
                        __classPrivateFieldSet(this, _reveal, true);
                    }
                    else {
                        targe.style.height = `42px`;
                        __classPrivateFieldSet(this, _reveal, false);
                    }
                }
            }
            try {
                if (name === 'edit' && id.substring(0, 5) === 'edit-') {
                    this.edit(Number(id.substring(5, id.length)), targe);
                    __classPrivateFieldSet(this, _reveal, true);
                }
                else if (name === 'trash' && id) {
                    if (!__classPrivateFieldGet(this, _blockEdit)) {
                        this.delete(Number(id));
                    }
                }
                else if (name === 'add') {
                    if (!__classPrivateFieldGet(this, _blockEdit)) {
                        this.write();
                    }
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    search() {
        let searcher = document.getElementById('input-searcher');
        searcher === null || searcher === void 0 ? void 0 : searcher.addEventListener('keyup', () => {
            if (!__classPrivateFieldGet(this, _blockEdit)) {
                __classPrivateFieldGet(this, _print).travelSearch(searcher === null || searcher === void 0 ? void 0 : searcher.value.toLocaleLowerCase(), labors);
            }
        });
        searcher === null || searcher === void 0 ? void 0 : searcher.addEventListener('click', () => {
            searcher.select();
        });
    }
    write() {
        return __awaiter(this, void 0, void 0, function* () {
            let num = 0;
            let block = true;
            while (block) {
                block = false;
                for (const item of labors) {
                    if (item.id >= num) {
                        num++;
                    }
                }
                for (const item of labors) {
                    if (item.id >= num) {
                        block = true;
                    }
                }
            }
            let obNew = { text: '', date: __classPrivateFieldGet(this, _stored).getDate(), id: num };
            yield __classPrivateFieldGet(this, _stored).write(obNew);
            __classPrivateFieldGet(this, _print).printNew(obNew);
            let add = document.getElementById(`edit-${num}`);
            add.click();
        });
    }
    read() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield __classPrivateFieldGet(this, _stored).read().then((res) => { labors = res; }).catch((error) => { });
                __classPrivateFieldGet(this, _print).print(labors);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let div = document.getElementById(`block-in-${id}`);
            div.remove();
            yield __classPrivateFieldGet(this, _stored).delete(id, labors).then((res) => { labors = res; })
                .catch((error) => {
                console.log(error);
            });
        });
    }
    edit(id, targe) {
        return __awaiter(this, void 0, void 0, function* () {
            let textarea = document.getElementById(`textarea-${id}`);
            if (!__classPrivateFieldGet(this, _blockEdit)) {
                __classPrivateFieldSet(this, _blockReveal, true);
                __classPrivateFieldSet(this, _blockEdit, true);
                targe.classList.remove('fa-pencil');
                targe.classList.add('fa-check');
                textarea.disabled = false;
                textarea.selectionStart = textarea.value.length;
                textarea.focus();
                let scrolH = textarea.scrollHeight;
                textarea.style.height = `${scrolH - 10}px`;
            }
            else {
                let block = true;
                for (const item of targe.classList) {
                    if (item === 'fa-check') {
                        block = false;
                    }
                }
                if (!block) {
                    __classPrivateFieldSet(this, _blockReveal, false);
                    __classPrivateFieldSet(this, _blockEdit, false);
                    let text = textarea.value;
                    yield __classPrivateFieldGet(this, _stored).edit(id, text, labors);
                    targe.classList.add('fa-pencil');
                    targe.classList.remove('fa-check');
                    textarea.disabled = true;
                    textarea.blur();
                }
            }
        });
    }
}
_stored = new WeakMap(), _print = new WeakMap(), _blockEdit = new WeakMap(), _reveal = new WeakMap(), _blockReveal = new WeakMap();
new Events();
