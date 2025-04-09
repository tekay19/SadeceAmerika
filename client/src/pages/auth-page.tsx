import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Redirect, useLocation, Link } from "wouter";
import { Loader2, ArrowLeft } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { PrivacyPolicy } from "@/components/admin/privacy-policy";

const loginSchema = z.object({
  username: z.string().min(3, "Kullanıcı adı en az 3 karakter olmalıdır."),
  password: z.string().min(6, "Şifre en az 6 karakter olmalıdır."),
});

const registerSchema = z.object({
  username: z.string().min(3, "Kullanıcı adı en az 3 karakter olmalıdır."),
  password: z.string().min(6, "Şifre en az 6 karakter olmalıdır."),
  confirmPassword: z.string().min(6, "Şifre en az 6 karakter olmalıdır."),
  firstName: z.string().min(2, "Ad en az 2 karakter olmalıdır."),
  lastName: z.string().min(2, "Soyad en az 2 karakter olmalıdır."),
  email: z.string().email("Geçerli bir e-posta adresi giriniz."),
  phone: z.string().optional(),
  terms: z.boolean().refine(val => val === true, {
    message: "Gizlilik sözleşmesini kabul etmelisiniz",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Şifreler eşleşmiyor.",
  path: ["confirmPassword"],
});

export default function AuthPage() {
  const { user, loginMutation, registerMutation } = useAuth();
  const [, setLocation] = useLocation();
  
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  
  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      terms: false,
    },
  });
  
  const onLoginSubmit = (values: z.infer<typeof loginSchema>) => {
    loginMutation.mutate(values);
  };
  
  const onRegisterSubmit = (values: z.infer<typeof registerSchema>) => {
    const { confirmPassword, terms, ...registerData } = values;
    registerMutation.mutate(registerData);
  };

  // Redirect if already logged in based on role
  if (user) {
    if (user.role === 'admin') {
      return <Redirect to="/admin" />;
    } else if (user.role === 'officer') {
      return <Redirect to="/officer" />;
    } else {
      return <Redirect to="/dashboard" />;
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left side - Auth form */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-4 py-12 bg-white">
        <div className="mx-auto w-full max-w-md">
          <div className="flex flex-col items-center mb-8">
            <img 
              src="/logo.jpg" 
              alt="USA flag" 
              className="w-24 h-24 mb-3 rounded-lg shadow-md" 
            />
            <h1 className="text-3xl font-bold text-gray-800 text-center">ABD Vize Başvuru Sistemi</h1>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-blue-700 rounded mt-2"></div>
          </div>
          
          <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-all duration-300 hover:translate-x-1">
            <Button variant="ghost" className="flex items-center space-x-2 py-2 px-4 rounded-full">
              <ArrowLeft className="w-4 h-4" />
              <span>Ana Sayfaya Dön</span>
            </Button>
          </Link>
          
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 rounded-full p-1 bg-gray-100">
              <TabsTrigger value="login" className="rounded-full data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all">Giriş Yap</TabsTrigger>
              <TabsTrigger value="register" className="rounded-full data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all">Kayıt Ol</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="animate-in fade-in-50 duration-300">
              <Card className="border-none shadow-lg rounded-xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 pb-4">
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 bg-blue-600 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
                    </div>
                    <div>
                      <CardTitle>Hesabınıza Giriş Yapın</CardTitle>
                      <CardDescription>Vize başvurunuzu yönetmek için giriş yapın.</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                      <FormField
                        control={loginForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-medium">Kullanıcı Adı</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="kullanici_adi" 
                                {...field} 
                                className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-medium">Şifre</FormLabel>
                            <FormControl>
                              <Input 
                                type="password" 
                                placeholder="********" 
                                {...field} 
                                className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="remember" />
                          <label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer">Beni Hatırla</label>
                        </div>
                        <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-all">Şifremi Unuttum</Link>
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full mt-6 rounded-lg py-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all"
                        disabled={loginMutation.isPending}
                      >
                        {loginMutation.isPending ? (
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        ) : (
                          <svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
                        )}
                        Giriş Yap
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="register" className="animate-in fade-in-50 duration-300">
              <Card className="border-none shadow-lg rounded-xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 pb-4">
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 bg-blue-600 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
                    </div>
                    <div>
                      <CardTitle>Yeni Hesap Oluşturun</CardTitle>
                      <CardDescription>Vize başvurusu yapabilmek için kaydolun.</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <Form {...registerForm}>
                    <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={registerForm.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-medium">Ad</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Ahmet" 
                                  {...field} 
                                  className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all" 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={registerForm.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-medium">Soyad</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Yılmaz" 
                                  {...field}
                                  className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all" 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={registerForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-medium">E-posta</FormLabel>
                            <FormControl>
                              <Input 
                                type="email" 
                                placeholder="ornek@mail.com" 
                                {...field} 
                                className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={registerForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-medium">Telefon</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="+90 555 123 4567" 
                                {...field} 
                                className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={registerForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-medium">Kullanıcı Adı</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="kullanici_adi" 
                                {...field} 
                                className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={registerForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-medium">Şifre</FormLabel>
                              <FormControl>
                                <Input 
                                  type="password" 
                                  placeholder="********" 
                                  {...field} 
                                  className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all" 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={registerForm.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-medium">Şifre (Tekrar)</FormLabel>
                              <FormControl>
                                <Input 
                                  type="password" 
                                  placeholder="********" 
                                  {...field} 
                                  className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all" 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={registerForm.control}
                        name="terms"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-4">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="data-[state=checked]:bg-blue-600"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="text-sm text-gray-600">
                                Kullanım şartlarını ve <PrivacyPolicy /> kabul ediyorum
                              </FormLabel>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full mt-6 rounded-lg py-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all"
                        disabled={registerMutation.isPending}
                      >
                        {registerMutation.isPending ? (
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        ) : (
                          <svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
                        )}
                        Kayıt Ol
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Right side - Hero section */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 text-white flex-col justify-center items-center p-12 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-white"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-white"></div>
        </div>
        
        <div className="max-w-md mx-auto relative z-10">
          <div className="w-16 h-1 bg-white mb-8 rounded"></div>
          <h2 className="text-4xl font-bold mb-6 leading-tight">ABD Vize Başvurusu <span className="relative inline-block">
            Kolaylaştı
            <span className="absolute bottom-0 left-0 right-0 h-1 bg-white opacity-50"></span>
          </span></h2>
          <p className="text-xl mb-10 text-blue-100">Yenilikçi ve kullanıcı dostu arayüzümüz ile vize başvuru sürecinizi kolayca yönetin.</p>
          
          <div className="space-y-8">
            <div className="flex items-start bg-blue-700 bg-opacity-30 p-4 rounded-xl hover:bg-opacity-40 transition-all transform hover:scale-105 hover:shadow-lg">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-white text-blue-600 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">Kolay Başvuru</h3>
                <p className="mt-1 text-blue-100">Adım adım yönlendirmeler ile hızlı ve hatasız başvuru yapın.</p>
              </div>
            </div>
            
            <div className="flex items-start bg-blue-700 bg-opacity-30 p-4 rounded-xl hover:bg-opacity-40 transition-all transform hover:scale-105 hover:shadow-lg">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-white text-blue-600 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">Gerçek Zamanlı Takip</h3>
                <p className="mt-1 text-blue-100">Başvurunuzun durumunu anlık olarak takip edin.</p>
              </div>
            </div>
            
            <div className="flex items-start bg-blue-700 bg-opacity-30 p-4 rounded-xl hover:bg-opacity-40 transition-all transform hover:scale-105 hover:shadow-lg">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-white text-blue-600 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m-6-8h6M5 10v4a7 7 0 007 7 7 7 0 007-7v-4M5 10a7 7 0 017-7 7 7 0 017 7" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">Güvenli Belge Yönetimi</h3>
                <p className="mt-1 text-blue-100">Belgelerinizi güvenle yükleyin ve durumlarını kontrol edin.</p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 flex space-x-4">
            <div className="w-3 h-3 rounded-full bg-blue-300"></div>
            <div className="w-3 h-3 rounded-full bg-white"></div>
            <div className="w-3 h-3 rounded-full bg-blue-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
