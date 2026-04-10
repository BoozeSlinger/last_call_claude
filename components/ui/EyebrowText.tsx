interface EyebrowTextProps {
  children: React.ReactNode
  className?: string
}

export default function EyebrowText({ children, className = '' }: EyebrowTextProps) {
  return (
    <span
      className={`eyebrow ${className}`}
      style={{
        fontFamily: "'Big Shoulders Display', sans-serif",
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        fontSize: '0.85rem',
        color: 'var(--brass-light)',
        display: 'block',
      }}
    >
      {children}
    </span>
  )
}
