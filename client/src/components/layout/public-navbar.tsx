import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  Phone, 
  Mail, 
  ChevronRight, 
  Flag, 
  Globe, 
  Plane, 
  Users, 
  LogIn,
  UserPlus,
  MapPin,
  Shield,
  Clock,
  Award,
  Check
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

export function PublicNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  const { t } = useTranslation();

  // Scroll event listener to detect scrolling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMobileMenuOpen && !target.closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Close mobile menu when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <div className="relative z-20">
      {/* Contact Bar */}
      <motion.div 
        className="bg-gradient-to-r from-primary to-primary/90 hidden md:block text-white py-2 overflow-hidden"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center divide-x divide-blue-400/30">
              <motion.a 
                href="tel:+905321393459" 
                className="flex items-center hover:text-blue-100 transition-colors pr-4 group"
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div 
                  className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center mr-2"
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(59, 130, 246, 0.3)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Phone className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                </motion.div>
                <span>+90 532 139 34 59</span>
              </motion.a>
              <motion.a 
                href="mailto:can@mese.us" 
                className="flex items-center hover:text-blue-100 transition-colors px-4 group"
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div 
                  className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center mr-2"
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(59, 130, 246, 0.3)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Mail className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                </motion.div>
                <span>can@mese.us</span>
              </motion.a>
            </div>
            
            <div className="flex items-center space-x-1">
              <div className="flex items-center space-x-3 px-4 py-0.5 bg-blue-600/20 rounded-full border border-blue-400/20">
                <motion.div
                  className="flex items-center space-x-1"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Clock className="h-3.5 w-3.5 text-blue-200" />
                  <span className="text-xs text-blue-100">7/24 Hizmet</span>
                </motion.div>
                <span className="text-blue-300 text-xs">•</span>
                <motion.div
                  className="flex items-center space-x-1"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Check className="h-3.5 w-3.5 text-blue-200" />
                  <span className="text-xs text-blue-100">%94 Başarı</span>
                </motion.div>
              </div>
              
              <motion.a 
                href="https://travel.state.gov" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center hover:text-blue-100 transition-colors px-3 py-0.5 rounded-full hover:bg-blue-600/10"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Globe className="w-4 h-4 mr-1" />
                <span>ABD Vize Bilgileri</span>
              </motion.a>
              
              <motion.a 
                href="https://tr.usembassy.gov/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center hover:text-blue-100 transition-colors px-3 py-0.5 rounded-full hover:bg-blue-600/10"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <MapPin className="w-4 h-4 mr-1" />
                <span>Büyükelçilik</span>
              </motion.a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Navbar */}
      <motion.header 
        className={cn(
          "bg-white border-b border-gray-200 sticky top-0 z-10 transition-all duration-300",
          isScrolled ? "shadow-md py-2" : "shadow-sm py-3"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 100, 
          damping: 20,
          duration: 0.5 
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo and Brand */}
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link href="/" className="flex items-center">
                <motion.div
                  className={cn(
                    "transition-all duration-300 mr-3 rounded-lg shadow-sm overflow-hidden",
                    isScrolled ? "h-9 w-9" : "h-10 w-10"
                  )}
                  whileHover={{ 
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                    scale: 1.05, 
                    rotate: 5 
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img 
                    src="/logo.jpg" 
                    alt="SadeceAmerika logo" 
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <span className={cn(
                      "font-bold text-gray-800 transition-all duration-300",
                      isScrolled ? "text-base" : "text-lg"
                    )}>
                      <span className="text-blue-600">Sadece</span>Amerika
                    </span>
                    {!isScrolled && <motion.div 
                      className="ml-1.5 bg-blue-100 text-blue-600 text-xs px-1.5 py-0.5 rounded-full font-medium"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      Pro
                    </motion.div>}
                  </div>
                  <span className="text-xs text-gray-500 hidden md:block">
                    Vize & Göçmenlik Danışmanlığı
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <NavLink href="/" text={t('common.home')} isActive={isActive("/")} icon={<Flag className="w-4 h-4 mr-1" />} />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <NavLink href="/services" text={t('common.services')} isActive={isActive("/services")} icon={<Plane className="w-4 h-4 mr-1" />} />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <NavLink href="/about" text={t('common.about')} isActive={isActive("/about")} icon={<Users className="w-4 h-4 mr-1" />} />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <NavLink href="/contact" text={t('common.contact')} isActive={isActive("/contact")} icon={<Mail className="w-4 h-4 mr-1" />} />
              </motion.div>
              
              <motion.div 
                className="h-6 mx-2 border-l border-gray-200"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 24 }}
                transition={{ delay: 0.5 }}
              />
              
              <motion.div
                className="flex items-center text-xs text-gray-500 space-x-1 px-2 py-1 rounded-full bg-gray-50"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ backgroundColor: "rgba(243, 244, 246, 1)" }}
              >
                <Shield className="w-3.5 h-3.5 text-blue-600" />
                <span>Güvenilir</span>
                <div className="bg-blue-600 w-1 h-1 rounded-full" />
                <Award className="w-3.5 h-3.5 text-blue-600" />
                <span>Uzman</span>
              </motion.div>
            </nav>

            {/* Auth Buttons - Desktop */}
            <div className="hidden md:flex items-center space-x-3">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
              >
                <LanguageSwitcher />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Link href="/auth">
                  <motion.div 
                    whileHover={{ scale: 1.05, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }} 
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button variant="ghost" size="sm" className="font-medium px-4 border border-gray-200">
                      <LogIn className="w-4 h-4 mr-1.5 text-blue-600" />
                      <span>{t('auth.login')}</span>
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
              >
                <Link href="/auth?mode=register">
                  <motion.div 
                    whileHover={{ 
                      scale: 1.05, 
                      boxShadow: "0 10px 15px -3px rgba(59, 130, 246, 0.2), 0 4px 6px -2px rgba(59, 130, 246, 0.1)" 
                    }} 
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      size="sm" 
                      className="font-medium px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                    >
                      <UserPlus className="w-4 h-4 mr-1.5" />
                      <span>{t('auth.register')}</span>
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden bg-gray-100 hover:bg-gray-200 text-blue-600 focus:outline-none p-2 rounded-lg relative overflow-hidden"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Animated background ripple effect on click */}
              {isMobileMenuOpen && (
                <motion.div
                  layoutId="menuButtonRipple"
                  className="absolute inset-0 bg-blue-100 z-[-1] rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              className="md:hidden bg-white border-t border-gray-200 absolute w-full left-0 shadow-lg overflow-hidden mobile-menu-container"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <motion.div 
                className="container mx-auto px-4"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div className="pt-4 pb-2">
                  <div className="flex items-center justify-between mb-4">
                    <motion.div 
                      className="flex items-center space-x-2"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center shadow-md">
                        <Flag className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">Amerika Vizesi</h3>
                        <p className="text-xs text-gray-500">Profesyonel Danışmanlık</p>
                      </div>
                    </motion.div>
                    
                    <motion.div
                      className="flex items-center space-x-2"
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-md flex items-center">
                        <Award className="w-3 h-3 mr-1" />
                        <span>%94</span>
                      </div>
                      <LanguageSwitcher />
                    </motion.div>
                  </div>
                  
                  <motion.div 
                    className="bg-gradient-to-r from-blue-50 to-white rounded-lg p-3 mb-4 border border-blue-100"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="bg-blue-100 p-1.5 rounded-full">
                        <Phone className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 text-sm">Bize Ulaşın</h4>
                        <p className="text-sm text-gray-600">+90 532 139 34 59</p>
                        <p className="text-xs text-gray-500 mt-1">7/24 Hizmetinizdeyiz</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
                
                <nav className="flex flex-col py-1">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <MobileNavLink 
                      href="/" 
                      text={t('common.home')}
                      isActive={isActive("/")}
                      icon={<Flag className="w-4 h-4 mr-2" />}
                      onClick={() => setIsMobileMenuOpen(false)}
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <MobileNavLink 
                      href="/services" 
                      text={t('common.services')}
                      isActive={isActive("/services")}
                      icon={<Plane className="w-4 h-4 mr-2" />}
                      onClick={() => setIsMobileMenuOpen(false)}
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <MobileNavLink 
                      href="/about" 
                      text={t('common.about')}
                      isActive={isActive("/about")}
                      icon={<Users className="w-4 h-4 mr-2" />}
                      onClick={() => setIsMobileMenuOpen(false)}
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <MobileNavLink 
                      href="/contact" 
                      text={t('common.contact')}
                      isActive={isActive("/contact")}
                      icon={<Mail className="w-4 h-4 mr-2" />}
                      onClick={() => setIsMobileMenuOpen(false)}
                    />
                  </motion.div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-100 space-y-3">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      <Link href="/auth">
                        <Button 
                          variant="outline" 
                          className="w-full justify-center group"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <LogIn className="w-4 h-4 mr-1.5 text-blue-600 group-hover:scale-110 transition-transform" />
                          <span>{t('auth.login')}</span>
                        </Button>
                      </Link>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.9 }}
                    >
                      <Link href="/auth?mode=register">
                        <Button 
                          className="w-full justify-center group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <UserPlus className="w-4 h-4 mr-1.5 group-hover:scale-110 transition-transform" />
                          <span>{t('auth.register')}</span>
                        </Button>
                      </Link>
                    </motion.div>
                  </div>
                </nav>
              </motion.div>
              
              <motion.div
                className="bg-gray-50 mt-4 py-3 px-4 text-center text-xs text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <p>© 2025 SadeceAmerika | Tüm Hakları Saklıdır</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </div>
  );
}

