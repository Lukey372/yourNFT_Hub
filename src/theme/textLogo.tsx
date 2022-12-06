import { SvgIcon } from "@mui/material";
import React from "react";

const TextLogo = (props) => {
  return (
    <SvgIcon {...props}>
      <svg
        width="20"
        height="24"
        viewBox="0 0 20 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_1306_9428)">
          <path
            d="M-1.0285e-06 0.2353L8.3859 6.62521L6.46106 11.6372L1.23881 10.8272L-1.0285e-06 0.2353ZM10.3758 16.2041L20 11.9998L10.3758 7.79589L7.07789 11.9998L10.3758 16.2041ZM1.23881 13.1704L0 23.7647L8.3859 17.3743L6.46106 12.3628L1.23881 13.1704Z"
            fill="white"
          />
          <path
            d="M-1.0285e-06 0.2353L6.46106 11.6372L1.23881 10.8272L-1.0285e-06 0.2353ZM7.07789 11.9998L20 11.9998L10.3758 7.79589L7.07789 11.9998ZM6.46106 12.3628L0 23.7647L8.3859 17.3743L6.46106 12.3628Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="clip0_1306_9428">
            <rect
              width="23.5294"
              height="20"
              fill="white"
              transform="translate(0 23.7647) rotate(-90)"
            />
          </clipPath>
        </defs>
      </svg>
    </SvgIcon>
  );
};

export default TextLogo;
