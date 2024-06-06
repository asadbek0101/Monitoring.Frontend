import React from "react";
import { useField } from "formik";

import { RadioGroup, RadioGroupProps } from "../ui/RadioGroup";

interface Props<T> extends Omit<RadioGroupProps<T>, "value" | "onChange"> {
  readonly name: string;
  readonly onChanges?: (value: any) => void;
}

export function RadioGroupField<T>({ name, onChanges, ...props }: Props<T>) {
  const [field, , helpers] = useField(name);

  return (
    <RadioGroup
      {...field}
      onChange={(x) => {
        helpers.setValue(x);
        onChanges && onChanges(x);
      }}
      {...props}
    />
  );
}
