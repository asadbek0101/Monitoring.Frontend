import "./assets/input-control.scss";

import cx from "classnames";
import { useMemo, useState } from "react";

import { I18nCode } from "../../i18n/I18nSchema";
import { useI18n } from "../../i18n/I18nContext";
import { InputProps as NativeInputProps, SizeType } from "../../api/AppDto";

import EyeIcon from "../icons/EyeIcon";
import CloseEye from "../icons/CloseEye";

export interface InputProps extends Omit<NativeInputProps, "size" | "placeholder" | "className"> {
  readonly width?: number;
  readonly height?: number;
  readonly size?: SizeType;
  readonly maxWidth?: number;
  readonly hintText?: string;
  readonly minWidth?: number;
  readonly hasError?: boolean;
  readonly className?: string;
  readonly editable?: boolean;
  readonly inputClassName?: string;
  readonly label?: I18nCode | string;
  readonly placeholder?: I18nCode | string;
  readonly passwordIcon?: "visible" | "hidden";
  readonly checked?: boolean;
  readonly withCheckBox?: boolean;
}

export function Input({
  size = SizeType.Medium,
  width,
  height,
  label,
  hintText,
  maxWidth,
  minWidth,
  hasError,
  disabled,
  editable = true,
  className,
  placeholder,
  inputClassName,
  checked,
  withCheckBox = false,
  passwordIcon = "visible",
  ...props
}: InputProps) {
  const { translate } = useI18n();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const labelText = useMemo(() => {
    if (label) {
      return translate(label);
    }
  }, [label, translate]);

  const placeholderText = useMemo(() => {
    if (placeholder) {
      return translate(placeholder);
    }
  }, [placeholder, translate]);

  return (
    <div
      className={cx("d-flex flex-column input-control", className)}
      style={{ width: `${width}px`, maxWidth: `${maxWidth}px`, minWidth: `${minWidth}px` }}
    >
      {Boolean(labelText) && <label className="text-ellipsis mb-1 custom-label">{labelText}</label>}
      <div
        className={cx("input-box", {
          "with-checkbox": withCheckBox,
        })}
      >
        {Boolean(withCheckBox) && (
          <div className="checkbox-input-control">
            <input
              type="checkbox"
              className="border border-gray-light text-gray"
              checked={checked}
            />
          </div>
        )}
        <input
          autoComplete="off"
          {...props}
          type={passwordVisible ? "text" : props.type}
          contentEditable={editable}
          placeholder={placeholderText}
          disabled={disabled || !editable}
          style={{ height: `${height}px` }}
          className={cx("lh-6 form-control", inputClassName, {
            "is-invalid": hasError,
            "form-control-sm": size === SizeType.Small,
            "form-control-lg": size === SizeType.Large,
            "border border-gray-light text-gray": !hasError,
            "disabled-editing-input": !editable && !disabled,
          })}
        />
        {props.type === "password" && passwordIcon === "visible" ? (
          <div className="eye-icon" onClick={() => setPasswordVisible((prev) => !prev)}>
            {passwordVisible ? <CloseEye color="#000" /> : <EyeIcon color="#000" />}
          </div>
        ) : (
          <span />
        )}
      </div>

      {Boolean(hintText) && <span className={cx({ "text-danger": hasError })}>{hintText}</span>}
    </div>
  );
}
