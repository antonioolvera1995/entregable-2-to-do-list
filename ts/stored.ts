
class Stored {
  constructor() { }

  async callApi(url: string, method: string) {
    const usuario = await fetch(url, {
      method: method
    });

    let data = await usuario.json();
    return data;
  }

  async write(laborTemp: Labor) {

    try {
      if (laborTemp.date.length > 2) {
        labors.push(laborTemp);
        await this.callApi('http://localhost:3000/note', 'POST');
        // let text = JSON.stringify(labors);
        // localStorage.setItem('labors', text);
      }
    } catch (error) {
      labors.push(laborTemp);
    }

  }

  // async writeAll(laborsTemp: Labor[]) {

  //   try {
  //     let text = JSON.stringify(laborsTemp);
  //     localStorage.setItem('labors', text);
  //   } catch (error) {

  //   }

  // }

  // async read(): Labor[] {
  async read() {

    try {

      let search: HTMLInputElement = <HTMLInputElement>document.getElementById('input-searcher');
      search.blur();
      search.value = '';

      let laborsTemp: Labor[] = [];
      try {

        const getAll: DbObjet[] = await this.callApi('http://localhost:3000/notes', 'GET');
        for (const item of getAll) {
          let obj: Labor = { date: item.createdAt, text: item.description, id: item.id };
          laborsTemp.push(obj);
        }

      } catch (error) {
        laborsTemp = [{ date: this.getDate(), text: '', id: 0 }];
      }

      laborsTemp = laborsTemp.sort((a, b) => {


        return b.id - a.id;
      });
      return laborsTemp;


    } catch (error) {

    }
  }




  async delete(id: number, laborTemp: Labor[]) {
    try {


      let laborsClear: Labor[] = [];
      for (let i = 0; i < laborTemp.length; i++) {
        if (laborTemp[i].id === id) {
        } else {
          const element = laborTemp[i];
          laborsClear.push(element);
        }

      }
      // await this.writeAll(laborsClear);

      await this.callApi(`http://localhost:3000/note/${id}`, 'DELETE');
      return laborsClear;

    } catch (error) {
      console.log(error);

    }
  }


  async edit(id: number, text: string, laborTemp: Labor[]) {

    let laborsEdit: Labor[] = [];
    for (let i = 0; i < laborTemp.length; i++) {
      if (laborTemp[i].id === id) {
        const element = laborTemp[i];
        element.date = this.getDate();
        element.text = text;
        laborsEdit.push(element);
      } else {
        const element = laborTemp[i];
        laborsEdit.push(element);
      }

    }

    // console.log(JSON.stringify({description:text}), id);
    await fetch(`http://localhost:3000/note/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({ description: text })
    });

    // this.writeAll(laborsEdit);
    return laborsEdit;
  }





  getDate(): string {
    let date: Date = new Date();

    let day: string = `${date.getDate()}`;
    let month: string = `${date.getMonth() + 1}`;
    let year: string = `${date.getFullYear()}`;

    let hour: string = `${date.getHours()}`;
    let minutes: string = `${date.getMinutes()}`;

    if (day.length < 2) {
      day = `0${day}`;
    }
    if (month.length < 2) {
      month = `0${month}`;
    }

    if (hour.length < 2) {
      hour = `0${hour}`;
    }
    if (minutes.length < 2) {
      minutes = `0${minutes}`;
    }


    let dateString: string = `${day}/${month}/${year}  ${hour}:${minutes}`;
    return dateString;
  }
}

interface DbObjet {
  createdAt: string,
  description: string,
  id: number,
  updatedAt: string
}