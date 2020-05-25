import { Injectable } from '@angular/core';
import { IUser } from 'src/app/interfaces/IUser';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userFake: IUser = {
    username: 'juanpablo',
    email: 'juanpablo@no.com',
    password: 'juanpablo'
  };

  constructor() { }

  login(user: IUser): Observable<any> {
    let toSend = false;
    if (JSON.stringify(user) === JSON.stringify(this.userFake)) {
      toSend = true;
    }
    return of(toSend).pipe(delay(5000));
  }
}
