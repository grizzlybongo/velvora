/* ─── Admin Mock Data ─── */

export type OrderStatus = 'paid' | 'pending' | 'cancelled' | 'refunded'
export type OrderType = 'Online' | 'In-Store' | 'Wholesale'

export interface Order {
  id: string
  customer: string
  email: string
  type: OrderType
  product: string
  productImage: string | null
  status: OrderStatus
  date: string
  total: number
  items: OrderItem[]
  address: string
  city: string
  country: string
}

export interface OrderItem {
  name: string
  quantity: number
  price: number
  image: string | null
}

export const orders: Order[] = [
  {
    id: 'ORD-1042',
    customer: 'Léa Marchand',
    email: 'lea.marchand@mail.com',
    type: 'Online',
    product: 'Noir Absolu',
    productImage: '/images/products/noir-absolu.jpg',
    status: 'paid',
    date: '2026-02-24',
    total: 285,
    items: [
      { name: 'Noir Absolu', quantity: 1, price: 285, image: '/images/products/noir-absolu.jpg' },
    ],
    address: '14 Rue de Rivoli',
    city: 'Paris',
    country: 'France',
  },
  {
    id: 'ORD-1041',
    customer: 'Ahmed Ben Salah',
    email: 'ahmed.bs@mail.com',
    type: 'Online',
    product: 'Ambre Sauvage',
    productImage: '/images/products/ambre-sauvage.jpg',
    status: 'paid',
    date: '2026-02-23',
    total: 510,
    items: [
      { name: 'Ambre Sauvage', quantity: 1, price: 255, image: '/images/products/ambre-sauvage.jpg' },
      { name: 'Ambre Sauvage', quantity: 1, price: 255, image: '/images/products/ambre-sauvage.jpg' },
    ],
    address: '8 Avenue Habib Bourguiba',
    city: 'Tunis',
    country: 'Tunisia',
  },
  {
    id: 'ORD-1040',
    customer: 'Elena Rossi',
    email: 'elena.rossi@mail.com',
    type: 'In-Store',
    product: 'Sol Invictus',
    productImage: '/images/products/sol-invictus.jpg',
    status: 'pending',
    date: '2026-02-23',
    total: 265,
    items: [
      { name: 'Sol Invictus', quantity: 1, price: 265, image: '/images/products/sol-invictus.jpg' },
    ],
    address: 'Via Roma 22',
    city: 'Milan',
    country: 'Italy',
  },
  {
    id: 'ORD-1039',
    customer: 'James Whitfield',
    email: 'j.whitfield@mail.com',
    type: 'Online',
    product: 'Jardin Nocturne',
    productImage: '/images/products/jardin-nocturne.jpg',
    status: 'paid',
    date: '2026-02-22',
    total: 245,
    items: [
      { name: 'Jardin Nocturne', quantity: 1, price: 245, image: '/images/products/jardin-nocturne.jpg' },
    ],
    address: '47 King Street',
    city: 'London',
    country: 'UK',
  },
  {
    id: 'ORD-1038',
    customer: 'Sophie Laurent',
    email: 'sophie.l@mail.com',
    type: 'Wholesale',
    product: 'Fleur de Feu',
    productImage: '/images/products/fleur-de-feu.jpg',
    status: 'paid',
    date: '2026-02-21',
    total: 1375,
    items: [
      { name: 'Fleur de Feu', quantity: 5, price: 275, image: '/images/products/fleur-de-feu.jpg' },
    ],
    address: '3 Place Vendôme',
    city: 'Paris',
    country: 'France',
  },
  {
    id: 'ORD-1037',
    customer: 'Karim Hamdi',
    email: 'karim.h@mail.com',
    type: 'Online',
    product: 'Eau de Silence',
    productImage: '/images/products/eau-de-silence.jpg',
    status: 'cancelled',
    date: '2026-02-20',
    total: 295,
    items: [
      { name: 'Eau de Silence', quantity: 1, price: 295, image: '/images/products/eau-de-silence.jpg' },
    ],
    address: '12 Rue de la Liberté',
    city: 'Tunis',
    country: 'Tunisia',
  },
  {
    id: 'ORD-1036',
    customer: 'Maria Fernandez',
    email: 'maria.f@mail.com',
    type: 'Online',
    product: 'Noir Absolu',
    productImage: '/images/products/noir-absolu.jpg',
    status: 'paid',
    date: '2026-02-19',
    total: 570,
    items: [
      { name: 'Noir Absolu', quantity: 2, price: 285, image: '/images/products/noir-absolu.jpg' },
    ],
    address: 'Calle de Serrano 15',
    city: 'Madrid',
    country: 'Spain',
  },
  {
    id: 'ORD-1035',
    customer: 'Yuki Tanaka',
    email: 'yuki.t@mail.com',
    type: 'Online',
    product: 'Vanille Obscure',
    productImage: null,
    status: 'refunded',
    date: '2026-02-18',
    total: 270,
    items: [
      { name: 'Vanille Obscure', quantity: 1, price: 270, image: null },
    ],
    address: '2-4 Ginza',
    city: 'Tokyo',
    country: 'Japan',
  },
  {
    id: 'ORD-1034',
    customer: 'Clara Johansson',
    email: 'clara.j@mail.com',
    type: 'In-Store',
    product: 'Peau Nue',
    productImage: null,
    status: 'pending',
    date: '2026-02-17',
    total: 250,
    items: [
      { name: 'Peau Nue', quantity: 1, price: 250, image: null },
    ],
    address: 'Storgatan 8',
    city: 'Stockholm',
    country: 'Sweden',
  },
  {
    id: 'ORD-1033',
    customer: 'Omar Khalil',
    email: 'omar.k@mail.com',
    type: 'Online',
    product: 'Café Sacré',
    productImage: null,
    status: 'paid',
    date: '2026-02-16',
    total: 490,
    items: [
      { name: 'Café Sacré', quantity: 2, price: 245, image: null },
    ],
    address: '56 Corniche Road',
    city: 'Casablanca',
    country: 'Morocco',
  },
]

