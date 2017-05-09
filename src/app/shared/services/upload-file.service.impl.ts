import { Injectable } from '@angular/core';
import { UploadService } from "./upload-file.service";


@Injectable()
export class BaseUploadService implements UploadService {

  public makeFileRequest(
    url: string,
    file: File,
    data: any,
  ) {

    return new Promise((resolve, reject) => {
      let formData: any = new FormData();
      let xhr = new XMLHttpRequest();
      formData.append('file', file, file.name);
      formData.append('data', JSON.stringify(data));
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };
      //let bearer = 'Bearer ' + localStorage.getItem('currentUser');
      xhr.open('POST', url, true);
      //xhr.setRequestHeader('Authorization', bearer);
      xhr.send(formData);
    });
  }
}

export const provideBaseUploadService = {
  provide: UploadService,
  useClass: BaseUploadService,
}
