'use client'

import { useState } from 'react'
import TopBar from '@/components/admin/TopBar'
import StatusBadge from '@/components/admin/StatusBadge'
import { orders, type Order, type OrderStatus } from '@/lib/data/admin'
import { X } from 'lucide-react'

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(amount)
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

/* ─── Order Detail Panel ─── */
function OrderPanel({
  order,
  onClose,
}: {
  order: Order
  onClose: () => void
}) {
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 transition-opacity duration-280"
        style={{ backgroundColor: 'rgba(0,0,0,0.12)' }}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="fixed right-0 top-0 z-50 flex h-full w-[480px] flex-col overflow-y-auto"
        style={{
          backgroundColor: '#ffffff',
          borderLeft: '1px solid rgba(0,0,0,0.07)',
          animation: 'slideIn 280ms ease forwards',
        }}
      >
        {/* Header */}
        <div
          className="flex shrink-0 items-center justify-between px-6 py-5"
          style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}
        >
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 500 }}>{order.id}</h2>
            <p style={{ fontSize: 12, color: '#8a8a82', marginTop: 2 }}>
              {formatDate(order.date)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded transition-colors hover:bg-[#f0f0ee]"
          >
            <X size={16} strokeWidth={1.5} />
          </button>
        </div>

        {/* Status */}
        <div className="px-6 py-4" style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
          <p
            className="mb-2 uppercase"
            style={{ fontSize: 10, letterSpacing: '0.1em', color: '#8a8a82' }}
          >
            Status
          </p>
          <StatusBadge status={order.status} />
        </div>

        {/* Items */}
        <div className="px-6 py-4" style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
          <p
            className="mb-3 uppercase"
            style={{ fontSize: 10, letterSpacing: '0.1em', color: '#8a8a82' }}
          >
            Items
          </p>
          <div className="space-y-3">
            {order.items.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded"
                    style={{
                      backgroundColor: item.image ? 'transparent' : '#f0f0ee',
                      fontSize: 10,
                      color: '#8a8a82',
                      overflow: 'hidden',
                    }}
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      item.name.slice(0, 2).toUpperCase()
                    )}
                  </div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 500 }}>{item.name}</p>
                    <p style={{ fontSize: 12, color: '#8a8a82' }}>
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {formatCurrency(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div
            className="mt-4 flex items-center justify-between pt-4"
            style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }}
          >
            <span style={{ fontSize: 13, fontWeight: 500 }}>Total</span>
            <span style={{ fontSize: 15, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
              {formatCurrency(order.total)}
            </span>
          </div>
        </div>

        {/* Contact */}
        <div className="px-6 py-4" style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
          <p
            className="mb-3 uppercase"
            style={{ fontSize: 10, letterSpacing: '0.1em', color: '#8a8a82' }}
          >
            Contact
          </p>
          <p style={{ fontSize: 13 }}>{order.customer}</p>
          <p style={{ fontSize: 13, color: '#8a8a82' }}>{order.email}</p>
        </div>

        {/* Delivery */}
        <div className="px-6 py-4">
          <p
            className="mb-3 uppercase"
            style={{ fontSize: 10, letterSpacing: '0.1em', color: '#8a8a82' }}
          >
            Delivery Address
          </p>
          <p style={{ fontSize: 13 }}>{order.address}</p>
          <p style={{ fontSize: 13, color: '#8a8a82' }}>
            {order.city}, {order.country}
          </p>

          {/* Map placeholder */}
          <div
            className="mt-3 flex h-32 items-center justify-center rounded"
            style={{ backgroundColor: '#f0f0ee' }}
          >
            <span style={{ fontSize: 12, color: '#8a8a82' }}>Map placeholder</span>
          </div>
        </div>
      </div>
    </>
  )
}

/* ─── Orders Page ─── */
export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [search, setSearch] = useState('')

  const filtered = orders.filter((o) => {
    if (statusFilter !== 'all' && o.status !== statusFilter) return false
    if (search && !o.customer.toLowerCase().includes(search.toLowerCase()) && !o.id.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <>
      <TopBar title="Orders">
        <button
          className="rounded px-4 py-2 text-[13px] transition-opacity hover:opacity-85"
          style={{ border: '1px solid #ddd', backgroundColor: '#ffffff' }}
        >
          Export
        </button>
      </TopBar>

      <div className="flex-1 overflow-y-auto p-8">
        {/* Filters */}
        <div
          className="mb-5 flex items-center justify-between rounded-lg px-5 py-3"
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid rgba(0,0,0,0.07)',
          }}
        >
          <div className="flex items-center gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded px-3 py-1.5 text-[13px] outline-none"
              style={{ border: '1px solid rgba(0,0,0,0.12)', backgroundColor: '#ffffff' }}
            >
              <option value="all">All Statuses</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>

          <input
            type="text"
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded px-3 py-1.5 text-[13px] outline-none"
            style={{
              border: '1px solid rgba(0,0,0,0.12)',
              backgroundColor: '#ffffff',
              width: 220,
            }}
          />
        </div>

        {/* Table */}
        <div
          className="overflow-hidden rounded-lg"
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid rgba(0,0,0,0.07)',
          }}
        >
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
                {['Order', 'Customer', 'Type', 'Product', 'Status', 'Total', 'Date', ''].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3 text-left"
                    style={{
                      fontSize: 11,
                      fontWeight: 500,
                      color: '#8a8a82',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => (
                <tr
                  key={order.id}
                  className="cursor-pointer transition-colors duration-100"
                  style={{ borderBottom: '1px solid rgba(0,0,0,0.04)' }}
                  onClick={() => setSelectedOrder(order)}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = '#fafaf8')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = 'transparent')
                  }
                >
                  <td className="px-5 py-3" style={{ fontSize: 13, fontWeight: 500 }}>
                    {order.id}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                        style={{
                          backgroundColor: '#f0f0ee',
                          fontSize: 10,
                          fontWeight: 500,
                          color: '#8a8a82',
                        }}
                      >
                        {getInitials(order.customer)}
                      </div>
                      <span style={{ fontSize: 13 }}>{order.customer}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3" style={{ fontSize: 13, color: '#8a8a82' }}>
                    {order.type}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      {order.productImage ? (
                        <div className="h-7 w-7 shrink-0 overflow-hidden rounded" style={{ backgroundColor: '#f0f0ee' }}>
                          <img
                            src={order.productImage}
                            alt={order.product}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ) : (
                        <div
                          className="flex h-7 w-7 shrink-0 items-center justify-center rounded"
                          style={{ backgroundColor: '#f0f0ee', fontSize: 9, color: '#8a8a82' }}
                        >
                          {order.product.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                      <span style={{ fontSize: 13 }}>{order.product}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <StatusBadge status={order.status} />
                  </td>
                  <td
                    className="px-5 py-3"
                    style={{ fontSize: 13, fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}
                  >
                    {formatCurrency(order.total)}
                  </td>
                  <td className="px-5 py-3" style={{ fontSize: 13, color: '#8a8a82' }}>
                    {formatDate(order.date)}
                  </td>
                  <td className="px-5 py-3" style={{ fontSize: 13, color: '#8a8a82' }}>
                    ···
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-16 text-center">
                    <p style={{ fontSize: 14, color: '#8a8a82', fontStyle: 'italic' }}>
                      No orders match your filters.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Side Panel */}
      {selectedOrder && (
        <OrderPanel
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}

      {/* Panel slide animation */}
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </>
  )
}
