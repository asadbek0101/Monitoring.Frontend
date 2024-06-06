import React from "react";

import { LanguageButton } from "./LanguageButton";
import { AppLanguage } from "../../i18n/I18nContext";

interface Props {
  readonly language: AppLanguage;
  readonly onSwitch: (language: AppLanguage) => void;
}

export function SwitchLanguage({ language, onSwitch }: Props) {
  return (
    <div className="d-flex">
      <LanguageButton
        className="mr-4"
        language={AppLanguage.Uzbek}
        active={language === AppLanguage.Uzbek}
        onClick={() => onSwitch(AppLanguage.Uzbek)}
      />
      <LanguageButton
        className="mr-4 ml-1"
        language={AppLanguage.Russian}
        active={language === AppLanguage.Russian}
        onClick={() => onSwitch(AppLanguage.Russian)}
      />
      <LanguageButton
        className="ml-1"
        language={AppLanguage.English}
        active={language === AppLanguage.English}
        onClick={() => onSwitch(AppLanguage.English)}
      />
    </div>
  );
}
