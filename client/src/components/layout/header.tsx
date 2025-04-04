import { useState } from "react";
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
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function Header() {
  const { user, logoutMutation } = useAuth();
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
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
  
  return (
    <>
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          
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
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="relative ml-4 md:hidden">
              <Button variant="ghost" size="icon" className="rounded-full">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <User className="h-4 w-4" />
                </div>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={cn("md:hidden bg-white border-b border-gray-200 shadow-md", !mobileMenuOpen && "hidden")}>
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
        
        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = location === item.href;
              return (
                <li key={item.name}>
                  <Link href={item.href}>
                    <a 
                      className={cn(
                        "flex items-center px-3 py-2 text-sm font-medium rounded-md",
                        isActive 
                          ? "text-primary bg-primary/10"
                          : "text-gray-700 hover:bg-gray-100"
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <item.icon className="w-5 h-5 mr-2" />
                      <span>{item.name}</span>
                    </a>
                  </Link>
                </li>
              );
            })}
            
            {supportItems.map((item) => {
              const isActive = location === item.href;
              return (
                <li key={item.name}>
                  <Link href={item.href}>
                    <a 
                      className={cn(
                        "flex items-center px-3 py-2 text-sm font-medium rounded-md",
                        isActive 
                          ? "text-primary bg-primary/10"
                          : "text-gray-700 hover:bg-gray-100"
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <item.icon className="w-5 h-5 mr-2" />
                      <span>{item.name}</span>
                    </a>
                  </Link>
                </li>
              );
            })}
            
            <li>
              <button 
                className="flex items-center px-3 py-2 w-full text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
              >
                <LogOut className="w-5 h-5 mr-2" />
                <span>Çıkış Yap</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
