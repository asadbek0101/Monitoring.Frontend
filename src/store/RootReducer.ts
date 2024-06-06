import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { AnyAction } from "../utils/ReducerUtils";
import { appReducer, appReducerPersistConfig, AppReducerState } from "../reducers/appReducer";
import { authReducer, authReducerPersistConfig, AuthReducerState } from "../reducers/authReducer";

export interface AppStoreState {
  readonly app: AppReducerState;
  readonly auth: AuthReducerState;
}

export const rootReducer = combineReducers<any>({
  app: persistReducer<AppReducerState, AnyAction>(
    {
      ...appReducerPersistConfig,
      key: "app",
      storage,
    },
    appReducer,
  ),
  auth: persistReducer<AuthReducerState, AnyAction>(
    {
      ...authReducerPersistConfig,
      key: "auth",
      storage,
    },
    authReducer,
  ),
});
