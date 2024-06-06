import "./assets/radio.scss";

import cx from "classnames";
import React, { useMemo } from "react";

import { AppLanguage, useI18n } from "../../i18n/I18nContext";
import { I18nCode } from "../../i18n/I18nSchema";

import { IconType } from "../language/LanguageButton";
import { noop } from "lodash";

const RuIconCircle = require("../language/assets/ru.png");
const RuIconSquare = require("../language/assets/ru-sq.png");
const UzIconCircle = require("../language/assets/uz.png");
const UzIconSquare = require("../language/assets/uz-sq.png");
const EnIconCircle = require("../language/assets/en.png");
const EnIconSquare = require("../language/assets/en-sq.png");


interface Props {
  readonly iconType?: IconType;
  readonly value: boolean;
  readonly className?: string;
  readonly onClick: () => void;
  readonly title: string | I18nCode;
  readonly language?: AppLanguage;
  readonly hasIcon?: boolean;
  readonly languageIcon?: boolean;
  readonly theme?: string;
  readonly disabled?: boolean;
}

export function Radio({
  onClick,
  title,
  value,
  className,
  iconType = IconType.Square,
  language,
  hasIcon,
  languageIcon,
  theme,
  disabled,
}: Props) {
  const { translate } = useI18n();

  const titleText = useMemo(() => {
    if (title) {
      return translate(title);
    }
  }, [title, translate]);

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
      role="button"
      onClick={!disabled ? onClick : noop}
      className={cx("d-flex align-items-center radio-ui", className)}
    >
      <div
        className={cx(
          "d-flex align-items-center justify-content-center border rounded-circle border-blue-gray-extra mr-2 radio-item",
          { "bg-gray": disabled },
        )}
      >
        {Boolean(value) && (
          <div className="bg-secondary border rounded-circle border-secondary active-item radio-inner-size" />
        )}
      </div>

      {languageIcon && (
        <img alt={language} src={icon} width={20} height={15} className="mr-1 mb-1 mx-2" />
      )}
      {theme && (
        <div style={{ backgroundColor: `${theme}` }} className="mr-1 theme-for-radio">
          {}
        </div>
      )}

      <span className={cx("", { "text-language": hasIcon })}>
        {titleText}
      </span>
    </div>
  );
}
