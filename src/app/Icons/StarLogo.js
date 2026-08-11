import * as React from "react"
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={48}
    fill="none"
    {...props}
  >
    <path
      fill="#FDE047"
      stroke="#FDE047"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m14 10.333 3.605 7.304 8.061 1.178-5.833 5.682 1.377 8.026L14 28.732l-7.21 3.791 1.376-8.026-5.833-5.682 8.062-1.178L14 10.333Z"
    />
  </svg>
)
export default SvgComponent
