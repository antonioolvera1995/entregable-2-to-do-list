"use strict";
class Stored {
    constructor() { }
    write(laborTemp) {
        try {
            if (laborTemp.date.length > 2) {
                labors.push(laborTemp);
                let text = JSON.stringify(labors);
                localStorage.setItem('labors', text);
            }
        }
        catch (error) {
            labors.push(laborTemp);
        }
    }
    writeAll(laborsTemp) {
        try {
            let text = JSON.stringify(laborsTemp);
            localStorage.setItem('labors', text);
        }
        catch (error) {
        }
    }
    read() {
        let laborsTemp = [];
        try {
            let text = localStorage.getItem(`labors`);
            if (text && text.length > 2) {
                laborsTemp = JSON.parse(text);
            }
            else {
                laborsTemp = [{ date: this.getDate(), text: '' }];
            }
        }
        catch (error) {
            laborsTemp = [{ date: this.getDate(), text: '' }];
        }
        return laborsTemp;
    }
    delete(position, laborTemp) {
        let laborsClear = [];
        for (let i = 0; i < laborTemp.length; i++) {
            if (position === i) {
            }
            else {
                const element = laborTemp[i];
                laborsClear.push(element);
            }
        }
        this.writeAll(laborsClear);
        return laborsClear;
    }
    edit() {
    }
    getDate() {
        let date = new Date();
        let dateString = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()}`;
        return dateString;
    }
}
