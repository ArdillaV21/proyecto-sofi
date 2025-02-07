import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="bg-[rgba(135,206,235,0.1)] text-gray-800 py-16 border-t border-[rgba(135,206,235,0.2)]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-4 text-[#87CEEB]">Sofia Victoria</h3>
            <p className="text-gray-600">Fotógrafa Profesional</p>
            <p className="mt-4 text-sm text-gray-500">Capturando momentos, creando recuerdos desde 2020</p>
          </div>
          <div className="text-center">
            <h4 className="text-xl font-semibold mb-4 text-gray-800">Contacto</h4>
            <p className="mb-2">
              <a
                href="mailto:sofia@ejemplo.com"
                className="text-[#87CEEB] hover:text-[#5f9fb3] transition duration-300"
              >
                sofia@ejemplo.com
              </a>
            </p>
            <p className="mb-2">
              <a href="tel:+34123456789" className="text-[#87CEEB] hover:text-[#5f9fb3] transition duration-300">
                +34 123 456 789
              </a>
            </p>
            <p className="text-gray-600">Buenos Aires, Argentina</p>
          </div>
          <div className="text-center md:text-right">
            <h4 className="text-xl font-semibold mb-4 text-gray-800">Sígueme</h4>
            <div className="flex justify-center md:justify-end space-x-6">
              <a
                href="#"
                className="text-[#87CEEB] hover:text-[#5f9fb3] transition-colors duration-300 transform hover:scale-110"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="#"
                className="text-[#87CEEB] hover:text-[#5f9fb3] transition-colors duration-300 transform hover:scale-110"
              >
                <FaFacebookF size={24} />
              </a>
              <a
                href="#"
                className="text-[#87CEEB] hover:text-[#5f9fb3] transition-colors duration-300 transform hover:scale-110"
              >
                <FaTwitter size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-[rgba(135,206,235,0.2)] text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Sofia Victoria Fotografía. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

