class Print {
    #numberColor: number = 0;
    constructor() { }



    travelSearch(search: string, laborsTemp: Labor[]) {
        let laborsPrint: Labor[] = [];
        if (search === '') {
            this.printSearch(laborsTemp);
        }
        else {
            for (let i = 0; i < laborsTemp.length; i++) {
                const element = laborsTemp[i];
                if ((element.text.toLocaleLowerCase()).search(search) > -1) {
                    laborsPrint.push(element);
                }
            }
            this.printSearch(laborsPrint);
        }


    }

    printSearch(laborsPrint: Labor[]) {

        for (let i = 0; i < labors.length; i++) {
            const element = labors[i];
            let div: HTMLInputElement = document.getElementById(`block-in-${element.id}`) as HTMLInputElement;
            div.style.display = 'none';
        }

        for (let i = 0; i < laborsPrint.length; i++) {
            const element = laborsPrint[i];
            let div: HTMLInputElement = document.getElementById(`block-in-${element.id}`) as HTMLInputElement;
            div.style.display = 'flex';
        }


    }




    print(laborsPrint: Labor[]) {
        let ul: HTMLInputElement = document.getElementById('list') as HTMLInputElement;
        ul.innerHTML = '';
        let lista: string = '';

        //-------Modificar cuando termine html-------
        for (let i = 0; i < laborsPrint.length; i++) {
            const element = laborsPrint[i];

            lista += `<div id="block-in-${element.id}" style="background-color:${this.travelColor()} ;" class="div-block">
            <div class="div-texts">
                <div class="div-text-1">${element.date}</div>
                <textarea nam="textArea" id="textarea-${element.id}" disabled class="div-text-2">${element.text}</textarea>
            </div>
            <div  class="div-edit"><i name="edit" id="${element.id}" class="fa fa-pencil fa-3x shadow" aria-hidden="true"></i></i></div>
            <div  class="div-trash"><i name="trash" id="${element.id}" class="fa fa-trash fa-3x shadow" aria-hidden="true"></i></div>
        </div>`;

            this.#numberColor++;
        }

        ul.innerHTML = lista;

    }

    printNew(laborsPrint: Labor) {
        let ul: HTMLInputElement = document.getElementById('list') as HTMLInputElement;

        let ul1: HTMLInputElement = document.createElement('div') as HTMLInputElement;
        ul1.classList.add('div-block');
        ul1.setAttribute('id', `block-in-${laborsPrint.id}`);
        ul1.style.backgroundColor = `${this.travelColor()}`;
        this.#numberColor++;
        ul1.innerHTML = '';
        let lista: string = '';


        lista = `
            <div class="div-texts">
                <div class="div-text-1">${laborsPrint.date}</div>
                <textarea nam="textArea"  id="textarea-${laborsPrint.id}" disabled class="div-text-2">${laborsPrint.text}</textarea>
            </div>
            <div  class="div-edit"><i name="edit" id="${laborsPrint.id}" class="fa fa-pencil fa-3x shadow" aria-hidden="true"></i></i></div>
            <div  class="div-trash"><i name="trash" id="${laborsPrint.id}" class="fa fa-trash fa-3x shadow" aria-hidden="true"></i></div>`;

        ul1.innerHTML = lista;
        ul.insertBefore(ul1, ul.childNodes[0]);

    }


    travelColor(): string {
        let colors: string[] = [
            'rgb(199,206,234)', 'rgb(175,195,210)', 'rgb(175,233,255)', 'rgb(181,234,215)',
            'rgb(226,240,203)', 'rgb(255,218,193)', 'rgb(255,183,178)', 'rgb(255,154,162)'];

        if (this.#numberColor >= colors.length) {
            this.#numberColor = 0;
        }

        return colors[this.#numberColor];
    }



}