interface Props {
  readonly size?: number | string | undefined;
  readonly color?: string;
}

export default function UploadIcon({ size = 20, color = "white" }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="29" height="29" rx="14.5" fill="url(#paint0_linear_60_6021)" />
      <path
        d="M10.464 13.5656L8 17.9763V9.85714C8 8.83281 8.79727 8 9.77789 8H13.042C13.5142 8 13.9671 8.19442 14.3004 8.54263L15.0366 9.31161C15.3699 9.65982 15.8227 9.85424 16.295 9.85424H19.5563C20.5369 9.85424 21.3342 10.6871 21.3342 11.7114V12.64H12.0003C11.3669 12.64 10.7835 12.9911 10.464 13.5627V13.5656ZM11.2308 14.0328C11.3919 13.7455 11.6836 13.5714 12.0003 13.5714H23.1121C23.4316 13.5714 23.7232 13.7484 23.8816 14.0386C24.0399 14.3288 24.0399 14.6828 23.8788 14.9701L20.7675 20.5415C20.6092 20.8259 20.3175 21 20.0008 21H8.88895C8.56948 21 8.2778 20.823 8.11945 20.5328C7.96111 20.2426 7.96111 19.8886 8.12223 19.6013L11.2335 14.0299L11.2308 14.0328Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear_60_6021"
          x1="14.5"
          y1="0"
          x2="14.5"
          y2="29"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1B84DE" />
          <stop offset="1" stop-color="#4155BF" />
        </linearGradient>
      </defs>
    </svg>
  );
}
