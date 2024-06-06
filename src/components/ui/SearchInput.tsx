import "./assets/search-input.scss";

import React from "react";
import cx from "classnames";

import { Input, InputProps } from "./Input";
import { SearchIcon } from "../icons/SearchIcon";
import { SizeType } from "../../api/AppDto";

interface Props extends Omit<InputProps, "className"> {
  readonly className?: string;
  readonly inputClassName?: string;
}

export function SearchInput({ className, inputClassName, ...inputProps }: Props) {
  return (
    <div
      className={cx(
        "d-flex align-items-center bg-white overflow-hidden px-4 search-input2",
        className,
      )}
    >
      <SearchIcon />

      <Input
        {...inputProps}
        type="search"
        size={SizeType.Small}
        inputClassName={cx("text-blue-gray-light input-control p-0 pl-3", inputClassName)}
      />
    </div>
  );
}
