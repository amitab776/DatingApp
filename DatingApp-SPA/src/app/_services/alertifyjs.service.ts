import { Injectable } from '@angular/core';
import * as alertifyjs from 'alertifyjs';

@Injectable({
  providedIn: 'root'
})
export class AlertifyjsService {

constructor() { }

success(message: string){
  alertifyjs.success(message);
}

confirm(message: string, okCallback: () => any){
  alertifyjs.confirm(message, (e: any) => {
    if(e){
      okCallback();
    }
    else{}
  });
}

warning(message: string){
  alertifyjs.warning(message);
}

error(message: string){
  alertifyjs.error(message);
}

message(message: string){
  alertifyjs.message(message);
}
}
