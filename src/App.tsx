import Hero from "./components/Hero"
import AboutSection from "./components/About"
import { PhotoGallery } from "./components/Gallery"
import Footer from "./components/Footer"
import FloatingButton from "./components/FloatingButton"

export default function Home() {
  return (
    <main className="min-h-screen w-full max-w-full">
      <Hero />
      <AboutSection />
      <PhotoGallery />
      <FloatingButton />
      <Footer />
    </main>
  )
}

