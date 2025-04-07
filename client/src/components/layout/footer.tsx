import { Link } from "wouter";
import { MapPin, Phone, Mail, Globe } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-200 py-10 relative overflow-hidden">
      {/* Dünya görseli (soluk, arka planda) */}
      <div className="absolute opacity-5 right-0 bottom-0">
        <svg
          width="400"
          height="400"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="45" fill="#4299e1" opacity="0.7" />
          <path
            d="M50 5 C55 15, 80 15, 85 25 C90 35, 85 45, 90 55 C95 65, 85 70, 80 80 C75 90, 60 95, 50 90 C40 85, 30 90, 20 80 C10 70, 5 60, 10 50 C15 40, 10 30, 15 20 C20 10, 45 5, 50 5"
            fill="none"
            stroke="#fff"
            strokeWidth="0.5"
          />
          <path
            d="M30 20 C40 20, 45 15, 55 20 C65 25, 70 35, 65 45 C60 55, 65 65, 60 75 C55 85, 45 80, 35 75 C25 70, 15 60, 20 50 C25 40, 20 30, 30 20"
            fill="none"
            stroke="#fff"
            strokeWidth="0.5"
          />
          <path
            d="M40 15 C50 25, 60 15, 70 25 C80 35, 75 50, 70 60 C65 70, 75 80, 60 85 C45 90, 35 80, 30 70 C25 60, 15 50, 20 40 C25 30, 30 5, 40 15"
            fill="none"
            stroke="#fff"
            strokeWidth="0.5"
          />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <div className="flex items-center">
              <img 
                src="/logo.jpg" 
                alt="SadeceAmerika logo" 
                className="w-10 h-10 mr-2" 
              />
              <span className="text-xl font-semibold text-gray-800">SadeceAmerika</span>
            </div>
            <p className="text-sm text-gray-600 mt-2 mb-4">
              ABD vize başvuru süreçlerinizde yanınızdayız
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-500 hover:text-blue-700">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a href="#" className="text-pink-500 hover:text-pink-700">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a href="#" className="text-blue-400 hover:text-blue-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold text-gray-800 text-lg mb-4">Türkiye Ofisi</h3>
            <ul className="text-sm text-gray-600 space-y-3">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                <span>Nish Istanbul, Çobançeşme, Sanayi Cd. No: 44, B Block 60. Ofis, PK:34196 Bahçelievler/İstanbul</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" />
                <span>+90 532 139 34 59 (Can Sarıtaş)</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" />
                <span>can@mese.us</span>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold text-gray-800 text-lg mb-4">ABD Ofisi</h3>
            <ul className="text-sm text-gray-600 space-y-3">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                <span>8330 Lyndon B Johnson Freeway, B820, Dallas, Texas, 75243</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" />
                <span>+1 (469) 607-8667</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" />
                <span>Fax: (469) 575-8599</span>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold text-gray-800 text-lg mb-4">Hızlı Linkler</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>
                <Link href="/" className="hover:text-blue-600 transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                  Anasayfa
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-blue-600 transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                  Hizmetlerimiz
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-600 transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-600 transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                  İletişim
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-blue-600 transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                  Gizlilik Sözleşmesi
                </Link>
              </li>
              <li>
                <a href="https://travel.state.gov" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                  ABD Seyahat Bilgileri
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-sm text-gray-500">
          <p className="mb-2">© {currentYear} Mese Consultancy & SadeceAmerika. Tüm hakları saklıdır.</p>
          <p>Bu web sitesinin içeriği genel bilgi amaçlıdır ve yasal tavsiye niteliğinde değildir.</p>
        </div>
      </div>
    </footer>
  );
}