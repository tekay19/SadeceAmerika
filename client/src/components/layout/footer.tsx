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
  Star,
  ChevronRight
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
      <div className="bg-gradient-to-b from-white to-gray-50 pt-16 pb-12">
        <div className="container mx-auto px-4">
          {/* Logo and intro section */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="flex flex-col items-center justify-center mb-5"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <div className="relative mb-3">
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur-md opacity-70"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    opacity: [0.5, 0.7, 0.5]
                  }}
                  transition={{ 
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 3
                  }}
                />
                <div className="relative flex items-center bg-white rounded-lg p-2">
                  <img 
                    src="/logo.jpg" 
                    alt="SadeceAmerika logo" 
                    className="w-12 h-12 rounded-md shadow-sm mr-3" 
                  />
                  <span className="text-3xl font-extrabold text-gray-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    SadeceAmerika
                  </span>
                </div>
              </div>
              <div className="max-w-xl mx-auto">
                <p className="text-gray-600 text-xl leading-relaxed">
                  Amerika Birleşik Devletleri vize başvuru süreçlerinizde
                  <span className="text-blue-600 font-semibold"> profesyonel danışmanlık </span>
                  hizmetleri
                </p>
                <div className="mt-6 flex items-center justify-center">
                  <motion.div
                    className="flex items-center space-x-1 px-4 py-1 border border-blue-200 rounded-full text-sm text-gray-600 bg-blue-50"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ backgroundColor: "rgba(239, 246, 255, 0.8)" }}
                  >
                    <span className="font-medium">Başarı Oranı:</span>
                    <span className="text-blue-600 font-bold">%94</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    <span className="font-medium">5000+</span>
                    <span>Mutlu Müşteri</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
            
            {/* Features */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-4 gap-y-6 max-w-4xl mx-auto">
              <motion.div 
                className="bg-white p-5 rounded-xl shadow-md flex flex-col items-center relative overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ 
                  y: -5, 
                  boxShadow: '0 15px 30px -10px rgba(59, 130, 246, 0.3)',
                  transition: { duration: 0.2 }
                }}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                <div className="bg-blue-100 p-3 rounded-full mb-4 group-hover:bg-blue-200 transition-colors">
                  <Award className="w-7 h-7 text-blue-600" />
                </div>
                <h4 className="font-bold text-gray-800 text-lg">Güvenilir</h4>
                <p className="text-gray-600 text-center mt-2 leading-relaxed">Profesyonel ve şeffaf yaklaşım</p>
              </motion.div>
              
              <motion.div 
                className="bg-white p-5 rounded-xl shadow-md flex flex-col items-center relative overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ 
                  y: -5, 
                  boxShadow: '0 15px 30px -10px rgba(16, 185, 129, 0.3)',
                  transition: { duration: 0.2 }
                }}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                <div className="bg-green-100 p-3 rounded-full mb-4 group-hover:bg-green-200 transition-colors">
                  <Headphones className="w-7 h-7 text-green-600" />
                </div>
                <h4 className="font-bold text-gray-800 text-lg">7/24 Destek</h4>
                <p className="text-gray-600 text-center mt-2 leading-relaxed">Her aşamada sizinle birlikteyiz</p>
              </motion.div>
              
              <motion.div 
                className="bg-white p-5 rounded-xl shadow-md flex flex-col items-center relative overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ 
                  y: -5, 
                  boxShadow: '0 15px 30px -10px rgba(99, 102, 241, 0.3)',
                  transition: { duration: 0.2 }
                }}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                <div className="bg-indigo-100 p-3 rounded-full mb-4 group-hover:bg-indigo-200 transition-colors">
                  <Calendar className="w-7 h-7 text-indigo-600" />
                </div>
                <h4 className="font-bold text-gray-800 text-lg">Hızlı Süreç</h4>
                <p className="text-gray-600 text-center mt-2 leading-relaxed">Verimli ve hızlı başvuru işlemi</p>
              </motion.div>
              
              <motion.div 
                className="bg-white p-5 rounded-xl shadow-md flex flex-col items-center relative overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ 
                  y: -5, 
                  boxShadow: '0 15px 30px -10px rgba(239, 68, 68, 0.3)',
                  transition: { duration: 0.2 }
                }}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 to-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                <div className="bg-red-100 p-3 rounded-full mb-4 group-hover:bg-red-200 transition-colors">
                  <Star className="w-7 h-7 text-red-600" />
                </div>
                <h4 className="font-bold text-gray-800 text-lg">Profesyonel</h4>
                <p className="text-gray-600 text-center mt-2 leading-relaxed">Uzman ekibimizle size özel çözümler</p>
              </motion.div>
            </div>
            
            {/* Social buttons with animation */}
            <div className="mt-12 flex flex-col items-center">
              <motion.p 
                className="text-gray-500 mb-4 text-sm"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                Sosyal medyada bizi takip edin
              </motion.p>
              <motion.div 
                className="flex justify-center space-x-3"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
              >
                <SocialButton icon={<Facebook />} color="blue" href="https://facebook.com" />
                <SocialButton icon={<Instagram />} color="pink" href="https://instagram.com" />
                <SocialButton icon={<Twitter />} color="sky" href="https://twitter.com" />
              </motion.div>
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
            className="md:hidden space-y-6 mt-10 border-t border-gray-200 pt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-6">
              <div className="h-12 w-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white mx-auto shadow-lg shadow-blue-600/20">
                <Globe className="h-6 w-6" />
              </div>
              <h2 className="text-lg font-bold text-gray-800 mt-3">Bize Ulaşın</h2>
              <p className="text-sm text-gray-500 mt-1 max-w-xs mx-auto">
                Amerika vizesi için ihtiyacınız olan profesyonel danışmanlık hizmetlerimizden yararlanın
              </p>
            </div>
            
            {/* Hakkımızda - Mobile Accordion */}
            <motion.div
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <motion.div 
                className="flex justify-between items-center cursor-pointer p-4 bg-gray-50" 
                onClick={() => toggleSection('about')}
                whileHover={{ backgroundColor: "rgba(243, 244, 246, 0.7)" }}
                whileTap={{ scale: 0.99 }}
              >
                <h3 className="font-bold text-gray-800 text-base flex items-center">
                  <div className="h-8 w-8 rounded-md bg-blue-100 flex items-center justify-center mr-3 text-blue-600">
                    <Users className="w-4 h-4" />
                  </div>
                  Hakkımızda
                </h3>
                <div className={`h-6 w-6 rounded-full flex items-center justify-center transition-colors duration-300 ${expandedSection === 'about' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                  <AnimatePresence mode="wait" initial={false}>
                    {expandedSection === 'about' ? (
                      <motion.div
                        key="up"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.3, type: "spring" }}
                      >
                        <ChevronUp className="h-4 w-4" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="down"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.3, type: "spring" }}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
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
  const colorVariants = {
    blue: {
      gradient: "from-blue-500 to-blue-600",
      hover: "hover:from-blue-600 hover:to-blue-700",
      shadow: "shadow-blue-500/20",
      border: "border-blue-200",
      icon: "text-blue-500"
    },
    pink: {
      gradient: "from-pink-500 to-pink-600",
      hover: "hover:from-pink-600 hover:to-pink-700",
      shadow: "shadow-pink-500/20",
      border: "border-pink-200",
      icon: "text-pink-500"
    },
    sky: {
      gradient: "from-sky-500 to-sky-600",
      hover: "hover:from-sky-600 hover:to-sky-700",
      shadow: "shadow-sky-500/20",
      border: "border-sky-200",
      icon: "text-sky-500"
    }
  };
  
  const variant = colorVariants[color];
  
  return (
    <motion.a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className={cn(
        "relative w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 overflow-hidden group",
        variant.border
      )}
      whileHover={{ 
        scale: 1.05,
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)',
        y: -2
      }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Hover background */}
      <motion.div 
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300",
          variant.gradient,
          variant.hover
        )}
      />
      
      {/* Icon with animation */}
      <motion.div 
        className={cn(
          "relative z-10 group-hover:text-white transition-colors duration-300",
          variant.icon
        )}
        animate={{ 
          scale: [1, 1.08, 1],
        }}
        transition={{ 
          repeat: Infinity, 
          repeatType: "reverse", 
          duration: 2,
          repeatDelay: 1
        }}
      >
        {icon}
      </motion.div>
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
        className="text-sm text-gray-600 hover:text-primary flex items-center transition-colors py-1.5 group relative"
        whileHover={{ x: 5 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {/* Animated icon */}
        <motion.div
          className="mr-2 text-primary transition-transform duration-200 group-hover:scale-110"
          whileHover={{ rotate: [0, -10, 10, -5, 0] }}
          transition={{ duration: 0.4 }}
        >
          {icon}
        </motion.div>
        
        {/* Link text */}
        <span className="relative">
          {text}
          
          {/* Animated underline on hover */}
          <motion.div 
            className="absolute bottom-0 left-0 w-full h-0.5 bg-primary/30 rounded-full transform origin-left scale-x-0 group-hover:scale-x-100"
            transition={{ duration: 0.2 }}
          />
        </span>
        
        {/* Arrow indicator on hover */}
        <motion.div
          className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity text-primary"
          initial={{ x: -5 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronRight className="h-3 w-3" />
        </motion.div>
      </motion.div>
    </Link>
  );
}