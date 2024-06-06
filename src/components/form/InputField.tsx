import React, { useMemo } from "react";

import { useField } from "formik";

import { Input, InputProps } from "../ui/Input";

interface Props extends Omit<InputProps, "children"> {
  readonly name: string;
}

export function InputField({ name, ...inputProps }: Props) {
  const [field, meta] = useField(name);

  const showError = useMemo(() => Boolean(meta.touched && meta.error), [meta]);

  return (
    <Input
      id={name}
      hasError={showError}
      hintText={showError ? meta.error : undefined}
      {...field}
      {...inputProps}
    />
  );
}