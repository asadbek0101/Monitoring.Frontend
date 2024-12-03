interface Props {
  readonly size?: number | string | undefined;
  readonly color?: string;
}

export default function RegionIcon({ size = 20, color = "white" }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_21_2657)">
        <path d="M15.715 12.5229L10.2731 18H17.6585L15.715 12.5229Z" fill="#555866" />
        <path d="M2.00747 13.3001L0.341553 18H6.67224L2.00747 13.3001Z" fill="#555866" />
        <path
          d="M9 3.16406C8.12763 3.16406 7.41797 3.87373 7.41797 4.74609C7.41797 5.61846 8.12763 6.32812 9 6.32812C9.87237 6.32812 10.582 5.61846 10.582 4.74609C10.582 3.87373 9.87237 3.16406 9 3.16406Z"
          fill="#555866"
        />
        <path
          d="M9 0C6.38286 0 4.25391 2.12896 4.25391 4.74609C4.25391 5.6437 4.50626 6.51814 4.98312 7.27467L9 13.6802L13.0169 7.27467C13.4937 6.51814 13.7461 5.6437 13.7461 4.74609C13.7461 2.12896 11.6171 0 9 0ZM9 7.38281C7.54618 7.38281 6.36328 6.19991 6.36328 4.74609C6.36328 3.29228 7.54618 2.10938 9 2.10938C10.4538 2.10938 11.6367 3.29228 11.6367 4.74609C11.6367 6.19991 10.4538 7.38281 9 7.38281Z"
          fill="#555866"
        />
        <path
          d="M10.4705 13.3256L9 15.6929L5.13478 9.52734H3.35475L2.3999 12.2011L8.16366 18H8.78164L11.9457 14.8008L10.4705 13.3256Z"
          fill="#555866"
        />
        <path
          d="M14.6453 9.52734H12.8653L11.0472 12.4109L12.6915 14.0551L15.3227 11.4239L14.6453 9.52734Z"
          fill="#555866"
        />
      </g>
      <defs>
        <clipPath id="clip0_21_2657">
          <rect width="18" height="18" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
