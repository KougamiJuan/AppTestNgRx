import { Injectable } from '@angular/core';
import { from, Observable, of, throwError } from 'rxjs';
import { IUser } from 'src/app/interfaces/IUser';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userFake: IUser = {
    username: 'juanpablo',
    email: 'juanpablo@no.com',
    password: 'juanpablo'
  };

  constructor() { }

  login(user: any): Observable<any> {
    // Emular un true
    let toSend = {
      isLoading: false,
      error: true,
      ...user
    };
    if (JSON.stringify(user.user) === JSON.stringify(this.userFake)) {
      toSend = {
        isLoading: false,
        error: false,
        user
      };
    } else {
      return throwError('Invalid username or password');
    }
    return of(toSend).pipe(delay(5000));
  }
}
