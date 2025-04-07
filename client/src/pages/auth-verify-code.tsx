// İki faktörlü doğrulama için kod onaylama sayfası
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { Link } from "wouter";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Form için Zod şeması
const verifyCodeSchema = z.object({
  code: z.string()
    .min(6, { message: "Doğrulama kodu en az 6 karakter olmalıdır" })
    .max(6, { message: "Doğrulama kodu en fazla 6 karakter olmalıdır" })
});

type VerifyCodeFormValues = z.infer<typeof verifyCodeSchema>;

export default function AuthVerifyCodePage() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(600); // 10 dakika = 600 saniye
  const [expired, setExpired] = useState(false);
  const [userData, setUserData] = useState<{ userId: number, email: string } | null>(null);

  // URL parametrelerini al
  const searchParams = new URLSearchParams(window.location.search);
  const userId = searchParams.get("userId");
  const email = searchParams.get("email");

  useEffect(() => {
    // UserID ve email parametreleri kontrol et
    if (!userId || !email) {
      setError("Geçersiz doğrulama bağlantısı. Lütfen tekrar giriş yapmayı deneyin.");
      return;
    }

    setUserData({
      userId: parseInt(userId),
      email: email
    });
    
    // Geri sayım başlat
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [userId, email]);
  
  // Kalan süreyi formatla
  const formatCountdown = () => {
    const minutes = Math.floor(countdown / 60);
    const seconds = countdown % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Form tanımlama
  const form = useForm<VerifyCodeFormValues>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: {
      code: ""
    }
  });

  // Form gönderme
  const onSubmit = async (values: VerifyCodeFormValues) => {
    if (!userData) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          code: values.code,
          userId: userData.userId
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast({
          title: "Doğrulama başarılı",
          description: "Giriş yapılıyor...",
        });
        
        // Yönlendirme yaparken userId'yi önbelleğe kaydedelim
        localStorage.setItem('userId', userData.userId.toString());
        
        // Kullanıcı rolüne göre doğru sayfaya yönlendir
        const userData = data.user;
        if (userData) {
          console.log("Verification successful, user data:", userData);
          
          // Kullanıcı rolüne göre yönlendirme
          setTimeout(() => {
            if (userData.role === 'admin') {
              window.location.href = "/admin";
            } else if (userData.role === 'officer') {
              window.location.href = "/officer";
            } else {
              window.location.href = "/dashboard";
            }
          }, 500);
        } else {
          // Eğer kullanıcı verisi bulunamazsa güvenli bir şekilde anasayfaya yönlendir
          navigate("/");
        }
      } else {
        setError(data.message || "Doğrulama kodu geçersiz. Lütfen tekrar deneyin.");
      }
    } catch (error) {
      console.error("Verification error:", error);
      setError("Doğrulama sırasında bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">E-posta Doğrulama</CardTitle>
          <CardDescription className="text-center">
            {userData?.email} adresine gönderilen 6 haneli doğrulama kodunu giriniz
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Hata</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {expired ? (
            <div className="text-center space-y-4">
              <p className="text-destructive">Doğrulama kodunun süresi doldu.</p>
              <Button asChild variant="outline" className="w-full">
                <Link href="/auth">Tekrar Giriş Yap</Link>
              </Button>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Doğrulama Kodu</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="6 haneli kod"
                          {...field}
                          className="text-center tracking-widest text-lg"
                          maxLength={6}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="text-center text-sm text-muted-foreground">
                  Kalan süre: {formatCountdown()}
                </div>
                
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Doğrulanıyor..." : "Doğrula"}
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
        
        <CardFooter className="flex flex-col gap-2">
          <div className="text-sm text-center text-muted-foreground">
            Kod almadınız mı? Spam klasörünüzü kontrol edin veya
          </div>
          <Button asChild variant="outline" className="w-full">
            <Link href="/auth">Tekrar Giriş Yap</Link>
          </Button>
          <Button asChild variant="link" className="w-full">
            <Link href="/">Ana Sayfaya Dön</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}