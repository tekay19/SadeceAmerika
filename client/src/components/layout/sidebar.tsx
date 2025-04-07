import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Link, useLocation } from "wouter";
import { 
  Home, 
  FileText, 
  Upload, 
  Calendar, 
  User, 
  LogOut, 
  Users, 
  FileCheck,
  Settings,
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Sidebar() {
  const { user, logoutMutation } = useAuth();
  const [location] = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if we're on a mobile screen
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      // If screen becomes smaller than 1024px, collapse the sidebar
      if (window.innerWidth < 1024 && !isCollapsed) {
        setIsCollapsed(true);
      }
    };
    
    // Initial check
    checkScreenSize();
    
    // Add event listener
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [isCollapsed]);

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
      { name: "Belge İnceleme", href: "/documents", icon: FileCheck },
      { name: "Randevu Atama", href: "/appointments", icon: Calendar },
      { name: "Profil", href: "/profile", icon: User },
    ],
    admin: [
      { name: "Gösterge Paneli", href: "/admin", icon: Home },
      { name: "Kullanıcı Yönetimi", href: "/admin/users", icon: Users },
      { name: "Başvuru Yönetimi", href: "/applications", icon: FileText },
      { name: "Belge İnceleme", href: "/documents", icon: FileCheck },
      { name: "Randevu Yönetimi", href: "/appointments", icon: Calendar },
      { name: "Sistem Ayarları", href: "/admin/settings", icon: Settings },
    ],
  };
  
  // Select navigation based on user role
  const navItems = user?.role === "admin" 
    ? navigationItems.admin 
    : user?.role === "officer" 
      ? navigationItems.officer 
      : navigationItems.user;
  
  const handleLogout = () => {
    logoutMutation.mutate();
  };
  
  // Only render on desktop screens
  if (isMobile) {
    return null;
  }
  
  return (
    <aside 
      className={cn(
        "hidden md:flex flex-col bg-white border-r border-gray-200 shadow-sm transition-all duration-300 ease-in-out sticky top-0 h-screen",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        {!isCollapsed ? (
          <div className="flex items-center">
            <img src="/logo.jpg" alt="USA flag" className="w-8 h-8 mr-2" />
            <h1 className="text-lg font-semibold text-gray-800">ABD Vize</h1>
          </div>
        ) : (
          <div className="w-full flex justify-center">
            <img src="/logo.jpg" alt="USA flag" className="w-8 h-8" />
          </div>
        )}
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="ml-auto text-gray-500"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      
      {/* User Section */}
      {!isCollapsed && (
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center mb-1">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <User size={16} />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-800">{user?.firstName} {user?.lastName}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 overflow-y-auto">
        {!isCollapsed && (
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">Menü</p>
        )}
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <li key={item.name}>
                <Link href={item.href}>
                  <div
                    className={cn(
                      "flex items-center px-3 py-2 text-sm font-medium rounded-md cursor-pointer",
                      isActive 
                        ? "text-primary bg-primary/10"
                        : "text-gray-700 hover:bg-gray-100",
                      isCollapsed && "justify-center"
                    )}
                  >
                    <item.icon className={cn("w-5 h-5", isCollapsed ? "" : "mr-2")} />
                    {!isCollapsed && <span>{item.name}</span>}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      {/* Logout */}
      <div className="p-2 border-t border-gray-200">
        <button 
          className={cn(
            "flex items-center px-3 py-2 w-full text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100",
            isCollapsed && "justify-center"
          )}
          onClick={handleLogout}
          disabled={logoutMutation.isPending}
          title="Çıkış Yap"
        >
          <LogOut className={cn("w-5 h-5", isCollapsed ? "" : "mr-2")} />
          {!isCollapsed && <span>Çıkış Yap</span>}
        </button>
      </div>
    </aside>
  );
}
