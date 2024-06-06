import React from "react";

import { SvgProps } from "../../api/AppDto";

interface Props extends SvgProps {
  readonly size?: number;
}

export function SearchIcon({ size = 16, ...svgProps }: Props) {
  return (
    <svg
      {...svgProps}
      width={size}
      height={size}
      viewBox="0 0 16.38 16.966"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        transform="translate(-0.984)"
        d="M17.115,15.453l-4.038-4.2A6.847,6.847,0,1,0,7.834,13.7a6.777,6.777,0,0,0,3.924-1.24l4.069,4.232a.893.893,0,1,0,1.288-1.239ZM7.834,1.787A5.063,5.063,0,1,1,2.771,6.85,5.069,5.069,0,0,1,7.834,1.787Z"
      />
    </svg>
  );
}
