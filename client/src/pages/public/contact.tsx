import { PublicLayout } from "@/components/layout/public-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Building, 
  Mail, 
  MapPin, 
  Phone
} from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

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
  
  function onSubmit(values: ContactFormValues) {
    // Here you would normally send the form data to your backend
    console.log(values);
    
    // Show success toast
    toast({
      title: "Mesajınız alındı",
      description: "En kısa sürede sizinle iletişime geçeceğiz.",
      variant: "default",
    });
    
    // Reset form
    form.reset();
  }

  return (
    <PublicLayout>
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
                      Bağdat Caddesi No:123<br />
                      Kadıköy, İstanbul<br />
                      Türkiye
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-100 text-green-700 p-3 rounded-lg mr-4">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">E-posta</h3>
                    <p className="text-gray-600">
                      info@sadeceamerika.com<br />
                      destek@sadeceamerika.com
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-purple-100 text-purple-700 p-3 rounded-lg mr-4">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Telefon</h3>
                    <p className="text-gray-600">
                      +90 212 000 00 00<br />
                      +90 532 000 00 00
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
                        disabled={form.formState.isSubmitting}
                      >
                        {form.formState.isSubmitting ? "Gönderiliyor..." : "Mesaj Gönder"}
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
                <div className="bg-gray-200 w-full h-[400px] flex items-center justify-center">
                  <p className="text-gray-500">Harita buraya gelecek</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}