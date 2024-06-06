import cx from "classnames";
import React, { forwardRef, useMemo } from "react";

import { useI18n } from "../../i18n/I18nContext";
import { I18nCode } from "../../i18n/I18nSchema";
import { InputProps } from "../../api/AppDto";

export interface CheckboxProps extends Omit<InputProps, "checked" | "type"> {
  readonly labelClassName?: string;
  readonly inputClassName?: string;
  readonly label?: I18nCode | string;
  readonly whiteSpacePreLine?: boolean;
  readonly checked?: boolean;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    { checked, label, className, labelClassName, inputClassName, whiteSpacePreLine, ...props },
    ref,
  ) => {
    const { translate } = useI18n();

    const text = useMemo(() => {
      if (label) {
        return translate(label);
      }
    }, [label, translate]);

    return (
      <div className={cx("d-flex align-items-center form-check p-0", className)}>
        <input
          {...props}
          ref={ref}
          type="checkbox"
          checked={checked}
          className={cx("cursor-pointer", inputClassName)}
        />
        {Boolean(text) && (
          <label
            htmlFor={props.id}
            className={cx(
              `form-check-label ml-3 ${
                whiteSpacePreLine ? "text-wrap" : "text-nowrap"
              } user-select-none`,
              { "cursor-pointer": Boolean(props.id) },
              labelClassName,
            )}
          >
            {text}
          </label>
        )}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
