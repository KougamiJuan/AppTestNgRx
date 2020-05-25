import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { User } from '../models/user';
import * as userActions from '../actions/auth.action';

export type Action = userActions.All;

@Injectable({
  providedIn: 'root'
})
export class UserEffects {

  constructor(private actions: Actions, private afAuth: AngularFireAuth) { }

  @Effect()
  getUser: Observable<Action> = this.actions
    .pipe(
      ofType(userActions.AuthActionTypes.GET_USER),
      map((action: userActions.GetUser) => action.payload),
      switchMap(() => this.afAuth.authState),
      map((authData: User) => {
        if (authData) {
          const user = new User(authData.uid, authData.displayName);
          return new userActions.Authenticated(user);
        } else {
          return new userActions.NotAuthenticated();
        }
      }),
      catchError(() => of(new userActions.AuthError()))
    );

  @Effect()
  login: Observable<Action> = this.actions
    .pipe(
      ofType(userActions.AuthActionTypes.GOOGLE_LOGIN),
      map((action: userActions.GoogleLogin) => action.payload),
      switchMap(() => from(this.googleLogin())),
      map(() => new userActions.GetUser()),
      catchError(err => of(new userActions.AuthError({ error: err.message })))
    );

  @Effect()
  Logout: Observable<Action> = this.actions
    .pipe(
      ofType(userActions.AuthActionTypes.LOGOUT),
      map((action: userActions.Logout) => action.payload),
      switchMap(() => of(this.afAuth.signOut())),
      map(() => new userActions.NotAuthenticated()),
      catchError(err => {
        console.log('logout', err);
        return of(new userActions.AuthError({ err: err.message }));
      })
    );

  private googleLogin(): Promise<firebase.auth.UserCredential> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.afAuth.signInWithPopup(provider);
  }
}
