

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
        labors = this.#stored.read();
        this.#print.travel('',labors);


        
        //---pruebas

        // this.#stored.edit(1,'nuevo texto', labors)
        // this.#stored.write({date:'eee',text:'mi texto'});

        //-------
        // console.log(labors); //-----------------------eliminar----------------------
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