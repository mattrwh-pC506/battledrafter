import { Injectable } from '@angular/core';


export abstract class UploadService {

  abstract makeFileRequest(
    url: string,
    file: File,
    data: any): Promise<any>;
}
