
class Stored {
  constructor() { }

  write(laborTemp: Labor) {

    try {
      if (laborTemp.date.length > 2) {
        labors.push(laborTemp);
        let text = JSON.stringify(labors);
        localStorage.setItem('labors', text);
      }
    } catch (error) {
      labors.push(laborTemp);
    }

  }

  writeAll(laborsTemp: Labor[]) {

    try {
      let text = JSON.stringify(laborsTemp);
      localStorage.setItem('labors', text);
    } catch (error) {

    }

  }

  read(): Labor[] {

    let search:HTMLInputElement = <HTMLInputElement>document.getElementById('input-searcher');
    search.blur();
    search.value = '';
    
    let laborsTemp: Labor[] = [];
    try {

      let text: string = localStorage.getItem(`labors`) as string;
      if (text && text.length > 2) {
        laborsTemp = JSON.parse(text);
      } else {
        laborsTemp = [{ date: this.getDate(), text: '', id:0}];
      }
    } catch (error) {
      laborsTemp = [{ date: this.getDate(), text: '', id:0 }];
    }

    laborsTemp = laborsTemp.sort((a, b) =>{


      return b.id-a.id;
    });
    return laborsTemp;
  }




  delete(id: number, laborTemp: Labor[]): Labor[] {
    let laborsClear: Labor[] = [];
    for (let i = 0; i < laborTemp.length; i++) {
      if (laborTemp[i].id === id) {
      } else {
        const element = laborTemp[i];
        laborsClear.push(element);
      }

    }
    this.writeAll(laborsClear);
    return laborsClear;
  }


  edit(id: number, text:string,  laborTemp: Labor[]):Labor[] {

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
    this.writeAll(laborsEdit);
    return laborsEdit;
  }





  getDate(): string {
    let date: Date = new Date();

    let day:string = `${date.getDate()}`;
    let month:string = `${date.getMonth() + 1}`;
    let year:string = `${date.getFullYear()}`;

    let hour:string = `${date.getHours()}`;
    let minutes:string = `${date.getMinutes()}`;

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
