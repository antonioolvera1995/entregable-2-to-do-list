class Print {
    constructor() { }

    travel(search: string, laborsTemp: Labor[]) {
        let laborsPrint: Labor[] = [];
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

    print(laborsPrint: Labor[]) {
        let ul: HTMLInputElement = document.getElementById('list') as HTMLInputElement;
        ul.innerHTML = '';
        let lista: string = '';

        //-------Modificar cuando termine html-------
        for (let i = 0; i < laborsPrint.length; i++) {
            const element = laborsPrint[i];

            lista += `<div class="div-block">
            <div class="div-texts">
                <div class="div-text-1">${element.date}</div>
                <textarea id="textarea-${element.id}" disabled class="div-text-2">${element.text}</textarea>
            </div>
            <div  class="div-edit"><i name="edit" id="${element.id}" class="fa fa-pencil fa-3x shadow" aria-hidden="true"></i></i></div>
            <div  class="div-trash"><i name="trash" id="${element.id}" class="fa fa-trash fa-3x shadow" aria-hidden="true"></i></div>
        </div>`;

        }

        ul.innerHTML = lista;

    }

    printNew(laborsPrint: Labor) {
        let ul: HTMLInputElement = document.getElementById('list') as HTMLInputElement;

        let ul1: HTMLInputElement = document.createElement('div') as HTMLInputElement;
        ul1.classList.add('div-block');
        ul1.innerHTML = '';
        let lista: string = '';


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


    }



}