import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutText'
})
export class CutTextPipe implements PipeTransform {

  transform(value: string, limit : number,useRegex : boolean = false): string {
    let phrase = ''

    if(useRegex){
     let text = value.replace(new RegExp('<figure .+>.+</figure>','gi'),'')
     text = text.replace(/&nbsp;/g,'')

     let regex = new RegExp('<p>(.+?)</p>','g')
     let monTableau = []
     while ((monTableau = regex.exec(text)) !== null && phrase.length < limit) {
       phrase += '...' + monTableau[1].replace(new RegExp('<.+?>','g'),'')
     }
   }
    else{
      phrase = value
    }
    phrase = phrase.substring(3,limit + 3)  + '[...]'
    return phrase
  }

}

