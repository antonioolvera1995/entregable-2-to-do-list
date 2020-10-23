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
                laborsTemp = [{ date: this.getDate(), text: '', id: 0 }];
            }
        }
        catch (error) {
            laborsTemp = [{ date: this.getDate(), text: '', id: 0 }];
        }
        return laborsTemp;
    }
    delete(id, laborTemp) {
        let laborsClear = [];
        for (let i = 0; i < laborTemp.length; i++) {
            if (laborTemp[i].id === id) {
            }
            else {
                const element = laborTemp[i];
                laborsClear.push(element);
            }
        }
        this.writeAll(laborsClear);
        return laborsClear;
    }
    edit(id, text, laborTemp) {
        let laborsEdit = [];
        for (let i = 0; i < laborTemp.length; i++) {
            if (laborTemp[i].id === id) {
                const element = laborTemp[i];
                element.date = this.getDate();
                element.text = text;
                laborsEdit.push(element);
            }
            else {
                const element = laborTemp[i];
                laborsEdit.push(element);
            }
        }
        this.writeAll(laborsEdit);
        return laborsEdit;
    }
    getDate() {
        let date = new Date();
        let dateString = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()}`;
        return dateString;
    }
}
