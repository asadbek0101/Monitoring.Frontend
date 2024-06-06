import "./assets/input-control.scss";
import "./assets/select-picker.scss";

import cx from "classnames";
import React, { useMemo } from "react";
import Select, { Props } from "react-select";

import { PositionType, SizeType } from "../../api/AppDto";
import { useI18n } from "../../i18n/I18nContext";
import { I18nCode } from "../../i18n/I18nSchema";
// import placeholder = require("lodash/fp/placeholder");

export interface SelectPickerProps extends Props {
  readonly fluid?: boolean;

  readonly width?: number;
  readonly minWidth?: number;

  readonly disabled?: boolean;
  readonly placeholderSelect?: string;
  readonly size?: SizeType;
  readonly hintText?: string;
  readonly hasError?: boolean;
  readonly className?: string;
  readonly inputClassName?: string;
  readonly label?: I18nCode | string;
  readonly labelPosition?: PositionType;
  readonly onChange?: (value: any) => void;
}

export function SelectPicker({
  size = SizeType.Medium,
  fluid,
  label,
  width,
  hintText,
  minWidth = 100,
  hasError,
  disabled,
  className,
  isSearchable = false,
  inputClassName,
  labelPosition = PositionType.Top,
  placeholderSelect = "SELECT_PICKER_PLACEHOLDER_TITLE",
  onChange,
  ...props
}: SelectPickerProps) {
  const { translate } = useI18n();

  const text = useMemo(() => {
    if (label) {
      return translate(label);
    }
  }, [label, translate]);

  return (
    <div
      className={cx(
        "d-flex input-control",
        {
          "disabled-input": disabled,
          "flex-shrink-1 flex-grow-1": fluid,
          "flex-column": labelPosition === PositionType.Top,
          "flex-column-reverse": labelPosition === PositionType.Bottom,
          "flex-row align-items-center": labelPosition === PositionType.Left,
          "flex-row-reverse align-items-center": labelPosition === PositionType.Right,
        },
        className,
      )}
    >
      {Boolean(text) && (
        <label
          htmlFor={props.id}
          className={cx("text-nowrap", {
            "mb-1": labelPosition === PositionType.Top,
            "mr-2 mb-0": labelPosition === PositionType.Left,
            "ml-2 mb-0": labelPosition === PositionType.Right,
            "mt-2 mb-0": labelPosition === PositionType.Bottom,
          })}
        >
          {text}
        </label>
      )}

      <div
        style={{ width: `${width}px`, minWidth: `${minWidth}px` }}
        className={cx("d-flex form-control select-control py-0 pl-1 pr-2 br-1 align-items-center", {
          "w-100": fluid,
          "is-invalid": hasError,
          "disabled-input": disabled,
          "form-control-sm": size === SizeType.Small,
          "form-control-lg": size === SizeType.Large,
          "border border-gray-light text-gray": !hasError,
        })}
      >
        <Select
          menuPlacement="auto"
          classNamePrefix="select-picker"
          placeholder={translate(placeholderSelect)}
          noOptionsMessage={() => translate("SELECT_PICKER_NO_OPTIONS_MESSAGE")}
          onChange={(value: any) => onChange && onChange(value)}
          {...props}
          isDisabled={disabled}
          isSearchable={isSearchable}
          className={cx(
            "w-100 h-100 flex-shrink-1 flex-grow-1 border-0 bg-transparent shadow-none outline-none select-picker",
            {
              "picker-sm": size === SizeType.Small,
              "picker-lg": size === SizeType.Large,
            },
            inputClassName,
          )}
        />
      </div>

      {Boolean(hintText) && <span className={cx({ "text-danger": hasError })}>{hintText}</span>}
    </div>
  );
}
