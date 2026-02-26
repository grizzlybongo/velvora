import MarqueeText from '@/components/ui/MarqueeText'

export default function Marquee() {
  return (
    <section className="bg-ink py-5">
      <MarqueeText
        text="NICHE PERFUMERY"
        repeat={8}
        className="font-body text-[11px] font-light tracking-label text-surface/80 uppercase"
      />
    </section>
  )
}
