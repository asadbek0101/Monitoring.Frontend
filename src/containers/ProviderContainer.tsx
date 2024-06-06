import { SWRConfig } from "swr";
import { ReactNode, useMemo } from "react";

import { I18nProvider } from "../i18n/I18nContext";
import { useShallowEqualSelector } from "../hooks/useShallowSelector";
import {
  appLanguageSelector,
} from "../reducers/appReducer";
import { ApiProvider } from "../api/ApiContext";
import { profileSelector, tokenSelector } from "../reducers/authReducer";

interface Props {
  readonly children: ReactNode;
}

export function ProviderContainer({ children }: Props) {

  const language = useShallowEqualSelector(appLanguageSelector);
  const token = useShallowEqualSelector(tokenSelector);
  const profile = useShallowEqualSelector(profileSelector);


  const userId = useMemo(()=>profile?.Id, [profile]);

  return (
    <I18nProvider data={{ language }}>
      <ApiProvider data={{ token, language, userId: userId }}>
        <SWRConfig value={{ revalidateOnFocus: false }}>{children}</SWRConfig>
      </ApiProvider>
    </I18nProvider>
  );
}
