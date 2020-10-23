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
        let ul:HTMLInputElement = document.getElementById('list') as HTMLInputElement;
        ul.innerHTML = '';
        let lista:string = '';

        //-------Modificar cuando termine html-------
        for (let i = 0; i < laborsPrint.length; i++) {
            const element = laborsPrint[i];

            lista += `<div class="div-block">
            <div class="div-texts">
                <div class="div-text-1">${element.date}</div>
                <div class="div-text-2">${element.text}</div>
            </div>
            <div class="div-edit"><i class="fa fa-pencil fa-3x shadow" aria-hidden="true"></i></i></div>
            <div class="div-trash"><i class="fa fa-trash fa-3x shadow" aria-hidden="true"></i></div>
        </div>`;
            
        }

        ul.innerHTML = lista;
        
    }

    travelColor() {


    }



}