'use client'

import TopBar from '@/components/admin/TopBar'
import StatusBadge from '@/components/admin/StatusBadge'
import { blogPosts } from '@/lib/data/admin'

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function BlogPage() {
  return (
    <>
      <TopBar title="Blog">
        <button
          className="rounded px-4 py-2 text-[13px] text-white transition-opacity hover:opacity-85"
          style={{ backgroundColor: '#1a1a18' }}
        >
          + New Post
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
                {['Title', 'Category', 'Published', 'Status', ''].map((h) => (
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
              {blogPosts.map((post) => (
                <tr
                  key={post.id}
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
                    <span style={{ fontSize: 13, fontWeight: 500 }}>
                      {post.title}
                    </span>
                  </td>
                  <td
                    className="px-5 py-3"
                    style={{ fontSize: 13, color: '#8a8a82' }}
                  >
                    {post.category}
                  </td>
                  <td
                    className="px-5 py-3"
                    style={{ fontSize: 13, color: '#8a8a82' }}
                  >
                    {post.date ? formatDate(post.date) : '—'}
                  </td>
                  <td className="px-5 py-3">
                    <StatusBadge status={post.status} />
                  </td>
                  <td
                    className="px-5 py-3"
                    style={{ fontSize: 13, color: '#8a8a82' }}
                  >
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
