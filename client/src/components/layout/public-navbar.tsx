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
              <a className="flex items-center">
                <img 
                  src="https://images.unsplash.com/photo-1508722830436-0faffb8ba5f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=32&h=32&q=80" 
                  alt="SadeceAmerika logo" 
                  className="w-8 h-8 mr-2" 
                />
                <span className="text-lg font-semibold text-gray-800">SadeceAmerika</span>
              </a>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/">
              <a className="text-gray-700 hover:text-primary font-medium">Anasayfa</a>
            </Link>
            <Link href="/services">
              <a className="text-gray-700 hover:text-primary font-medium">Hizmetlerimiz</a>
            </Link>
            <Link href="/about">
              <a className="text-gray-700 hover:text-primary font-medium">Hakkımızda</a>
            </Link>
            <Link href="/contact">
              <a className="text-gray-700 hover:text-primary font-medium">İletişim</a>
            </Link>
          </nav>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/auth">
              <Button variant="outline">Giriş Yap</Button>
            </Link>
            <Link href="/auth?mode=register">
              <Button>Kayıt Ol</Button>
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
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-2">
          <div className="container mx-auto px-4">
            <nav className="flex flex-col space-y-3 py-3">
              <Link href="/">
                <a 
                  className="text-gray-700 hover:text-primary py-2 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Anasayfa
                </a>
              </Link>
              <Link href="/services">
                <a 
                  className="text-gray-700 hover:text-primary py-2 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Hizmetlerimiz
                </a>
              </Link>
              <Link href="/about">
                <a 
                  className="text-gray-700 hover:text-primary py-2 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Hakkımızda
                </a>
              </Link>
              <Link href="/contact">
                <a 
                  className="text-gray-700 hover:text-primary py-2 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  İletişim
                </a>
              </Link>
              <div className="flex flex-col space-y-2 pt-2 border-t border-gray-100">
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
      )}
    </header>
  );
}