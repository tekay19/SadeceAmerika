import { useState } from "react";
import { Link } from "wouter";
import { MapPin, Phone, Mail, ChevronDown, ChevronUp, Facebook, Instagram, Twitter, Globe, ExternalLink, Plane, Flag, Users, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  
  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };
  
  return (
    <footer className="relative overflow-hidden">
      {/* Footer top with gradient */}
      <div className="bg-gradient-to-b from-white to-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-2">
              <img 
                src="/logo.jpg" 
                alt="SadeceAmerika logo" 
                className="w-12 h-12 mr-3" 
              />
              <span className="text-2xl font-bold text-gray-800">SadeceAmerika</span>
            </div>
            <p className="text-gray-600 max-w-md mx-auto">
              Amerika Birleşik Devletleri vize başvuru süreçlerinizde yanınızdayız
            </p>
            <div className="mt-6 flex justify-center space-x-5">
              <SocialButton icon={<Facebook />} color="blue" href="https://facebook.com" />
              <SocialButton icon={<Instagram />} color="pink" href="https://instagram.com" />
              <SocialButton icon={<Twitter />} color="sky" href="https://twitter.com" />
            </div>
          </div>
        
          {/* Main content grid */}
          <div className="hidden md:grid md:grid-cols-12 gap-8 border-t border-gray-200 pt-10">
            {/* Hakkımızda kısmı */}
            <div className="col-span-4">
              <h3 className="font-semibold text-gray-800 text-lg mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-primary" />
                Hakkımızda
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                SadeceAmerika, Amerika merkezli Mese Consultancy'nin Türkiye uzantısı olarak 2025 yılından itibaren ABD vize başvuruları, iş kurma, yatırım ve göç konularında danışmanlık hizmeti sunmaktadır.
              </p>
              <div className="flex items-center text-primary text-sm mt-4">
                <Heart className="w-4 h-4 mr-2" />
                <span>Müşteri memnuniyeti odaklı hizmet anlayışı</span>
              </div>
            </div>
            
            {/* Ofislerimiz */}
            <div className="col-span-5">
              <h3 className="font-semibold text-gray-800 text-lg mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-primary" />
                Ofislerimiz
              </h3>
              <div className="grid grid-cols-2 gap-6">
                {/* Türkiye Ofisi */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Türkiye Ofisi</h4>
                  <ul className="text-sm text-gray-600 space-y-3">
                    <li className="flex items-start">
                      <MapPin className="w-4 h-4 text-primary mt-1 mr-2 flex-shrink-0" />
                      <span>Nish Istanbul, Çobançeşme, Sanayi Cd. No: 44, B Block 60. Ofis, Bahçelievler/İstanbul</span>
                    </li>
                    <li className="flex items-center">
                      <Phone className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                      <span>+90 532 139 34 59</span>
                    </li>
                  </ul>
                </div>
                
                {/* ABD Ofisi */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">ABD Ofisi</h4>
                  <ul className="text-sm text-gray-600 space-y-3">
                    <li className="flex items-start">
                      <MapPin className="w-4 h-4 text-primary mt-1 mr-2 flex-shrink-0" />
                      <span>8330 Lyndon B Johnson Freeway, B820, Dallas, Texas</span>
                    </li>
                    <li className="flex items-center">
                      <Phone className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                      <span>+1 (469) 607-8667</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Hızlı Linkler */}
            <div className="col-span-3">
              <h3 className="font-semibold text-gray-800 text-lg mb-4 flex items-center">
                <Plane className="w-5 h-5 mr-2 text-primary" />
                Hızlı Linkler
              </h3>
              <div className="grid grid-cols-1 gap-2">
                <FooterLink href="/" text="Anasayfa" icon={<Flag className="w-4 h-4 mr-2 text-primary" />} />
                <FooterLink href="/services" text="Hizmetlerimiz" icon={<Plane className="w-4 h-4 mr-2 text-primary" />} />
                <FooterLink href="/about" text="Hakkımızda" icon={<Users className="w-4 h-4 mr-2 text-primary" />} />
                <FooterLink href="/contact" text="İletişim" icon={<Mail className="w-4 h-4 mr-2 text-primary" />} />
                <FooterLink href="/privacy-policy" text="Gizlilik Sözleşmesi" icon={<Globe className="w-4 h-4 mr-2 text-primary" />} />
                
                <div className="pt-4 mt-2 border-t border-gray-200">
                  <h4 className="font-medium text-gray-700 mb-2 text-sm">Resmi Kaynaklar</h4>
                  <a 
                    href="https://travel.state.gov" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm text-gray-600 hover:text-primary flex items-center transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 mr-2 text-primary" />
                    ABD Seyahat Bilgileri
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Mobile Accordion */}
          <div className="md:hidden space-y-4 mt-8">
            {/* Hakkımızda - Mobile Accordion */}
            <div className="border-t border-gray-200 pt-4">
              <div 
                className="flex justify-between items-center cursor-pointer" 
                onClick={() => toggleSection('about')}
              >
                <h3 className="font-semibold text-gray-800 text-base flex items-center">
                  <Users className="w-5 h-5 mr-2 text-primary" />
                  Hakkımızda
                </h3>
                {expandedSection === 'about' ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </div>
              
              {expandedSection === 'about' && (
                <div className="text-sm text-gray-600 mt-3 space-y-3">
                  <p>
                    SadeceAmerika, Amerika merkezli Mese Consultancy'nin Türkiye uzantısı olarak 2025 yılından itibaren ABD vize başvuruları, iş kurma, yatırım ve göç konularında danışmanlık hizmeti sunmaktadır.
                  </p>
                  <div className="flex items-center text-primary text-sm mt-4">
                    <Heart className="w-4 h-4 mr-2" />
                    <span>Müşteri memnuniyeti odaklı hizmet anlayışı</span>
                  </div>
                </div>
              )}
            </div>
            
            {/* Türkiye Ofisi - Mobile Accordion */}
            <div className="border-t border-gray-200 pt-4">
              <div 
                className="flex justify-between items-center cursor-pointer" 
                onClick={() => toggleSection('turkiye')}
              >
                <h3 className="font-semibold text-gray-800 text-base flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-primary" />
                  Türkiye Ofisi
                </h3>
                {expandedSection === 'turkiye' ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </div>
              
              {expandedSection === 'turkiye' && (
                <ul className="text-sm text-gray-600 space-y-3 mt-3">
                  <li className="flex items-start">
                    <MapPin className="w-4 h-4 text-primary mt-1 mr-2 flex-shrink-0" />
                    <span>Nish Istanbul, Çobançeşme, Sanayi Cd. No: 44, B Block 60. Ofis, PK:34196 Bahçelievler/İstanbul</span>
                  </li>
                  <li className="flex items-center">
                    <Phone className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                    <span>+90 532 139 34 59 (Can Sarıtaş)</span>
                  </li>
                  <li className="flex items-center">
                    <Mail className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                    <span>can@mese.us</span>
                  </li>
                </ul>
              )}
            </div>
            
            {/* ABD Ofisi - Mobile Accordion */}
            <div className="border-t border-gray-200 pt-4">
              <div 
                className="flex justify-between items-center cursor-pointer" 
                onClick={() => toggleSection('abd')}
              >
                <h3 className="font-semibold text-gray-800 text-base flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-primary" />
                  ABD Ofisi
                </h3>
                {expandedSection === 'abd' ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </div>
              
              {expandedSection === 'abd' && (
                <ul className="text-sm text-gray-600 space-y-3 mt-3">
                  <li className="flex items-start">
                    <MapPin className="w-4 h-4 text-primary mt-1 mr-2 flex-shrink-0" />
                    <span>8330 Lyndon B Johnson Freeway, B820, Dallas, Texas, 75243</span>
                  </li>
                  <li className="flex items-center">
                    <Phone className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                    <span>+1 (469) 607-8667</span>
                  </li>
                  <li className="flex items-center">
                    <Phone className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                    <span>Fax: (469) 575-8599</span>
                  </li>
                </ul>
              )}
            </div>
            
            {/* Hızlı Linkler - Mobile Accordion */}
            <div className="border-t border-gray-200 pt-4">
              <div 
                className="flex justify-between items-center cursor-pointer" 
                onClick={() => toggleSection('links')}
              >
                <h3 className="font-semibold text-gray-800 text-base flex items-center">
                  <Plane className="w-5 h-5 mr-2 text-primary" />
                  Hızlı Linkler
                </h3>
                {expandedSection === 'links' ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </div>
              
              {expandedSection === 'links' && (
                <ul className="text-sm text-gray-600 space-y-3 mt-3">
                  <li>
                    <Link href="/" className="text-gray-600 hover:text-primary transition-colors flex items-center">
                      <Flag className="w-4 h-4 mr-2 text-primary" />
                      Anasayfa
                    </Link>
                  </li>
                  <li>
                    <Link href="/services" className="text-gray-600 hover:text-primary transition-colors flex items-center">
                      <Plane className="w-4 h-4 mr-2 text-primary" />
                      Hizmetlerimiz
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="text-gray-600 hover:text-primary transition-colors flex items-center">
                      <Users className="w-4 h-4 mr-2 text-primary" />
                      Hakkımızda
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-gray-600 hover:text-primary transition-colors flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-primary" />
                      İletişim
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy-policy" className="text-gray-600 hover:text-primary transition-colors flex items-center">
                      <Globe className="w-4 h-4 mr-2 text-primary" />
                      Gizlilik Sözleşmesi
                    </Link>
                  </li>
                  <li>
                    <a 
                      href="https://travel.state.gov" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-gray-600 hover:text-primary transition-colors flex items-center"
                    >
                      <ExternalLink className="w-4 h-4 mr-2 text-primary" />
                      ABD Seyahat Bilgileri
                    </a>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom bar with copyright */}
      <div className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="md:flex justify-between items-center text-sm">
            <div className="text-center md:text-left mb-4 md:mb-0">
              &copy; {currentYear} SadeceAmerika. Tüm hakları saklıdır.
            </div>
            <div className="text-center md:text-right text-gray-300 text-xs">
              <p>SadeceAmerika, Amerika merkezli Mese Consultancy'nin Türkiye uzantısıdır.</p>
              <p className="mt-1">Bu site profesyonel danışmanlık hizmetleri sunmak amacıyla oluşturulmuştur.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

type SocialButtonProps = {
  icon: React.ReactNode;
  color: 'blue' | 'pink' | 'sky';
  href: string;
};

function SocialButton({ icon, color, href }: SocialButtonProps) {
  const colorClasses = {
    blue: "text-blue-600 hover:text-blue-800 hover:bg-blue-50",
    pink: "text-pink-500 hover:text-pink-700 hover:bg-pink-50",
    sky: "text-sky-500 hover:text-sky-700 hover:bg-sky-50"
  };
  
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 transition-colors",
        colorClasses[color]
      )}
    >
      {icon}
    </a>
  );
}

type FooterLinkProps = {
  href: string;
  text: string;
  icon?: React.ReactNode;
};

function FooterLink({ href, text, icon }: FooterLinkProps) {
  return (
    <Link href={href}>
      <div className="text-sm text-gray-600 hover:text-primary flex items-center transition-colors py-1">
        {icon}
        {text}
      </div>
    </Link>
  );
}