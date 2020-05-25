import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  GET_USER = '[Auth] Get User',
  AUTHENTICATED = '[Auth] Authenticated',
  NOT_AUTHENTICATED = '[Auth] Not Authenticated',
  GOOGLE_LOGIN = '[Auth] Google Login Attempt',
  LOGOUT = '[Auth] Logout',
  AUTH_ERROR = '[Auth] Error'
}

export class GetUser implements Action {
  readonly type = AuthActionTypes.GET_USER;
  constructor(public payload?: any) { }
}

export class Authenticated implements Action {
  readonly type = AuthActionTypes.AUTHENTICATED;
  constructor(public payload?: any) { }
}

export class NotAuthenticated implements Action {
  readonly type = AuthActionTypes.NOT_AUTHENTICATED;
  constructor(public payload?: any) { }
}

export class GoogleLogin implements Action {
  readonly type = AuthActionTypes.GOOGLE_LOGIN;
  constructor(public payload?: any) { }
}

export class Logout implements Action {
  readonly type = AuthActionTypes.LOGOUT;
  constructor(public payload?: any) { }
}

export class AuthError implements Action {
  readonly type = AuthActionTypes.AUTH_ERROR;
  constructor(public payload?: any) { }
}

export type All = GetUser | Authenticated | NotAuthenticated | GoogleLogin | AuthError | Logout;
