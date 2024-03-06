import { createAction, props } from "@ngrx/store";
import { User } from "../model/user.model";

// Ações para operaçoes no state do store.
// Primeiro parametro: string com o "nome" da action - Convenção utilizar "[]" para informar onde executa a ação.
// Segundo parametro: (Opcional) payload da action, utilizar operados "props" para "montar" objeto do payload.

export const login = createAction(
  "[Login] User Login",
  props<{user: User}>()
);

export const logout = createAction(
  "[Menu] User Logout"
);