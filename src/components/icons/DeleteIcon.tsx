interface Props {
  readonly size?: number | string | undefined;
  readonly color?: string;
}

export default function DeleteIcon({ size = 16, color = "#515151" }: Props) {
  return (
    <svg width="16" height="20" viewBox="0 0 16 20" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0 3.52941H16V5.88235H14.8571V18.5294C14.8571 19.3416 14.2176 20 13.4286 20H2.57143C1.78245 20 1.14286 19.3416 1.14286 18.5294V5.88235H0V3.52941ZM3.42857 5.88235V17.6471H12.5714V5.88235H3.42857Z"
        fill={color}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11.4286 2.35294H4.57143V0H11.4286V2.35294Z"
        fill={color}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5.71429 16.4706V7.05882H6.85714V16.4706H5.71429ZM9.14286 16.4706V7.05882H10.2857V16.4706H9.14286Z"
        fill={color}
      />
    </svg>
  );
}
