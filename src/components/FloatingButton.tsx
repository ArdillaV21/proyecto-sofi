"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaCamera } from "react-icons/fa"

const FloatingButton = () => {
  const [isVisible, setIsVisible] = useState(false)
  const phoneNumber = "+5493815123456" // Replace with your actual WhatsApp number

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector("section") // Assuming the Hero is the first section
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom
        setIsVisible(heroBottom <= 0)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-8 right-8 z-50"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.5 }}
        >
          <a
            href={`https://wa.me/${phoneNumber}?text=Hola Sofia, me gustaría invitarte a un proyecto fotográfico.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-4 py-2 bg-[#87CEEB] text-white rounded-full shadow-lg hover:bg-[#5f9fb3] transition-colors duration-300"
          >
            <FaCamera className="mr-2" />
            <span className="font-semibold">Invítame a fotografiar</span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default FloatingButton

