import { useState } from "react";
import { useLocation, Redirect } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Key } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function ResetPassword() {
  // URL'den token bilgisini alıyoruz
  const token = new URLSearchParams(window.location.search).get("token");
  const [_, navigate] = useLocation();

  const { toast } = useToast();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Token yoksa ana sayfaya yönlendir
  if (!token) {
    return <Redirect to="/" />;
  }

  // Şifre sıfırlama mutasyonu
  const resetPasswordMutation = useMutation({
    mutationFn: async (credentials: { token: string; newPassword: string }) => {
      const response = await apiRequest("POST", "/api/auth/reset-password", credentials);
      return response;
    },
    onSuccess: () => {
      toast({
        title: "Şifre Başarıyla Güncellendi",
        description: "Yeni şifrenizle giriş yapabilirsiniz. Giriş sayfasına yönlendiriliyorsunuz...",
      });
      
      // 3 saniye sonra login sayfasına yönlendir
      setTimeout(() => {
        navigate("/auth");
      }, 3000);
    },
    onError: (error: Error) => {
      toast({
        title: "Hata",
        description: `Şifre sıfırlanırken bir hata oluştu: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Şifrelerin uyuşup uyuşmadığını kontrol et
    if (newPassword !== confirmPassword) {
      setError("Şifreler uyuşmuyor.");
      return;
    }

    // Şifre karmaşıklığını kontrol et
    if (newPassword.length < 8) {
      setError("Şifre en az 8 karakter uzunluğunda olmalıdır.");
      return;
    }

    // Şifre sıfırlama işlemini başlat
    resetPasswordMutation.mutate({
      token,
      newPassword,
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            <div className="flex items-center justify-center mb-2">
              <Key className="w-8 h-8 text-primary mr-2" />
            </div>
            Şifre Yenileme
          </CardTitle>
          <CardDescription className="text-center">
            Lütfen yeni şifrenizi girin
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-4">
            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-2 rounded-md text-sm">
                {error}
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="newPassword">Yeni Şifre</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                placeholder="********"
                minLength={8}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Şifreyi Tekrar Girin</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="********"
                minLength={8}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={resetPasswordMutation.isPending}
            >
              {resetPasswordMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Şifre Yenileniyor...
                </>
              ) : (
                "Şifreyi Güncelle"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}