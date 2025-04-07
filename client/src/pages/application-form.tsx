import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "@/hooks/use-auth";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { useQuery, useMutation } from "@tanstack/react-query";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CalendarIcon, ArrowRight, PlusCircle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";
import { RemoteImage } from "@/components/ui/remote-image";

// Vize formları ve pasaport resimleri
import {
  VISA_STAMP_URL,
  VISA_FORM_URL,
  PASSPORT_DOCUMENTS_URL,
  PASSPORT_WITH_FLAG_URL
} from "@/lib/image-constants";

// Define the form schema with Zod
const formSchema = z.object({
  visaTypeId: z.string().min(1, "Vize tipini seçiniz"),
  purpose: z.string().min(5, "Seyahat amacınızı detaylı olarak yazınız").max(500, "En fazla 500 karakter girebilirsiniz"),
  travelDate: z.date().optional(),
  // Kişisel bilgiler
  firstName: z.string().min(2, "İsim en az 2 karakter olmalıdır"),
  lastName: z.string().min(2, "Soyisim en az 2 karakter olmalıdır"),
  age: z.string().min(1, "Yaş bilgisi gereklidir").transform(Number),
  phone: z.string().min(10, "Telefon numarası en az 10 karakter olmalıdır"),
  occupation: z.string().min(2, "Meslek bilgisi en az 2 karakter olmalıdır"),
});

