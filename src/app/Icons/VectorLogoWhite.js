import * as React from "react"
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      stroke="#FAFAFA"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5.834 1.667v16.666m8.333-16.666v16.666M1.667 10h16.667M1.667 5.833h4.167m-4.167 8.334h4.167m8.333 0h4.167m-4.167-8.334h4.167M3.484 1.667h13.033c1.003 0 1.817.813 1.817 1.816v13.034a1.817 1.817 0 0 1-1.817 1.816H3.484a1.817 1.817 0 0 1-1.817-1.816V3.483c0-1.003.813-1.816 1.817-1.816Z"
    />
  </svg>
)
export default SvgComponent
