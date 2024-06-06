import cx from "classnames";
import { uid } from "react-uid";
import { isEqual } from "lodash";
import React, { useMemo } from "react";

import { Radio } from "./Radio";
import { AppLanguage, useI18n } from "../../i18n/I18nContext";
import { Direction, SizeType } from "../../api/AppDto";
import { OnShowUserInfo } from "../on-show-user-info/OnShowUserInfo";
import InfoTitle, { InformationBody } from "../info-for-user/InfoTitle";
import { InputField } from "../form/InputField";

export interface RadioItemProps<T> {
  readonly value: T;
  readonly title: string;
  readonly infoTitle?: InformationBody;
  readonly icon?: boolean;
  readonly language?: AppLanguage;
  readonly languageIcon?: boolean;
  readonly theme?: string;
  readonly cardPhoto?: boolean;
  readonly other?: boolean;
  readonly setValue?: (value: any) => void;
  readonly mt?: boolean;
  readonly disabled?: boolean;
}

export interface RadioGroupProps<T> {
  readonly value: T;
  readonly label?: string;
  readonly direction?: Direction;
  readonly items: RadioItemProps<T>[];
  readonly onChange: (item: T) => void;
  readonly disabled?: boolean;
}

export function RadioGroup<T>({
  value,
  label,
  onChange,
  direction = Direction.Horizontal,
  items = [],
  disabled,
}: RadioGroupProps<T>) {
  const { translate } = useI18n();

  const labelText = useMemo(() => {
    if (label) {
      return translate(label);
    }
  }, [label, translate]);

  return (
    <div className="d-flex flex-column">
      {Boolean(labelText) && <label className="text-ellipsis">{labelText}</label>}

      <div className={cx("d-flex ml-2", { "flex-column": direction === Direction.Vertical })}>
        {items.map((item) => (
          <div key={item.title} className={cx("d-flex", { "mt-2": item.mt })}>
            <Radio
              theme={item.theme}
              languageIcon={item.languageIcon}
              hasIcon={item.icon}
              language={item.language}
              key={uid(item)}
              title={item.title}
              value={isEqual(item.value, value)}
              onClick={() => onChange(item.value)}
              className={cx({
                "my-5": item.icon,
                "mb-3": direction === Direction.Vertical,
                "mr-3": direction === Direction.Horizontal,
              })}
              disabled={disabled || item.disabled}
            />
            {item.other && (
              <InputField
                className="mb-3 col-9"
                onChange={(value) => item.setValue && item.setValue(value.target?.value)}
                size={SizeType.Small}
                name="otherPurpose"
              />
            )}
            {item.infoTitle && <OnShowUserInfo title={<InfoTitle infoTitle={item.infoTitle} />} />}
          </div>
        ))}
      </div>
    </div>
  );
}
