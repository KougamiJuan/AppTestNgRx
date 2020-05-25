import { ActionReducerMap, createSelector, createFeatureSelector, ActionReducer, MetaReducer, } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { RouterStateUrl } from '../shared/utils';
import * as fromRouter from '@ngrx/router-store';
/**
 * storeFreeze evita que el estado sea mutado. Cuando ocurre la mutación,
 * se lanzará una excepción. Esto es útil durante el modo de desarrollo para
 * asegurarse de que ninguno de los reductores muta accidentalmente el estado.
 */
// npm i --save-dev ngrx-store-freeze
import { storeFreeze } from 'ngrx-store-freeze';
/**
 * La exportación predeterminada de cada módulo reductor es la función reductora en sí misma.
 * Además, cada módulo debe exportar un tipo o interfaz que describa
 * el estado del reductor más cualquier función de selector. El `* as` es
 * la notación que empaqueta todas las exportaciones en un solo objeto.
 */
import * as fromAuth from '../auth/reducers/auth.reducer';

/**
 * Como se mencionó, tratamos cada reductor como una tabla en una base de datos. Esto significa que
 * nuestra interfaz de estado de nivel superior es solo un mapa de las claves de los tipos de estado interno.
 */
export interface State {
  auth: fromAuth.State;
  router: fromRouter.RouterReducerState<RouterStateUrl>;
}

/**
 * Nuestro estado se compone de un mapa de funciones de reducción de acción.
 * Estas funciones del reductor se invocan con cada acción despachada
 * y el estado actual o inicial devuelve un nuevo estado inmutable.
 */
export const reducers: ActionReducerMap<State | any> = {
  auth: fromAuth.userReducer,
  router: fromRouter.routerReducer,
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state: State, action: any): State => {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  };
}

/**
 * De forma predeterminada, @ngrx/store usa combineReducers con el mapa del reductor para componer
 * el meta-reductor de la raíz. Para agregar más meta-reductores, proporcione una variedad de meta-reductores
 * que se compondrá para formar el meta-reductor de raíz.
 */
export const metaReducers: MetaReducer<State>[] = !environment.production ? [logger, storeFreeze] : [];

// Layout Reducers
export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getAuth = createSelector(getAuthState, fromAuth.getAuthState);
