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
    }
    travelColor() {
    }
}
