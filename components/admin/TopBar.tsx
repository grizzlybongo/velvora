interface TopBarProps {
  title: string
  children?: React.ReactNode
}

export default function TopBar({ title, children }: TopBarProps) {
  return (
    <header
      className="flex h-14 shrink-0 items-center justify-between px-8"
      style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid rgba(0,0,0,0.07)',
      }}
    >
      <h1 style={{ fontSize: 18, fontWeight: 500, color: '#1a1a18' }}>
        {title}
      </h1>
      {children && <div className="flex items-center gap-3">{children}</div>}
    </header>
  )
}
