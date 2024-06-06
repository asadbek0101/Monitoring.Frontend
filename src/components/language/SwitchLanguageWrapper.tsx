import React from "react";
import { useDispatch } from "react-redux";

import { SwitchLanguage } from "./SwitchLanguage";
import { useShallowEqualSelector } from "../../hooks/useShallowSelector";
import { appLanguageSelector, switchLanguage } from "../../reducers/appReducer";

export function SwitchLanguageWrapper() {
  const dispatch = useDispatch();

  const language = useShallowEqualSelector(appLanguageSelector);

  return (
    <SwitchLanguage
      language={language}
      onSwitch={(value) => dispatch(switchLanguage({ language: value }))}
    />
  );
}
