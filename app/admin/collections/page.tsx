'use client'

import { useState } from 'react'
import Link from 'next/link'
import TopBar from '@/components/admin/TopBar'
import StatusBadge from '@/components/admin/StatusBadge'
import { collections, adminProducts } from '@/lib/data/admin'

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function CollectionsPage() {
  const [items, setItems] = useState(collections)
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null)

  const handleToggleVisibility = (id: string) => {
    setItems((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: c.status === 'visible' ? ('hidden' as const) : ('visible' as const) }
          : c
      )
    )
  }

  const handleDuplicate = (id: string) => {
    const source = items.find((c) => c.id === id)
    if (!source) return
    const dup = {
      ...source,
      id: `${source.id}-copy`,
      name: `${source.name} (Copy)`,
      slug: `${source.slug}-copy`,
      status: 'hidden' as const,
    }
    setItems((prev) => [...prev, dup])
  }

  const handleDelete = () => {
    if (!deleteTarget) return
    setItems((prev) => prev.filter((c) => c.id !== deleteTarget))
    setDeleteTarget(null)
  }

  if (items.length === 0) {
    return (
      <>
        <TopBar title="Collections">
          <Link
            href="/admin/collections/new"
            className="rounded px-4 py-2 text-[13px] text-white transition-opacity hover:opacity-85"
            style={{ backgroundColor: '#1a1a18' }}
          >
            + New Collection
          </Link>
        </TopBar>
        <div className="flex flex-1 flex-col items-center justify-center gap-6 p-8">
          <p style={{ fontSize: 14, fontStyle: 'italic', color: '#8a8a82' }}>
            No collections yet. Create your first to organize the storefront.
          </p>
          <Link
            href="/admin/collections/new"
            className="rounded px-5 py-2.5 text-[13px] text-white transition-opacity hover:opacity-85"
            style={{ backgroundColor: '#1a1a18' }}
          >
            + New Collection
          </Link>
        </div>
      </>
    )
  }

  return (
    <>
      <TopBar title="Collections">
        <Link
          href="/admin/collections/new"
          className="rounded px-4 py-2 text-[13px] text-white transition-opacity hover:opacity-85"
          style={{ backgroundColor: '#1a1a18' }}
        >
          + New Collection
        </Link>
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
                {['', 'Collection', 'Products', 'Status', 'Last Updated', ''].map((h, i) => (
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
              {items.map((col) => (
                <tr
                  key={col.id}
                  className="cursor-pointer transition-colors duration-100"
                  style={{ borderBottom: '1px solid rgba(0,0,0,0.04)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#fafaf8')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  {/* Cover thumbnail */}
                  <td className="w-16 px-5 py-3">
                    {col.coverImage ? (
                      <div className="h-10 w-10 shrink-0 overflow-hidden rounded" style={{ backgroundColor: '#f0f0ee' }}>
                        <img src={col.coverImage} alt="" className="h-full w-full object-cover" />
                      </div>
                    ) : (
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded"
                        style={{ backgroundColor: '#f0f0ee', fontSize: 10, fontWeight: 500, color: '#8a8a82' }}
                      >
                        {col.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                  </td>

                  {/* Name — links to editor */}
                  <td className="px-5 py-3">
                    <Link href={`/admin/collections/${col.id}`} style={{ fontSize: 13, fontWeight: 500 }}>
                      {col.name}
                    </Link>
                    <p style={{ fontSize: 12, color: '#8a8a82', marginTop: 2 }}>{col.description}</p>
                  </td>

                  {/* Products count */}
                  <td className="px-5 py-3" style={{ fontSize: 13, fontVariantNumeric: 'tabular-nums' }}>
                    {col.productIds.length} product{col.productIds.length !== 1 ? 's' : ''}
                  </td>

                  {/* Status */}
                  <td className="px-5 py-3">
                    <StatusBadge status={col.status} label={col.status === 'visible' ? 'Visible' : 'Hidden'} />
                  </td>

                  {/* Last updated */}
                  <td className="px-5 py-3" style={{ fontSize: 13, color: '#8a8a82' }}>
                    {formatDate(col.updatedAt)}
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-3">
                    <div className="relative">
                      <ActionsMenu
                        onEdit={`/admin/collections/${col.id}`}
                        onDuplicate={() => handleDuplicate(col.id)}
                        onToggle={() => handleToggleVisibility(col.id)}
                        toggleLabel={col.status === 'visible' ? 'Hide' : 'Show'}
                        onDelete={() => setDeleteTarget(col.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete confirmation modal */}
      {deleteTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
          onClick={() => setDeleteTarget(null)}
        >
          <div
            className="rounded-lg bg-white p-6"
            style={{ width: 400, border: '1px solid rgba(0,0,0,0.07)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontSize: 16, fontWeight: 500, marginBottom: 8 }}>
              Delete &ldquo;{items.find((c) => c.id === deleteTarget)?.name}&rdquo;?
            </h3>
            <p style={{ fontSize: 13, color: '#8a8a82', marginBottom: 24, lineHeight: 1.6 }}>
              This cannot be undone. Products will not be deleted.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="rounded px-4 py-2 text-[13px] transition-opacity hover:opacity-85"
                style={{ border: '1px solid #ddd', backgroundColor: '#ffffff' }}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="rounded px-4 py-2 text-[13px] text-white transition-opacity hover:opacity-85"
                style={{ backgroundColor: '#c0392b' }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

/* ─── Actions dropdown ─── */
function ActionsMenu({
  onEdit,
  onDuplicate,
  onToggle,
  toggleLabel,
  onDelete,
}: {
  onEdit: string
  onDuplicate: () => void
  onToggle: () => void
  toggleLabel: string
  onDelete: () => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation()
          setOpen(!open)
        }}
        style={{ fontSize: 13, color: '#8a8a82', padding: '2px 6px' }}
      >
        ···
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div
            className="absolute right-0 top-8 z-50 w-40 overflow-hidden rounded-md bg-white py-1 shadow-lg"
            style={{ border: '1px solid rgba(0,0,0,0.07)' }}
          >
            <Link
              href={onEdit}
              className="block w-full px-4 py-2 text-left text-[13px] transition-colors hover:bg-[#fafaf8]"
              onClick={() => setOpen(false)}
            >
              Edit
            </Link>
            <button
              className="block w-full px-4 py-2 text-left text-[13px] transition-colors hover:bg-[#fafaf8]"
              onClick={() => { onDuplicate(); setOpen(false) }}
            >
              Duplicate
            </button>
            <button
              className="block w-full px-4 py-2 text-left text-[13px] transition-colors hover:bg-[#fafaf8]"
              onClick={() => { onToggle(); setOpen(false) }}
            >
              {toggleLabel}
            </button>
            <button
              className="block w-full px-4 py-2 text-left text-[13px] transition-colors hover:bg-[#fafaf8]"
              style={{ color: '#c0392b' }}
              onClick={() => { onDelete(); setOpen(false) }}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  )
}
