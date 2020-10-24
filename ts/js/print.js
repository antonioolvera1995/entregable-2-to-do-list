"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var _numberColor;
class Print {
    constructor() {
        _numberColor.set(this, 0);
    }
    travel(search, laborsTemp) {
        let laborsPrint = [];
        if (search === '') {
            laborsPrint = laborsTemp;
        }
        else {
            for (let i = 0; i < laborsTemp.length; i++) {
                const element = laborsTemp[i];
                if (element.text.search(search) > -1) {
                    laborsPrint.push(element);
                }
            }
        }
        this.print(laborsPrint);
    }
    print(laborsPrint) {
        let ul = document.getElementById('list');
        ul.innerHTML = '';
        let lista = '';
        for (let i = 0; i < laborsPrint.length; i++) {
            const element = laborsPrint[i];
            lista += `<div style="background-color:${this.travelColor()} ;" class="div-block">
            <div class="div-texts">
                <div class="div-text-1">${element.date}</div>
                <textarea id="textarea-${element.id}" disabled class="div-text-2">${element.text}</textarea>
            </div>
            <div  class="div-edit"><i name="edit" id="${element.id}" class="fa fa-pencil fa-3x shadow" aria-hidden="true"></i></i></div>
            <div  class="div-trash"><i name="trash" id="${element.id}" class="fa fa-trash fa-3x shadow" aria-hidden="true"></i></div>
        </div>`;
            __classPrivateFieldSet(this, _numberColor, +__classPrivateFieldGet(this, _numberColor) + 1);
        }
        ul.innerHTML = lista;
    }
    printNew(laborsPrint) {
        let ul = document.getElementById('list');
        let ul1 = document.createElement('div');
        ul1.classList.add('div-block');
        ul1.style.backgroundColor = `${this.travelColor()}`;
        __classPrivateFieldSet(this, _numberColor, +__classPrivateFieldGet(this, _numberColor) + 1);
        ul1.innerHTML = '';
        let lista = '';
        lista = `
            <div class="div-texts">
                <div class="div-text-1">${laborsPrint.date}</div>
                <textarea id="textarea-${laborsPrint.id}" disabled class="div-text-2">${laborsPrint.text}</textarea>
            </div>
            <div  class="div-edit"><i name="edit" id="${laborsPrint.id}" class="fa fa-pencil fa-3x shadow" aria-hidden="true"></i></i></div>
            <div  class="div-trash"><i name="trash" id="${laborsPrint.id}" class="fa fa-trash fa-3x shadow" aria-hidden="true"></i></div>`;
        ul1.innerHTML = lista;
        ul.insertBefore(ul1, ul.childNodes[0]);
    }
    travelColor() {
        let colors = [
            'rgb(199,206,234)', 'rgb(175,195,210)', 'rgb(175,233,255)', 'rgb(181,234,215)',
            'rgb(226,240,203)', 'rgb(255,218,193)', 'rgb(255,183,178)', 'rgb(255,154,162)'
        ];
        if (__classPrivateFieldGet(this, _numberColor) >= colors.length) {
            __classPrivateFieldSet(this, _numberColor, 0);
        }
        return colors[__classPrivateFieldGet(this, _numberColor)];
    }
}
_numberColor = new WeakMap();
