import "./assets/language-picker.scss";

import cx from "classnames";
import React, { useMemo, useRef, useState } from "react";

import { ShapeIcon } from "../icons/ShapeIcon";
import { IconType, LanguageButton } from "./LanguageButton";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { AppLanguage, listLanguages } from "../../i18n/I18nContext";

interface Props {
  readonly language: AppLanguage;
  readonly onSelect: (language: AppLanguage) => void;
}

export function LanguagePicker({ onSelect, language }: Props) {
  const ref = useRef(null);

  const [open, setOpen] = useState(false);

  const list = useMemo(() => listLanguages().filter((x) => x !== language), [language]);

  useOutsideClick({
    ref,
    active: open,
    onClick: () => setOpen(false),
  });

  return (
    <div ref={ref} className="position-relative user-select-none language-picker">
      <div role="button" onClick={() => setOpen((x) => !x)} className="d-flex align-items-center">
        <LanguageButton className="mr-1" language={language} iconType={IconType.Square} />

        <ShapeIcon />
      </div>

      {open && (
        <div className="br-1 border border-gray-light w-100 mt-2 bg-white position-absolute p-2 picker-menu">
          {list.map((x, idx, arr) => {
            const last = arr.length === idx + 1;

            return (
              <LanguageButton
                key={x}
                language={x}
                iconType={IconType.Square}
                className={cx({ "mb-3": !last })}
                onClick={() => {
                  onSelect(x);
                  setOpen(false);
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
