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

        //-------Modificar cuando termine html-------
        for (let i = 0; i < laborsPrint.length; i++) {
            const element = laborsPrint[i];

            let li = document.createElement('div');
            li.classList.add('div-block')
            let nod = document.createTextNode(element.text);
            li.appendChild(nod);
            ul?.appendChild(li);
        }
        
    }

    travelColor() {


    }



}