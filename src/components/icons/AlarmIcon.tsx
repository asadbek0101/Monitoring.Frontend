interface Props {
  readonly size?: number | string | undefined;
  readonly color?: string;
}

export default function AlarmIcon({ size = 16, color = "#515151" }: Props) {
  return (
    <svg width="16" height="20" viewBox="0 0 16 20" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.6281 8.71898C8.98115 5.18853 11.9519 2.5 15.5 2.5C19.0481 2.5 22.0189 5.18853 22.3719 8.71898L22.7302 12.3017C22.8012 13.0122 22.8367 13.3674 22.9025 13.7137C23.0582 14.5334 23.3412 15.3236 23.7412 16.0559C23.9101 16.3651 24.1081 16.6622 24.5042 17.2564L25.9271 19.3906C26.8396 20.7593 27.2958 21.4437 27.0132 21.9719C26.7305 22.5 25.908 22.5 24.263 22.5H6.73703C5.09201 22.5 4.2695 22.5 3.98684 21.9719C3.70419 21.4437 4.16044 20.7593 5.07293 19.3906L6.49577 17.2564C6.89186 16.6622 7.08991 16.3651 7.25884 16.0559C7.65882 15.3236 7.94179 14.5334 8.09749 13.7137C8.16326 13.3674 8.19878 13.0122 8.26983 12.3017L8.6281 8.71898Z"
        fill="url(#paint0_linear_150_1264)"
      />
      <path
        d="M13.0852 25.7868C13.2276 25.9197 13.5415 26.0371 13.9781 26.1208C14.4147 26.2046 14.9497 26.25 15.5 26.25C16.0503 26.25 16.5853 26.2046 17.0219 26.1208C17.4585 26.0371 17.7724 25.9197 17.9148 25.7868"
        stroke="url(#paint1_linear_150_1264)"
        stroke-width="2"
        stroke-linecap="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_150_1264"
          x1="15.5"
          y1="2.5"
          x2="15.5"
          y2="22.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1887E0" />
          <stop offset="1" stop-color="#4254BE" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_150_1264"
          x1="15.5"
          y1="26.25"
          x2="15.5"
          y2="25"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1887E0" />
          <stop offset="1" stop-color="#4254BE" />
        </linearGradient>
      </defs>
    </svg>
  );
}
