"use client"

import  { useEffect, useRef, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei"
import { motion } from "framer-motion"
import StarField from "./StarField"
import CameraModel from "./CameraModel"
import ScrollIndicator from "./Scroll-indicator"

export default function Hero() {
  const starFieldRef = useRef<HTMLDivElement>(null)
  const [text, setText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false) // ✅ Corregido
  const [loopNum, setLoopNum] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState(150)
  const [isMobile, setIsMobile] = useState(false)

  const textArray = ["Bienvenidos a mi Portafolio", "Sofia Victoria Albornoz", "Estudiante de Fotografía"]

  // Detectar si el usuario está en móvil
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (starFieldRef.current) {
      const starField = new StarField(starFieldRef.current)
      starField.init()
      return () => starField.destroy()
    }
  }, [])

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % textArray.length
      const fullText = textArray[i]

      if (isDeleting) {
        setText(fullText.substring(0, text.length - 1))
      } else {
        setText(fullText.substring(0, text.length + 1))
      }

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000)
      } else if (isDeleting && text === "") {
        setIsDeleting(false)
        setLoopNum(loopNum + 1)
        setTypingSpeed(150)
      } else {
        setTypingSpeed(isDeleting ? 50 : 150)
      }
    }

    const timer = setTimeout(handleTyping, typingSpeed)
    return () => clearTimeout(timer)
  }, [text, isDeleting, loopNum, typingSpeed])

  return (
    <section className="relative h-screen bg-white overflow-hidden flex items-center justify-center w-full">
      <div ref={starFieldRef} className=" absolute inset-0" />

      {/* Contenedor principal, cambia de columna en móviles a fila en escritorio */}
      <div className="w-full md:mb-10 container  h-full flex flex-col md:flex-row items-center justify-center px-4 relative z-10 gap-6">
        
        {/* Texto arriba en móvil, izquierda en escritorio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className=" w-full md:mb-20 md:w-1/3 text-center md:text-left"
        >
          <h1 className="text-2xl  w-full md:text-5xl font-bold md:p-4 text-gray-800">
            {text}
            <span className="inline-block w-1 h-8 bg-blue-500 ml-1 animate-blink"></span>
          </h1>
        </motion.div>

        {/* Canvas abajo en móvil, derecha en escritorio */}
        <div className={`w-full ${isMobile ? "h-[300px]" : "md:w-2/3 h-[800px]"}`}>
          <Canvas shadows>
            <PerspectiveCamera makeDefault position={[3, 2, isMobile ? 0 : 5]} fov={isMobile ? 40 : 70} />
            <ambientLight intensity={0.7} />
            <pointLight position={[10, 10, 10]} intensity={1.5} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
            <spotLight
              position={[7, 5, 5]}
              angle={0.3}
              penumbra={1}
              intensity={2}
              castShadow
              shadow-mapSize-width={256}
              shadow-mapSize-height={256}
            />
            <CameraModel />
            <OrbitControls
              enableZoom={!isMobile} // 🔹 Deshabilitar zoom en móviles
              enablePan={false}
              maxPolarAngle={Math.PI / 1}
              minDistance={isMobile ? 7 : 4} // Ajuste para móviles
              maxDistance={isMobile ? 8 : 5.5} // Ajuste para móviles
            />
            <Environment preset="city" />
          </Canvas>
        </div>
      </div>
      {/* ScrollIndicator centrado en la parte inferior */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <ScrollIndicator />
      </div>

    </section>
  )
}
