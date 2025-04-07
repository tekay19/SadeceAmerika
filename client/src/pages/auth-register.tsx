import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, UserPlus, Mail, Lock, ArrowLeft, CheckCircle2 } from "lucide-react";
import { PrivacyPolicy } from "@/components/admin/privacy-policy";

// Kayıt formu validasyon şeması
const registerFormSchema = z.object({
  firstName: z.string().min(2, { message: "Ad en az 2 karakter olmalıdır" }),
  lastName: z.string().min(2, { message: "Soyad en az 2 karakter olmalıdır" }),
  username: z.string().min(3, { message: "Kullanıcı adı en az 3 karakter olmalıdır" }),
  email: z.string().email({ message: "Geçerli bir e-posta adresi giriniz" }),
  phone: z.string().optional(),
  password: z.string().min(6, { message: "Şifre en az 6 karakter olmalıdır" }),
  confirmPassword: z.string(),
  terms: z.boolean().refine(val => val === true, {
    message: "Gizlilik sözleşmesini kabul etmelisiniz",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Şifreler eşleşmiyor",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerFormSchema>;

export default function AuthRegister() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form tanımlama
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      terms: false,
    }
  });

  // Kayıt mutasyonu
  const registerMutation = useMutation({
    mutationFn: async (userData: Omit<RegisterFormValues, "confirmPassword" | "terms">) => {
      return await apiRequest("POST", "/api/register", userData);
    },
    onSuccess: () => {
      setSuccessMessage("Hesabınız başarıyla oluşturuldu! Giriş yapabilirsiniz.");
      form.reset();
      
      // 3 saniye sonra giriş sayfasına yönlendir
      setTimeout(() => {
        setLocation("/login");
      }, 3000);
    },
    onError: (error: Error) => {
      toast({
        title: "Kayıt hatası",
        description: error.message || "Kayıt olurken bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive",
      });
    },
  });

  // Form gönderildiğinde
  function onSubmit(data: RegisterFormValues) {
    // confirmPassword ve terms alanlarını çıkart
    const { confirmPassword, terms, ...userData } = data;
    registerMutation.mutate(userData);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex justify-between items-center">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="mb-2">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Giriş Yap
              </Button>
            </Link>
          </div>
          <CardTitle className="text-2xl font-bold">Hesap Oluştur</CardTitle>
          <CardDescription>
            Sadece Amerika vize başvuru sistemine kayıt olmak için aşağıdaki formu doldurun
          </CardDescription>
        </CardHeader>
        <CardContent>
          {successMessage ? (
            <Alert className="mb-6 bg-green-50 border-green-100">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <AlertDescription className="text-green-800">{successMessage}</AlertDescription>
            </Alert>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ad</FormLabel>
                        <FormControl>
                          <Input placeholder="Adınız" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Soyad</FormLabel>
                        <FormControl>
                          <Input placeholder="Soyadınız" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kullanıcı Adı</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            placeholder="Kullanıcı adınız" 
                            className="pl-10" 
                            {...field} 
                          />
                          <UserPlus className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-posta</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            type="email" 
                            placeholder="E-posta adresiniz" 
                            className="pl-10" 
                            {...field} 
                          />
                          <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefon (İsteğe Bağlı)</FormLabel>
                      <FormControl>
                        <Input placeholder="+90 555 123 4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Şifre</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              type="password" 
                              placeholder="Şifreniz" 
                              className="pl-10" 
                              {...field} 
                            />
                            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Şifre Tekrar</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              type="password" 
                              placeholder="Şifrenizi tekrar girin" 
                              className="pl-10" 
                              {...field} 
                            />
                            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-normal">
                          <PrivacyPolicy /> sözleşmesini okudum ve kabul ediyorum
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={registerMutation.isPending}
                >
                  {registerMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Hesap Oluşturuluyor...
                    </>
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Hesap Oluştur
                    </>
                  )}
                </Button>

                <div className="text-center mt-4">
                  <p className="text-sm text-gray-600">
                    Zaten hesabınız var mı?{" "}
                    <Link href="/login">
                      <Button variant="link" className="p-0">
                        Giriş Yap
                      </Button>
                    </Link>
                  </p>
                </div>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}