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
import { Loader2, ArrowLeft, CheckCircle, Shield, Lock, Users } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { PrivacyPolicy } from "@/components/admin/privacy-policy";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const loginSchema = z.object({
  username: z.string().min(3, {message: "validations.usernameMin"}),
  password: z.string().min(6, {message: "validations.passwordMin"}),
});

const registerSchema = z.object({
  username: z.string().min(3, {message: "validations.usernameMin"}),
  password: z.string().min(6, {message: "validations.passwordMin"}),
  confirmPassword: z.string().min(6, {message: "validations.passwordMin"}),
  firstName: z.string().min(2, {message: "validations.nameMin"}),
  lastName: z.string().min(2, {message: "validations.nameMin"}),
  email: z.string().email({message: "validations.email"}),
  phone: z.string().optional(),
  terms: z.boolean().refine(val => val === true, {
    message: "auth.acceptTerms",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "auth.passwordMismatch",
  path: ["confirmPassword"],
});

export default function AuthPage() {
  const { user, loginMutation, registerMutation } = useAuth();
  const [, setLocation] = useLocation();
  const { t } = useTranslation();
  const [animateHero, setAnimateHero] = useState(false);
  const [policyOpen, setPolicyOpen] = useState(false);
  
  useEffect(() => {
    setAnimateHero(true);
  }, []);
  
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        duration: 0.5, 
        when: "beforeChildren",
        staggerChildren: 0.2
      } 
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  const handleOpenPolicy = () => {
    setPolicyOpen(true);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Auth form */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-4 py-12 bg-white">
        <div className="mx-auto w-full max-w-md">
          <motion.div 
            className="flex flex-col items-center mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.img 
              src="/logo.jpg" 
              alt="USA flag" 
              className="w-24 h-24 mb-3 rounded-lg shadow-md" 
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <motion.h1 
              className="text-3xl font-bold text-gray-800 text-center"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {t('common.appName')}
            </motion.h1>
            <motion.div 
              className="w-16 h-1 bg-gradient-to-r from-blue-500 to-blue-700 rounded mt-2"
              initial={{ width: 0 }}
              animate={{ width: "4rem" }}
              transition={{ delay: 0.6, duration: 0.4 }}
            />
          </motion.div>
          
          <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-all duration-300 hover:translate-x-1">
            <Button variant="ghost" className="flex items-center space-x-2 py-2 px-4 rounded-full">
              <ArrowLeft className="w-4 h-4" />
              <span>{t('common.backToHome')}</span>
            </Button>
          </Link>
          
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 rounded-full p-1 bg-gray-100">
              <TabsTrigger value="login" className="rounded-full data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all">{t('auth.login')}</TabsTrigger>
              <TabsTrigger value="register" className="rounded-full data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all">{t('auth.register')}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="animate-in fade-in-50 duration-300">
              <Card className="border-none shadow-lg rounded-xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 pb-4">
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 bg-blue-600 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
                    </div>
                    <div>
                      <CardTitle>{t('auth.loginToAccount')}</CardTitle>
                      <CardDescription>{t('auth.loginDescription')}</CardDescription>
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
                            <FormLabel className="font-medium">{t("auth.username")}</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="username" 
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
                            <FormLabel className="font-medium">{t("auth.password")}</FormLabel>
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
                          <label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer">{t("auth.rememberMe")}</label>
                        </div>
                        <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-all">{t("auth.forgotPassword")}</Link>
                      </div>
                      
                      <motion.div whileTap={{ scale: 0.98 }}>
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
                          {t('auth.login')}
                        </Button>
                      </motion.div>
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
                      <CardTitle>{t('auth.registerForAccount')}</CardTitle>
                      <CardDescription>{t('auth.registerDescription')}</CardDescription>
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
                              <FormLabel className="font-medium">{t("auth.firstName")}</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="John" 
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
                              <FormLabel className="font-medium">{t("auth.lastName")}</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Doe" 
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
                            <FormLabel className="font-medium">{t("auth.email")}</FormLabel>
                            <FormControl>
                              <Input 
                                type="email" 
                                placeholder="example@mail.com" 
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
                            <FormLabel className="font-medium">{t("auth.phone")}</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="+1 555 123 4567" 
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
                            <FormLabel className="font-medium">{t("auth.username")}</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="username" 
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
                              <FormLabel className="font-medium">{t("auth.password")}</FormLabel>
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
                              <FormLabel className="font-medium">{t("auth.confirmPassword")}</FormLabel>
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
                              <FormLabel className="text-sm">
                                {t("auth.termsAndPrivacy1")} 
                                <button 
                                  type="button"
                                  onClick={handleOpenPolicy}
                                  className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                                >
                                  {t("auth.privacyPolicy")}
                                </button> 
                                {t("auth.termsAndPrivacy2")}
                              </FormLabel>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                      
                      <motion.div whileTap={{ scale: 0.98 }}>
                        <Button 
                          type="submit" 
                          className="w-full mt-6 rounded-lg py-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all"
                          disabled={registerMutation.isPending}
                        >
                          {registerMutation.isPending ? (
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          ) : (
                            <svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
                          )}
                          {t('auth.register')}
                        </Button>
                      </motion.div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
              
              <PrivacyPolicy open={policyOpen} onOpenChange={setPolicyOpen} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Right side - Hero section */}
      <motion.div 
        className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 text-white flex-col justify-center items-center p-12 relative overflow-hidden"
        initial={{ opacity: 0, x: 50 }}
        animate={{ 
          opacity: animateHero ? 1 : 0, 
          x: animateHero ? 0 : 50,
        }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <motion.div 
            className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white"
            initial={{ scale: 0 }}
            animate={{ scale: animateHero ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
          <motion.div 
            className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-white"
            initial={{ scale: 0 }}
            animate={{ scale: animateHero ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-white"
            initial={{ scale: 0 }}
            animate={{ scale: animateHero ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          />
        </div>
        
        <div className="max-w-md mx-auto relative z-10">
          <motion.div 
            className="w-16 h-1 bg-white mb-8 rounded"
            initial={{ width: 0 }}
            animate={{ width: animateHero ? "4rem" : 0 }}
            transition={{ duration: 0.5, delay: 1.1 }}
          />
          
          <motion.h2 
            className="text-4xl font-bold mb-6 leading-tight"
            initial={{ y: 20, opacity: 0 }}
            animate={{ 
              y: animateHero ? 0 : 20, 
              opacity: animateHero ? 1 : 0 
            }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            {t('hero.title')}
          </motion.h2>
          
          <motion.p 
            className="text-xl mb-10 text-blue-100"
            initial={{ y: 20, opacity: 0 }}
            animate={{ 
              y: animateHero ? 0 : 20, 
              opacity: animateHero ? 1 : 0 
            }}
            transition={{ duration: 0.5, delay: 1.3 }}
          >
            {t('hero.description')}
          </motion.p>
          
          <div className="space-y-8">
            <motion.div 
              className="flex items-start bg-blue-700 bg-opacity-30 p-4 rounded-xl hover:bg-opacity-40 transition-all transform hover:scale-105 hover:shadow-lg"
              initial={{ x: -50, opacity: 0 }}
              animate={{ 
                x: animateHero ? 0 : -50, 
                opacity: animateHero ? 1 : 0 
              }}
              transition={{ duration: 0.5, delay: 1.5 }}
            >
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-white text-blue-600 flex items-center justify-center">
                <CheckCircle className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">{t("hero.feature1Title")}</h3>
                <p className="mt-1 text-blue-100">{t("hero.feature1Desc")}</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-start bg-blue-700 bg-opacity-30 p-4 rounded-xl hover:bg-opacity-40 transition-all transform hover:scale-105 hover:shadow-lg"
              initial={{ x: -50, opacity: 0 }}
              animate={{ 
                x: animateHero ? 0 : -50, 
                opacity: animateHero ? 1 : 0 
              }}
              transition={{ duration: 0.5, delay: 1.7 }}
            >
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-white text-blue-600 flex items-center justify-center">
                <Shield className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">{t("hero.feature2Title")}</h3>
                <p className="mt-1 text-blue-100">{t("hero.feature2Desc")}</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-start bg-blue-700 bg-opacity-30 p-4 rounded-xl hover:bg-opacity-40 transition-all transform hover:scale-105 hover:shadow-lg"
              initial={{ x: -50, opacity: 0 }}
              animate={{ 
                x: animateHero ? 0 : -50, 
                opacity: animateHero ? 1 : 0 
              }}
              transition={{ duration: 0.5, delay: 1.9 }}
            >
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-white text-blue-600 flex items-center justify-center">
                <Lock className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">{t("hero.feature3Title")}</h3>
                <p className="mt-1 text-blue-100">{t("hero.feature3Desc")}</p>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            className="mt-12 flex space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: animateHero ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 2.1 }}
          >
            <div className="w-3 h-3 rounded-full bg-blue-300"></div>
            <div className="w-3 h-3 rounded-full bg-white"></div>
            <div className="w-3 h-3 rounded-full bg-blue-300"></div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}