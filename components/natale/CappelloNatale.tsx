export default function CappelloNatale({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 104 84"
      aria-hidden="true"
      focusable="false"
      className={`pointer-events-none ${className ?? ""}`}
    >
      <path
        d="M14 64 C18 28 46 4 70 10 C86 14 94 32 92 50 C86 38 78 33 71 33 C77 44 80 54 82 64Z"
        fill="#c41f35"
      />
      <path
        d="M71 33 C77 44 80 54 82 64 L62 64 C62 50 64 38 71 33Z"
        fill="#8f1a2e"
      />
      <path
        d="M30 50 C36 32 50 20 66 19"
        fill="none"
        stroke="#ef5a70"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <rect x="6" y="58" width="82" height="20" rx="10" fill="#fffdf6" />
      <path d="M12 72 C30 76 64 76 84 71" fill="none" stroke="#d5e2f0" strokeWidth="3" strokeLinecap="round" />
      <circle cx="93" cy="55" r="10" fill="#fffdf6" />
      <circle cx="95" cy="58" r="4" fill="#d5e2f0" />
    </svg>
  );
}
