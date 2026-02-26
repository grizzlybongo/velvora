'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import TopBar from '@/components/admin/TopBar'
import StatusBadge from '@/components/admin/StatusBadge'
import { inventoryItems as initialItems, type InventoryItem } from '@/lib/data/admin'

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function getStockStatus(stock: number, threshold: number): 'in-stock' | 'low-stock' | 'out-of-stock' {
  if (stock === 0) return 'out-of-stock'
  if (stock <= threshold) return 'low-stock'
  return 'in-stock'
}

function getStockLabel(status: 'in-stock' | 'low-stock' | 'out-of-stock'): string {
  switch (status) {
    case 'in-stock': return 'In Stock'
    case 'low-stock': return 'Low Stock'
    case 'out-of-stock': return 'Out of Stock'
  }
}

type FilterTab = 'all' | 'low' | 'out'

/* ─── Inline editable cell ─── */
function InlineEdit({
  value,
  onSave,
}: {
  value: number
  onSave: (val: number) => void
}) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(String(value))
  const [flash, setFlash] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [editing])

  const commit = () => {
    const num = parseInt(draft, 10)
    if (!isNaN(num) && num >= 0) {
      onSave(num)
      setFlash(true)
      setTimeout(() => setFlash(false), 400)
    } else {
      setDraft(String(value))
    }
    setEditing(false)
  }

  if (editing) {
    return (
      <input
        ref={inputRef}
        type="number"
        min={0}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === 'Enter') commit()
          if (e.key === 'Escape') {
            setDraft(String(value))
            setEditing(false)
          }
        }}
        className="w-16 rounded border px-2 py-1 text-center outline-none focus:border-[#c9a96e]"
        style={{ fontSize: 13, fontVariantNumeric: 'tabular-nums', borderColor: 'rgba(0,0,0,0.15)' }}
      />
    )
  }

  return (
    <button
      onClick={() => {
        setDraft(String(value))
        setEditing(true)
      }}
      className="rounded px-2 py-1 transition-colors hover:bg-[#f0f0ee]"
      style={{
        fontSize: 13,
        fontVariantNumeric: 'tabular-nums',
        cursor: 'text',
        backgroundColor: flash ? '#f5f3ef' : 'transparent',
        transition: 'background-color 400ms ease',
      }}
    >
      {value}
    </button>
  )
}

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>(initialItems)
  const [filter, setFilter] = useState<FilterTab>('all')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [bannerDismissed, setBannerDismissed] = useState(false)
  const [bulkModal, setBulkModal] = useState<'stock' | 'threshold' | null>(null)
  const [bulkValue, setBulkValue] = useState('')
  const [toast, setToast] = useState<string | null>(null)

  const lowOrOutCount = useMemo(
    () => items.filter((item) => getStockStatus(item.stock, item.threshold) !== 'in-stock').length,
    [items]
  )

  const filtered = useMemo(() => {
    let list = [...items]

    if (filter === 'low') {
      list = list.filter((item) => item.stock > 0 && item.stock <= item.threshold)
    } else if (filter === 'out') {
      list = list.filter((item) => item.stock === 0)
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter((item) => item.name.toLowerCase().includes(q))
    }

    return list
  }, [items, filter, search])

  const allFilteredSelected = filtered.length > 0 && filtered.every((item) => selected.has(item.productId))

  const toggleAll = () => {
    if (allFilteredSelected) {
      setSelected(new Set())
    } else {
      setSelected(new Set(filtered.map((item) => item.productId)))
    }
  }

  const toggleOne = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const updateStock = (productId: string, stock: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? { ...item, stock, lastUpdated: new Date().toISOString().split('T')[0] }
          : item
      )
    )
    showToast('Stock updated')
  }

  const updateThreshold = (productId: string, threshold: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? { ...item, threshold, lastUpdated: new Date().toISOString().split('T')[0] }
          : item
      )
    )
    showToast('Threshold updated')
  }

  const handleBulkApply = () => {
    const num = parseInt(bulkValue, 10)
    if (isNaN(num) || num < 0) return
    setItems((prev) =>
      prev.map((item) => {
        if (!selected.has(item.productId)) return item
        if (bulkModal === 'stock') return { ...item, stock: num, lastUpdated: new Date().toISOString().split('T')[0] }
        if (bulkModal === 'threshold') return { ...item, threshold: num, lastUpdated: new Date().toISOString().split('T')[0] }
        return item
      })
    )
    showToast(bulkModal === 'stock' ? 'Stock updated' : 'Threshold updated')
    setBulkModal(null)
    setBulkValue('')
    setSelected(new Set())
  }

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  const filterTabs: { key: FilterTab; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'low', label: 'Low Stock' },
    { key: 'out', label: 'Out of Stock' },
  ]

  return (
    <>
      <TopBar title="Inventory">
        <button
          className="rounded px-4 py-2 text-[13px] transition-opacity hover:opacity-85"
          style={{ border: '1px solid #ddd', backgroundColor: '#ffffff' }}
        >
          Export
        </button>
      </TopBar>

      <div className="flex-1 overflow-y-auto p-8">
        {/* Low stock alert banner */}
        {lowOrOutCount > 0 && !bannerDismissed && (
          <div
            className="mb-6 flex items-center justify-between rounded-md px-5 py-3"
            style={{
              backgroundColor: '#fdf8ee',
              borderLeft: '3px solid #c9a96e',
            }}
          >
            <p style={{ fontSize: 13, color: '#8a7a52' }}>
              {lowOrOutCount} product{lowOrOutCount !== 1 ? 's are' : ' is'} running low. Review below.
            </p>
            <button
              onClick={() => setBannerDismissed(true)}
              style={{ fontSize: 16, color: '#b8a98a', lineHeight: 1 }}
              className="transition-opacity hover:opacity-60"
            >
              ×
            </button>
          </div>
        )}

        {/* Filter bar */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex gap-1">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className="rounded-md px-4 py-2 text-[13px] transition-colors"
                style={{
                  backgroundColor: filter === tab.key ? '#1a1a18' : 'transparent',
                  color: filter === tab.key ? '#ffffff' : '#8a8a82',
                  fontWeight: filter === tab.key ? 500 : 400,
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by product name..."
            className="w-64 rounded border px-4 py-2 outline-none transition-colors focus:border-[#c9a96e]"
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
                <th className="w-10 px-5 py-3">
                  <input
                    type="checkbox"
                    checked={allFilteredSelected}
                    onChange={toggleAll}
                    className="accent-[#c9a96e]"
                  />
                </th>
                {['', 'Product', 'Category', 'SKU', 'Stock', 'Threshold', 'Status', 'Updated'].map((h, i) => (
                  <th
                    key={i}
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
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-5 py-12 text-center" style={{ fontSize: 14, fontStyle: 'italic', color: '#8a8a82' }}>
                    No products match your filters.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => {
                  const status = getStockStatus(item.stock, item.threshold)
                  return (
                    <tr
                      key={item.productId}
                      className="transition-colors duration-100"
                      style={{ borderBottom: '1px solid rgba(0,0,0,0.04)' }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#fafaf8')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      {/* Checkbox */}
                      <td className="px-5 py-3">
                        <input
                          type="checkbox"
                          checked={selected.has(item.productId)}
                          onChange={() => toggleOne(item.productId)}
                          className="accent-[#c9a96e]"
                        />
                      </td>

                      {/* Thumbnail */}
                      <td className="w-14 px-5 py-3">
                        {item.image ? (
                          <div className="h-10 w-10 shrink-0 overflow-hidden rounded" style={{ backgroundColor: '#f0f0ee' }}>
                            <img src={item.image} alt="" className="h-full w-full object-cover" />
                          </div>
                        ) : (
                          <div
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded"
                            style={{ backgroundColor: '#f0f0ee', fontSize: 10, fontWeight: 500, color: '#8a8a82' }}
                          >
                            {item.name.slice(0, 2).toUpperCase()}
                          </div>
                        )}
                      </td>

                      {/* Name */}
                      <td className="px-5 py-3" style={{ fontSize: 13, fontWeight: 500 }}>
                        {item.name}
                      </td>

                      {/* Category */}
                      <td className="px-5 py-3" style={{ fontSize: 13, color: '#8a8a82' }}>
                        {item.category}
                      </td>

                      {/* SKU */}
                      <td className="px-5 py-3" style={{ fontSize: 11, fontFamily: 'monospace', color: '#8a8a82' }}>
                        {item.sku}
                      </td>

                      {/* Stock — inline editable */}
                      <td className="px-5 py-3">
                        <InlineEdit
                          value={item.stock}
                          onSave={(val) => updateStock(item.productId, val)}
                        />
                      </td>

                      {/* Threshold — inline editable */}
                      <td className="px-5 py-3">
                        <InlineEdit
                          value={item.threshold}
                          onSave={(val) => updateThreshold(item.productId, val)}
                        />
                      </td>

                      {/* Status */}
                      <td className="px-5 py-3">
                        <StatusBadge status={status} label={getStockLabel(status)} />
                      </td>

                      {/* Last updated */}
                      <td className="px-5 py-3" style={{ fontSize: 13, color: '#8a8a82' }}>
                        {formatDate(item.lastUpdated)}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bulk action bar */}
      {selected.size > 0 && (
        <div
          className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between px-8 py-3"
          style={{
            backgroundColor: '#1a1a18',
            marginLeft: 240, /* sidebar width */
          }}
        >
          <p style={{ fontSize: 13, color: '#d0cfc8' }}>
            {selected.size} product{selected.size !== 1 ? 's' : ''} selected
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => { setBulkModal('stock'); setBulkValue('') }}
              className="rounded px-4 py-2 text-[13px] transition-opacity hover:opacity-85"
              style={{ border: '1px solid rgba(255,255,255,0.15)', color: '#ffffff' }}
            >
              Set Stock Level
            </button>
            <button
              onClick={() => { setBulkModal('threshold'); setBulkValue('') }}
              className="rounded px-4 py-2 text-[13px] transition-opacity hover:opacity-85"
              style={{ border: '1px solid rgba(255,255,255,0.15)', color: '#ffffff' }}
            >
              Set Threshold
            </button>
            <button
              className="rounded px-4 py-2 text-[13px] transition-opacity hover:opacity-85"
              style={{ border: '1px solid rgba(255,255,255,0.15)', color: '#ffffff' }}
            >
              Export Selected
            </button>
          </div>
        </div>
      )}

      {/* Bulk update modal */}
      {bulkModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
          onClick={() => setBulkModal(null)}
        >
          <div
            className="rounded-lg bg-white p-6"
            style={{ width: 360, border: '1px solid rgba(0,0,0,0.07)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontSize: 16, fontWeight: 500, marginBottom: 4 }}>
              {bulkModal === 'stock' ? 'Set Stock Level' : 'Set Threshold'}
            </h3>
            <p style={{ fontSize: 13, color: '#8a8a82', marginBottom: 16, lineHeight: 1.6 }}>
              Apply to {selected.size} selected product{selected.size !== 1 ? 's' : ''}.
            </p>
            <input
              type="number"
              min={0}
              value={bulkValue}
              onChange={(e) => setBulkValue(e.target.value)}
              placeholder="Enter value"
              className="mb-5 w-full rounded border px-4 py-2.5 outline-none focus:border-[#c9a96e]"
              style={{ fontSize: 13, borderColor: 'rgba(0,0,0,0.12)' }}
              autoFocus
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setBulkModal(null)}
                className="rounded px-4 py-2 text-[13px] transition-opacity hover:opacity-85"
                style={{ border: '1px solid #ddd', backgroundColor: '#ffffff' }}
              >
                Cancel
              </button>
              <button
                onClick={handleBulkApply}
                className="rounded px-4 py-2 text-[13px] text-white transition-opacity hover:opacity-85"
                style={{ backgroundColor: '#1a1a18' }}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div
          className="fixed bottom-6 right-6 z-50 rounded px-5 py-3 text-[13px] text-white shadow-lg"
          style={{
            backgroundColor: '#1a1a18',
            animation: 'slideUp 280ms ease-out',
          }}
        >
          {toast}
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  )
}
