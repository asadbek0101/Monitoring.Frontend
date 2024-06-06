import React, { useMemo } from "react";
import { useField } from "formik";

import { SelectPicker, SelectPickerProps } from "../ui/SelectPircker";

export interface SelectPickerFieldProps extends SelectPickerProps {
  readonly name: string;
  readonly onChanges?: (value: any) => void;
}

export function SelectPickerField({ name, onChanges, ...inputProps }: SelectPickerFieldProps) {
  const [field, meta, helpers] = useField(name);

  const showError = useMemo(() => Boolean(meta.touched && meta.error), [meta]);

  return (
    <SelectPicker
      id={name}
      hasError={showError}
      hintText={showError ? meta.error : undefined}
      {...field}
      {...inputProps}
      onChange={(value) => {
        helpers.setValue(value);
        onChanges && onChanges(value);
      }}
    />
  );
}
