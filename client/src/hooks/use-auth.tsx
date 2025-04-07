import { createContext, ReactNode, useContext } from "react";
import {
  useQuery,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";
import { User, InsertUser } from "@shared/schema";
import { getQueryFn, apiRequest, queryClient } from "../lib/queryClient";
import { useToast } from "@/hooks/use-toast";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  loginMutation: UseMutationResult<User, Error, LoginData>;
  logoutMutation: UseMutationResult<void, Error, void>;
  registerMutation: UseMutationResult<User, Error, RegisterData>;
};

type LoginData = {
  username: string;
  password: string;
};

type RegisterData = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const {
    data: userData,
    error,
    isLoading,
  } = useQuery<any | null, Error>({
    queryKey: ["/api/user"],
    queryFn: async ({ queryKey }) => {
      try {
        const res = await fetch(queryKey[0] as string, {
          credentials: "include",
          headers: {
            "Cache-Control": "no-cache",
            "Pragma": "no-cache"
          }
        });
        
        if (res.status === 401) {
          return null;
        }
        
        const data = await res.json();
        console.log("User data response:", data);
        
        // Yeni API yanıt formatını kontrol et
        if (data && data.success) {
          return data.user;
        }
        
        return null;
      } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
      }
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    staleTime: 5 * 60 * 1000, // 5 dakika
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginData) => {
      // Değiştirilmiş yanıt formatını ele alacak şekilde güncellendi
      const res = await apiRequest("POST", "/api/login", credentials);
      const data = await res.json();
      
      // İki faktörlü doğrulama gerekiyorsa
      if (data.success && data.requireVerification) {
        window.location.href = `/auth-verify-code?userId=${data.userId}&email=${encodeURIComponent(data.email)}`;
        // İki faktörlü doğrulama durumunda null döndürüyoruz
        // Bu sayede onSuccess tetiklenmez ve mevcut sayfa değişmez
        return null;
      }
      
      // Yanıt kontrolü
      if (!data.success) {
        throw new Error(data.message || "Giriş başarısız oldu");
      }
      
      // Başarılı ise kullanıcı nesnesini döndür
      return data.user;
    },
    onSuccess: (userData: any) => {
      // Eğer userData null ise (iki faktörlü doğrulama gerekiyorsa) işlem yapma
      if (!userData) return;
      
      console.log("Login successful, user data:", userData);
      
      // Kullanıcı verisini queryClient'a kaydedelim
      queryClient.setQueryData(["/api/user"], { success: true, user: userData });
      
      // Önbellek güncelleme ve kullanıcı durumunu doğrudan sorgula
      queryClient.invalidateQueries({queryKey: ["/api/user"]});
      
      // Giriş başarısını göster
      toast({
        title: "Giriş başarılı",
        description: "Hoş geldiniz!",
      });
      
      // Kısa bir gecikme ile yönlendirme yap (çerezin kaydedilmesi için)
      setTimeout(() => {
        // Redirect based on user role
        if (userData.role === 'admin') {
          window.location.href = "/admin";
        } else if (userData.role === 'officer') {
          window.location.href = "/officer";
        } else {
          window.location.href = "/dashboard";
        }
      }, 500);
    },
    onError: (error: Error) => {
      console.error("Login error:", error);
      
      toast({
        title: "Giriş başarısız",
        description: error.message || "Kullanıcı adı veya şifre hatalı",
        variant: "destructive",
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (userData: RegisterData) => {
      const res = await apiRequest("POST", "/api/register", userData);
      const data = await res.json();
      
      // Yeni API yanıt formatını kontrol et (ileride güncellenecek)
      if (data && data.success === false) {
        throw new Error(data.message || "Kayıt işlemi başarısız oldu");
      }
      
      return data;
    },
    onSuccess: (data: any) => {
      // API yanıt formatına göre kullanıcı bilgisini al
      const userData = data.user || data;
      
      console.log("Registration successful, user data:", userData);
      
      // Kullanıcı verisini cache'e kaydet
      queryClient.setQueryData(["/api/user"], userData);
      
      toast({
        title: "Kayıt başarılı",
        description: "Hesabınız oluşturuldu ve giriş yapıldı!",
      });
      
      // Redirect based on user role (normally users will be normal users)
      window.location.href = "/dashboard";
    },
    onError: (error: Error) => {
      console.error("Registration error:", error);
      
      toast({
        title: "Kayıt başarısız",
        description: error.message || "Kayıt işlemi sırasında bir hata oluştu.",
        variant: "destructive",
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      try {
        const res = await apiRequest("POST", "/api/logout");
        const data = await res.json();
        return data;
      } catch (error) {
        console.error("Logout error:", error);
        throw error;
      }
    },
    onSuccess: (data: any) => {
      console.log("Logout successful:", data);
      
      // Kullanıcı verilerini önbelleğe boşalt
      queryClient.setQueryData(["/api/user"], null);
      
      // Önbelleğin tamamını temizle
      queryClient.clear();
      
      toast({
        title: "Çıkış yapıldı",
        description: "Güvenli bir şekilde çıkış yaptınız.",
      });
      
      // Tarayıcıdaki tüm çerezleri temizlemek için bir çözüm
      document.cookie.split(';').forEach(cookie => {
        const trimmedCookie = cookie.trim();
        const name = trimmedCookie.split('=')[0];
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      });
      
      // Çerezleri doğru şekilde temizlemek için bir timeout ile yönlendir
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
    },
    onError: (error: Error) => {
      console.error("Logout error:", error);
      
      toast({
        title: "Çıkış başarısız",
        description: error.message || "Çıkış yapılırken bir hata oluştu",
        variant: "destructive",
      });
    },
  });

  return (
    <AuthContext.Provider
      value={{
        user: userData ?? null,
        isLoading,
        error,
        loginMutation,
        logoutMutation,
        registerMutation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
