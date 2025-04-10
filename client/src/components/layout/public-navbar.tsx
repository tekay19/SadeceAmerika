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
  Music
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
        className="bg-primary hidden md:block text-white py-2 overflow-hidden"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <a href="tel:+905321393459" className="flex items-center hover:text-blue-100 transition-colors">
                <Phone className="w-4 h-4 mr-1" />
                <span>+90 532 139 34 59</span>
              </a>
              <a href="mailto:can@mese.us" className="flex items-center hover:text-blue-100 transition-colors">
                <Mail className="w-4 h-4 mr-1" />
                <span>can@mese.us</span>
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <a href="https://travel.state.gov" target="_blank" rel="noopener noreferrer" className="hover:text-blue-100 transition-colors">
                <Globe className="w-4 h-4 mr-1 inline-block" />
                <span>ABD Resmi Vize Bilgileri</span>
              </a>
              <span className="text-blue-100">|</span>
              <a href="https://tr.usembassy.gov/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-100 transition-colors">
                <MapPin className="w-4 h-4 mr-1 inline-block" />
                <span>ABD Ankara Büyükelçiliği</span>
              </a>
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
                <img 
                  src="/logo.jpg" 
                  alt="SadeceAmerika logo" 
                  className={cn(
                    "transition-all duration-300 mr-2 rounded-md",
                    isScrolled ? "h-9" : "h-10"
                  )}
                />
                <div className="flex flex-col">
                  <span className={cn(
                    "font-semibold text-gray-800 transition-all duration-300",
                    isScrolled ? "text-base" : "text-lg"
                  )}>SadeceAmerika</span>
                  <span className="text-xs text-gray-500 hidden md:block">Vize & Göçmenlik Danışmanlığı</span>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              <NavLink href="/" text={t('common.home')} isActive={isActive("/")} icon={<Flag className="w-4 h-4 mr-1" />} />
              <NavLink href="/services" text={t('common.services')} isActive={isActive("/services")} icon={<Plane className="w-4 h-4 mr-1" />} />
              <NavLink href="/about" text={t('common.about')} isActive={isActive("/about")} icon={<Users className="w-4 h-4 mr-1" />} />
              <NavLink href="/contact" text={t('common.contact')} isActive={isActive("/contact")} icon={<Mail className="w-4 h-4 mr-1" />} />
            </nav>

            {/* Auth Buttons - Desktop */}
            <div className="hidden md:flex items-center space-x-3">
              <LanguageSwitcher />
              
              <Link href="/auth">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button variant="outline" size="sm" className="font-medium px-4">
                    <LogIn className="w-4 h-4 mr-1.5" />
                    <span>{t('auth.login')}</span>
                  </Button>
                </motion.div>
              </Link>
              <Link href="/auth?mode=register">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button size="sm" className="font-medium px-4">
                    <UserPlus className="w-4 h-4 mr-1.5" />
                    <span>{t('auth.register')}</span>
                  </Button>
                </motion.div>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
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
                <nav className="flex flex-col py-3">
                  <MobileNavLink 
                    href="/" 
                    text={t('common.home')}
                    isActive={isActive("/")}
                    icon={<Flag className="w-4 h-4 mr-2" />}
                    onClick={() => setIsMobileMenuOpen(false)}
                  />
                  <MobileNavLink 
                    href="/services" 
                    text={t('common.services')}
                    isActive={isActive("/services")}
                    icon={<Plane className="w-4 h-4 mr-2" />}
                    onClick={() => setIsMobileMenuOpen(false)}
                  />
                  <MobileNavLink 
                    href="/about" 
                    text={t('common.about')}
                    isActive={isActive("/about")}
                    icon={<Users className="w-4 h-4 mr-2" />}
                    onClick={() => setIsMobileMenuOpen(false)}
                  />
                  <MobileNavLink 
                    href="/contact" 
                    text={t('common.contact')}
                    isActive={isActive("/contact")}
                    icon={<Mail className="w-4 h-4 mr-2" />}
                    onClick={() => setIsMobileMenuOpen(false)}
                  />
                  
                  <div className="flex flex-col space-y-2 mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                      <Phone className="w-4 h-4" />
                      <span>+90 532 139 34 59</span>
                    </div>
                    
                    <div className="flex justify-center mb-3">
                      <LanguageSwitcher />
                    </div>
                    
                    <Link href="/auth">
                      <Button 
                        variant="outline" 
                        className="w-full justify-center"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <LogIn className="w-4 h-4 mr-1.5" />
                        {t('auth.login')}
                      </Button>
                    </Link>
                    <Link href="/auth?mode=register">
                      <Button 
                        className="w-full justify-center"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <UserPlus className="w-4 h-4 mr-1.5" />
                        {t('auth.register')}
                      </Button>
                    </Link>
                  </div>
                </nav>
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