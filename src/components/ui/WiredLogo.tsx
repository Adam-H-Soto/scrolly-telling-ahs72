import styles from "./WiredLogo.module.css";

interface WiredLogoProps {
  variant?: "light" | "dark";
}

export function WiredLogo({ variant = "light" }: WiredLogoProps) {
  return (
    <span className={`${styles.logo} ${styles[variant]}`} aria-label="Wired">
      <svg
        viewBox="0 0 120 28"
        width="120"
        height="28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <text
          x="0"
          y="22"
          fontFamily="Georgia, serif"
          fontSize="24"
          fontWeight="900"
          letterSpacing="0.06em"
          fill="currentColor"
        >
          WIRED
        </text>
        {/* Thin cyan underline accent */}
        <rect x="0" y="26" width="120" height="1.5" fill="var(--accent)" />
      </svg>
    </span>
  );
}
