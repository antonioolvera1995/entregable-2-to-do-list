
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
    let dateString: string = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()}`;
    return dateString;
  }
}
