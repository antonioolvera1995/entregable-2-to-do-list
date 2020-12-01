

interface Labor {
    date: string,
    text: string,
    id: number
}
let labors: Labor[] = [];


class Events {
    #stored: Stored;
    #print: Print;
    #blockEdit: boolean = false;
    #reveal: boolean = false;
    #blockReveal: boolean = false;
    constructor() {
        this.#stored = new Stored();
        this.#print = new Print();
        this.loads();

    }

    async loads() {

try {
    await this.read();
     this.search();
     this.events();
    // this.windowSize();
} catch (error) {
    console.log(error);
    
}

    }
    // windowSize() {
    //     let divList:HTMLInputElement = document.getElementById('list') as HTMLInputElement;
    //     let body:HTMLElement = document.querySelector('body') as HTMLElement;
    //     let bodyHeight:number = body.clientHeight;
    //     divList.style.minHeight = `${bodyHeight-209}px`;
    // }

    events() {
        document.querySelector('body')?.addEventListener('click', (e) => {

            let targe: HTMLInputElement = e.target as HTMLInputElement;
            let name: string = targe.getAttribute('name') as string;
            let id: string = targe.getAttribute('id') as string;


            if (!this.#blockReveal) {
                if (targe.getAttribute('nam') === 'textArea') {
                    let scrolH = targe.scrollHeight;
                    if (!this.#reveal) {
                        targe.style.height = `${scrolH - 10}px`;
                        this.#reveal = true;
                    } else {
                        targe.style.height = `42px`;
                        this.#reveal = false;
                    }

                }
            }




            try {
                if (name === 'edit' && id.substring(0, 5) === 'edit-') {
                    this.edit(Number(id.substring(5, id.length)), targe);
                    this.#reveal = true;
                } else if (name === 'trash' && id) {
                    if (!this.#blockEdit) {
                        this.delete(Number(id));
                    }
                } else if (name === 'add') {
                    if (!this.#blockEdit) {
                        this.write();
                    }
                }

            } catch (error) {
                console.log(error);

            }


        });
    }
    search() {
        let searcher = <HTMLInputElement>document.getElementById('input-searcher');
        searcher?.addEventListener('keyup', () => {
            if (!this.#blockEdit) {
                this.#print.travelSearch(searcher?.value.toLocaleLowerCase(), labors);
            }
        });
        searcher?.addEventListener('click', () => {
            searcher.select();
        });
    }


   async write() {
        let num = 0;
        let block = true;
        while (block) {
            block = false;
            for (const item of labors) {
                if (item.id >= num) {
                    num++;
                }
            }
            for (const item of labors) {
                if (item.id >= num) {
                    block = true;
                }
            }

        }

        let obNew: Labor = { text: '', date: this.#stored.getDate(), id: num };
        await this.#stored.write(obNew);
        this.#print.printNew(obNew);
        let add: HTMLInputElement = document.getElementById(`edit-${num}`) as HTMLInputElement;
        add.click();


    }


  async  read() {
    try {
        

        //@ts-ignore
        await this.#stored.read().then((res)=>{labors = res}).catch((error)=>{});
        this.#print.print(labors);

    } catch (error) {
        console.log(error);
        
    }
    }

   async delete(id: number) {
        let div: HTMLInputElement = document.getElementById(`block-in-${id}`) as HTMLInputElement;
        div.remove();
        //@ts-ignore
        await this.#stored.delete(id, labors).then((res)=>{labors = res})
        .catch((error)=>{console.log(error);
        });
    }


   async edit(id: number, targe: HTMLInputElement) {

        let textarea: HTMLInputElement = document.getElementById(`textarea-${id}`) as HTMLInputElement;
        if (!this.#blockEdit) {
            this.#blockReveal = true;
            this.#blockEdit = true;
            targe.classList.remove('fa-pencil');
            targe.classList.add('fa-check');
            textarea.disabled = false;
            textarea.selectionStart = textarea.value.length;
            textarea.focus();
            let scrolH = textarea.scrollHeight;
            textarea.style.height = `${scrolH - 10}px`;

        } else {

            let block = true;
            for (const item of targe.classList) {
                if (item === 'fa-check') {
                    block = false;
                }
            }

            if (!block) {
                this.#blockReveal = false;
                this.#blockEdit = false;
                let text: string = textarea.value;
                await this.#stored.edit(id, text, labors);

                targe.classList.add('fa-pencil');
                targe.classList.remove('fa-check');
                textarea.disabled = true;
                textarea.blur();
                // this.read();
            }




        }

    }


}



//Start
new Events();