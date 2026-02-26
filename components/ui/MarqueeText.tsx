interface MarqueeTextProps {
  text: string
  repeat?: number
  className?: string
}

export default function MarqueeText({ text, repeat = 6, className = '' }: MarqueeTextProps) {
  const content = Array(repeat)
    .fill(null)
    .map((_, i) => (
      <span key={i} className="mx-8 shrink-0">
        {text}
        <span className="mx-8 text-gold">✦</span>
      </span>
    ))

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div className="animate-marquee inline-flex">
        {content}
        {content}
      </div>
    </div>
  )
}
