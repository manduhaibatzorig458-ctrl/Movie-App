import * as React from "react"
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      stroke="#18181B"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 2a4.243 4.243 0 1 0 6 6 6 6 0 1 1-6-6Z"
    />
  </svg>
)
export default SvgComponent
