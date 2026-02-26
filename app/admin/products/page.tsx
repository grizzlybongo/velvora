'use client'

import TopBar from '@/components/admin/TopBar'
import StatusBadge from '@/components/admin/StatusBadge'
import { adminProducts } from '@/lib/data/admin'

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(amount)
}

export default function ProductsPage() {
  return (
    <>
      <TopBar title="Products">
        <button
          className="rounded px-4 py-2 text-[13px] transition-opacity hover:opacity-85"
          style={{ border: '1px solid #ddd', backgroundColor: '#ffffff' }}
        >
          Import
        </button>
        <button
          className="rounded px-4 py-2 text-[13px] text-white transition-opacity hover:opacity-85"
          style={{ backgroundColor: '#1a1a18' }}
        >
          + Add Product
        </button>
      </TopBar>

      <div className="flex-1 overflow-y-auto p-8">
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
                {['Product', 'Category', 'Status', 'Stock', 'Price', ''].map(
                  (h) => (
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
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {adminProducts.map((product) => (
                <tr
                  key={product.id}
                  className="cursor-pointer transition-colors duration-100"
                  style={{ borderBottom: '1px solid rgba(0,0,0,0.04)' }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = '#fafaf8')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = 'transparent')
                  }
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      {product.image ? (
                        <div className="h-9 w-9 shrink-0 overflow-hidden rounded" style={{ backgroundColor: '#f0f0ee' }}>
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ) : (
                        <div
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded"
                          style={{
                            backgroundColor: '#f0f0ee',
                            fontSize: 10,
                            fontWeight: 500,
                            color: '#8a8a82',
                          }}
                        >
                          {product.name.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                      <span style={{ fontSize: 13, fontWeight: 500 }}>
                        {product.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3" style={{ fontSize: 13, color: '#8a8a82' }}>
                    {product.category}
                  </td>
                  <td className="px-5 py-3">
                    <StatusBadge status={product.status} />
                  </td>
                  <td
                    className="px-5 py-3"
                    style={{
                      fontSize: 13,
                      fontVariantNumeric: 'tabular-nums',
                      color: product.stock === 0 ? '#c0392b' : '#1a1a18',
                    }}
                  >
                    {product.stock === 0 ? '—' : product.stock}
                  </td>
                  <td
                    className="px-5 py-3"
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {formatCurrency(product.price)}
                  </td>
                  <td className="px-5 py-3" style={{ fontSize: 13, color: '#8a8a82' }}>
                    ···
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
