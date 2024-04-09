interface GemProps {
  outerColor: string;
  innerColor: string;
  className?: string;
}

const Gem = ({ outerColor, innerColor, className }: GemProps) => (
  <svg
    viewBox="0 0 500 500"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g
      transform="matrix(1.666667, 0, 0, 1.666667, -166.666702, -166.666702)"
      style={{}}
    >
      <path
        d="M 250 100 L 356.066 143.934 L 400 250 L 356.066 356.066 L 250 400 L 143.934 356.066 L 100 250 L 143.934 143.934 Z"
        style={{
          stroke: "rgb(0, 0, 0)",
          fill: outerColor,
        }}
      />
      <path
        d="M 249.96 141.108 L 325.083 172.5 L 356.2 248.286 L 325.083 324.072 L 249.96 355.464 L 174.837 324.072 L 143.72 248.286 L 174.837 172.5 Z"
        style={{
          stroke: "rgb(0, 0, 0)",
          fill: innerColor,
        }}
      />
    </g>
    <path
      style={{
        fill: "rgb(216, 216, 216)",
        stroke: "rgb(0, 0, 0)",
      }}
      d="M 250.135 0 L 250.021 68.918"
    />
    <path
      style={{
        fill: "rgb(216, 216, 216)",
        stroke: "rgb(0, 0, 0)",
      }}
      d="M 426.96 73.102 L 374.876 120.987"
    />
    <path
      style={{
        fill: "rgb(216, 216, 216)",
        stroke: "rgb(0, 0, 0)",
      }}
      d="M 500 250.142 L 427.362 247.361"
    />
    <path
      style={{
        fill: "rgb(216, 216, 216)",
        stroke: "rgb(0, 0, 0)",
      }}
      d="M 427.195 426.655 L 375.168 373.356"
    />
    <path
      style={{
        fill: "rgb(216, 216, 216)",
        stroke: "rgb(0, 0, 0)",
      }}
      d="M 249.575 500 L 249.575 425.658"
    />
    <path
      style={{
        fill: "rgb(216, 216, 216)",
        stroke: "rgb(0, 0, 0)",
      }}
      d="M 73.618 426.149 L 125.051 373.265"
    />
    <path
      style={{
        fill: "rgb(216, 216, 216)",
        stroke: "rgb(0, 0, 0)",
      }}
      d="M 0 250.879 L 72.691 247.437"
    />
    <path
      style={{
        fill: "rgb(216, 216, 216)",
        stroke: "rgb(0, 0, 0)",
      }}
      d="M 73.455 73.316 L 125.014 120.567"
    />
  </svg>
);

export default Gem;
