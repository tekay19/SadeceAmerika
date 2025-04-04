import { useAuth } from "@/hooks/use-auth";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { StatusTimeline } from "@/components/application/status-timeline";
import { ActionCard } from "@/components/application/action-card";
import { DocumentList } from "@/components/application/document-list";
import { useQuery } from "@tanstack/react-query";
import { Application } from "@shared/schema";
import { Redirect } from "wouter";
import { Loader2 } from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();
  
  // Redirect based on role
  if (user?.role === "admin") {
    return <Redirect to="/admin" />;
  }
  
  if (user?.role === "officer") {
    return <Redirect to="/officer" />;
  }

  const { data: applications, isLoading: isLoadingApplications } = useQuery<Application[]>({
    queryKey: ["/api/applications"],
  });

  // Get the most recent application
  const latestApplication = applications && applications.length > 0
    ? applications.sort((a, b) => {
        const dateA = a.submittedAt ? new Date(a.submittedAt).getTime() : 0;
        const dateB = b.submittedAt ? new Date(b.submittedAt).getTime() : 0;
        return dateB - dateA;
      })[0]
    : null;

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header />
        
        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">
          {/* Welcome Section */}
          <section className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Hoş Geldiniz, {user?.firstName}!</h1>
            <p className="text-gray-600">ABD Vize Başvuru Sistemi'ne hoş geldiniz. Başvuru durumunuzu ve ilerleyen adımları buradan takip edebilirsiniz.</p>
          </section>

          {isLoadingApplications ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : !latestApplication ? (
            <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Henüz Başvuru Bulunmuyor</h2>
              <p className="text-gray-600 mb-6">ABD vizesi için henüz bir başvurunuz bulunmuyor. Yeni başvuru oluşturmak için aşağıdaki butona tıklayabilirsiniz.</p>
              <a href="/applications/new" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Yeni Başvuru Oluştur
              </a>
            </section>
          ) : (
            <>
              {/* Application Status Overview */}
              <section className="mb-8">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="px-4 py-5 sm:p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Başvuru Durumu</h2>
                    
                    {/* Application Status Timeline */}
                    <StatusTimeline status={latestApplication.status} />
                  </div>
                </div>
              </section>

              {/* Required Actions & Next Steps */}
              <section className="mb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Gerekli İşlemler</h2>
                
                <div className="grid gap-4 md:grid-cols-2">
                  {latestApplication.status === "documents_pending" && (
                    <ActionCard 
                      icon="exclamation-triangle"
                      iconColor="yellow"
                      title="Belge Yükleme"
                      description="Başvurunuzu tamamlamak için gerekli belgeleri yüklemeniz gerekmektedir."
                      actionText="Belge Yükle"
                      actionLink="/documents"
                      actionVariant="primary"
                    />
                  )}
                  
                  {latestApplication.status === "appointment_scheduled" && (
                    <ActionCard 
                      icon="calendar-alt"
                      iconColor="green"
                      title="Randevu Bilgisi"
                      description="Görüşme randevunuz oluşturuldu. Detayları görüntüleyin."
                      actionText="Randevu Detayları"
                      actionLink="/appointments"
                      actionVariant="primary"
                    />
                  )}
                  
                  <ActionCard 
                    icon="info-circle"
                    iconColor="green"
                    title="Ek Bilgi"
                    description="Görüşme için pasaportunuzun geçerlilik süresinin en az 6 ay daha olduğundan emin olun."
                    actionText="Kontrol Listesini Görüntüle"
                    actionLink="#"
                    actionVariant="secondary"
                  />
                </div>
              </section>

              {/* Application Summary */}
              <section className="mb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Başvuru Özeti</h2>
                
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="px-4 py-5 sm:p-6">
                    <dl className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-6">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Başvuru Numarası</dt>
                        <dd className="mt-1 text-base font-medium text-gray-800">{latestApplication.applicationNumber}</dd>
                      </div>
                      
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Başvuru Tarihi</dt>
                        <dd className="mt-1 text-base text-gray-800">
                          {latestApplication.submittedAt 
                            ? new Date(latestApplication.submittedAt).toLocaleDateString('tr-TR') 
                            : 'Henüz Gönderilmedi'}
                        </dd>
                      </div>
                      
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Vize Tipi</dt>
                        <dd className="mt-1 text-base text-gray-800">
                          {latestApplication.visaTypeId === 1 ? 'B1 (İş)' : 
                           latestApplication.visaTypeId === 2 ? 'B2 (Turist)' : 
                           latestApplication.visaTypeId === 3 ? 'F1 (Öğrenci)' :
                           latestApplication.visaTypeId === 4 ? 'H1B (Çalışma)' :
                           latestApplication.visaTypeId === 5 ? 'J1 (Değişim)' : 'Diğer'}
                        </dd>
                      </div>
                      
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Başvuru Durumu</dt>
                        <dd className="mt-1 text-base text-gray-800">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            latestApplication.status === 'approved' ? 'bg-green-100 text-green-800' :
                            latestApplication.status === 'rejected' ? 'bg-red-100 text-red-800' :
                            latestApplication.status === 'documents_reviewing' ? 'bg-yellow-100 text-yellow-800' :
                            latestApplication.status === 'appointment_scheduled' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {latestApplication.status === 'draft' ? 'Taslak' :
                             latestApplication.status === 'submitted' ? 'Gönderildi' :
                             latestApplication.status === 'documents_pending' ? 'Belge Bekleniyor' :
                             latestApplication.status === 'documents_reviewing' ? 'İnceleniyor' :
                             latestApplication.status === 'documents_approved' ? 'Belgeler Onaylandı' :
                             latestApplication.status === 'appointment_scheduled' ? 'Randevu Planlandı' :
                             latestApplication.status === 'interview_completed' ? 'Görüşme Tamamlandı' :
                             latestApplication.status === 'approved' ? 'Onaylandı' :
                             latestApplication.status === 'rejected' ? 'Reddedildi' :
                             latestApplication.status === 'additional_documents_required' ? 'Ek Belge Gerekli' :
                             'Bilinmeyen Durum'}
                          </span>
                        </dd>
                      </div>
                      
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Yolculuk Tarihi</dt>
                        <dd className="mt-1 text-base text-gray-800">
                          {latestApplication.travelDate
                            ? new Date(latestApplication.travelDate).toLocaleDateString('tr-TR')
                            : 'Belirtilmedi'}
                        </dd>
                      </div>
                      
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Görüşme Randevusu</dt>
                        <dd className="mt-1 text-base text-gray-800">
                          {latestApplication.status === 'appointment_scheduled' ? 'Planlandı' : 'Henüz Belirlenmedi'}
                        </dd>
                      </div>
                    </dl>
                    
                    <div className="mt-6 flex justify-end">
                      <a href={`/applications/${latestApplication.id}`} className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Tüm Detayları Görüntüle
                      </a>
                    </div>
                  </div>
                </div>
              </section>

              {/* Uploaded Documents Section */}
              <DocumentList applicationId={latestApplication.id} />
            </>
          )}

          {/* Support */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Yardım ve Destek</h2>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-base font-medium text-gray-800 mb-2">Sık Sorulan Sorular</h3>
                  <p className="text-sm text-gray-600 mb-4">Vize başvurusu süreciyle ilgili sık sorulan soruları ve cevaplarını inceleyebilirsiniz.</p>
                  <a href="#" className="text-primary hover:text-primary/90 font-medium text-sm">SSS'lere Göz Atın <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg></a>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-base font-medium text-gray-800 mb-2">İletişim</h3>
                  <p className="text-sm text-gray-600 mb-4">Sorularınız için destek ekibimizle iletişime geçebilirsiniz.</p>
                  <div className="flex space-x-3">
                    <a href="#" className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      E-posta
                    </a>
                    <a href="#" className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Telefon
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
