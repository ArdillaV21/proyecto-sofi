"use client"

import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import { X } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

interface Photo {
  id: number
  src: string
  alt: string
  category: string
}

const categoryDescriptions: Record<string, string> = {
  Todos:
    "Explora mi colección completa de fotografías, desde retratos íntimos hasta paisajes impresionantes. Cada imagen cuenta una historia única y especial.",
  Postales:
    "Capturo la esencia y personalidad de cada persona. Me especializo en crear un ambiente cómodo donde las emociones naturales florezcan frente a la cámara.",
  "Blanco y Negro":
    "Documento los momentos más especiales de tu día. Desde las miradas cómplices hasta las celebraciones más emotivas, cada detalle quedará inmortalizado.",
  Randoms:
    "La naturaleza nos regala escenas maravillosas. A través de mi lente, busco transmitir la paz y la grandeza de los paisajes que nos rodean.",
}

const photos: Photo[] = [
  { id: 1, src: "/foto1.jpeg?height=400&width=600", alt: "Fotografía 1", category: "Postales" },
  { id: 2, src: "/foto2.jpeg?height=400&width=600", alt: "Fotografía 1", category: "Postales" },
  { id: 3, src: "/foto3.jpeg?height=400&width=600", alt: "Fotografía 1", category: "Postales" },
  { id: 4, src: "/foto4.jpeg?height=600&width=800", alt: "Fotografía 2", category: "Blanco y Negro" },
  { id: 5, src: "/foto5.jpeg?height=600&width=800", alt: "Fotografía 2", category: "Blanco y Negro" },
  { id: 6, src: "/foto6.jpeg?height=600&width=800", alt: "Fotografía 2", category: "Blanco y Negro" },
  { id: 7, src: "/foto7.jpeg?height=600&width=800", alt: "Fotografía 2", category: "Blanco y Negro" },
  { id: 8, src: "/foto8.jpeg?height=600&width=800", alt: "Fotografía 2", category: "Blanco y Negro" },
  { id: 9, src: "/foto9.jpeg?height=600&width=800", alt: "Fotografía 2", category: "Blanco y Negro" },
  { id: 10, src: "/foto10.jpeg?height=600&width=800", alt: "Fotografía 2", category: "Blanco y Negro" },
  { id: 11, src: "/foto11.jpeg?height=600&width=800", alt: "Fotografía 3", category: "Randoms" },
  { id: 12, src: "/foto12.jpeg?height=600&width=800", alt: "Fotografía 3", category: "Randoms" },
  { id: 13, src: "/foto13.jpeg?height=600&width=800", alt: "Fotografía 3", category: "Randoms" },
  { id: 14, src: "/foto14.jpeg?height=600&width=800", alt: "Fotografía 3", category: "Randoms" },
  { id: 15, src: "/foto15.jpeg?height=600&width=800", alt: "Fotografía 3", category: "Randoms" },
]

const categories = ["Todos", "Postales", "Blanco y Negro", "Randoms"]

export function PhotoGallery() {
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [mounted, setMounted] = useState(false)

  const sectionRef = useRef<HTMLElement | null>(null)
  const bgRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    const bg = bgRef.current

    if (!section || !bg) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        bg,
        { backgroundColor: "rgba(135,206,235,0.1)" },
        {
          backgroundColor: "rgba(135,206,235,0.1)",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "center center",
            scrub: true,
          },
        },
      )

      gsap.set(section.children, { opacity: 0, y: 50 })

      ScrollTrigger.batch(section.children, {
        onEnter: (elements) => {
          gsap.to(elements, {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            overwrite: true,
          })
        },
        start: "top 80%",
      })
    })

    return () => {
      ctx.clear()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const filteredPhotos =
    selectedCategory === "Todos" ? photos : photos.filter((photo) => photo.category === selectedCategory)

  if (!mounted) return null

  return (
    <section ref={sectionRef} className="w-full py-12 bg-[rgba(135,206,235,0.1)]">
      <div ref={bgRef} className="container px-4 mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8">
          <span className="text-[#87CEEB]">Mi </span>
          <span className="text-gray-900">Galería</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedCategory === category
                  ? "bg-[#87CEEB] text-white border-white"
                  : "bg-white text-gray-600 border-white hover:bg-gray-100"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center max-w-2xl mx-auto mb-8 text-gray-600"
          >
            <p>{categoryDescriptions[selectedCategory]}</p>
          </motion.div>
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {filteredPhotos.map((photo) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative aspect-[4/3] overflow-hidden rounded-lg cursor-zoom-in group"
                onClick={() => setSelectedPhoto(photo)}
              >
                <img
                  src={photo.src || "/placeholder.svg"}
                  alt={photo.alt}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-lg font-medium">Ver foto</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/80"
              onClick={() => setSelectedPhoto(null)}
              style={{ minHeight: "100vh", minWidth: "100vw" }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 15 }}
                className="relative w-full h-full flex items-center justify-center p-4"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute md:mr-5 top-4 right-4 z-50 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                >
                  <X className="h-8 w-8  text-white" />
                </button>
                <div className="relative max-w-7xl w-full h-full flex flex-col items-center justify-center">
                  <img
                    src={selectedPhoto.src || "/placeholder.svg"}
                    alt={selectedPhoto.alt}
                    className="max-w-full max-h-[90vh] object-contain rounded-lg"
                  />
                  <div className="absolute bottom-6 left-0   to-transparent text-white">
                    <h3 className="text-2xl font-semibold">{selectedPhoto.alt}</h3>
                    <p className="text-lg opacity-90 mt-2">{selectedPhoto.category}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}