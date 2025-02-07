import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface TypewriterEffectProps {
  text: string
}

export default function TypewriterEffect({ text }: TypewriterEffectProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (!isDeleting && displayedText !== text) {
      timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1))
      }, 100)
    } else if (isDeleting && displayedText !== "") {
      timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length - 1))
      }, 50)
    } else if (displayedText === text) {
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (displayedText === "") {
      timeout = setTimeout(() => setIsDeleting(false), 1000)
    }

    return () => clearTimeout(timeout)
  }, [displayedText, isDeleting, text])

  return (
    <AnimatePresence>
      <motion.span key={displayedText} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        {displayedText}
      </motion.span>
    </AnimatePresence>
  )
}

