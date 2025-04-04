import { Link } from "wouter";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-200 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <img 
                src="https://images.unsplash.com/photo-1508722830436-0faffb8ba5f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=32&h=32&q=80" 
                alt="SadeceAmerika logo" 
                className="w-8 h-8 mr-2" 
              />
              <span className="text-lg font-semibold text-gray-800">SadeceAmerika</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              ABD vize başvuru süreçlerinizde yanınızdayız
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8">
            <div>
              <h3 className="font-medium text-gray-800 mb-2">İletişim</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>info@sadeceamerika.com</li>
                <li>+90 212 000 00 00</li>
                <li>İstanbul, Türkiye</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Linkler</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>
                  <Link href="/">
                    <span className="hover:text-primary cursor-pointer">Anasayfa</span>
                  </Link>
                </li>
                <li>
                  <Link href="/services">
                    <span className="hover:text-primary cursor-pointer">Hizmetlerimiz</span>
                  </Link>
                </li>
                <li>
                  <Link href="/about">
                    <span className="hover:text-primary cursor-pointer">Hakkımızda</span>
                  </Link>
                </li>
                <li>
                  <Link href="/contact">
                    <span className="hover:text-primary cursor-pointer">İletişim</span>
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy">
                    <span className="hover:text-primary cursor-pointer">Gizlilik Sözleşmesi</span>
                  </Link>
                </li>
                <li>
                  <a href="https://travel.state.gov" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                    ABD Seyahat Bilgileri
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-100 mt-6 pt-4 text-center text-sm text-gray-500">
          © {currentYear} SadeceAmerika. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
}