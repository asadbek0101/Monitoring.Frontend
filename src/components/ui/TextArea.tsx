import cx from "classnames";
import React, { useMemo } from "react";

import { useI18n } from "../../i18n/I18nContext";
import { I18nCode } from "../../i18n/I18nSchema";
import { TextAreaProps as NativeTextAreaProps } from "../../api/AppDto";

export interface TextAreaProps extends Omit<NativeTextAreaProps, "children" | "className"> {
  readonly style?: any;
  readonly value?: string;
  readonly width?: number;
  readonly height?: number;
  readonly minWidth?: number;
  readonly className?: string;
  readonly hasError?: boolean;
  readonly hintText?: string;
  readonly inputClassName?: string;
  readonly label?: I18nCode | string;
  readonly children?: any;
  readonly onChange?: (value: any) => void;
}

export function TextArea({
  value,
  label,
  width,
  height = 90,
  hasError,
  minWidth,
  className,
  inputClassName,
  onChange,
  ...props
}: TextAreaProps) {
  const { translate } = useI18n();

  const text = useMemo(() => {
    if (label) {
      return translate(label);
    }
  }, [label, translate]);

  return (
    <div
      className={cx("d-flex flex-column", className)}
      style={{ width: `${width}px`, minWidth: `${minWidth}px` }}
    >
      {Boolean(text) && (
        <label
          htmlFor={props.id}
          className="mb-1"
          style={{
            fontSize: "14px",
          }}
        >
          {text}
        </label>
      )}

      <textarea
        {...props}
        style={{
          resize: "none",
          height: `${height}px`,
          borderRadius: "2px",
          ...props.style,
        }}
        className={cx(
          "d-flex form-control py-0 pl-1 pr-2 br-1",
          {
            "is-invalid": hasError,
            "border border-gray-light text-gray": !hasError,
          },
          inputClassName,
        )}
        onChange={(value) => onChange && onChange(value)}
      >
        {value}
      </textarea>
    </div>
  );
}
