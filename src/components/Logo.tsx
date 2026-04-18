type LogoProps = {
  size?: number;
  className?: string;
  showDot?: boolean;
  accentColor?: string;
};

export default function Logo({
  size = 18,
  className = "",
  showDot = true,
  accentColor = "var(--color-accent)",
}: LogoProps) {
  const aspect = 32 / 18;
  const width = size * aspect;
  return (
    <svg
      width={width}
      height={size}
      viewBox="0 0 32 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="JK"
    >
      {/* J */}
      <path
        d="M1.5 0 H9.5 V2 H7.2 V11.4 C7.2 14.6 5.7 16.4 3.3 16.4 C0.9 16.4 -0.5 14.6 -0.5 11.6 V10.4 H2 V11.6 C2 13.2 2.5 13.9 3.3 13.9 C4.1 13.9 4.6 13.2 4.6 11.4 V2 H1.5 Z"
        fill="currentColor"
      />
      {/* K */}
      <path
        d="M11 0 H13.6 V7.4 L18.9 0 H22.1 L16.8 7.2 L22.6 16.2 H19.3 L15.1 9.6 L13.6 11.1 V16.2 H11 Z"
        fill="currentColor"
      />
      {showDot && <circle cx="26" cy="14.8" r="1.7" fill={accentColor} />}
    </svg>
  );
}
