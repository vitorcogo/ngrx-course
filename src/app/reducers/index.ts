import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import {routerReducer} from '@ngrx/router-store';

export interface AppState {

}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer // Propriedade para configurar reducer a utilizar o router debugging (DevTools)
};

// MetaReducers são disparados antes dos outros.
export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    console.log('state before: ', state);
    console.log('action: ', action);
    
    return reducer(state, action);
  }
}

// array de metaReducers utilizados na aplicação, um para dev e outro para prod, são executados na ordem do array.
export const metaReducers: MetaReducer<AppState>[] =
    !environment.production ? [logger] : [];