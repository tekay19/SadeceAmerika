import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Link, useLocation } from "wouter";
import { 
  Menu, 
  Bell, 
  User, 
  Search,
  Home,
  FileText,
  Upload,
  Calendar,
  HelpCircle,
  MessageSquare,
  LogOut,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function Header() {
  const { user, logoutMutation } = useAuth();
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Scroll listener to add shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  // Navigation items based on user role
  const navigationItems = {
    user: [
      { name: "Anasayfa", href: "/", icon: Home },
      { name: "Başvurularım", href: "/applications", icon: FileText },
      { name: "Belge Yükleme", href: "/documents", icon: Upload },
      { name: "Randevularım", href: "/appointments", icon: Calendar },
      { name: "Profil", href: "/profile", icon: User },
    ],
    officer: [
      { name: "Gösterge Paneli", href: "/officer", icon: Home },
      { name: "Başvuru Yönetimi", href: "/applications", icon: FileText },
      { name: "Belge İnceleme", href: "/documents", icon: FileText },
      { name: "Randevu Atama", href: "/appointments", icon: Calendar },
      { name: "Profil", href: "/profile", icon: User },
    ],
    admin: [
      { name: "Gösterge Paneli", href: "/admin", icon: Home },
      { name: "Kullanıcı Yönetimi", href: "/admin/users", icon: User },
      { name: "Başvuru Yönetimi", href: "/applications", icon: FileText },
      { name: "Belge İnceleme", href: "/documents", icon: FileText },
      { name: "Randevu Yönetimi", href: "/appointments", icon: Calendar },
    ],
  };
  
  const supportItems = [
    { name: "Yardım", href: "/help", icon: HelpCircle },
    { name: "Geri Bildirim", href: "/feedback", icon: MessageSquare },
  ];
  
  // Select navigation based on user role
  const navItems = user?.role === "admin" 
    ? navigationItems.admin 
    : user?.role === "officer" 
      ? navigationItems.officer 
      : navigationItems.user;
  
  const handleLogout = () => {
    logoutMutation.mutate();
  };
  
  // Custom NavItem component to avoid nesting <a> tags
  const NavItem = ({ item, isActive, onClick }) => (
    <li key={item.name}>
      <Link href={item.href}>
        <div 
          className={cn(
            "flex items-center px-3 py-2 text-sm font-medium rounded-md cursor-pointer",
            isActive 
              ? "text-primary bg-primary/10"
              : "text-gray-700 hover:bg-gray-100"
          )}
          onClick={onClick}
        >
          <item.icon className="w-5 h-5 mr-2" />
          <span>{item.name}</span>
        </div>
      </Link>
    </li>
  );
  
  return (
    <>
      <header className={cn(
        "bg-white border-b border-gray-200 sticky top-0 z-20 transition-shadow duration-200",
        isScrolled ? "shadow-md" : "shadow-sm"
      )}>
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo for mobile */}
          <div className="md:hidden flex items-center">
            <img src="/logo.jpg" alt="SadeceAmerika logo" className="h-8 mr-2" />
            <span className="text-sm font-semibold text-gray-800">ABD Vize</span>
          </div>
          
          {/* Search */}
          <div className="flex-1 max-w-md mx-4 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Başvuru ara..."
                className="pl-10 pr-3 py-2 w-full"
              />
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
              <Bell className="h-5 w-5" />
            </Button>
            
            {/* User profile - always visible */}
            <Button variant="ghost" size="icon" className="rounded-full">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <User className="h-4 w-4" />
              </div>
            </Button>
            
            {/* Mobile menu toggle */}
            <Button 
              variant="ghost"
              size="icon" 
              className="md:hidden text-gray-500 hover:text-gray-700"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu - Full Screen Overlay */}
      <div className={cn(
        "fixed inset-0 z-10 md:hidden bg-white pt-16 pb-20 transition-transform duration-300 ease-in-out overflow-y-auto",
        mobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <User className="h-5 w-5" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-800">{user?.firstName} {user?.lastName}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>
        </div>
        
        {/* Mobile search */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Başvuru ara..."
              className="pl-10 pr-3 py-2 w-full"
            />
          </div>
        </div>
        
        <nav className="p-4">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Ana Menü
          </div>
          <ul className="space-y-1 mb-6">
            {navItems.map((item) => {
              const isActive = location === item.href;
              return (
                <NavItem 
                  key={item.name}
                  item={item}
                  isActive={isActive}
                  onClick={() => setMobileMenuOpen(false)}
                />
              );
            })}
          </ul>
          
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Destek
          </div>
          <ul className="space-y-1 mb-6">
            {supportItems.map((item) => {
              const isActive = location === item.href;
              return (
                <NavItem 
                  key={item.name}
                  item={item}
                  isActive={isActive}
                  onClick={() => setMobileMenuOpen(false)}
                />
              );
            })}
          </ul>
          
          <div className="border-t border-gray-100 pt-4 mt-4">
            <Button 
              className="w-full justify-center"
              variant="outline"
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
            >
              <LogOut className="w-4 h-4 mr-2" />
              <span>Çıkış Yap</span>
            </Button>
          </div>
        </nav>
      </div>
    </>
  );
}