/* ─── KPI Stats ─── */
export interface KpiStat {
  label: string
  value: string
  delta: number // percentage change vs last month
}

export const kpiStats: KpiStat[] = [
  { label: 'Total Revenue', value: '$14,280', delta: 12.4 },
  { label: 'Orders This Month', value: '42', delta: 8.1 },
  { label: 'Active Products', value: '20', delta: 0 },
  { label: 'Blog Posts', value: '3', delta: -25.0 },
]

/* ─── Order Status Breakdown ─── */
export const orderStatusBreakdown = [
  { status: 'Paid', count: 28, color: '#4a7c59' },
  { status: 'Pending', count: 8, color: '#c9a96e' },
  { status: 'Cancelled', count: 4, color: '#c0392b' },
  { status: 'Refunded', count: 2, color: '#8a8a82' },
]

/* ─── Quick Stats ─── */
export const quickStats = [
  { label: 'Avg. Order Value', value: '$340' },
  { label: 'Processing Time', value: '1.2 days' },
  { label: 'Reject Rate', value: '4.8%' },
]

/* ─── Blog Posts ─── */
export type BlogStatus = 'published' | 'draft'

export interface BlogPost {
  id: string
  title: string
  category: string
  status: BlogStatus
  date: string
  author: string
}

export const blogPosts: BlogPost[] = [
  {
    id: 'post-1',
    title: 'The Art of Layering',
    category: 'Technique',
    status: 'published',
    date: '2026-02-10',
    author: 'Velvora Editorial',
  },
  {
    id: 'post-2',
    title: 'Grasse at Dawn',
    category: 'Origins',
    status: 'published',
    date: '2026-01-28',
    author: 'Velvora Editorial',
  },
  {
    id: 'post-3',
    title: 'Scent & Memory',
    category: 'Science',
    status: 'published',
    date: '2026-01-15',
    author: 'Velvora Editorial',
  },
  {
    id: 'post-4',
    title: 'Packaging as Ritual',
    category: 'Design',
    status: 'draft',
    date: '2026-02-20',
    author: 'Velvora Editorial',
  },
  {
    id: 'post-5',
    title: 'Winter Scent Guide',
    category: 'Guides',
    status: 'draft',
    date: '2026-02-18',
    author: 'Velvora Editorial',
  },
]

/* ─── Admin Products (view for admin table) ─── */
export type ProductStatus = 'active' | 'draft'

export interface AdminProduct {
  id: string
  name: string
  category: string
  status: ProductStatus
  stock: number
  price: number
  image: string | null
}

