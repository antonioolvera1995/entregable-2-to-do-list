

interface Labor {
    date: string,
    text: string,
    id:number
}
let labors: Labor[] = [];


class Events {
    #stored: Stored;
    #print: Print;
    constructor() {
        this.#stored = new Stored();
        this.#print = new Print();
        this.read();
        this.search();


        //---pruebas

        // this.#stored.edit(1,'nuevo texto', labors)
        // this.#stored.write({date:'eee',text:'mi texto'});

        //-------
        // console.log(labors); //-----------------------eliminar----------------------
    }

    search() {
        let searcher = <HTMLInputElement>document.getElementById('input-searcher');
        searcher?.addEventListener('keyup',()=>{
            this.#print.travel(searcher?.value, labors);
        });
    }


    write() {


    }


    read() {
        labors = this.#stored.read();
        this.#print.travel('',labors);

    }

    delete() {


    }



}



//Start
new Events();