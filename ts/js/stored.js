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
class Stored {
    constructor() { }
    callApi(url, method) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield fetch(url, {
                method: method
            });
            let data = yield usuario.json();
            return data;
        });
    }
    write(laborTemp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (laborTemp.date.length > 2) {
                    labors.push(laborTemp);
                    yield this.callApi('http://localhost:3000/note', 'POST');
                }
            }
            catch (error) {
                labors.push(laborTemp);
            }
        });
    }
    read() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let search = document.getElementById('input-searcher');
                search.blur();
                search.value = '';
                let laborsTemp = [];
                try {
                    const getAll = yield this.callApi('http://localhost:3000/notes', 'GET');
                    for (const item of getAll) {
                        let obj = { date: item.createdAt, text: item.description, id: item["_id"] };
                        laborsTemp.push(obj);
                    }
                }
                catch (error) {
                    laborsTemp = [{ date: this.getDate(), text: '', id: 'undefine' }];
                }
                return laborsTemp;
            }
            catch (error) {
            }
        });
    }
    delete(id, laborTemp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.callApi(`http://localhost:3000/note/${id}`, 'DELETE');
                location.reload();
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    edit(id, text, laborTemp) {
        return __awaiter(this, void 0, void 0, function* () {
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
            yield fetch(`http://localhost:3000/note/${id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ description: text })
            });
            return laborsEdit;
        });
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
