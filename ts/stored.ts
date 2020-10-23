
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
        laborsTemp = [{ date: this.getDate(), text: '' }];
      }
    } catch (error) {
      laborsTemp = [{ date: this.getDate(), text: '' }];
    }
    return laborsTemp;
  }




  delete(position: number, laborTemp: Labor[]): Labor[] {
    let laborsClear: Labor[] = [];
    for (let i = 0; i < laborTemp.length; i++) {
      if (position === i) {
      } else {
        const element = laborTemp[i];
        laborsClear.push(element);
      }

    }
    this.writeAll(laborsClear);
    return laborsClear
  }


edit(){


}





  getDate(): string {
    let date: Date = new Date();
    let dateString: string = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()}`;
    return dateString;
  }
}
