import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appCounter'  //this is what i have to use in my html views
})
export class AppCounterPipe implements PipeTransform {

  /* -------------------------------------------------------------------------*/
  /* transform - The method that is called every time this PIPE is used
  /*   1st arg - A value (for example a promotor object)
  /*   2nd arg - The search term that the user inputs
  /* -------------------------------------------------------------------------*/
  /*
  transform(items, args) {
    // NO ENTIENDO SU FUNCIONAMIENTO
    console.log("Entra en transform para Counter");

    if (!args) {
        return items;

    } else if (typeof args === "object"){

        //Update specified object key with count being passed through
        args.object[args.key] = items.length;

        return items;

    } else{
        return items;
    }
  }
 */


  // We can get the count of the items by transforming the array within a pipe.
  // The pipe would transform the array into another array where each element 
  // has an item property + a parent property representing the filtered (or original) array
  
  transform(items: Array<any>, args: any[] = null): any { //only uses 1st argument
    /*
    console.log("Entra en transform para Counter");

    if (items === undefined) return items;
    //Although it counts it breaks the promotores table presentation (lose original format)
    //Is not good performance approach, for each 'item' we return a new object with the item and the whole colection 
    return items.map(t => {
        return {
            item: t,
            parent: items
        }
    });
    */
  } // transform
  

}