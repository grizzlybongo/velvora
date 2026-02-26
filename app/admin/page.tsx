'use client'

import TopBar from '@/components/admin/TopBar'
import StatusBadge from '@/components/admin/StatusBadge'
import {
  kpiStats,
  orders,
  orderStatusBreakdown,
  quickStats,
} from '@/lib/data/admin'

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
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

export default function AdminDashboard() {
  const recentOrders = orders.slice(0, 8)
  const totalStatusCount = orderStatusBreakdown.reduce((a, b) => a + b.count, 0)

  return (
    <>
      <TopBar title="Dashboard" />
      <div className="flex-1 overflow-y-auto p-8">
        {/* KPI Cards */}
        <div className="mb-8 grid grid-cols-4 gap-5">
          {kpiStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg p-6"
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid rgba(0,0,0,0.07)',
              }}
            >
              <p
                className="mb-3 uppercase"
                style={{
                  fontSize: 11,
                  letterSpacing: '0.08em',
                  color: '#8a8a82',
                }}
              >
                {stat.label}
              </p>
              <p
                className="mb-1"
                style={{
                  fontSize: 28,
                  fontWeight: 600,
                  color: '#1a1a18',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {stat.value}
              </p>
              {stat.delta !== 0 && (
                <p
                  style={{
                    fontSize: 12,
                    color: stat.delta > 0 ? '#4a7c59' : '#c0392b',
                  }}
                >
                  {stat.delta > 0 ? '+' : ''}
                  {stat.delta}% vs last month
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Two-column: Recent Orders + Stats */}
        <div className="grid grid-cols-5 gap-5">
          {/* Recent Orders — 3/5 width */}
          <div
            className="col-span-3 rounded-lg"
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid rgba(0,0,0,0.07)',
            }}
          >
            <div
              className="flex items-center justify-between px-6 py-4"
              style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}
            >
              <h2 style={{ fontSize: 15, fontWeight: 500, color: '#1a1a18' }}>
                Recent Orders
              </h2>
              <a
                href="/admin/orders"
                style={{ fontSize: 12, color: '#8a8a82' }}
                className="transition-colors hover:text-[#1a1a18]"
              >
                View all
              </a>
            </div>

            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                  {['Order', 'Customer', 'Type', 'Status', 'Date'].map((h) => (
                    <th
                      key={h}
                      className="px-6 py-3 text-left"
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
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="transition-colors duration-100"
                    style={{ borderBottom: '1px solid rgba(0,0,0,0.04)' }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = '#fafaf8')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = 'transparent')
                    }
                  >
                    <td className="px-6 py-3" style={{ fontSize: 13, fontWeight: 500 }}>
                      {order.id}
                    </td>
                    <td className="px-6 py-3">
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
                    <td className="px-6 py-3" style={{ fontSize: 13, color: '#8a8a82' }}>
                      {order.type}
                    </td>
                    <td className="px-6 py-3">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-6 py-3" style={{ fontSize: 13, color: '#8a8a82' }}>
                      {formatDate(order.date)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Right column — Status breakdown + Quick stats */}
          <div className="col-span-2 space-y-5">
            {/* Status Breakdown */}
            <div
              className="rounded-lg p-6"
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid rgba(0,0,0,0.07)',
              }}
            >
              <h2
                className="mb-5"
                style={{ fontSize: 15, fontWeight: 500, color: '#1a1a18' }}
              >
                Order Status
              </h2>

              {/* Bar */}
              <div
                className="mb-5 flex overflow-hidden rounded-full"
                style={{ height: 8 }}
              >
                {orderStatusBreakdown.map((s) => (
                  <div
                    key={s.status}
                    style={{
                      backgroundColor: s.color,
                      width: `${(s.count / totalStatusCount) * 100}%`,
                    }}
                  />
                ))}
              </div>

              {/* Legend */}
              <div className="space-y-3">
                {orderStatusBreakdown.map((s) => (
                  <div key={s.status} className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="inline-block h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: s.color }}
                      />
                      <span style={{ fontSize: 13, color: '#1a1a18' }}>
                        {s.status}
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 500,
                        color: '#1a1a18',
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      {s.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div
              className="rounded-lg p-6"
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid rgba(0,0,0,0.07)',
              }}
            >
              <h2
                className="mb-5"
                style={{ fontSize: 15, fontWeight: 500, color: '#1a1a18' }}
              >
                Quick Stats
              </h2>
              <div className="space-y-4">
                {quickStats.map((s) => (
                  <div key={s.label} className="flex items-center justify-between">
                    <span style={{ fontSize: 13, color: '#8a8a82' }}>
                      {s.label}
                    </span>
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: '#1a1a18',
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      {s.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