export const adminProducts: AdminProduct[] = [
  { id: 'noir-absolu', name: 'Noir Absolu', category: 'Woody Oriental', status: 'active', stock: 45, price: 285, image: '/images/products/noir-absolu.jpg' },
  { id: 'bois-sacre', name: 'Bois Sacré', category: 'Woody Oriental', status: 'active', stock: 32, price: 295, image: null },
  { id: 'oud-eternel', name: 'Oud Éternel', category: 'Woody Oriental', status: 'active', stock: 18, price: 320, image: null },
  { id: 'fumee-noire', name: 'Fumée Noire', category: 'Woody Oriental', status: 'draft', stock: 0, price: 275, image: null },
  { id: 'jardin-nocturne', name: 'Jardin Nocturne', category: 'Floral', status: 'active', stock: 54, price: 245, image: '/images/products/jardin-nocturne.jpg' },
  { id: 'fleur-de-feu', name: 'Fleur de Feu', category: 'Floral', status: 'active', stock: 28, price: 275, image: '/images/products/fleur-de-feu.jpg' },
  { id: 'iris-fantome', name: 'Iris Fantôme', category: 'Floral', status: 'active', stock: 41, price: 260, image: null },
  { id: 'magnolia-cruda', name: 'Magnolia Cruda', category: 'Floral', status: 'draft', stock: 0, price: 235, image: null },
  { id: 'sol-invictus', name: 'Sol Invictus', category: 'Citrus & Aquatic', status: 'active', stock: 37, price: 265, image: '/images/products/sol-invictus.jpg' },
  { id: 'eau-saline', name: 'Eau Saline', category: 'Citrus & Aquatic', status: 'active', stock: 22, price: 240, image: null },
  { id: 'cedre-blanc', name: 'Cèdre Blanc', category: 'Citrus & Aquatic', status: 'active', stock: 50, price: 225, image: null },
  { id: 'neroli-viva', name: 'Neroli Viva', category: 'Citrus & Aquatic', status: 'active', stock: 30, price: 250, image: null },
  { id: 'ambre-sauvage', name: 'Ambre Sauvage', category: 'Amber & Gourmand', status: 'active', stock: 25, price: 255, image: '/images/products/ambre-sauvage.jpg' },
  { id: 'vanille-obscure', name: 'Vanille Obscure', category: 'Amber & Gourmand', status: 'active', stock: 19, price: 270, image: null },
  { id: 'cafe-sacre', name: 'Café Sacré', category: 'Amber & Gourmand', status: 'active', stock: 33, price: 245, image: null },
  { id: 'miel-de-nuit', name: 'Miel de Nuit', category: 'Amber & Gourmand', status: 'draft', stock: 0, price: 260, image: null },
  { id: 'eau-de-silence', name: 'Eau de Silence', category: 'Powdery & Musky', status: 'active', stock: 15, price: 295, image: '/images/products/eau-de-silence.jpg' },
  { id: 'peau-nue', name: 'Peau Nue', category: 'Powdery & Musky', status: 'active', stock: 27, price: 250, image: null },
  { id: 'soie-blanche', name: 'Soie Blanche', category: 'Powdery & Musky', status: 'active', stock: 40, price: 230, image: null },
  { id: 'talc-absolu', name: 'Talc Absolu', category: 'Powdery & Musky', status: 'draft', stock: 0, price: 240, image: null },
]

/* ─── Collections ─── */
export type CollectionStatus = 'visible' | 'hidden'

export interface Collection {
  id: string
  name: string
  slug: string
  description: string
  coverImage: string | null
  productIds: string[]
  status: CollectionStatus
  featuredOnHomepage: boolean
  updatedAt: string
}

