import { useAuth } from "@/hooks/use-auth";
import { Link, useLocation } from "wouter";
import { 
  Home, 
  FileText, 
  Upload, 
  Calendar, 
  User, 
  HelpCircle, 
  MessageSquare, 
  LogOut, 
  Users, 
  FileCheck,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const { user, logoutMutation } = useAuth();
  const [location] = useLocation();

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
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 shadow-sm">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center">
          <img src="https://images.unsplash.com/photo-1508722830436-0faffb8ba5f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=40&h=40&q=80" alt="USA flag" className="w-8 h-8 mr-2" />
          <h1 className="text-lg font-semibold text-gray-800">ABD Vize Başvuru</h1>
        </div>
      </div>
      
      {/* User Section */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <User size={18} />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-800">{user?.firstName} {user?.lastName}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-4">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Menü</p>
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <li key={item.name}>
                <div
                  onClick={() => window.location.href = item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md cursor-pointer",
                    isActive 
                      ? "text-primary bg-primary/10"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <item.icon className="w-5 h-5 mr-2" />
                  <span>{item.name}</span>
                </div>
              </li>
            );
          })}
        </ul>
        
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-6 mb-3">Destek</p>
        <ul className="space-y-1">
          {supportItems.map((item) => {
            const isActive = location === item.href;
            return (
              <li key={item.name}>
                <div
                  onClick={() => window.location.href = item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md cursor-pointer",
                    isActive 
                      ? "text-primary bg-primary/10"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <item.icon className="w-5 h-5 mr-2" />
                  <span>{item.name}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </nav>
      
      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button 
          className="flex items-center px-3 py-2 w-full text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
          onClick={handleLogout}
          disabled={logoutMutation.isPending}
        >
          <LogOut className="w-5 h-5 mr-2" />
          <span>Çıkış Yap</span>
        </button>
      </div>
    </aside>
  );
}
