"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const textRef = useRef<HTMLDivElement | null>(null)
  const statsRef = useRef<HTMLDivElement | null>(null)
  const imageRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const bgRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    const stats = statsRef.current
    const image = imageRef.current
    const bg = bgRef.current
  
    if (!section || !stats || !bg) return
  
    const ctx = gsap.context(() => {
      // Background color transition
      gsap.fromTo(
        bg,
        { backgroundColor: "rgba(255, 255, 255, 1)" },
        {
          backgroundColor: "rgba(135, 206, 235, 0.1)",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "center center",
            scrub: true,
          },
        }
      )
  
      // Main section animation
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
        // Ya no incluimos onLeave
      })
  
      // Parallax effect for the image
      if (image) {
        gsap.to(image, {
          yPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        })
      }
  
      // Stats animation
      gsap.from(stats.children, {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: stats,
          start: "top 80%",
        },
      })
    })
  
    return () => {
      ctx.clear()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden py-20">
      {/* Background with transition */}
      <div ref={bgRef} className="absolute inset-0 z-0" />

      {/* Decorative elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-[rgba(135,206,235,0.2)] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[rgba(135,206,235,0.15)] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <h2 ref={titleRef} className="text-5xl md:text-7xl font-bold text-center mb-20">
          <span className="text-[rgba(135,206,235,1)]">Sobre</span> mí
        </h2>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div ref={imageRef} className="relative rounded-2xl overflow-hidden md:aspect-[3/4] md:h-[500px] max-w-md mx-auto ">
              <img
                src="/Sofiaabout.jpeg"
                alt="Photographer profile"
                className="w-full h-full object-cover object-top select-none"
              />
              <div className="absolute inset-0 bg-[rgba(135,206,235,0.1)] " />
            </div>
          </div>

          <div className="space-y-8">
            <div ref={textRef} className="space-y-6">
              <p className=" text-xl text-gray-800 leading-relaxed">
                Hola, soy Sofia. Mi pasión por la
                fotografía comenzó cuando era niña y recibí mi primera cámara como regalo de cumpleaños.
              </p>
              <p className="text-xl text-gray-800 leading-relaxed">
                Desde entonces, he dedicado mi vida a capturar momentos especiales y contar historias a través de mis
                imágenes. Me especializo en fotografía de retratos, bodas y paisajes, siempre buscando la belleza en lo
                cotidiano y lo extraordinario.
              </p>
            </div>
          </div>
        </div>

        <div ref={statsRef} className="">

        </div>
      </div>
    </section>
  )
}

