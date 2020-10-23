

interface Labor {
    date: string,
    text: string
}
let labors: Labor[] = [];


class Events {
    #stored: Stored;
    #print: Print;
    constructor() {
        this.#stored = new Stored();
        this.#print = new Print();
        labors = this.#stored.read();
        console.log(labors); //-----------------------eliminar----------------------
        
        
    }

    search() {

    }


    write() {


    }


    read() {
        labors = this.#stored.read();


    }

    delete() {


    }



}



//Start
new Events();