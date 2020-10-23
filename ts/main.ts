

interface Labor {
    date: string,
    text: string,
    id: number
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
        this.events();

    }

    events() {
        document.querySelector('body')?.addEventListener('click',(e)=> {

        });
    }
    search() {
        let searcher = <HTMLInputElement>document.getElementById('input-searcher');
        searcher?.addEventListener('keyup', () => {
            this.#print.travel(searcher?.value, labors);
        });
    }


    write() {


    }


    read() {
        labors = this.#stored.read();
        this.#print.travel('', labors);
    }

    delete() {


    }


    edit() {


    }


}



//Start
new Events();