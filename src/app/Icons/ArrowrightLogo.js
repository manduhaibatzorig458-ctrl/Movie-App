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
      d="M3.333 8h9.333M8 12.667 12.666 8 8 3.333"
    />
  </svg>
)
export default SvgComponent
