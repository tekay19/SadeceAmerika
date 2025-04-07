import { useAuth } from "@/hooks/use-auth";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { useQuery } from "@tanstack/react-query";
import { Application, Document, Appointment } from "@shared/schema";
import { useParams, Link } from "wouter";
import { Loader2, ArrowLeft, File, Download, Clock, Calendar, Users, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatusTimeline } from "@/components/application/status-timeline";
import { DocumentList } from "@/components/application/document-list";
import { StatusUpdate } from "@/components/application/status-update";
import { AppointmentCreate } from "@/components/application/appointment-create";
import { RemoteImage } from "@/components/ui/remote-image";

// Vize formları ve pasaport resimleri
import {
  VISA_STAMP_URL,
  VISA_FORM_URL,
  PASSPORT_DOCUMENTS_URL,
  PASSPORT_WITH_FLAG_URL
} from "@/lib/image-constants";

export default function ApplicationDetails() {
  const { user } = useAuth();
  const params = useParams<{ id: string }>();
  const applicationId = parseInt(params.id);
  
  // Başvuru verilerini getir
  const { data: application, isLoading: isLoadingApplication } = useQuery<Application>({
    queryKey: ["/api/applications", applicationId],
    queryFn: async () => {
      const response = await fetch(`/api/applications/${applicationId}`, {
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error("Başvuru bilgisi getirilemedi");
      }
      return response.json();
    },
  });
  
  // Belgeleri getir
  const { data: documents, isLoading: isLoadingDocuments } = useQuery<Document[]>({
    queryKey: ["/api/documents", applicationId],
    queryFn: async () => {
      const response = await fetch(`/api/documents/${applicationId}`, {
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error("Belgeler getirilemedi");
      }
      return response.json();
    },
    enabled: !!applicationId,
  });
  
  // Randevu bilgisini getir
  const { data: appointment, isLoading: isLoadingAppointment } = useQuery<Appointment | undefined>({
    queryKey: ["/api/appointments", applicationId],
    queryFn: async () => {
      const response = await fetch(`/api/appointments/${applicationId}`, {
        credentials: 'include'
      });
      if (response.status === 404) {
        return undefined;
      }
      if (!response.ok) {
        throw new Error("Randevu bilgisi getirilemedi");
      }
      return response.json();
    },
    enabled: !!applicationId,
  });
  
  const isLoading = isLoadingApplication || isLoadingDocuments || isLoadingAppointment;
  
  const formatDate = (dateString?: string | Date | null) => {
    if (!dateString) return "Belirtilmemiş";
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  const formatTime = (dateString?: string | Date | null) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  const visaTypeMap: Record<number, string> = {
    1: 'B1 (İş)',
    2: 'B2 (Turist)',
    3: 'F1 (Öğrenci)',
    4: 'H1B (Çalışma)',
    5: 'J1 (Değişim)',
  };
  
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header />
        
        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">
          <div className="flex items-center mb-6">
            <Link href="/applications">
              <Button variant="ghost" className="mr-4" size="sm">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Geri
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">
              Başvuru Detayları {application && `#${application.applicationNumber}`}
            </h1>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : !application ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Başvuru bulunamadı</h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                İstediğiniz başvuru bilgisi sistemde yer almıyor veya erişim izniniz bulunmuyor.
              </p>
              <Link href="/applications">
                <Button>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Başvurulara Dön
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Sol Kolon - Başvuru Durumu ve Özet */}
              <div className="lg:col-span-1 space-y-6">
                <Card>
                  <div className="relative h-40 overflow-hidden">
                    <RemoteImage 
                      src={PASSPORT_WITH_FLAG_URL}
                      fallbackUrl={VISA_STAMP_URL}
                      altText="ABD Vize Evrakları"
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 to-blue-600/20 flex items-end">
                      <div className="p-4">
                        <CardTitle className="text-white mb-1">Durum Takibi</CardTitle>
                        <CardDescription className="text-blue-100">Başvurunuzun mevcut durumu</CardDescription>
                      </div>
                    </div>
                  </div>
                  <CardContent className="pt-4">
                    <StatusTimeline status={application.status} />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Başvuru Özeti</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Başvuru Numarası</p>
                      <p className="font-medium">{application.applicationNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Vize Tipi</p>
                      <p className="font-medium">{visaTypeMap[application.visaTypeId] || 'Diğer'}</p>
                    </div>
                    {/* Kişisel Bilgiler */}
                    <div>
                      <p className="text-sm text-gray-500">Ad Soyad</p>
                      <p className="font-medium">{application.firstName} {application.lastName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Yaş</p>
                      <p className="font-medium">{application.age}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Telefon</p>
                      <p className="font-medium">{application.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Meslek</p>
                      <p className="font-medium">{application.occupation}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Seyahat Amacı</p>
                      <p className="font-medium">{application.purpose}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Oluşturulma Tarihi</p>
                      <p className="font-medium">{formatDate(application.submittedAt)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Son Güncelleme</p>
                      <p className="font-medium">{formatDate(application.lastUpdated)}</p>
                    </div>
                  </CardContent>
                </Card>
                
                {appointment && (
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Randevu Bilgisi</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <div>
                          <p className="text-sm text-gray-500">Tarih</p>
                          <p className="font-medium">{formatDate(appointment.date)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <div>
                          <p className="text-sm text-gray-500">Saat</p>
                          <p className="font-medium">{formatTime(appointment.date)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        <div>
                          <p className="text-sm text-gray-500">Lokasyon</p>
                          <p className="font-medium">{appointment.location}</p>
                        </div>
                      </div>
                      {appointment.notes && (
                        <div>
                          <p className="text-sm text-gray-500">Notlar</p>
                          <p className="text-sm">{appointment.notes}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
              
              {/* Sağ Kolon - Detaylı Bilgiler ve Belgeler */}
              <div className="lg:col-span-2 space-y-6">
                <Tabs defaultValue="details">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="details">Başvuru Detayları</TabsTrigger>
                    <TabsTrigger value="documents">Belgeler</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="details" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Başvuru Bilgileri</CardTitle>
                        <CardDescription>Vize başvurunuza ait ayrıntılı bilgiler</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {/* Kişisel Bilgiler */}
                        <div>
                          <h3 className="text-md font-medium mb-2">Kişisel Bilgiler</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">Ad Soyad</p>
                              <p className="text-gray-700">{application.firstName} {application.lastName}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Yaş</p>
                              <p className="text-gray-700">{application.age}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Telefon</p>
                              <p className="text-gray-700">{application.phone}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Meslek</p>
                              <p className="text-gray-700">{application.occupation}</p>
                            </div>
                          </div>
                        </div>
                      
                        <div>
                          <h3 className="text-md font-medium mb-2">Seyahat Amacı</h3>
                          <p className="text-gray-700">{application.purpose || "Belirtilmemiş"}</p>
                        </div>
                        
                        {/* Bu alanlar schema'da olmayabilir, kontrollü göster */}
                        <div>
                          <h3 className="text-md font-medium mb-2">Vize Tipi</h3>
                          <p className="text-gray-700">{visaTypeMap[application.visaTypeId] || "Belirtilmemiş"}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-md font-medium mb-2">Başvuru Durumu</h3>
                          <p className="text-gray-700">
                            {application.status === 'draft' ? 'Taslak' :
                              application.status === 'submitted' ? 'Gönderildi' :
                              application.status === 'documents_pending' ? 'Belge Bekleniyor' :
                              application.status === 'documents_reviewing' ? 'İnceleniyor' :
                              application.status === 'documents_approved' ? 'Belgeler Onaylandı' :
                              application.status === 'appointment_scheduled' ? 'Randevu Planlandı' :
                              application.status === 'interview_completed' ? 'Görüşme Tamamlandı' :
                              application.status === 'approved' ? 'Onaylandı' :
                              application.status === 'rejected' ? 'Reddedildi' :
                              application.status === 'additional_documents_required' ? 'Ek Belge Gerekli' :
                              'Bilinmeyen Durum'}
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="text-md font-medium mb-2">Başvuru Oluşturulma</h3>
                          <p className="text-gray-700">{formatDate(application.submittedAt)}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-md font-medium mb-2">Son Güncelleme</h3>
                          <p className="text-gray-700">{formatDate(application.lastUpdated)}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="documents" className="mt-4">
                    <Card>
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 relative">
                          <div className="h-full min-h-[200px]">
                            <RemoteImage 
                              src={PASSPORT_DOCUMENTS_URL}
                              fallbackUrl={VISA_FORM_URL}
                              altText="ABD Vize Belgeleri" 
                              className="w-full h-full object-cover" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-700/30 to-transparent md:bg-gradient-to-r md:from-gray-900/90 md:to-transparent" />
                            <div className="absolute bottom-0 left-0 p-6 md:p-8">
                              <h3 className="text-xl font-semibold text-white mb-2">Başvuru Belgeleri</h3>
                              <p className="text-white/80 text-sm max-w-xs">Vize başvurunuz için gerekli tüm evraklar</p>
                            </div>
                          </div>
                        </div>
                        <div className="md:w-2/3 p-6">
                          <DocumentList applicationId={applicationId} />
                        </div>
                      </div>
                    </Card>
                  </TabsContent>
                </Tabs>
                
                {/* Officer/Admin için işlem bölümü */}
                {(user?.role === "officer" || user?.role === "admin") && (
                  <div className="space-y-6">
                    <Card className="border-primary/20 bg-primary/5">
                      <CardHeader>
                        <CardTitle>Memur İşlemleri</CardTitle>
                        <CardDescription>Başvuru değerlendirme ve işlemleri</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-500 mb-4">
                          Bu başvuru için durum güncelleme ve randevu oluşturma işlemlerini aşağıdaki araçları kullanarak gerçekleştirebilirsiniz.
                        </p>
                      </CardContent>
                    </Card>
                    
                    {/* Status Update Component */}
                    <StatusUpdate 
                      application={application} 
                      isOfficer={user?.role === "officer" || user?.role === "admin"} 
                    />
                    
                    {/* Appointment Creation Component */}
                    <AppointmentCreate 
                      application={application} 
                      isOfficer={user?.role === "officer" || user?.role === "admin"} 
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}