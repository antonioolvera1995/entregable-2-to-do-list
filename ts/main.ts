

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
        document.querySelector('body')?.addEventListener('click', (e) => {

            let targe: HTMLInputElement = e.target as HTMLInputElement;
            let name: string = targe.getAttribute('name') as string;
            let id: string = targe.getAttribute('id') as string;
            try {
                if (name === 'edit' && id) {
                    this.edit(Number(id));
                } else if (name === 'trash' && id) {
                    this.delete(Number(id));
                }else if (name === 'add') {
                    this.write();
                }

            } catch (error) {

            }


        });
    }
    search() {
        let searcher = <HTMLInputElement>document.getElementById('input-searcher');
        searcher?.addEventListener('keyup', () => {
            this.#print.travel(searcher?.value, labors);
        });
    }


    write() {
        let num = 0;
        let block = true;
        while (block) {
            block = false;
            for (const item of labors) {
                if (item.id === num) {
                    num++;
                }
            }
            for (const item of labors) {
                if (item.id === num) {
                   block = true;
                }
            }
            
        }

        let obNew:Labor = {text:'', date: this.#stored.getDate(),id:num};
        this.#stored.write(obNew);
        this.#print.printNew(obNew);

    }


    read() {
        labors = this.#stored.read();
        this.#print.travel('', labors);
    }

    delete(id: number) {
        this.#stored.delete(id, labors);
        this.read();
    }


    edit(id: number) {
       let text:string = prompt('Introduce el texto deseado') as string;
        this.#stored.edit(id, text, labors);
        this.read();
    }


}



//Start
new Events();