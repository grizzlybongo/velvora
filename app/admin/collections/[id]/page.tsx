'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, Upload, X, GripVertical } from 'lucide-react'
import { collections, adminProducts } from '@/lib/data/admin'

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export default function CollectionEditorPage() {
  const params = useParams()
  const id = params.id as string
  const isNew = id === 'new'

  const existing = !isNew ? collections.find((c) => c.id === id) : null

  const [name, setName] = useState(existing?.name ?? '')
  const [slug, setSlug] = useState(existing?.slug ?? '')
  const [description, setDescription] = useState(existing?.description ?? '')
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>(existing?.productIds ?? [])
  const [status, setStatus] = useState<'visible' | 'hidden'>(existing?.status ?? 'visible')
  const [featuredOnHomepage, setFeaturedOnHomepage] = useState(existing?.featuredOnHomepage ?? false)
  const [showInNav, setShowInNav] = useState(false)
  const [metaTitle, setMetaTitle] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [seoOpen, setSeoOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const filteredProducts = useMemo(() => {
    if (!search.trim()) return []
    return adminProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) &&
        !selectedProductIds.includes(p.id)
    )
  }, [search, selectedProductIds])

  const handleNameChange = (val: string) => {
    setName(val)
    if (isNew || slug === generateSlug(name)) {
      setSlug(generateSlug(val))
    }
  }

  const addProduct = (productId: string) => {
    setSelectedProductIds((prev) => [...prev, productId])
    setSearch('')
    setShowDropdown(false)
  }

  const removeProduct = (productId: string) => {
    setSelectedProductIds((prev) => prev.filter((id) => id !== productId))
  }

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <>
      {/* Top bar */}
      <header
        className="flex h-14 shrink-0 items-center gap-4 px-8"
        style={{
          backgroundColor: '#ffffff',
          borderBottom: '1px solid rgba(0,0,0,0.07)',
        }}
      >
        <Link
          href="/admin/collections"
          className="flex items-center gap-2 transition-colors hover:opacity-70"
          style={{ color: '#8a8a82', fontSize: 13 }}
        >
          <ArrowLeft size={16} strokeWidth={1.5} />
          Collections
        </Link>
        <span style={{ color: '#d0d0cc', fontSize: 13 }}>/</span>
        <span style={{ fontSize: 14, fontWeight: 500 }}>
          {isNew ? 'New Collection' : existing?.name ?? 'Edit'}
        </span>
      </header>

      {/* Two-column layout */}
      <div className="flex flex-1 overflow-y-auto">
        {/* LEFT — Content (60%) */}
        <div className="flex-[3] p-8 space-y-8">
          {/* Name */}
          <div>
            <label className="block mb-2" style={{ fontSize: 11, fontWeight: 500, color: '#8a8a82', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Collection Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g. The Noir Collection"
              className="w-full rounded border px-4 py-3 outline-none transition-colors focus:border-[#c9a96e]"
              style={{ fontSize: 18, fontWeight: 400, borderColor: 'rgba(0,0,0,0.12)' }}
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block mb-2" style={{ fontSize: 11, fontWeight: 500, color: '#8a8a82', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Slug
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full rounded border px-4 py-2.5 font-mono outline-none transition-colors focus:border-[#c9a96e]"
              style={{ fontSize: 12, borderColor: 'rgba(0,0,0,0.12)' }}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2" style={{ fontSize: 11, fontWeight: 500, color: '#8a8a82', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Used as the storefront subtitle for this collection."
              className="w-full resize-none rounded border px-4 py-3 outline-none transition-colors focus:border-[#c9a96e]"
              style={{ fontSize: 13, lineHeight: 1.6, borderColor: 'rgba(0,0,0,0.12)' }}
            />
          </div>

          {/* Cover Image */}
          <div>
            <label className="block mb-2" style={{ fontSize: 11, fontWeight: 500, color: '#8a8a82', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Cover Image
            </label>
            <div
              className="flex flex-col items-center justify-center rounded py-12"
              style={{
                border: '2px dashed rgba(0,0,0,0.1)',
                backgroundColor: '#fafaf8',
              }}
            >
              <Upload size={20} strokeWidth={1.5} style={{ color: '#8a8a82', marginBottom: 8 }} />
              <p style={{ fontSize: 13, color: '#8a8a82' }}>Drag & drop or click to upload</p>
              <p style={{ fontSize: 11, color: '#b0b0a8', marginTop: 4 }}>16:9 ratio recommended</p>
            </div>
          </div>

          {/* Products in this collection */}
          <div>
            <label className="block mb-2" style={{ fontSize: 11, fontWeight: 500, color: '#8a8a82', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Products in this Collection
            </label>

            {/* Search input */}
            <div className="relative mb-4">
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setShowDropdown(true)
                }}
                onFocus={() => setShowDropdown(true)}
                placeholder="Search products to add..."
                className="w-full rounded border px-4 py-2.5 outline-none transition-colors focus:border-[#c9a96e]"
                style={{ fontSize: 13, borderColor: 'rgba(0,0,0,0.12)' }}
              />
              {showDropdown && filteredProducts.length > 0 && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setShowDropdown(false)} />
                  <div
                    className="absolute left-0 top-full z-40 mt-1 max-h-48 w-full overflow-y-auto rounded-md bg-white shadow-lg"
                    style={{ border: '1px solid rgba(0,0,0,0.07)' }}
                  >
                    {filteredProducts.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => addProduct(p.id)}
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-[#fafaf8]"
                      >
                        {p.image ? (
                          <div className="h-7 w-7 shrink-0 overflow-hidden rounded" style={{ backgroundColor: '#f0f0ee' }}>
                            <img src={p.image} alt="" className="h-full w-full object-cover" />
                          </div>
                        ) : (
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded" style={{ backgroundColor: '#f0f0ee', fontSize: 9, color: '#8a8a82' }}>
                            {p.name.slice(0, 2).toUpperCase()}
                          </div>
                        )}
                        <span style={{ fontSize: 13 }}>{p.name}</span>
                        <span style={{ fontSize: 11, color: '#8a8a82', marginLeft: 'auto' }}>{p.category}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Selected product pills */}
            <div className="flex flex-wrap gap-2">
              {selectedProductIds.map((pid) => {
                const p = adminProducts.find((ap) => ap.id === pid)
                if (!p) return null
                return (
                  <div
                    key={pid}
                    className="flex items-center gap-2 rounded-full px-3 py-1.5"
                    style={{ backgroundColor: '#f0f0ee', fontSize: 12 }}
                  >
                    <GripVertical size={12} strokeWidth={1.5} style={{ color: '#b0b0a8', cursor: 'grab' }} />
                    {p.image ? (
                      <div className="h-5 w-5 shrink-0 overflow-hidden rounded-full" style={{ backgroundColor: '#e0e0dc' }}>
                        <img src={p.image} alt="" className="h-full w-full object-cover" />
                      </div>
                    ) : (
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: '#e0e0dc', fontSize: 8, color: '#8a8a82' }}>
                        {p.name.slice(0, 1)}
                      </div>
                    )}
                    <span style={{ fontWeight: 500 }}>{p.name}</span>
                    <button onClick={() => removeProduct(pid)} className="ml-1 transition-colors hover:opacity-60">
                      <X size={12} strokeWidth={1.5} style={{ color: '#8a8a82' }} />
                    </button>
                  </div>
                )
              })}
              {selectedProductIds.length === 0 && (
                <p style={{ fontSize: 13, fontStyle: 'italic', color: '#b0b0a8' }}>
                  No products added yet.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT — Settings panel (40%) */}
        <div className="flex-[2] border-l p-8" style={{ borderColor: 'rgba(0,0,0,0.07)' }}>
          <div
            className="rounded-lg p-6 space-y-6"
            style={{ backgroundColor: '#ffffff', border: '1px solid rgba(0,0,0,0.07)' }}
          >
            {/* Status */}
            <div>
              <label className="block mb-3" style={{ fontSize: 11, fontWeight: 500, color: '#8a8a82', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Status
              </label>
              <div className="flex gap-4">
                {(['visible', 'hidden'] as const).map((s) => (
                  <label key={s} className="flex cursor-pointer items-center gap-2" style={{ fontSize: 13 }}>
                    <span
                      className="flex h-4 w-4 items-center justify-center rounded-full border"
                      style={{
                        borderColor: status === s ? '#c9a96e' : 'rgba(0,0,0,0.15)',
                        backgroundColor: status === s ? '#c9a96e' : 'transparent',
                      }}
                    >
                      {status === s && <span className="block h-1.5 w-1.5 rounded-full bg-white" />}
                    </span>
                    <input type="radio" className="hidden" checked={status === s} onChange={() => setStatus(s)} />
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </label>
                ))}
              </div>
            </div>

            {/* Storefront Display */}
            <div>
              <label className="block mb-3" style={{ fontSize: 11, fontWeight: 500, color: '#8a8a82', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Storefront Display
              </label>
              <div className="space-y-2.5">
                <label className="flex cursor-pointer items-center gap-2.5" style={{ fontSize: 13 }}>
                  <input
                    type="checkbox"
                    checked={featuredOnHomepage}
                    onChange={(e) => setFeaturedOnHomepage(e.target.checked)}
                    className="rounded accent-[#c9a96e]"
                  />
                  Feature on homepage
                </label>
                <label className="flex cursor-pointer items-center gap-2.5" style={{ fontSize: 13 }}>
                  <input
                    type="checkbox"
                    checked={showInNav}
                    onChange={(e) => setShowInNav(e.target.checked)}
                    className="rounded accent-[#c9a96e]"
                  />
                  Show in Collections nav dropdown
                </label>
              </div>
            </div>

            {/* SEO — collapsible */}
            <div>
              <button
                onClick={() => setSeoOpen(!seoOpen)}
                className="flex w-full items-center justify-between"
                style={{ fontSize: 11, fontWeight: 500, color: '#8a8a82', textTransform: 'uppercase', letterSpacing: '0.06em' }}
              >
                SEO
                <span style={{ fontSize: 14, color: '#b0b0a8' }}>{seoOpen ? '−' : '+'}</span>
              </button>
              {seoOpen && (
                <div className="mt-3 space-y-4">
                  <div>
                    <label className="block mb-1.5" style={{ fontSize: 11, color: '#8a8a82' }}>Meta Title</label>
                    <input
                      type="text"
                      value={metaTitle}
                      onChange={(e) => setMetaTitle(e.target.value)}
                      className="w-full rounded border px-3 py-2 outline-none transition-colors focus:border-[#c9a96e]"
                      style={{ fontSize: 12, borderColor: 'rgba(0,0,0,0.12)' }}
                    />
                  </div>
                  <div>
                    <label className="block mb-1.5" style={{ fontSize: 11, color: '#8a8a82' }}>Meta Description</label>
                    <textarea
                      value={metaDescription}
                      onChange={(e) => setMetaDescription(e.target.value)}
                      rows={2}
                      className="w-full resize-none rounded border px-3 py-2 outline-none transition-colors focus:border-[#c9a96e]"
                      style={{ fontSize: 12, lineHeight: 1.5, borderColor: 'rgba(0,0,0,0.12)' }}
                    />
                  </div>
                  <p style={{ fontSize: 11, color: '#b0b0a8', fontFamily: 'monospace' }}>
                    velvora.com/collections/{slug || '…'}
                  </p>
                </div>
              )}
            </div>

            {/* Save */}
            <button
              onClick={() => showToast('Collection saved')}
              className="w-full rounded py-2.5 text-[13px] text-white transition-opacity hover:opacity-85"
              style={{ backgroundColor: '#1a1a18' }}
            >
              Save Collection
            </button>

            {/* Delete */}
            {!isNew && (
              <div className="text-center">
                <button style={{ fontSize: 12, color: '#c0392b' }} className="transition-opacity hover:opacity-70">
                  Delete Collection
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

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