export const collections: Collection[] = [
  {
    id: 'noir-collection',
    name: 'The Noir Collection',
    slug: 'noir-collection',
    description: 'Deep, mysterious, and unapologetically bold.',
    coverImage: null,
    productIds: ['noir-absolu', 'bois-sacre', 'oud-eternel', 'fumee-noire'],
    status: 'visible',
    featuredOnHomepage: true,
    updatedAt: '2026-02-20',
  },
  {
    id: 'signature-series',
    name: 'The Signature Series',
    slug: 'signature-series',
    description: 'Soft, intimate, and unmistakably yours.',
    coverImage: null,
    productIds: ['eau-de-silence', 'peau-nue', 'soie-blanche', 'talc-absolu'],
    status: 'visible',
    featuredOnHomepage: true,
    updatedAt: '2026-02-18',
  },
  {
    id: 'essence-line',
    name: 'The Essence Line',
    slug: 'essence-line',
    description: 'Light, effortless, and alive with clarity.',
    coverImage: null,
    productIds: ['sol-invictus', 'eau-saline', 'cedre-blanc', 'neroli-viva'],
    status: 'visible',
    featuredOnHomepage: false,
    updatedAt: '2026-02-15',
  },
  {
    id: 'valentines-edit',
    name: "Valentine's Edit",
    slug: 'valentines-edit',
    description: 'Curated pairings for intimate gestures.',
    coverImage: null,
    productIds: ['fleur-de-feu', 'ambre-sauvage', 'vanille-obscure'],
    status: 'hidden',
    featuredOnHomepage: false,
    updatedAt: '2026-01-28',
  },
]

/* ─── Customers (derived from orders) ─── */
export interface Customer {
  id: string
  name: string
  email: string
  orderCount: number
  totalSpent: number
  lastOrderDate: string
  location: string
  memberSince: string
}

export const customers: Customer[] = [
  { id: 'cust-001', name: 'Léa Marchand', email: 'lea.marchand@mail.com', orderCount: 4, totalSpent: 1240, lastOrderDate: '2026-02-24', location: 'Paris, FR', memberSince: '2024-11-03' },
  { id: 'cust-002', name: 'Ahmed Ben Salah', email: 'ahmed.bs@mail.com', orderCount: 3, totalSpent: 980, lastOrderDate: '2026-02-23', location: 'Tunis, TN', memberSince: '2025-03-18' },
  { id: 'cust-003', name: 'Elena Rossi', email: 'elena.rossi@mail.com', orderCount: 2, totalSpent: 530, lastOrderDate: '2026-02-23', location: 'Milan, IT', memberSince: '2025-06-12' },
  { id: 'cust-004', name: 'James Whitfield', email: 'j.whitfield@mail.com', orderCount: 1, totalSpent: 245, lastOrderDate: '2026-02-22', location: 'London, UK', memberSince: '2026-02-22' },
  { id: 'cust-005', name: 'Sophie Laurent', email: 'sophie.l@mail.com', orderCount: 6, totalSpent: 3420, lastOrderDate: '2026-02-21', location: 'Paris, FR', memberSince: '2024-08-05' },
  { id: 'cust-006', name: 'Karim Hamdi', email: 'karim.h@mail.com', orderCount: 2, totalSpent: 590, lastOrderDate: '2026-02-20', location: 'Tunis, TN', memberSince: '2025-09-14' },
  { id: 'cust-007', name: 'Maria Fernandez', email: 'maria.f@mail.com', orderCount: 3, totalSpent: 855, lastOrderDate: '2026-02-19', location: 'Madrid, ES', memberSince: '2025-04-22' },
  { id: 'cust-008', name: 'Yuki Tanaka', email: 'yuki.t@mail.com', orderCount: 1, totalSpent: 270, lastOrderDate: '2026-02-18', location: 'Tokyo, JP', memberSince: '2026-02-18' },
  { id: 'cust-009', name: 'Clara Johansson', email: 'clara.j@mail.com', orderCount: 2, totalSpent: 500, lastOrderDate: '2026-02-17', location: 'Stockholm, SE', memberSince: '2025-12-01' },
  { id: 'cust-010', name: 'Omar Khalil', email: 'omar.k@mail.com', orderCount: 5, totalSpent: 1650, lastOrderDate: '2026-02-16', location: 'Casablanca, MA', memberSince: '2024-10-10' },
]

/* ─── Inventory ─── */
export interface InventoryItem {
  productId: string
  name: string
  sku: string
  category: string
  stock: number
  threshold: number
  image: string | null
  lastUpdated: string
}

