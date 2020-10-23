"use strict";
class Print {
    constructor() { }
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
        for (let i = 0; i < laborsPrint.length; i++) {
            const element = laborsPrint[i];
            let li = document.createElement('div');
            li.classList.add('div-block');
            let nod = document.createTextNode(element.text);
            li.appendChild(nod);
            ul === null || ul === void 0 ? void 0 : ul.appendChild(li);
        }
    }
    travelColor() {
    }
}