export default function ApplicationForm() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [location, navigate] = useLocation();
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  
  // Fetch visa types
  const { data: visaTypes, isLoading: isLoadingVisaTypes } = useQuery({
    queryKey: ["/api/visa-types"],
  });
  
  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      visaTypeId: "",
      purpose: "",
      travelDate: undefined,
      firstName: "",
      lastName: "",
      age: "",
      phone: "",
      occupation: "",
    },
  });
  
  // Application creation mutation
  const createApplicationMutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const payload = {
        ...values,
        visaTypeId: parseInt(values.visaTypeId),
      };
      
      const res = await apiRequest("POST", "/api/applications", payload);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Başvuru oluşturuldu",
        description: "Vize başvurunuz başarıyla oluşturuldu.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/applications"] });
      navigate("/applications");
    },
    onError: (error: Error) => {
      toast({
        title: "Başvuru oluşturulamadı",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createApplicationMutation.mutate(values);
  };
  
  const nextStep = () => {
    const currentStepFields = {
      1: ["visaTypeId"],
      2: ["purpose", "travelDate"],
      3: ["firstName", "lastName", "age", "phone", "occupation"],
    };
    
    // Validate current step fields
    const fieldsToValidate = currentStepFields[step as keyof typeof currentStepFields] || [];
    
    form.trigger(fieldsToValidate as any).then(isValid => {
      if (isValid) {
        if (step < totalSteps) {
          setStep(step + 1);
        } else {
          form.handleSubmit(onSubmit)();
        }
      }
    });
  };
  
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  // Progress percentage
  const progress = ((step - 1) / (totalSteps - 1)) * 100;
  
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header />
        
        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Yeni Vize Başvurusu</h1>
                <p className="text-gray-600">ABD vize başvurunuzu oluşturun</p>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">İlerleme</span>
                <span className="text-sm font-medium">{step}/{totalSteps}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-primary h-2.5 rounded-full transition-all" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Step 1: Visa Type */}
                {step === 1 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Vize Tipi Seçimi</CardTitle>
                      <CardDescription>
                        Başvurmak istediğiniz ABD vize tipini seçin
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <FormField
                        control={form.control}
                        name="visaTypeId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Vize Tipi</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                              disabled={isLoadingVisaTypes}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Vize tipi seçin" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {visaTypes?.map((type: any) => (
                                  <SelectItem key={type.id} value={type.id.toString()}>
                                    {type.code} - {type.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Seyahat amacınıza uygun vize tipini seçin
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="space-y-3">
                        <h3 className="text-sm font-medium">Vize Tipleri Hakkında Bilgi</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {/* B1/B2 Vize kartı */}
                          <div className="rounded-md overflow-hidden border border-blue-100">
                            <div className="h-32 overflow-hidden relative">
                              <RemoteImage 
                                src={VISA_STAMP_URL}
                                fallbackUrl={PASSPORT_WITH_FLAG_URL}
                                altText="B1/B2 Vize - İş/Turist Vizesi"
                                className="w-full h-full object-cover" 
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-blue-700/70 to-blue-700/10"></div>
                              <div className="absolute bottom-0 left-0 p-3">
                                <h4 className="text-white font-medium">B1/B2 Vize</h4>
                                <p className="text-white/90 text-sm">İş/Turist Vizesi</p>
                              </div>
                            </div>
                            <div className="p-3 bg-blue-50">
                              <p className="text-sm text-blue-700">
                                Turistik seyahat, aile ziyareti, tedavi, iş görüşmeleri gibi amaçlarla kullanılır.
                              </p>
                            </div>
                          </div>
                          
                          {/* F1 Vize kartı */}
                          <div className="rounded-md overflow-hidden border border-green-100">
                            <div className="h-32 overflow-hidden relative">
                              <RemoteImage 
                                src={VISA_FORM_URL}
                                fallbackUrl={PASSPORT_DOCUMENTS_URL}
                                altText="F1 Vize - Öğrenci Vizesi"
                                className="w-full h-full object-cover" 
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-green-700/70 to-green-700/10"></div>
                              <div className="absolute bottom-0 left-0 p-3">
                                <h4 className="text-white font-medium">F1 Vize</h4>
                                <p className="text-white/90 text-sm">Öğrenci Vizesi</p>
                              </div>
                            </div>
                            <div className="p-3 bg-green-50">
                              <p className="text-sm text-green-700">
                                ABD'de yükseköğrenim görmek isteyen öğrencilerin başvurduğu vize türüdür.
                              </p>
                            </div>
                          </div>
                        </div>
                        
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button type="button" onClick={nextStep}>
                        Devam Et
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                )}
                
                {/* Step 2: Purpose and Travel Details */}
                {step === 2 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Seyahat Bilgileri</CardTitle>
                      <CardDescription>
                        Seyahatinizin amacı ve planladığınız tarih hakkında bilgi verin
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <FormField
                        control={form.control}
                        name="purpose"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Seyahat Amacı</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Seyahat amacınızı detaylı bir şekilde açıklayın"
                                className="min-h-[120px]"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Bu alanda ABD'ye neden seyahat edeceğinizi detaylı bir şekilde belirtin
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="travelDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Planlanan Seyahat Tarihi</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP", { locale: tr })
                                    ) : (
                                      <span>Tarih seçin</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) => date < new Date()}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormDescription>
                              Seyahat etmeyi planladığınız tarihi seçin (opsiyonel)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button type="button" variant="outline" onClick={prevStep}>
                        Geri
                      </Button>
                      <Button type="button" onClick={nextStep}>
                        Devam Et
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                )}
                
                {/* Step 3: Personal Information */}
                {step === 3 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Kişisel Bilgiler</CardTitle>
                      <CardDescription>
                        Başvurunuz için gerekli kişisel bilgilerinizi girin
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="age"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Yaş</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  placeholder="Yaşınız" 
                                  {...field} 
                                />
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
                              <FormLabel>Telefon</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Telefon numarınız" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormDescription>
                                Örnek: +90 555 123 4567
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="occupation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Meslek</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Mesleğiniz" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button type="button" variant="outline" onClick={prevStep}>
                        Geri
                      </Button>
                      <Button type="button" onClick={nextStep}>
                        Devam Et
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                )}
                
                {/* Step 4: Review and Submit */}
                {step === 4 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Başvuru Özeti</CardTitle>
                      <CardDescription>
                        Lütfen bilgilerinizi kontrol edin ve başvurunuzu gönderin
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="rounded-md bg-gray-50 p-4 border border-gray-200">
                        <dl className="divide-y divide-gray-200">
                          <div className="grid grid-cols-3 gap-4 py-3">
                            <dt className="text-sm font-medium text-gray-500">Vize Tipi</dt>
                            <dd className="text-sm text-gray-900 col-span-2">
                              {visaTypes?.find((type: any) => type.id.toString() === form.getValues("visaTypeId"))?.name || 'Seçilmedi'}
                            </dd>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4 py-3">
                            <dt className="text-sm font-medium text-gray-500">Seyahat Amacı</dt>
                            <dd className="text-sm text-gray-900 col-span-2">
                              {form.getValues("purpose") || 'Belirtilmedi'}
                            </dd>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4 py-3">
                            <dt className="text-sm font-medium text-gray-500">Planlanan Seyahat Tarihi</dt>
                            <dd className="text-sm text-gray-900 col-span-2">
                              {form.getValues("travelDate") 
                                ? format(form.getValues("travelDate") as Date, "PPP", { locale: tr })
                                : 'Belirtilmedi'}
                            </dd>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4 py-3">
                            <dt className="text-sm font-medium text-gray-500">Ad Soyad</dt>
                            <dd className="text-sm text-gray-900 col-span-2">
                              {form.getValues("firstName")} {form.getValues("lastName")}
                            </dd>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4 py-3">
                            <dt className="text-sm font-medium text-gray-500">Yaş</dt>
                            <dd className="text-sm text-gray-900 col-span-2">
                              {form.getValues("age")}
                            </dd>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4 py-3">
                            <dt className="text-sm font-medium text-gray-500">Telefon</dt>
                            <dd className="text-sm text-gray-900 col-span-2">
                              {form.getValues("phone")}
                            </dd>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4 py-3">
                            <dt className="text-sm font-medium text-gray-500">Meslek</dt>
                            <dd className="text-sm text-gray-900 col-span-2">
                              {form.getValues("occupation")}
                            </dd>
                          </div>
                        </dl>
                      </div>
                      
                      <div className="rounded-md bg-blue-50 p-4">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <CheckCircle className="h-5 w-5 text-blue-400" />
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-blue-800">Bilgilendirme</h3>
                            <div className="mt-2 text-sm text-blue-700">
                              <p>
                                Başvurunuzu gönderdikten sonra, gerekli belgeleri yüklemeniz istenecektir.
                                Başvurunuzun durumunu "Başvurularım" sayfasından takip edebilirsiniz.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button type="button" variant="outline" onClick={prevStep}>
                        Geri
                      </Button>
                      <Button 
                        type="button" 
                        onClick={form.handleSubmit(onSubmit)}
                        disabled={createApplicationMutation.isPending}
                      >
                        {createApplicationMutation.isPending && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Başvuruyu Gönder
                      </Button>
                    </CardFooter>
                  </Card>
                )}
              </form>
            </Form>
          </div>
        </main>
      </div>
    </div>
  );
}
