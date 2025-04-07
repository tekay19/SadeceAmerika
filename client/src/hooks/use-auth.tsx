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
    data: user,
    error,
    isLoading,
  } = useQuery<User | null, Error>({
    queryKey: ["/api/user"],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginData) => {
      const res = await apiRequest("POST", "/api/login", credentials);
      // Cookieleri tarayıcıya kaydetmek için credentials: include kullanıldı
      // İstek tamamlandıktan sonra kullanıcı bilgisini alıp döndür
      return await res.json();
    },
    onSuccess: (user: User) => {
      // Kullanıcı verisini queryClient'a kaydedelim
      queryClient.setQueryData(["/api/user"], user);
      // Hemen ardından kullanıcı bilgisini güncelleyelim
      queryClient.invalidateQueries({queryKey: ["/api/user"]});
      
      toast({
        title: "Giriş başarılı",
        description: "Hoş geldiniz!",
      });
      
      // Redirect based on user role
      if (user.role === 'admin') {
        window.location.href = "/admin";
      } else if (user.role === 'officer') {
        window.location.href = "/officer";
      } else {
        window.location.href = "/dashboard";
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Giriş başarısız",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (userData: RegisterData) => {
      const res = await apiRequest("POST", "/api/register", userData);
      return await res.json();
    },
    onSuccess: (user: User) => {
      queryClient.setQueryData(["/api/user"], user);
      toast({
        title: "Kayıt başarılı",
        description: "Hesabınız oluşturuldu ve giriş yapıldı!",
      });
      
      // Redirect based on user role (normally users will be normal users)
      window.location.href = "/dashboard";
    },
    onError: (error: Error) => {
      toast({
        title: "Kayıt başarısız",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/logout");
    },
    onSuccess: () => {
      // Kullanıcı verilerini önbelleğe boşalt
      queryClient.setQueryData(["/api/user"], null);
      // Önbelleğin tamamını temizle
      queryClient.clear();
      
      toast({
        title: "Çıkış yapıldı",
        description: "Güvenli bir şekilde çıkış yaptınız.",
      });
      
      // Çerezleri doğru şekilde temizlemek için bir timeout ile yönlendir
      setTimeout(() => {
        window.location.href = "/";
      }, 300);
    },
    onError: (error: Error) => {
      toast({
        title: "Çıkış başarısız",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
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
