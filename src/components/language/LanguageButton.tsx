import cx from "classnames";
import React, { useMemo } from "react";

import { AppLanguage } from "../../i18n/I18nContext";
import "./assets/language-picker.scss";

const RuIconCircle = require("../language/assets/ru.png");
const RuIconSquare = require("../language/assets/ru-sq.png");
const UzIconCircle = require("../language/assets/uz.png");
const UzIconSquare = require("../language/assets/uz-sq.png");
const EnIconCircle = require("../language/assets/en.png");
const EnIconSquare = require("../language/assets/en-sq.png");

export enum IconType {
  Circle = "circle",
  Square = "square",
}

interface Props {
  readonly iconType?: IconType;
  readonly active?: boolean;
  readonly className?: string;
  readonly onClick?: () => void;
  readonly language: AppLanguage;
}

export function LanguageButton({
  iconType = IconType.Circle,
  onClick,
  className,
  language,
}: Props) {
  const icon = useMemo(() => {
    switch (language) {
      case AppLanguage.Russian:
        return iconType === IconType.Circle ? RuIconCircle : RuIconSquare;
      case AppLanguage.Uzbek:
        return iconType === IconType.Circle ? UzIconCircle : UzIconSquare;

      default:
        return iconType === IconType.Circle ? EnIconCircle : EnIconSquare;
    }
  }, [language, iconType]);

  return (
    <div
      onClick={onClick}
      role={onClick ? "button" : undefined}
      className={cx(
        "d-flex align-items-center",
        {
          "cursor-pointer": Boolean(onClick),
        },
        className,
      )}
    >
      <img className="language-button-flags" alt={language} src={icon} width={31} height={21} />
    </div>
  );
}