type NavLinkProps = {
  href: string;
  text: string;
  isActive: boolean;
  icon?: React.ReactNode;
};

function NavLink({ href, text, isActive, icon }: NavLinkProps) {
  return (
    <Link href={href}>
      <motion.div 
        className={cn(
          "px-3 py-2 rounded-md font-medium flex items-center transition-colors text-sm",
          isActive 
            ? "bg-primary/10 text-primary"
            : "text-gray-700 hover:bg-gray-50 hover:text-primary"
        )}
        whileHover={{ 
          scale: 1.05,
          backgroundColor: isActive ? "rgba(59, 130, 246, 0.15)" : "rgba(249, 250, 251, 1)" 
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
      >
        {icon}
        {text}
        {isActive && (
          <motion.div 
            className="ml-1.5 h-1 w-1 rounded-full bg-primary"
            layoutId="navIndicator"
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
        )}
      </motion.div>
    </Link>
  );
}

type MobileNavLinkProps = {
  href: string;
  text: string;
  isActive: boolean;
  icon?: React.ReactNode;
  onClick: () => void;
};

function MobileNavLink({ href, text, isActive, icon, onClick }: MobileNavLinkProps) {
  return (
    <Link href={href}>
      <motion.div 
        className={cn(
          "py-3 px-2 border-b border-gray-100 last:border-0 flex items-center font-medium",
          isActive ? "text-primary" : "text-gray-700"
        )}
        onClick={onClick}
        whileHover={{ 
          x: 3,
          backgroundColor: "rgba(249, 250, 251, 0.7)"
        }}
        whileTap={{ scale: 0.98 }}
      >
        {icon}
        {text}
        {isActive && (
          <motion.div 
            className="ml-2 w-1.5 h-1.5 rounded-full bg-primary"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        )}
      </motion.div>
    </Link>
  );
}