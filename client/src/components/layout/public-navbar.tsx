import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function PublicNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <img 
                  src="https://images.unsplash.com/photo-1508722830436-0faffb8ba5f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=32&h=32&q=80" 
                  alt="SadeceAmerika logo" 
                  className="w-8 h-8 mr-2 rounded-full" 
                />
                <span className="text-lg font-bold text-primary">SadeceAmerika</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/">
              <span className="text-gray-700 hover:text-primary font-medium cursor-pointer transition-all duration-200 hover:scale-105">Anasayfa</span>
            </Link>
            <Link href="/services">
              <span className="text-gray-700 hover:text-primary font-medium cursor-pointer transition-all duration-200 hover:scale-105">Hizmetlerimiz</span>
            </Link>
            <Link href="/about">
              <span className="text-gray-700 hover:text-primary font-medium cursor-pointer transition-all duration-200 hover:scale-105">Hakkımızda</span>
            </Link>
            <Link href="/contact">
              <span className="text-gray-700 hover:text-primary font-medium cursor-pointer transition-all duration-200 hover:scale-105">İletişim</span>
            </Link>
          </nav>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="outline" className="font-medium hover:shadow-md transition-all duration-200 hover:translate-y-[-2px]">Giriş Yap</Button>
            </Link>
            <Link href="/auth?mode=register">
              <Button className="font-medium hover:shadow-md transition-all duration-200 hover:translate-y-[-2px]">Kayıt Ol</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-500 hover:text-primary focus:outline-none transition-all duration-200"
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
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-2 shadow-lg">
          <div className="container mx-auto px-4">
            <nav className="flex flex-col space-y-3 py-3">
              <Link href="/">
                <span 
                  className="text-gray-700 hover:text-primary py-2 font-medium block cursor-pointer"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Anasayfa
                </span>
              </Link>
              <Link href="/services">
                <span 
                  className="text-gray-700 hover:text-primary py-2 font-medium block cursor-pointer"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Hizmetlerimiz
                </span>
              </Link>
              <Link href="/about">
                <span 
                  className="text-gray-700 hover:text-primary py-2 font-medium block cursor-pointer"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Hakkımızda
                </span>
              </Link>
              <Link href="/contact">
                <span 
                  className="text-gray-700 hover:text-primary py-2 font-medium block cursor-pointer"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  İletişim
                </span>
              </Link>
              <div className="flex flex-col space-y-2 pt-2 border-t border-gray-100">
                <Link href="/dashboard">
                  <Button 
                    variant="outline" 
                    className="w-full justify-center font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Giriş Yap
                  </Button>
                </Link>
                <Link href="/auth?mode=register">
                  <Button 
                    className="w-full justify-center font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Kayıt Ol
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}