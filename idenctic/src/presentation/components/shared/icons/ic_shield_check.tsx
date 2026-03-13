import React from "react";

const IcShieldCheck = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="0"
    height="0"
    className={`w-6 h-6 ${props.className}`}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M9 11.25L10.875 13.125L14.625 9.375M12 2.25L3.75 5.25V11.25C3.75 16.5 12 21.75 12 21.75C12 21.75 20.25 16.5 20.25 11.25V5.25L12 2.25Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default IcShieldCheck;
