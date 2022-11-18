import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { User } from '../../model/user.model';
import { AuthActions } from '../action-types';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: User
};

// Estado inicial do state (auth)
export const initialAuthState: AuthState = { user: undefined };

// Reducer: Utilizado no module para reconhecer as actions e modificar o state.
export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state, action) => ({
    user: action.user
  })),
  on(AuthActions.logout, (state, action) => ({
    user: undefined
  }))
);
