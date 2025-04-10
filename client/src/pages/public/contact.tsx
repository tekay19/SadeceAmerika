import { PublicLayout } from "@/components/layout/public-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { PageTransition } from "@/components/ui/page-transition";
import { 
  Building, 
  Mail, 
  MapPin, 
  Phone,
  ExternalLink
} from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

const contactFormSchema = z.object({
  name: z.string().min(3, { message: "Ad Soyad en az 3 karakter olmalıdır" }),
  email: z.string().email({ message: "Geçerli bir e-posta adresi giriniz" }),
  phone: z.string().min(10, { message: "Geçerli bir telefon numarası giriniz" }).optional(),
  subject: z.string().min(5, { message: "Konu en az 5 karakter olmalıdır" }),
  message: z.string().min(20, { message: "Mesajınız en az 20 karakter olmalıdır" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const { toast } = useToast();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });
  
  // Contact form submission mutation
  const contactMutation = useMutation({
    mutationFn: (formData: ContactFormValues) => {
      return apiRequest('POST', '/api/contacts', formData);
    },
    onSuccess: () => {
      // Show success toast
      toast({
        title: "Mesajınız alındı",
        description: "En kısa sürede sizinle iletişime geçeceğiz.",
        variant: "default",
      });
      
      // Reset form
      form.reset();
    },
    onError: (error: any) => {
      console.error('Form submission error:', error);
      
      toast({
        title: "Bir hata oluştu",
        description: "Mesajınız gönderilemedi. Lütfen daha sonra tekrar deneyiniz.",
        variant: "destructive"
      });
    }
  });
  
  function onSubmit(values: ContactFormValues) {
    // Send form data to backend
    contactMutation.mutate(values);
  }

  // WhatsApp URL için helper fonksiyon
  const openWhatsApp = (phone: string) => {
    const cleanPhone = phone.replace(/\s+/g, '').replace(/\+/g, '');
    window.open(`https://wa.me/${cleanPhone}`, '_blank');
  };

  // E-posta için helper fonksiyon
  const handleMailClick = (email: string) => {
    window.location.href = `mailto:${email}?subject=Vize%20Başvurusu%20Hakkında&body=Merhaba%20Sadece%20Amerika%20ekibi%2C%0D%0A%0D%0AVize%20başvurusu%20hakkında%20bilgi%20almak%20istiyorum.%0D%0A%0D%0ASaygılarımla%2C`;
  };

  return (
    <PublicLayout>
      <PageTransition>
        {/* Hero */}
        <section className="relative py-24 overflow-hidden">
          {/* Background with animated gradient */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-indigo-600 to-blue-600">
              {/* Animated gradient overlay */}
              <div 
                className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 to-transparent"
                style={{ 
                  backgroundSize: '400% 400%',
                  animation: 'gradient-animation 15s ease infinite'
                }}
              />
              {/* Decorative elements */}
              <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-blue-500/20 blur-3xl"></div>
              <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-indigo-500/20 blur-3xl"></div>
            </div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 text-white mb-8">
                <Phone size={16} className="mr-2" />
                <span className="text-sm font-medium">7/24 Hizmet Veriyoruz</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight text-white">
                <span className="block">Hemen Bugün</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                  İletişime Geçin
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl mb-10 text-blue-100 leading-relaxed max-w-3xl mx-auto">
                Vize başvurunuz veya ABD'ye yerleşim sürecinizle ilgili tüm sorularınız için buradayız. 
                Size özel çözümler için hemen ekibimizle iletişime geçin.
              </p>
              
              {/* Quick Contact Actions */}
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 mt-8">
                <button
                  onClick={() => openWhatsApp("905321393459")}
                  className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg shadow-lg transition-all duration-300 hover:scale-105">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp ile İletişim
                </button>
                <button
                  onClick={() => handleMailClick("can@mese.us")}
                  className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg shadow-lg transition-all duration-300 hover:scale-105">
                  <Mail size={18} className="mr-2" />
                  E-posta Gönder
                </button>
              </div>
              
              {/* Scroll indicator */}
              <div className="mt-16 animate-bounce">
                <svg className="w-6 h-6 mx-auto text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
              </div>
            </div>
          </div>
          
          {/* Wave effect at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-white transform -translate-y-1">
            <svg className="absolute -top-16 w-full h-16 text-white" preserveAspectRatio="none" viewBox="0 0 1440 54">
              <path fill="currentColor" d="M0 0L48 5.33333C96 10.6667 192 21.3333 288 32C384 42.6667 480 53.3333 576 48C672 42.6667 768 21.3333 864 10.6667C960 0 1056 0 1152 5.33333C1248 10.6667 1344 21.3333 1392 26.6667L1440 32V54H1392C1344 54 1248 54 1152 54C1056 54 960 54 864 54C768 54 672 54 576 54C480 54 384 54 288 54C192 54 96 54 48 54H0V0Z"/>
            </svg>
          </div>
          
          {/* Add CSS for gradient animation */}
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes gradient-animation {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
          `}} />
        </section>

        {/* Contact Info & Form */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-3">
                İletişim
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Sizden <span className="text-blue-600">Haber Almak</span> İstiyoruz
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full mb-6"></div>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Vize sürecinizle ilgili sorularınızı yanıtlamak ve Amerika yolculuğunuzda 
                yanınızda olmak için buradayız.
              </p>
            </div>
            
            {/* Main Content */}
            <div className="grid lg:grid-cols-3 gap-12 items-start">
              {/* Contact Information */}
              <div className="lg:col-span-1">
                {/* Contact Card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8 text-white">
                    <h3 className="text-2xl font-bold mb-2">İletişim Bilgilerimiz</h3>
                    <p className="opacity-90">
                      Size daha hızlı yardımcı olabilmemiz için ekibimizle doğrudan iletişime geçebilirsiniz.
                    </p>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-8">
                      {/* Address */}
                      <div className="group flex items-start transition-all duration-300 p-3 hover:bg-blue-50 rounded-xl cursor-pointer">
                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-3 rounded-xl mr-4 shadow-md group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-110">
                          <MapPin size={24} />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                            Ofis Adresimiz
                          </h4>
                          <p className="text-gray-600 leading-relaxed">
                            Nish Istanbul, Çobançeşme, <br />
                            Sanayi Cd. No: 44, B Block 60. Ofis, <br />
                            PK:34196 Bahçelievler/İstanbul
                          </p>
                        </div>
                      </div>
                      
                      {/* Email */}
                      <div className="group flex items-start transition-all duration-300 p-3 hover:bg-green-50 rounded-xl cursor-pointer"
                        onClick={() => handleMailClick("can@mese.us")}>
                        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-3 rounded-xl mr-4 shadow-md group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-110">
                          <Mail size={24} />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1 group-hover:text-green-600 transition-colors flex items-center">
                            E-posta Adresimiz
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
                            </svg>
                          </h4>
                          <p className="text-gray-600 group-hover:text-green-600 transition-colors">
                            can@mese.us
                          </p>
                          <p className="text-gray-500 text-sm mt-1">
                            Genellikle 24 saat içinde yanıt veriyoruz
                          </p>
                        </div>
                      </div>
                      
                      {/* Phone */}
                      <div className="group flex items-start transition-all duration-300 p-3 hover:bg-emerald-50 rounded-xl cursor-pointer"
                        onClick={() => openWhatsApp("905321393459")}>
                        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white p-3 rounded-xl mr-4 shadow-md group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-110">
                          <Phone size={24} />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors flex items-center">
                            WhatsApp İletişim
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
                            </svg>
                          </h4>
                          <p className="text-gray-600 group-hover:text-emerald-600 transition-colors">
                            +90 532 139 34 59 (Can Sarıtaş)
                          </p>
                          <p className="text-gray-500 text-sm mt-1">
                            7/24 WhatsApp'tan ulaşabilirsiniz
                          </p>
                        </div>
                      </div>
                      
                      {/* Working Hours */}
                      <div className="group flex items-start transition-all duration-300 p-3 hover:bg-amber-50 rounded-xl">
                        <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white p-3 rounded-xl mr-4 shadow-md group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-110">
                          <Building size={24} />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1 group-hover:text-amber-600 transition-colors">
                            Çalışma Saatlerimiz
                          </h4>
                          <div className="space-y-1 text-gray-600">
                            <div className="flex justify-between">
                              <span>Pazartesi - Cuma:</span>
                              <span className="font-medium">09:00 - 18:00</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Cumartesi:</span>
                              <span className="font-medium">10:00 - 14:00</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Pazar:</span>
                              <span className="font-medium">Kapalı</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Social Media */}
                    <div className="mt-8 pt-6 border-t border-gray-100">
                      <h4 className="text-sm font-medium text-gray-500 mb-4">SOSYAL MEDYADA BİZİ TAKİP EDİN</h4>
                      <div className="flex space-x-4">
                        <a href="#" className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-colors">
                          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-400 hover:bg-blue-400 hover:text-white transition-colors">
                          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                          </svg>
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 hover:bg-blue-700 hover:text-white transition-colors">
                          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-pink-600 hover:bg-pink-600 hover:text-white transition-colors">
                          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                            <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6">
                    <h3 className="text-2xl font-bold text-gray-900">Bize Mesaj Gönderin</h3>
                    <p className="text-gray-600">
                      Formu doldurarak bize ulaşın. En kısa sürede size dönüş yapacağız.
                    </p>
                  </div>
                  
                  <div className="p-8">
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700">Ad Soyad</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Ad Soyad"
                                    className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                    {...field} 
                                  />
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
                                <FormLabel className="text-gray-700">E-posta</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="E-posta adresiniz" 
                                    className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700">Telefon (Opsiyonel)</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Telefon numaranız" 
                                    className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="subject"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700">Konu</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Mesajınızın konusu" 
                                    className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700">Mesajınız</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Nasıl yardımcı olabiliriz? Detaylı bilgi vererek daha hızlı yanıt alabilirsiniz." 
                                  className="min-h-[150px] rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="flex items-center justify-between pt-2">
                          <div className="text-gray-500 text-sm">
                            <span className="flex items-center">
                              <svg className="w-4 h-4 mr-1 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                              </svg>
                              Bilgileriniz güvenli şekilde saklanır
                            </span>
                          </div>
                          <Button 
                            type="submit" 
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-2.5 px-5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                            disabled={contactMutation.isPending || form.formState.isSubmitting}
                          >
                            {contactMutation.isPending 
                              ? <span className="flex items-center">
                                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                  Gönderiliyor...
                                </span>
                              : "Mesaj Gönder"
                            }
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Map Section */}
        <section className="py-24 bg-gradient-to-r from-gray-50 to-blue-50 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute left-0 top-0 w-64 h-64 bg-blue-100 rounded-full opacity-50 -ml-32 -mt-20"></div>
          <div className="absolute right-0 bottom-0 w-96 h-96 bg-indigo-100 rounded-full opacity-50 -mr-48 -mb-24"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-3">
                Ofis Konumumuz
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Bizi <span className="text-blue-600">Ziyaret Edin</span>
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full mb-6"></div>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-12">
                Merkez ofisimiz Nish İstanbul'da yer almaktadır. Ziyaret öncesi randevu almanızı rica ederiz.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-12 items-center">
              {/* Info Cards */}
              <div className="lg:col-span-1 space-y-6">
                {/* Directions Card */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 text-white">
                    <h3 className="text-xl font-bold flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      Ulaşım Bilgileri
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="bg-blue-100 text-blue-700 p-2 rounded-lg mr-4 flex-shrink-0">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="text-gray-600 text-sm">
                          <span className="font-medium text-gray-900">Metrobüs:</span> Yenibosna Metrobüs Durağı'ndan 5 dakika yürüme mesafesinde
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-blue-100 text-blue-700 p-2 rounded-lg mr-4 flex-shrink-0">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="text-gray-600 text-sm">
                          <span className="font-medium text-gray-900">Araçla:</span> E-5 karayolu üzerinde, Yenibosna sapağından 2 dakika mesafede
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-blue-100 text-blue-700 p-2 rounded-lg mr-4 flex-shrink-0">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="text-gray-600 text-sm">
                          <span className="font-medium text-gray-900">Havalimanı:</span> İstanbul Havalimanı'ndan araçla 30 dakika, Sabiha Gökçen'den 60 dakika
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <a 
                        href="https://goo.gl/maps/MnXh5Y2J2J1Nq7SV9" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Google Maps'te Yol Tarifi Al
                      </a>
                    </div>
                  </div>
                </div>
                
                {/* Parking Card */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4 text-white">
                    <h3 className="text-xl font-bold flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                      </svg>
                      Otopark Bilgisi
                    </h3>
                  </div>
                  <div className="p-6 text-gray-600">
                    <p>
                      Nish İstanbul, kapalı otoparkı ile misafirlerimize otopark hizmeti sunmaktadır. Ziyaretinizde
                      otopark ücretiniz tarafımızca karşılanacaktır.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Map */}
              <div className="lg:col-span-2">
                <div className="bg-white p-3 rounded-2xl shadow-xl overflow-hidden border border-gray-100 relative group hover:shadow-2xl transition-all duration-300">
                  {/* Marker Animation */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute w-8 h-8 rounded-full bg-blue-100 opacity-70 animate-ping"></div>
                    <div className="absolute w-6 h-6 top-1 left-1 rounded-full bg-blue-500 opacity-90"></div>
                    <div className="absolute w-2 h-2 top-3 left-3 rounded-full bg-white"></div>
                  </div>
                  
                  <div className="rounded-xl overflow-hidden">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.1194590713757!2d28.835428675454977!3d40.99699457135907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cabb6bd17d7053%3A0x24c40a4c94768f00!2sNish%20Istanbul!5e0!3m2!1str!2str!4v1712258613731!5m2!1str!2str" 
                      width="100%" 
                      height="450" 
                      style={{ border: 0 }} 
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Nish Istanbul, Çobançeşme, Sanayi Cd. No: 44, B Block 60. Ofis, PK:34196 Bahçelievler/İstanbul"
                      className="hover:opacity-95 transition-opacity"
                    />
                  </div>
                  
                  {/* Address Overlay */}
                  <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg text-gray-800 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="flex items-start">
                      <div className="bg-blue-600 text-white p-2 rounded-lg mr-4 flex-shrink-0">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">Nish İstanbul</h4>
                        <p className="text-sm">
                          Çobançeşme, Sanayi Cd. No: 44, B Block 60. Ofis, PK:34196 Bahçelievler/İstanbul
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Final CTA */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-900/30"></div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h2 className="text-3xl font-bold mb-6">Amerika Hayalinize Bir Adım Daha Yaklaşın</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
              Vize sürecinizi başlatmak için bize ulaşın. Profesyonel ekibimiz, ABD'deki yeni hayatınıza kavuşmanıza yardımcı olmak için hazır.
            </p>
            <div className="inline-flex items-center bg-white text-blue-700 font-medium rounded-full py-3 px-6 shadow-lg hover:shadow-xl transition-all duration-200 hover:bg-blue-50 cursor-pointer"
              onClick={() => openWhatsApp("905321393459")}>
              <svg className="w-5 h-5 mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Hemen İletişime Geçin
            </div>
          </div>
        </section>
      </PageTransition>
    </PublicLayout>
  );
}