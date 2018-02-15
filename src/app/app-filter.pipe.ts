import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appFilter'  //this is what i have to use in my html views
})
export class AppFilterPipe implements PipeTransform {

  /* -------------------------------------------------------------------------*/
  /* transform - The method that is called every time this PIPE is used
  /*   1st arg - A value (for example a promotor object)
  /*   2nd arg - The search term that the user inputs
  /* -------------------------------------------------------------------------*/

  /* THIS IS ONLY good to search "mis promotores" ------------------------------
  transform(items: any, searchTerm: any): any {
    // check if search term is undefined
    if (searchTerm === undefined) return elements;

    // return updated array (using JS filter function)
    return items.filter(function(item) {
      return item.creado_por.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }
  */

  /* THIS IS GOOD TO SEARCH FOR any kind of 1st LEVEL properties for each item in the list  */
  /* So it filters the 'items' list BUT ONLY looking the 1st level properties in each item */
  /* that means that if we have a 2nd level property (an object inside an object, see 'list-obras') */
  /* it WON'T look inside that 2nd level object to filter (we have only 1 'for' loop)  */
  /* Making this PIPE to ready to look beyond 1st level will take NESTED loops */
  /* and increasing the complexity (not something that I need for this app) */
  transform(items: any, searchTerm: any): any {
  //transform (items: Array<{ [key: string]: any }>, searchTerm: string): Array<{ [key: string]: any }> {
     /* console.log("Entra en transform");
    console.log(searchTerm);
    console.log(items); */

    // check if search term is undefined
    if (searchTerm === undefined || items === undefined) return items;

    const searchTermLC = searchTerm.toLowerCase();

    //console.log('searchTermLC: ' + searchTermLC);
    //console.log('items length: ' + items.length);
    //let itemCounter: number = 0;

    // return updated array (using JS filter function)
    let filteredList = items.filter(function (item: any) {

      /* Trazas para entender a la perfeccion su funcionamiento
      if (searchTermLC === 'firefox' || searchTermLC === 'chrome') {
        itemCounter++;
        console.log('ITEM COUNTER: ' + itemCounter);
        console.log('----------------------------------');
      } */

      // look for each property in the object 
      for (let property in item) {

        if (item[property] === null) {
          continue;
        }

        /*
        if (searchTermLC === 'firefox' || searchTermLC === 'chrome') {
          console.log(property + ': ' + item[property].toString().toLowerCase());
        } */
          
        if (item[property].toString().toLowerCase().includes(searchTermLC)) {
          return true; //save it in the update array that "filter" will return
        }
      } //FOR loop
        

      return false;
    }); // items.filter

    /* 
    if (searchTermLC === 'firefox' || searchTermLC === 'chrome') {
      console.log(filteredList);
      console.log('');
    } */
        
    return filteredList;
    
  } // transform --------------------------------------------------------------*/

   
  /* 
   * @param items - List of items to filter
   * @param term  - A string term to compare with every property of the list
   */
  /*
  static filter(items: Array<{ [key: string]: any }>, searchTerm: string): Array<{ [key: string]: any }> {

    const toCompare = searchTerm.toLowerCase();

    return items.filter(function (item: any) {
      // look for each property in the object 
      for (let property in item) {
        if (item[property] === null) {
          continue;
        }
        if (item[property].toString().toLowerCase().includes(toCompare)) {
          return true; //save it in the update array that "filter" will return
        }
      }
      return false;
    });
  } */

}
