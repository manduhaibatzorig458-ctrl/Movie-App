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
      stroke="#09090B"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m6 12 4-4-4-4"
    />
  </svg>
)
export default SvgComponent
