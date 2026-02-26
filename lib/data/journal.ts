export type JournalEntry = {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  image: string
  readTime: string
}

export const journalEntries: JournalEntry[] = [
  {
    id: 'the-art-of-layering',
    slug: 'the-art-of-layering',
    title: 'The Art of Layering',
    excerpt:
      'How to combine two fragrances into something entirely your own — a guide to scent architecture that transforms the everyday into the extraordinary.',
    category: 'TECHNIQUE',
    date: '2026-02-10',
    image: '/images/editorial/layering.jpg',
    readTime: '5 min read',
  },
  {
    id: 'grasse-at-dawn',
    slug: 'grasse-at-dawn',
    title: 'Grasse at Dawn',
    excerpt:
      'Inside the jasmine fields of southern France, where Velvora sources its most precious absolutes — a journey through mist, earth, and petal.',
    category: 'ORIGINS',
    date: '2026-01-28',
    image: '/images/editorial/grasse.jpg',
    readTime: '7 min read',
  },
  {
    id: 'scent-and-memory',
    slug: 'scent-and-memory',
    title: 'Scent & Memory',
    excerpt:
      'The neuroscience behind why a single note can transport you twenty years into the past — and how perfumers harness this invisible power.',
    category: 'SCIENCE',
    date: '2026-01-15',
    image: '/images/editorial/memory.jpg',
    readTime: '4 min read',
  },
]
