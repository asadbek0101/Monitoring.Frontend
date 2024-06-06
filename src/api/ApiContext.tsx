import React, { ReactElement, ReactNode, useContext, useMemo } from "react";

import { API_HOST } from "../constants/AppConstants";
import { AppLanguage, getDefaultLanguage } from "../i18n/I18nContext";

export interface ApiContextDataProps {
  readonly token?: string;
  readonly logout?: () => void;
  readonly employeeId?: string;
  readonly language: AppLanguage;
  readonly taxNo?: string;
  readonly userId?: string; 
}

export interface ApiContextProps {
  readonly host: string;
  readonly token?: string;
  readonly logout?: () => void;
  readonly employeeId?: string;
  readonly language: AppLanguage;
  readonly userId?: string; 
}

export interface ApiProviderProps {
  readonly children: ReactNode;
  readonly data?: ApiContextDataProps;
}

function createContentValue(apiData: ApiContextDataProps): ApiContextProps {
  return {
    ...apiData,
    host: API_HOST,
  };
}

export const ApiContext = React.createContext<ApiContextProps>(
  createContentValue({
    language: getDefaultLanguage(),
  }),
);

export function ApiProvider({
  data = {} as ApiContextDataProps,
  ...props
}: ApiProviderProps): ReactElement<object> {
  const value = useMemo(() => createContentValue(data), [data]);

  return <ApiContext.Provider {...props} value={value} />;
}

export function useApiBase(): ApiContextProps {
  return useContext(ApiContext);
}
