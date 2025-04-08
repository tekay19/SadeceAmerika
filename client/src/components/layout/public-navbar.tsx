import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail, ChevronRight, Flag, Globe, Plane, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export function PublicNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  // Scroll event listener to detect scrolling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <div className="relative z-20">
      {/* Contact bar */}
      <div className="bg-primary hidden md:block text-white py-2">
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
                ABD Resmi Vize Bilgileri
              </a>
              <span className="text-blue-100">|</span>
              <a href="https://tr.usembassy.gov/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-100 transition-colors">
                ABD Ankara Büyükelçiliği
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <header className={cn(
        "bg-white border-b border-gray-200 sticky top-0 z-10 transition-all duration-300",
        isScrolled ? "shadow-md py-2" : "shadow-sm py-3"
      )}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo and Brand */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <img 
                  src="/logo.jpg" 
                  alt="SadeceAmerika logo" 
                  className={cn(
                    "transition-all duration-300 mr-2",
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
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              <NavLink href="/" text="Anasayfa" isActive={isActive("/")} icon={<Flag className="w-4 h-4 mr-1" />} />
              <NavLink href="/services" text="Hizmetlerimiz" isActive={isActive("/services")} icon={<Plane className="w-4 h-4 mr-1" />} />
              <NavLink href="/about" text="Hakkımızda" isActive={isActive("/about")} icon={<Users className="w-4 h-4 mr-1" />} />
              <NavLink href="/contact" text="İletişim" isActive={isActive("/contact")} icon={<Mail className="w-4 h-4 mr-1" />} />
            </nav>

            {/* Auth Buttons - Desktop */}
            <div className="hidden md:flex items-center space-x-3">
              <Link href="/auth">
                <Button variant="outline" size="sm" className="font-medium px-4">
                  Giriş Yap
                </Button>
              </Link>
              <Link href="/auth?mode=register">
                <Button size="sm" className="font-medium px-4">
                  <span>Kayıt Ol</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={cn(
          "md:hidden bg-white border-t border-gray-200 absolute w-full left-0 shadow-lg transition-all duration-300 overflow-hidden",
          isMobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}>
          <div className="container mx-auto px-4">
            <nav className="flex flex-col py-3">
              <MobileNavLink 
                href="/" 
                text="Anasayfa"
                isActive={isActive("/")}
                icon={<Flag className="w-4 h-4 mr-2" />}
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <MobileNavLink 
                href="/services" 
                text="Hizmetlerimiz"
                isActive={isActive("/services")}
                icon={<Plane className="w-4 h-4 mr-2" />}
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <MobileNavLink 
                href="/about" 
                text="Hakkımızda"
                isActive={isActive("/about")}
                icon={<Users className="w-4 h-4 mr-2" />}
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <MobileNavLink 
                href="/contact" 
                text="İletişim"
                isActive={isActive("/contact")}
                icon={<Mail className="w-4 h-4 mr-2" />}
                onClick={() => setIsMobileMenuOpen(false)}
              />
              
              <div className="flex flex-col space-y-2 mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                  <Phone className="w-4 h-4" />
                  <span>+90 532 139 34 59</span>
                </div>
                
                <Link href="/auth">
                  <Button 
                    variant="outline" 
                    className="w-full justify-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Giriş Yap
                  </Button>
                </Link>
                <Link href="/auth?mode=register">
                  <Button 
                    className="w-full justify-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Kayıt Ol
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </header>
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
      <div className={cn(
        "px-3 py-2 rounded-md font-medium flex items-center transition-colors text-sm",
        isActive 
          ? "bg-primary/10 text-primary"
          : "text-gray-700 hover:bg-gray-50 hover:text-primary"
      )}>
        {icon}
        {text}
      </div>
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
      <div 
        className={cn(
          "py-3 px-2 border-b border-gray-100 last:border-0 flex items-center font-medium",
          isActive ? "text-primary" : "text-gray-700"
        )}
        onClick={onClick}
      >
        {icon}
        {text}
        {isActive && <div className="ml-2 w-1.5 h-1.5 rounded-full bg-primary" />}
      </div>
    </Link>
  );
}