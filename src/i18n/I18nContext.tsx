import React, { ReactElement, ReactNode, useContext, useMemo } from "react";

import { I18nUzbek } from "./I18nUzbek";
import { I18nRussian } from "./I18nRussian";
import { I18nEnglish } from "./I18nEnglish";
import { I18nCode, I18nSchema } from "./I18nSchema";

export enum AppLanguage {
  Uzbek = "uz",
  Russian = "ru",
  English = "en",
}

export interface I18nData {
  readonly language: AppLanguage;
}

export function getDefaultLanguage(): AppLanguage {
  return AppLanguage.English;
}

export type TranslateFunction = (code: I18nCode | string) => string;

export function getDefaultI18nData(): I18nData {
  return { language: getDefaultLanguage() };
}

export function listLanguages(): AppLanguage[] {
  return [AppLanguage.Uzbek, AppLanguage.Russian, AppLanguage.English];
}

export function isValidLanguage(value: unknown): value is AppLanguage {
  return value != null && listLanguages().includes(value as AppLanguage);
}

export function ensureLanguage(value: unknown): AppLanguage {
  return isValidLanguage(value) ? value : getDefaultLanguage();
}

export function ensureI18nData(value: Record<keyof I18nData, unknown>): I18nData {
  return !value
    ? getDefaultI18nData()
    : {
        language: ensureLanguage((value as I18nData).language),
      };
}

export function getLocalSchema(language: AppLanguage): I18nSchema {
  switch (language) {
    case AppLanguage.Russian:
      return I18nRussian;
    case AppLanguage.Uzbek:
      return I18nUzbek;

    default:
      return I18nEnglish;
  }
}

export interface I18nContextProps {
  readonly language: AppLanguage;

  readonly translate: TranslateFunction;
}

function createContentValue(i18nData: I18nData): I18nContextProps {
  const schema = getLocalSchema(i18nData.language);

  return {
    ...i18nData,
    translate: (code) => {
      const translation = schema[code as I18nCode];

      return translation == null ? code : translation;
    },
  };
}

export const I18nContext = React.createContext<I18nContextProps>(
  createContentValue(getDefaultI18nData()),
);

export function I18nProvider({
  data = {} as I18nData,
  ...props
}: {
  data?: I18nData;
  children: ReactNode;
}): ReactElement<object> {
  const value = useMemo(() => createContentValue(ensureI18nData(data)), [data]);

  return <I18nContext.Provider {...props} value={value} />;
}

export function useI18n(): I18nContextProps {
  return useContext(I18nContext);
}
