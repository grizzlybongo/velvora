import type { Metadata } from 'next'
import './admin.css'
import Sidebar from '@/components/admin/Sidebar'

export const metadata: Metadata = {
  title: 'Velvora Admin',
  description: 'Velvora internal administration dashboard',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="admin-body flex min-h-screen">
      <Sidebar />
      <div className="ml-60 flex flex-1 flex-col">
        {children}
      </div>
    </div>
  )
}
