export default function Arrow({className, stroke}) {
  return (
    <svg
      width="14"
      height="16"
      viewBox="0 0 18 16"
      fill="none"
      className={className}
    >
      <path
        d="M10 15L17 8M17 8L10 0.999999M17 8L1 8"
        stroke={stroke || "white"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
