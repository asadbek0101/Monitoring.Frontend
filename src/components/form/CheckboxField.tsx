import React from "react";
import { useField } from "formik";

import { Checkbox, CheckboxProps } from "../ui/Checkbox";

interface Props extends Omit<CheckboxProps, "type" | "ref"> {
  readonly name: string;
}

export function CheckboxField({ name, onChange, ...inputProps }: Props) {
  const [field, , helpers] = useField(name);

  return (
    <Checkbox
      id={name}
      {...field}
      {...inputProps}
      onChange={(event) => {
        helpers.setValue(event.target.checked);

        if (onChange) {
          onChange(event);
        }
      }}
    />
  );
}
