import { createFeatureSelector, createSelector } from "@ngrx/store";
import { authFeatureKey, AuthState } from "./reducers/auth.reducers";

// FeatureSelector: Utilizado para consultar o "objeto/state" dentro da store. Assim tipando a consulta nos selectors.
export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

// Selectors: utlizados para consultar a store 
export const isLoggedIn = createSelector(
  selectAuthState,
  (auth) => !!auth.user
);

export const isLoggedOut = createSelector(
  isLoggedIn,
  (loggedIn) => !loggedIn
);
