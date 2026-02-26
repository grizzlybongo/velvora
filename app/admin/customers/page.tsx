'use client'

import { useState, useMemo } from 'react'
import TopBar from '@/components/admin/TopBar'
import StatusBadge from '@/components/admin/StatusBadge'
import { customers, orders } from '@/lib/data/admin'

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(amount)
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

type SortKey = 'name' | 'email' | 'orderCount' | 'totalSpent' | 'lastOrderDate' | 'location'
type SortDir = 'asc' | 'desc'

export default function CustomersPage() {
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('lastOrderDate')
  const [sortDir, setSortDir] = useState<SortDir>('desc')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const filtered = useMemo(() => {
    let list = [...customers]

    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q)
      )
    }

    list.sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
      }
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDir === 'asc' ? aVal - bVal : bVal - aVal
      }
      return 0
    })

    return list
  }, [search, sortKey, sortDir])

  const selectedCustomer = selectedId ? customers.find((c) => c.id === selectedId) : null

  const customerOrders = useMemo(() => {
    if (!selectedCustomer) return []
    return orders.filter(
      (o) => o.email === selectedCustomer.email
    )
  }, [selectedCustomer])

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const sortIndicator = (key: SortKey) => {
    if (sortKey !== key) return ''
    return sortDir === 'asc' ? ' ↑' : ' ↓'
  }

  const columns: { key: SortKey; label: string }[] = [
    { key: 'name', label: 'Customer' },
    { key: 'email', label: 'Email' },
    { key: 'orderCount', label: 'Orders' },
    { key: 'totalSpent', label: 'Total Spent' },
    { key: 'lastOrderDate', label: 'Last Order' },
    { key: 'location', label: 'Location' },
  ]

  return (
    <>
      <TopBar title="Customers">
        <button
          className="rounded px-4 py-2 text-[13px] transition-opacity hover:opacity-85"
          style={{ border: '1px solid #ddd', backgroundColor: '#ffffff' }}
        >
          Export CSV
        </button>
      </TopBar>

      <div className="flex-1 overflow-y-auto p-8">
        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="w-72 rounded border px-4 py-2 outline-none transition-colors focus:border-[#c9a96e]"
            style={{ fontSize: 13, borderColor: 'rgba(0,0,0,0.12)' }}
          />
        </div>

        {/* Table */}
        <div
          className="overflow-hidden rounded-lg"
          style={{ backgroundColor: '#ffffff', border: '1px solid rgba(0,0,0,0.07)' }}
        >
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
                {/* Avatar column — no sort */}
                <th className="w-14 px-5 py-3" />
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="cursor-pointer select-none px-5 py-3 text-left transition-colors hover:text-[#1a1a18]"
                    style={{
                      fontSize: 11,
                      fontWeight: 500,
                      color: sortKey === col.key ? '#1a1a18' : '#8a8a82',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                    }}
                    onClick={() => toggleSort(col.key)}
                  >
                    {col.label}{sortIndicator(col.key)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center" style={{ fontSize: 14, fontStyle: 'italic', color: '#8a8a82' }}>
                    Orders will populate customer records automatically.
                  </td>
                </tr>
              ) : (
                filtered.map((cust) => (
                  <tr
                    key={cust.id}
                    className="cursor-pointer transition-colors duration-100"
                    style={{ borderBottom: '1px solid rgba(0,0,0,0.04)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#fafaf8')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    onClick={() => setSelectedId(cust.id)}
                  >
                    {/* Avatar */}
                    <td className="px-5 py-3">
                      <div
                        className="flex h-8 w-8 items-center justify-center rounded-full"
                        style={{ backgroundColor: '#f0f0ee', fontSize: 10, fontWeight: 600, color: '#8a8a82' }}
                      >
                        {getInitials(cust.name)}
                      </div>
                    </td>
                    <td className="px-5 py-3" style={{ fontSize: 13, fontWeight: 500 }}>{cust.name}</td>
                    <td className="px-5 py-3" style={{ fontSize: 13, color: '#8a8a82' }}>{cust.email}</td>
                    <td className="px-5 py-3" style={{ fontSize: 13, fontVariantNumeric: 'tabular-nums' }}>{cust.orderCount}</td>
                    <td className="px-5 py-3" style={{ fontSize: 13, fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>{formatCurrency(cust.totalSpent)}</td>
                    <td className="px-5 py-3" style={{ fontSize: 13, color: '#8a8a82' }}>{formatDate(cust.lastOrderDate)}</td>
                    <td className="px-5 py-3" style={{ fontSize: 13, color: '#8a8a82' }}>{cust.location}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer detail side panel */}
      {selectedCustomer && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            style={{ backgroundColor: 'rgba(0,0,0,0.12)' }}
            onClick={() => setSelectedId(null)}
          />

          {/* Panel */}
          <div
            className="fixed right-0 top-0 z-50 flex h-full flex-col overflow-y-auto bg-white shadow-xl"
            style={{
              width: 480,
              borderLeft: '1px solid rgba(0,0,0,0.07)',
              animation: 'slideIn 280ms ease-out',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 pt-8 pb-6">
              <div className="flex items-center gap-4">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full"
                  style={{ backgroundColor: '#f0f0ee', fontSize: 14, fontWeight: 600, color: '#8a8a82' }}
                >
                  {getInitials(selectedCustomer.name)}
                </div>
                <div>
                  <h2 style={{ fontSize: 18, fontWeight: 500 }}>{selectedCustomer.name}</h2>
                  <a href={`mailto:${selectedCustomer.email}`} style={{ fontSize: 13, color: '#8a8a82' }} className="hover:underline">
                    {selectedCustomer.email}
                  </a>
                </div>
              </div>
              <button
                onClick={() => setSelectedId(null)}
                className="flex h-8 w-8 items-center justify-center rounded transition-colors hover:bg-[#f0f0ee]"
                style={{ fontSize: 18, color: '#8a8a82' }}
              >
                ×
              </button>
            </div>

            <p className="px-8 pb-6" style={{ fontSize: 12, color: '#b0b0a8' }}>
              Member since {formatDate(selectedCustomer.memberSince)}
            </p>

            {/* Overview mini stats */}
            <div className="mx-8 mb-6 grid grid-cols-3 gap-3">
              {[
                { label: 'Total Orders', value: String(selectedCustomer.orderCount) },
                { label: 'Total Spent', value: formatCurrency(selectedCustomer.totalSpent) },
                { label: 'Avg. Order', value: formatCurrency(Math.round(selectedCustomer.totalSpent / selectedCustomer.orderCount)) },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-md p-3"
                  style={{ backgroundColor: '#fafaf8', border: '1px solid rgba(0,0,0,0.04)' }}
                >
                  <p style={{ fontSize: 10, color: '#8a8a82', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{stat.label}</p>
                  <p style={{ fontSize: 16, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Order history */}
            <div className="flex-1 px-8 pb-8">
              <p className="mb-3" style={{ fontSize: 11, fontWeight: 500, color: '#8a8a82', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Order History
              </p>
              {customerOrders.length === 0 ? (
                <p style={{ fontSize: 13, fontStyle: 'italic', color: '#b0b0a8' }}>No orders found.</p>
              ) : (
                <div className="space-y-0">
                  {customerOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between py-3"
                      style={{ borderBottom: '1px solid rgba(0,0,0,0.04)' }}
                    >
                      <div className="flex items-center gap-4">
                        <span style={{ fontSize: 12, fontFamily: 'monospace', color: '#8a8a82' }}>{order.id}</span>
                        <span style={{ fontSize: 12, color: '#b0b0a8' }}>{formatDate(order.date)}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <StatusBadge status={order.status} />
                        <span style={{ fontSize: 13, fontWeight: 500, fontVariantNumeric: 'tabular-nums', minWidth: 56, textAlign: 'right' }}>
                          {formatCurrency(order.total)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Read-only footer note */}
            <div className="px-8 py-4" style={{ borderTop: '1px solid rgba(0,0,0,0.04)' }}>
              <p style={{ fontSize: 11, fontStyle: 'italic', color: '#b0b0a8' }}>
                Customer data sourced from order records.
              </p>
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </>
  )
}
