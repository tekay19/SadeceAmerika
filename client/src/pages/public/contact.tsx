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
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">İletişim</h1>
              <p className="text-xl text-gray-600">
                Sorularınız mı var? Bize ulaşın, ABD vize sürecinizle ilgili her konuda yardımcı olmaktan mutluluk duyarız.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info & Form */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-12">
              {/* Contact Information */}
              <div className="md:col-span-1">
                <h2 className="text-2xl font-bold mb-6">İletişim Bilgilerimiz</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-blue-100 text-blue-700 p-3 rounded-lg mr-4">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Adres</h3>
                      <p className="text-gray-600">
                        Nish Istanbul, Çobançeşme, <br />
                        Sanayi Cd. No: 44, B Block 60. Ofis, <br />
                        PK:34196 Bahçelievler/İstanbul
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-green-100 text-green-700 p-3 rounded-lg mr-4">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">E-posta</h3>
                      <p className="text-gray-600 cursor-pointer hover:text-blue-600 transition-colors flex items-center" 
                        onClick={() => handleMailClick("can@mese.us")}>
                        can@mese.us <ExternalLink size={14} className="ml-1" />
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-purple-100 text-purple-700 p-3 rounded-lg mr-4">
                      <Phone size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Telefon</h3>
                      <p className="text-gray-600 cursor-pointer hover:text-green-600 transition-colors flex items-center" 
                        onClick={() => openWhatsApp("905321393459")}>
                        +90 532 139 34 59 (Can Sarıtaş) <ExternalLink size={14} className="ml-1" />
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-yellow-100 text-yellow-700 p-3 rounded-lg mr-4">
                      <Building size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Çalışma Saatleri</h3>
                      <p className="text-gray-600">
                        Pazartesi - Cuma: 09:00 - 18:00<br />
                        Cumartesi: 10:00 - 14:00<br />
                        Pazar: Kapalı
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="md:col-span-2">
                <div className="bg-white p-8 rounded-lg shadow-sm">
                  <h2 className="text-2xl font-bold mb-6">Bize Mesaj Gönderin</h2>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Ad Soyad</FormLabel>
                              <FormControl>
                                <Input placeholder="Ad Soyad" {...field} />
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
                                <Input placeholder="E-posta adresiniz" {...field} />
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
                              <FormLabel>Telefon (Opsiyonel)</FormLabel>
                              <FormControl>
                                <Input placeholder="Telefon numaranız" {...field} />
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
                              <FormLabel>Konu</FormLabel>
                              <FormControl>
                                <Input placeholder="Mesajınızın konusu" {...field} />
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
                            <FormLabel>Mesajınız</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Nasıl yardımcı olabiliriz?" 
                                className="min-h-[150px]" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="text-right">
                        <Button 
                          type="submit" 
                          disabled={contactMutation.isPending || form.formState.isSubmitting}
                        >
                          {contactMutation.isPending ? "Gönderiliyor..." : "Mesaj Gönder"}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Map Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.1194590713757!2d28.835428675454977!3d40.99699457135907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cabb6bd17d7053%3A0x24c40a4c94768f00!2sNish%20Istanbul!5e0!3m2!1str!2str!4v1712258613731!5m2!1str!2str" 
                    width="100%" 
                    height="400" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Nish Istanbul, Çobançeşme, Sanayi Cd. No: 44, B Block 60. Ofis, PK:34196 Bahçelievler/İstanbul">
                  </iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
      </PageTransition>
    </PublicLayout>
  );
}