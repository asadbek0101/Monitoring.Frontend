import React from "react";
import { useDispatch } from "react-redux";

import { LanguagePicker } from "./LanguagePicker";
import { useShallowEqualSelector } from "../../hooks/useShallowSelector";
import { appLanguageSelector, switchLanguage } from "../../reducers/appReducer";

export function LanguagePickerWrapper() {
  const dispatch = useDispatch();

  const language = useShallowEqualSelector(appLanguageSelector);

  return (
    <LanguagePicker
      language={language}
      onSelect={(value) => dispatch(switchLanguage({ language: value }))}
    />
  );
}
