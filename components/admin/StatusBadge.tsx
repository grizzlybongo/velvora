type BadgeVariant = 'paid' | 'active' | 'pending' | 'cancelled' | 'draft' | 'published' | 'refunded' | 'visible' | 'hidden' | 'in-stock' | 'low-stock' | 'out-of-stock'

const variants: Record<BadgeVariant, { bg: string; text: string; dot: string }> = {
  paid:          { bg: '#edf5f0', text: '#4a7c59', dot: '#4a7c59' },
  active:        { bg: '#edf5f0', text: '#4a7c59', dot: '#4a7c59' },
  published:     { bg: '#edf5f0', text: '#4a7c59', dot: '#4a7c59' },
  visible:       { bg: '#edf5f0', text: '#4a7c59', dot: '#4a7c59' },
  'in-stock':    { bg: '#edf5f0', text: '#4a7c59', dot: '#4a7c59' },
  pending:       { bg: '#fdf8ee', text: '#b8892a', dot: '#c9a96e' },
  'low-stock':   { bg: '#fdf8ee', text: '#b8892a', dot: '#c9a96e' },
  cancelled:     { bg: '#fdf0ef', text: '#c0392b', dot: '#c0392b' },
  refunded:      { bg: '#fdf0ef', text: '#c0392b', dot: '#c0392b' },
  'out-of-stock':{ bg: '#fdf0ef', text: '#c0392b', dot: '#c0392b' },
  draft:         { bg: '#f0f0ee', text: '#8a8a82', dot: '#8a8a82' },
  hidden:        { bg: '#f0f0ee', text: '#8a8a82', dot: '#8a8a82' },
}

interface StatusBadgeProps {
  status: BadgeVariant
  label?: string
}

export default function StatusBadge({ status, label }: StatusBadgeProps) {
  const v = variants[status] ?? variants.draft
  const displayLabel = label ?? status.charAt(0).toUpperCase() + status.slice(1)

  return (
    <span
      className="inline-flex items-center gap-1.5 whitespace-nowrap"
      style={{
        backgroundColor: v.bg,
        color: v.text,
        borderRadius: 999,
        padding: '2px 10px',
        fontSize: 11,
        fontWeight: 500,
      }}
    >
      <span
        className="inline-block h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: v.dot }}
      />
      {displayLabel}
    </span>
  )
}
