import { useState } from "react";
import { useLocation, Link } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Mail, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function ForgotPassword() {
  const [_, navigate] = useLocation();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Şifre sıfırlama e-postası gönderme mutasyonu
  const forgotPasswordMutation = useMutation({
    mutationFn: async (data: { email: string }) => {
      const response = await apiRequest("POST", "/api/auth/forgot-password", data);
      return response;
    },
    onSuccess: () => {
      setSuccessMessage(
        "Şifre sıfırlama talimatları e-posta adresinize gönderildi. Lütfen gelen kutunuzu kontrol edin."
      );
      
      toast({
        title: "E-posta Gönderildi",
        description: "Şifre sıfırlama talimatlarını içeren bir e-posta gönderildi.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Hata",
        description: `İşlem sırasında bir hata oluştu: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    forgotPasswordMutation.mutate({ email });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="w-4 h-4 mr-1" />
            <span>Ana Sayfaya Dön</span>
          </Link>
        </div>
        
        <Card className="w-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              <div className="flex items-center justify-center mb-2">
                <Mail className="w-8 h-8 text-primary mr-2" />
              </div>
              Şifremi Unuttum
            </CardTitle>
            <CardDescription className="text-center">
              Hesabınıza bağlı e-posta adresinizi girin
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="grid gap-4">
              {successMessage && (
                <div className="bg-green-50 text-green-600 px-4 py-2 rounded-md text-sm">
                  {successMessage}
                </div>
              )}
              <div className="grid gap-2">
                <Label htmlFor="email">E-posta Adresi</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="ornek@email.com"
                  disabled={!!successMessage}
                />
                <p className="text-xs text-gray-500">
                  Kayıtlı e-posta adresinize şifre sıfırlama bağlantısı göndereceğiz.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button
                type="submit"
                className="w-full"
                disabled={forgotPasswordMutation.isPending || !!successMessage}
              >
                {forgotPasswordMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> İşleniyor...
                  </>
                ) : (
                  "Şifre Sıfırlama Bağlantısı Gönder"
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full mt-2"
                onClick={() => navigate("/auth")}
              >
                Giriş Sayfasına Dön
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}