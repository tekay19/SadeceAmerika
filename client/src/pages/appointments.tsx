import { useAuth } from "@/hooks/use-auth";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { useQuery } from "@tanstack/react-query";
import { Application, Appointment } from "@shared/schema";
import { Loader2, Calendar, Clock, MapPin, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Appointments() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedApplication, setSelectedApplication] = useState<number | null>(null);
  
  const { data: applications, isLoading: isLoadingApplications } = useQuery<Application[]>({
    queryKey: ["/api/applications"],
  });

  const { data: appointment, isLoading: isLoadingAppointment } = useQuery<Appointment>({
    queryKey: ["/api/appointments", selectedApplication],
    enabled: !!selectedApplication,
  });
  
  const getAppointmentDate = (date: string) => {
    const appointmentDate = new Date(date);
    return appointmentDate.toLocaleDateString('tr-TR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const getAppointmentTime = (date: string) => {
    const appointmentDate = new Date(date);
    return appointmentDate.toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit'
    });
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
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Randevularım</h1>
          </div>
          
          {isLoadingApplications ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : !applications || applications.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Henüz başvuru bulunmuyor</h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                Randevu alabilmek için önce bir vize başvurusu oluşturmanız gerekmektedir.
              </p>
              <Button asChild>
                <a href="/applications/new">Yeni Başvuru Oluştur</a>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Application Selection */}
              <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h2 className="text-lg font-semibold mb-4">Başvuru Seç</h2>
                  
                  <div className="space-y-2">
                    {applications.map(app => (
                      <div 
                        key={app.id} 
                        className={`p-3 rounded-md cursor-pointer border ${
                          selectedApplication === app.id ? 'border-primary bg-primary/5' : 'border-gray-200 hover:bg-gray-50'
                        }`}
                        onClick={() => setSelectedApplication(app.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-800">{app.applicationNumber}</p>
                            <p className="text-sm text-gray-500">
                              {app.submittedAt 
                                ? `Gönderilme: ${new Date(app.submittedAt).toLocaleDateString('tr-TR')}`
                                : 'Taslak'}
                            </p>
                          </div>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            app.status === 'approved' ? 'bg-green-100 text-green-800' :
                            app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                            app.status === 'appointment_scheduled' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {app.status === 'draft' ? 'Taslak' :
                             app.status === 'appointment_scheduled' ? 'Randevu Alındı' :
                             app.status === 'documents_pending' ? 'Belge Bekleniyor' :
                             app.status === 'documents_reviewing' ? 'İnceleniyor' :
                             app.status === 'documents_approved' ? 'Belgeler Onaylandı' :
                             app.status === 'interview_completed' ? 'Görüşme Tamamlandı' :
                             app.status === 'approved' ? 'Onaylandı' :
                             app.status === 'rejected' ? 'Reddedildi' :
                             app.status === 'additional_documents_required' ? 'Ek Belge Gerekli' :
                             'Bilinmeyen Durum'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Right Column - Appointment Details */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full">
                  <div className="border-b border-gray-200 px-6 py-4">
                    <h2 className="text-lg font-semibold">Randevu Bilgileri</h2>
                  </div>
                  
                  {!selectedApplication ? (
                    <div className="p-6 text-center text-gray-500 h-64 flex flex-col items-center justify-center">
                      <AlertCircle className="h-12 w-12 text-gray-400 mb-2" />
                      <p>Randevu bilgilerini görüntülemek için lütfen bir başvuru seçin.</p>
                    </div>
                  ) : isLoadingAppointment ? (
                    <div className="p-6 text-center h-64 flex items-center justify-center">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : !appointment ? (
                    <div className="p-6 text-center text-gray-500 h-64 flex flex-col items-center justify-center">
                      <AlertCircle className="h-12 w-12 text-gray-400 mb-2" />
                      <p className="mb-2">Bu başvuru için henüz randevu oluşturulmamış.</p>
                      <p className="text-sm max-w-md">Başvurunuz onaylandıktan sonra randevunuz oluşturulacak ve burada görüntülenecektir.</p>
                    </div>
                  ) : (
                    <div className="p-6">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <p className="text-green-800 font-medium">Randevunuz onaylanmıştır</p>
                          <p className="text-green-700 text-sm mt-1">
                            Lütfen randevu saatinden 30 dakika önce belirtilen konsolosluk adresinde hazır olunuz.
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                          <div className="flex items-start">
                            <Calendar className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                            <div>
                              <p className="text-sm text-gray-500">Randevu Tarihi</p>
                              <p className="text-lg font-medium text-gray-800 mt-1">
                                {getAppointmentDate(appointment.date)}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                          <div className="flex items-start">
                            <Clock className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                            <div>
                              <p className="text-sm text-gray-500">Randevu Saati</p>
                              <p className="text-lg font-medium text-gray-800 mt-1">
                                {getAppointmentTime(appointment.date)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 bg-gray-50 rounded-lg p-5 border border-gray-200">
                        <div className="flex items-start">
                          <MapPin className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-gray-500">Randevu Yeri</p>
                            <p className="text-lg font-medium text-gray-800 mt-1">
                              {appointment.location}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {appointment.notes && (
                        <div className="mt-6 bg-gray-50 rounded-lg p-5 border border-gray-200">
                          <p className="text-sm text-gray-500 mb-2">Önemli Notlar</p>
                          <p className="text-gray-800">{appointment.notes}</p>
                        </div>
                      )}
                      
                      <div className="mt-6 border-t border-gray-200 pt-6">
                        <h3 className="font-medium text-gray-800 mb-3">Yanınızda Getirmeniz Gerekenler</h3>
                        <ul className="space-y-2 text-gray-600">
                          <li className="flex items-start">
                            <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-primary/10 text-primary text-xs font-medium mr-2 mt-0.5">
                              1
                            </span>
                            <span>Pasaport (en az 6 ay geçerlilik süresi olmalı)</span>
                          </li>
                          <li className="flex items-start">
                            <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-primary/10 text-primary text-xs font-medium mr-2 mt-0.5">
                              2
                            </span>
                            <span>DS-160 formunun çıktısı</span>
                          </li>
                          <li className="flex items-start">
                            <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-primary/10 text-primary text-xs font-medium mr-2 mt-0.5">
                              3
                            </span>
                            <span>Randevu onayınızın çıktısı</span>
                          </li>
                          <li className="flex items-start">
                            <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-primary/10 text-primary text-xs font-medium mr-2 mt-0.5">
                              4
                            </span>
                            <span>Varsa destekleyici belgeler</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="flex justify-end mt-6">
                        <Button>
                          Randevu Bilgilerini Yazdır
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
