import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileTransformService {

  constructor() {
  }

  urlToBase64(imageUrl: string) : Promise<string> {
    return fetch(imageUrl)
      .then(res => res.blob()
        .then(blob => this.blobToBase64(blob))
      )
  }

  urlToBlob(imageUrl: string) : Promise<Blob> {
    return fetch(imageUrl)
      .then(res => res.blob())
      .then(blob => blob)
  }



  base64ToFile(dataurl, filename) : File {

    let arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type: mime});
  }


  blobToBase64(file) : Promise<any>{
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result)
      }
      reader.onerror = (error) => {
        reject(error)
      };
    })
  }

}
