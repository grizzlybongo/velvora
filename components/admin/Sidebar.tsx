'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  FileText,
  Users,
  FolderOpen,
  Warehouse,
  Settings,
  HelpCircle,
  LogOut,
} from 'lucide-react'

const navSections = [
  {
    label: 'MAIN',
    items: [
      { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
      { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
      { name: 'Products', href: '/admin/products', icon: Package },
      { name: 'Blog', href: '/admin/blog', icon: FileText },
    ],
  },
  {
    label: 'STORE',
    items: [
      { name: 'Customers', href: '/admin/customers', icon: Users },
      { name: 'Collections', href: '/admin/collections', icon: FolderOpen },
      { name: 'Inventory', href: '/admin/inventory', icon: Warehouse },
    ],
  },
  {
    label: 'SYSTEM',
    items: [
      { name: 'Settings', href: '/admin/settings', icon: Settings },
      { name: 'Help', href: '/admin/help', icon: HelpCircle },
    ],
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin'
    return pathname.startsWith(href)
  }

  return (
    <aside
      className="sidebar-scroll fixed left-0 top-0 flex h-screen w-60 flex-col overflow-y-auto"
      style={{ backgroundColor: '#1a1a18' }}
    >
      {/* Wordmark */}
      <div className="px-6 pb-8 pt-6">
        <Link href="/admin" className="block">
          <span
            className="text-base font-light tracking-[0.15em] text-white uppercase"
            style={{ fontFamily: 'Georgia, serif', fontSize: 16 }}
          >
            VELVORA
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-6 px-0">
        {navSections.map((section) => (
          <div key={section.label}>
            <p
              className="mb-2 px-6 uppercase"
              style={{
                fontSize: 10,
                letterSpacing: '0.12em',
                color: '#6a6a62',
              }}
            >
              {section.label}
            </p>
            <ul>
              {section.items.map((item) => {
                const active = isActive(item.href)
                const Icon = item.icon
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="relative flex h-10 items-center gap-2.5 px-6 transition-colors duration-120"
                      style={{
                        color: active ? '#ffffff' : '#6a6a62',
                        backgroundColor: active
                          ? 'rgba(255,255,255,0.07)'
                          : 'transparent',
                      }}
                      onMouseEnter={(e) => {
                        if (!active) {
                          e.currentTarget.style.color = '#d0cfc8'
                          e.currentTarget.style.backgroundColor =
                            'rgba(255,255,255,0.04)'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!active) {
                          e.currentTarget.style.color = '#6a6a62'
                          e.currentTarget.style.backgroundColor = 'transparent'
                        }
                      }}
                    >
                      {/* Active indicator bar */}
                      {active && (
                        <span
                          className="absolute left-0 top-0 h-full w-0.5"
                          style={{ backgroundColor: '#c9a96e' }}
                        />
                      )}
                      <Icon size={16} strokeWidth={1.5} />
                      <span style={{ fontSize: 13 }}>{item.name}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* User profile — bottom */}
      <div
        className="mt-auto border-t px-6 py-4"
        style={{ borderColor: 'rgba(255,255,255,0.08)' }}
      >
        <div className="group flex items-center gap-3">
          {/* Avatar initials */}
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-medium"
            style={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              color: '#a0a098',
            }}
          >
            IA
          </div>
          <div className="flex-1 overflow-hidden">
            <p
              className="truncate text-sm"
              style={{ color: '#d0cfc8', fontSize: 13 }}
            >
              VELVORA Admin
            </p>
            <p style={{ color: '#6a6a62', fontSize: 11 }}>Owner</p>
          </div>
          <button
            className="opacity-0 transition-opacity group-hover:opacity-100"
            style={{ color: '#6a6a62' }}
            aria-label="Logout"
          >
            <LogOut size={14} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </aside>
  )
}
