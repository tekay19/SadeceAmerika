import { useState, useEffect } from "react";
import { Link } from "wouter";
import { 
  MapPin, 
  Phone, 
  Mail, 
  ChevronDown, 
  ChevronUp, 
  Facebook, 
  Instagram, 
  Twitter, 
  Globe, 
  ExternalLink, 
  Plane, 
  Flag, 
  Users, 
  Heart,
  ArrowUp,
  Calendar,
  Headphones,
  Award,
  Star
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Scroll to top functionality
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  // Show scroll to top button when scrolled down
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };
  
  return (
    <footer className="relative overflow-hidden">
      {/* Scroll To Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg z-50"
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
      
      {/* Footer top with gradient */}
      <div className="bg-gradient-to-b from-white to-gray-50 py-12">
        <div className="container mx-auto px-4">
          {/* Logo and intro section */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="flex items-center justify-center mb-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <img 
                src="/logo.jpg" 
                alt="SadeceAmerika logo" 
                className="w-14 h-14 mr-3 rounded-md shadow-sm" 
              />
              <span className="text-3xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                SadeceAmerika
              </span>
            </motion.div>
            <p className="text-gray-600 max-w-md mx-auto text-lg">
              Amerika Birleşik Devletleri vize başvuru süreçlerinizde yanınızdayız
            </p>
            
            {/* Features */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <motion.div 
                className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center"
                whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="bg-blue-100 p-2 rounded-full mb-3">
                  <Award className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-medium text-gray-800">Güvenilir</h4>
                <p className="text-sm text-gray-500 text-center mt-1">Profesyonel yaklaşım</p>
              </motion.div>
              
              <motion.div 
                className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center"
                whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="bg-green-100 p-2 rounded-full mb-3">
                  <Headphones className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-medium text-gray-800">Destek</h4>
                <p className="text-sm text-gray-500 text-center mt-1">7/24 danışmanlık</p>
              </motion.div>
              
              <motion.div 
                className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center"
                whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="bg-indigo-100 p-2 rounded-full mb-3">
                  <Calendar className="w-6 h-6 text-indigo-600" />
                </div>
                <h4 className="font-medium text-gray-800">Hızlı</h4>
                <p className="text-sm text-gray-500 text-center mt-1">Verimli süreç</p>
              </motion.div>
              
              <motion.div 
                className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center"
                whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="bg-red-100 p-2 rounded-full mb-3">
                  <Star className="w-6 h-6 text-red-600" />
                </div>
                <h4 className="font-medium text-gray-800">Profesyonel</h4>
                <p className="text-sm text-gray-500 text-center mt-1">Uzman ekip</p>
              </motion.div>
            </div>
            
            {/* Social buttons */}
            <div className="mt-10 flex justify-center space-x-5">
              <SocialButton icon={<Facebook />} color="blue" href="https://facebook.com" />
              <SocialButton icon={<Instagram />} color="pink" href="https://instagram.com" />
              <SocialButton icon={<Twitter />} color="sky" href="https://twitter.com" />
            </div>
          </motion.div>
        
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
          <motion.div 
            className="md:hidden space-y-4 mt-8 border-t border-gray-200 pt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Hakkımızda - Mobile Accordion */}
            <motion.div 
              className="border-t border-gray-200 pt-4"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <motion.div 
                className="flex justify-between items-center cursor-pointer" 
                onClick={() => toggleSection('about')}
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.98 }}
              >
                <h3 className="font-semibold text-gray-800 text-base flex items-center">
                  <Users className="w-5 h-5 mr-2 text-primary" />
                  Hakkımızda
                </h3>
                <AnimatePresence initial={false}>
                  {expandedSection === 'about' ? (
                    <motion.div
                      key="up"
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 0 }}
                      exit={{ rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="down"
                      initial={{ rotate: -90 }}
                      animate={{ rotate: 0 }}
                      exit={{ rotate: -90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              
              <AnimatePresence>
                {expandedSection === 'about' && (
                  <motion.div 
                    className="text-sm text-gray-600 mt-3 space-y-3 overflow-hidden"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <p>
                      SadeceAmerika, Amerika merkezli Mese Consultancy'nin Türkiye uzantısı olarak 2025 yılından itibaren ABD vize başvuruları, iş kurma, yatırım ve göç konularında danışmanlık hizmeti sunmaktadır.
                    </p>
                    <motion.div 
                      className="flex items-center text-primary text-sm mt-4"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      <span>Müşteri memnuniyeti odaklı hizmet anlayışı</span>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            
            {/* Türkiye Ofisi - Mobile Accordion */}
            <motion.div className="border-t border-gray-200 pt-4">
              <motion.div 
                className="flex justify-between items-center cursor-pointer" 
                onClick={() => toggleSection('turkiye')}
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.98 }}
              >
                <h3 className="font-semibold text-gray-800 text-base flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-primary" />
                  Türkiye Ofisi
                </h3>
                <AnimatePresence initial={false}>
                  {expandedSection === 'turkiye' ? (
                    <motion.div
                      key="up"
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 0 }}
                      exit={{ rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="down"
                      initial={{ rotate: -90 }}
                      animate={{ rotate: 0 }}
                      exit={{ rotate: -90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              
              <AnimatePresence>
                {expandedSection === 'turkiye' && (
                  <motion.div
                    className="overflow-hidden"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <ul className="text-sm text-gray-600 space-y-3 mt-3">
                      <motion.li 
                        className="flex items-start"
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        <MapPin className="w-4 h-4 text-primary mt-1 mr-2 flex-shrink-0" />
                        <span>Nish Istanbul, Çobançeşme, Sanayi Cd. No: 44, B Block 60. Ofis, PK:34196 Bahçelievler/İstanbul</span>
                      </motion.li>
                      <motion.li 
                        className="flex items-center"
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <Phone className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                        <span>+90 532 139 34 59 (Can Sarıtaş)</span>
                      </motion.li>
                      <motion.li 
                        className="flex items-center"
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Mail className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                        <span>can@mese.us</span>
                      </motion.li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            
            {/* ABD Ofisi - Mobile Accordion */}
            <motion.div className="border-t border-gray-200 pt-4">
              <motion.div 
                className="flex justify-between items-center cursor-pointer" 
                onClick={() => toggleSection('abd')}
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.98 }}
              >
                <h3 className="font-semibold text-gray-800 text-base flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-primary" />
                  ABD Ofisi
                </h3>
                <AnimatePresence initial={false}>
                  {expandedSection === 'abd' ? (
                    <motion.div
                      key="up"
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 0 }}
                      exit={{ rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="down"
                      initial={{ rotate: -90 }}
                      animate={{ rotate: 0 }}
                      exit={{ rotate: -90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              
              <AnimatePresence>
                {expandedSection === 'abd' && (
                  <motion.div
                    className="overflow-hidden"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <ul className="text-sm text-gray-600 space-y-3 mt-3">
                      <motion.li 
                        className="flex items-start"
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        <MapPin className="w-4 h-4 text-primary mt-1 mr-2 flex-shrink-0" />
                        <span>8330 Lyndon B Johnson Freeway, B820, Dallas, Texas, 75243</span>
                      </motion.li>
                      <motion.li 
                        className="flex items-center"
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <Phone className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                        <span>+1 (469) 607-8667</span>
                      </motion.li>
                      <motion.li 
                        className="flex items-center"
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Phone className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                        <span>Fax: (469) 575-8599</span>
                      </motion.li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            
            {/* Hızlı Linkler - Mobile Accordion */}
            <motion.div className="border-t border-gray-200 pt-4">
              <motion.div 
                className="flex justify-between items-center cursor-pointer" 
                onClick={() => toggleSection('links')}
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.98 }}
              >
                <h3 className="font-semibold text-gray-800 text-base flex items-center">
                  <Plane className="w-5 h-5 mr-2 text-primary" />
                  Hızlı Linkler
                </h3>
                <AnimatePresence initial={false}>
                  {expandedSection === 'links' ? (
                    <motion.div
                      key="up"
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 0 }}
                      exit={{ rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="down"
                      initial={{ rotate: -90 }}
                      animate={{ rotate: 0 }}
                      exit={{ rotate: -90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              
              <AnimatePresence>
                {expandedSection === 'links' && (
                  <motion.div
                    className="overflow-hidden"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <ul className="text-sm text-gray-600 space-y-3 mt-3">
                      <li>
                        <Link href="/">
                          <motion.div 
                            className="text-gray-600 hover:text-primary transition-colors flex items-center"
                            whileHover={{ x: 3 }}
                          >
                            <Flag className="w-4 h-4 mr-2 text-primary" />
                            Anasayfa
                          </motion.div>
                        </Link>
                      </li>
                      <li>
                        <Link href="/services">
                          <motion.div 
                            className="text-gray-600 hover:text-primary transition-colors flex items-center"
                            whileHover={{ x: 3 }}
                          >
                            <Plane className="w-4 h-4 mr-2 text-primary" />
                            Hizmetlerimiz
                          </motion.div>
                        </Link>
                      </li>
                      <li>
                        <Link href="/about">
                          <motion.div 
                            className="text-gray-600 hover:text-primary transition-colors flex items-center"
                            whileHover={{ x: 3 }}
                          >
                            <Users className="w-4 h-4 mr-2 text-primary" />
                            Hakkımızda
                          </motion.div>
                        </Link>
                      </li>
                      <li>
                        <Link href="/contact">
                          <motion.div 
                            className="text-gray-600 hover:text-primary transition-colors flex items-center"
                            whileHover={{ x: 3 }}
                          >
                            <Mail className="w-4 h-4 mr-2 text-primary" />
                            İletişim
                          </motion.div>
                        </Link>
                      </li>
                      <li>
                        <Link href="/privacy-policy">
                          <motion.div 
                            className="text-gray-600 hover:text-primary transition-colors flex items-center"
                            whileHover={{ x: 3 }}
                          >
                            <Globe className="w-4 h-4 mr-2 text-primary" />
                            Gizlilik Sözleşmesi
                          </motion.div>
                        </Link>
                      </li>
                      <li>
                        <a 
                          href="https://travel.state.gov" 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <motion.div 
                            className="text-gray-600 hover:text-primary transition-colors flex items-center"
                            whileHover={{ x: 3 }}
                          >
                            <ExternalLink className="w-4 h-4 mr-2 text-primary" />
                            ABD Seyahat Bilgileri
                          </motion.div>
                        </a>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Bottom bar with copyright */}
      <motion.div 
        className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <div className="md:flex justify-between items-center">
            <motion.div 
              className="text-center md:text-left mb-6 md:mb-0"
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center justify-center md:justify-start mb-3">
                <img 
                  src="/logo.jpg" 
                  alt="SadeceAmerika logo" 
                  className="w-8 h-8 mr-2 rounded-md" 
                />
                <span className="text-xl font-semibold text-white">SadeceAmerika</span>
              </div>
              <p className="text-sm text-blue-100">
                &copy; {currentYear} SadeceAmerika. Tüm hakları saklıdır.
              </p>
            </motion.div>
            
            <motion.div 
              className="text-center md:text-right text-sm"
              initial={{ x: 20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p className="text-blue-100">
                SadeceAmerika, Amerika merkezli Mese Consultancy'nin Türkiye uzantısıdır.
              </p>
              <p className="mt-2 text-xs text-blue-200">
                Bu site profesyonel danışmanlık hizmetleri sunmak amacıyla oluşturulmuştur.
              </p>
              
              {/* Footer links */}
              <div className="mt-4 flex justify-center md:justify-end space-x-4">
                <Link href="/privacy-policy">
                  <Button variant="link" size="sm" className="text-blue-100 hover:text-white p-0 h-auto">Gizlilik</Button>
                </Link>
                <span className="text-blue-400">|</span>
                <Link href="/about">
                  <Button variant="link" size="sm" className="text-blue-100 hover:text-white p-0 h-auto">Hakkımızda</Button>
                </Link>
                <span className="text-blue-400">|</span>
                <Link href="/contact">
                  <Button variant="link" size="sm" className="text-blue-100 hover:text-white p-0 h-auto">İletişim</Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
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
    blue: "text-blue-600 hover:text-white hover:bg-blue-600",
    pink: "text-pink-500 hover:text-white hover:bg-pink-500",
    sky: "text-sky-500 hover:text-white hover:bg-sky-500"
  };
  
  return (
    <motion.a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className={cn(
        "w-12 h-12 rounded-full flex items-center justify-center border-2 border-gray-200 transition-all duration-300 shadow-sm",
        colorClasses[color]
      )}
      whileHover={{ 
        scale: 1.1,
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
      }}
      whileTap={{ scale: 0.95 }}
    >
      {icon}
    </motion.a>
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
      <motion.div 
        className="text-sm text-gray-600 hover:text-primary flex items-center transition-colors py-1"
        whileHover={{ x: 3 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {icon}
        {text}
      </motion.div>
    </Link>
  );
}