export const inventoryItems: InventoryItem[] = [
  { productId: 'noir-absolu', name: 'Noir Absolu', sku: 'VLV-001-100', category: 'Woody Oriental', stock: 12, threshold: 5, image: '/images/products/noir-absolu.jpg', lastUpdated: '2026-02-22' },
  { productId: 'bois-sacre', name: 'Bois Sacré', sku: 'VLV-002-100', category: 'Woody Oriental', stock: 32, threshold: 10, image: null, lastUpdated: '2026-02-20' },
  { productId: 'oud-eternel', name: 'Oud Éternel', sku: 'VLV-003-100', category: 'Woody Oriental', stock: 18, threshold: 8, image: null, lastUpdated: '2026-02-19' },
  { productId: 'fumee-noire', name: 'Fumée Noire', sku: 'VLV-004-100', category: 'Woody Oriental', stock: 0, threshold: 5, image: null, lastUpdated: '2026-02-18' },
  { productId: 'jardin-nocturne', name: 'Jardin Nocturne', sku: 'VLV-005-100', category: 'Floral', stock: 54, threshold: 10, image: '/images/products/jardin-nocturne.jpg', lastUpdated: '2026-02-22' },
  { productId: 'fleur-de-feu', name: 'Fleur de Feu', sku: 'VLV-006-100', category: 'Floral', stock: 3, threshold: 5, image: '/images/products/fleur-de-feu.jpg', lastUpdated: '2026-02-21' },
  { productId: 'iris-fantome', name: 'Iris Fantôme', sku: 'VLV-007-100', category: 'Floral', stock: 41, threshold: 10, image: null, lastUpdated: '2026-02-20' },
  { productId: 'magnolia-cruda', name: 'Magnolia Cruda', sku: 'VLV-008-100', category: 'Floral', stock: 0, threshold: 5, image: null, lastUpdated: '2026-02-17' },
  { productId: 'sol-invictus', name: 'Sol Invictus', sku: 'VLV-009-100', category: 'Citrus & Aquatic', stock: 37, threshold: 8, image: '/images/products/sol-invictus.jpg', lastUpdated: '2026-02-22' },
  { productId: 'eau-saline', name: 'Eau Saline', sku: 'VLV-010-100', category: 'Citrus & Aquatic', stock: 4, threshold: 5, image: null, lastUpdated: '2026-02-19' },
  { productId: 'cedre-blanc', name: 'Cèdre Blanc', sku: 'VLV-011-100', category: 'Citrus & Aquatic', stock: 50, threshold: 10, image: null, lastUpdated: '2026-02-18' },
  { productId: 'neroli-viva', name: 'Neroli Viva', sku: 'VLV-012-100', category: 'Citrus & Aquatic', stock: 30, threshold: 8, image: null, lastUpdated: '2026-02-17' },
  { productId: 'ambre-sauvage', name: 'Ambre Sauvage', sku: 'VLV-013-100', category: 'Amber & Gourmand', stock: 25, threshold: 8, image: '/images/products/ambre-sauvage.jpg', lastUpdated: '2026-02-22' },
  { productId: 'vanille-obscure', name: 'Vanille Obscure', sku: 'VLV-014-100', category: 'Amber & Gourmand', stock: 2, threshold: 5, image: null, lastUpdated: '2026-02-20' },
  { productId: 'cafe-sacre', name: 'Café Sacré', sku: 'VLV-015-100', category: 'Amber & Gourmand', stock: 33, threshold: 10, image: null, lastUpdated: '2026-02-19' },
  { productId: 'miel-de-nuit', name: 'Miel de Nuit', sku: 'VLV-016-100', category: 'Amber & Gourmand', stock: 0, threshold: 5, image: null, lastUpdated: '2026-02-16' },
  { productId: 'eau-de-silence', name: 'Eau de Silence', sku: 'VLV-017-100', category: 'Powdery & Musky', stock: 15, threshold: 5, image: '/images/products/eau-de-silence.jpg', lastUpdated: '2026-02-22' },
  { productId: 'peau-nue', name: 'Peau Nue', sku: 'VLV-018-100', category: 'Powdery & Musky', stock: 27, threshold: 8, image: null, lastUpdated: '2026-02-21' },
  { productId: 'soie-blanche', name: 'Soie Blanche', sku: 'VLV-019-100', category: 'Powdery & Musky', stock: 40, threshold: 10, image: null, lastUpdated: '2026-02-18' },
  { productId: 'talc-absolu', name: 'Talc Absolu', sku: 'VLV-020-100', category: 'Powdery & Musky', stock: 0, threshold: 5, image: null, lastUpdated: '2026-02-15' },
]
