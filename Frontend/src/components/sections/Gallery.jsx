import { useState } from 'react'

const images = [
  {
    src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80',
    title: 'Main Gym Floor',
    category: 'facility',
    span: 'lg:col-span-2 lg:row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&q=80',
    title: 'Strength Zone',
    category: 'equipment',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80',
    title: 'Personal Training',
    category: 'training',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=400&q=80',
    title: 'Cardio Section',
    category: 'equipment',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1549476464-37392f717541?w=400&q=80',
    title: 'Free Weights Area',
    category: 'equipment',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80',
    title: 'Group Training',
    category: 'training',
    span: 'lg:col-span-2',
  },
]

const categories = ['all', 'facility', 'equipment', 'training']

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [lightbox, setLightbox] = useState(null)

  const filtered = activeCategory === 'all'
    ? images
    : images.filter(img => img.category === activeCategory)

  return (
    <section id="gallery" className="section-padding bg-[#0a0a0a] relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-orange-500/5 blur-[100px]"/>

      <div className="container-custom relative z-10">

        {/* SECTION HEADER */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-orange-500"/>
            <span className="text-xs tracking-[4px] uppercase text-orange-500 font-medium">
              Gallery
            </span>
            <div className="w-8 h-0.5 bg-orange-500"/>
          </div>
          <h2 className="font-bebas text-5xl lg:text-6xl tracking-wider text-white leading-none">
            INSIDE <span className="text-gradient">MUSCLE VAULT</span>
          </h2>
          <p className="text-gray-500 text-sm mt-4 max-w-xl mx-auto leading-relaxed">
            World-class facility jo tumhari fitness journey ko
            next level pe le jaaye.
          </p>
        </div>

        {/* FILTER TABS */}
        <div className="flex items-center justify-center gap-3 mb-10 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                px-5 py-2 rounded text-xs tracking-widest uppercase
                font-medium transition-all duration-300
                ${activeCategory === cat
                  ? 'bg-orange-500 text-white'
                  : 'border border-white/10 text-gray-500 hover:border-orange-500/50 hover:text-orange-500'
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px]">
          {filtered.map((image, index) => (
            <div
              key={index}
              onClick={() => setLightbox(image)}
              className={`
                relative overflow-hidden rounded-lg
                cursor-pointer group
                border border-white/5
                hover:border-orange-500/30
                transition-all duration-300
                ${image.span}
              `}
            >
              {/* Image */}
              <img
                src={image.src}
                alt={image.title}
                className="
                  w-full h-full object-cover
                  opacity-70 group-hover:opacity-90
                  group-hover:scale-105
                  transition-all duration-500
                "
              />

              {/* Overlay */}
              <div className="
                absolute inset-0
                bg-gradient-to-t from-black/80 via-transparent to-transparent
                opacity-0 group-hover:opacity-100
                transition-opacity duration-300
              "/>

              {/* Title */}
              <div className="
                absolute bottom-0 left-0 right-0
                p-4 translate-y-full group-hover:translate-y-0
                transition-transform duration-300
              ">
                <h4 className="font-bebas text-lg tracking-wider text-white">
                  {image.title}
                </h4>
                <span className="text-orange-500 text-xs tracking-widest uppercase">
                  {image.category}
                </span>
              </div>

              {/* Zoom icon */}
              <div className="
                absolute top-1/2 left-1/2
                -translate-x-1/2 -translate-y-1/2
                w-10 h-10 rounded-full
                bg-orange-500/80
                flex items-center justify-center
                opacity-0 group-hover:opacity-100
                scale-75 group-hover:scale-100
                transition-all duration-300
              ">
                <svg width="16" height="16" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  <line x1="11" y1="8" x2="11" y2="14"/>
                  <line x1="8" y1="11" x2="14" y2="11"/>
                </svg>
              </div>

            </div>
          ))}
        </div>

        {/* INSTAGRAM CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm mb-4">
            Aur photos dekhne ke liye hamare Instagram follow karo
          </p>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-3
              px-8 py-3.5
              border border-white/10
              hover:border-orange-500 hover:text-orange-500
              text-gray-400
              text-xs tracking-widest uppercase font-medium
              rounded transition-all duration-300
            "
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            @musclevault
          </a>
        </div>

      </div>

      {/* LIGHTBOX */}
      {lightbox && (
        <div
          className="
            fixed inset-0 z-50
            bg-black/90 backdrop-blur-sm
            flex items-center justify-center
            p-4
          "
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-4xl w-full rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.src}
              alt={lightbox.title}
              className="w-full h-auto max-h-[80vh] object-contain"
            />

            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4">
              <h4 className="font-bebas text-xl tracking-wider text-white">
                {lightbox.title}
              </h4>
            </div>

            {/* Close button */}
            <button
              onClick={() => setLightbox(null)}
              className="
                absolute top-4 right-4
                w-10 h-10 rounded-full
                bg-black/60 hover:bg-orange-500
                flex items-center justify-center
                transition-all duration-300
              "
            >
              <svg width="16" height="16" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>
      )}

    </section>
  )
}

export default Gallery