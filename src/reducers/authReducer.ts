import { PersistConfig } from "redux-persist";
import { jwtDecode } from "jwt-decode";

import { AppStoreState } from "../store/RootReducer";
import { createReducer, createRootReducer, PerformAction } from "../utils/ReducerUtils";
import { DELETE, update } from "immupdate";
import { Action } from "redux";

export const authReducerPersistConfig: Partial<PersistConfig<AuthReducerState>> = {
  whitelist: ["token"],
};

export interface Profile {
  readonly Id: string;
  readonly email: string;
  readonly name: string;
  readonly role: string;
  readonly RoleName: string;
}

interface SetTokenMeta {
  readonly token: string;
}

enum ReducerActions {
  SetToken = "Auth/SetToken",
  ResetToken = "Auth/ResetToken",
}

export interface AuthReducerState {
  readonly token?: string;
}

function getState(): AuthReducerState {
  return {
    token: "",
  };
}

export const authReducer = createRootReducer<AuthReducerState>(
  getState(),

  createReducer([ReducerActions.SetToken], (state, { meta }) =>
    update(state, { token: meta.token }),
  ),

  createReducer([ReducerActions.ResetToken], (state) => update(state, { token: DELETE })),
);

// ==================
// Selectors
// ==================

export function tokenSelector(state: AppStoreState): string | undefined {
  return state.auth.token;
}

export function profileSelector(state: AppStoreState): Profile | undefined {
  if (state.auth.token) {
    const profile: Profile = jwtDecode(state?.auth?.token);
    return profile;
  }
  return;
}

// ==================
// Actions
// ==================

export function setToken(meta: SetTokenMeta): PerformAction<SetTokenMeta> {
  return { meta, type: ReducerActions.SetToken };
}

export function resetToken(): Action {
  return { type: ReducerActions.ResetToken };
}
