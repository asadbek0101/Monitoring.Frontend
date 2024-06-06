import React from "react";
import { useField } from "formik";
import { TextArea, TextAreaProps } from "../ui/TextArea";

interface Props extends Omit<TextAreaProps, "value"> {
  readonly name: string;
}

export function TextAreaField({ name, ...inputProps }: Props) {
  const [field] = useField(name);

  return <TextArea id={name} {...field} {...inputProps} />;
}
