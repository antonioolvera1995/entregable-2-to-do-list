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
        let search = document.getElementById('input-searcher');
        search.blur();
        search.value = '';
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
        laborsTemp = laborsTemp.sort((a, b) => {
            return b.id - a.id;
        });
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
        let day = `${date.getDate()}`;
        let month = `${date.getMonth() + 1}`;
        let year = `${date.getFullYear()}`;
        let hour = `${date.getHours()}`;
        let minutes = `${date.getMinutes()}`;
        if (day.length < 2) {
            day = `0${day}`;
        }
        if (month.length < 2) {
            month = `0${month}`;
        }
        if (hour.length < 2) {
            hour = `0${hour}`;
        }
        if (minutes.length < 2) {
            minutes = `0${minutes}`;
        }
        let dateString = `${day}/${month}/${year}  ${hour}:${minutes}`;
        return dateString;
    }
}
