import { useAuth } from "@/hooks/use-auth";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { useQuery } from "@tanstack/react-query";
import { Application } from "@shared/schema";
import { Loader2, FileText, Plus, Search, Filter, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { useState } from "react";
import { ApplicationFilter } from "@/components/admin/application-filter";
import { exportApplicationsToExcel } from "@/components/admin/export-utils";

export default function Applications() {
  const { user } = useAuth();
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([]);
  
  const { data: applications, isLoading } = useQuery<Application[]>({
    queryKey: ["/api/applications"],
    onSuccess: (data) => {
      if (data) {
        setFilteredApplications(data);
      }
    }
  });

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
            <h1 className="text-2xl font-bold text-gray-800">Başvurularım</h1>
            
            <Link href="/applications/new">
              <Button className="flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Yeni Başvuru
              </Button>
            </Link>
          </div>
          
          {/* Filtreler ve Arama */}
          {applications && applications.length > 0 && (
            <div className="mb-6 flex items-center justify-between">
              <ApplicationFilter 
                applications={applications} 
                onFilterChange={setFilteredApplications} 
              />
              
              <Button 
                variant="outline" 
                className="flex items-center self-start ml-auto"
                onClick={() => exportApplicationsToExcel(filteredApplications)}
                disabled={filteredApplications.length === 0}
              >
                <Download className="h-4 w-4 mr-2" />
                Excel Olarak İndir
              </Button>
            </div>
          )}
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : !applications || applications.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Henüz başvuru bulunmuyor</h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                ABD vizesi başvurusu yapmak için "Yeni Başvuru" butonuna tıklayarak işleme başlayabilirsiniz.
              </p>
              <Link href="/applications/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Yeni Başvuru Oluştur
                </Button>
              </Link>
            </div>
          ) : (
            <div className="bg-white overflow-hidden sm:rounded-md shadow-sm border border-gray-200">
              <ul className="divide-y divide-gray-200">
                {filteredApplications.map(application => (
                  <li key={application.id}>
                    <div 
                      className="block hover:bg-gray-50 cursor-pointer"
                      onClick={() => window.location.href = `/applications/${application.id}`}
                    >
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <FileText className="h-5 w-5 text-primary" />
                            </div>
                            <div className="ml-4">
                              <p className="text-sm font-medium text-gray-900">
                                Başvuru #{application.applicationNumber}
                              </p>
                              <p className="text-sm text-gray-500">
                                {application.submittedAt 
                                  ? `Gönderilme: ${new Date(application.submittedAt).toLocaleDateString('tr-TR')}`
                                  : 'Taslak'}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              application.status === 'approved' ? 'bg-green-100 text-green-800' :
                              application.status === 'rejected' ? 'bg-red-100 text-red-800' :
                              application.status === 'documents_reviewing' ? 'bg-yellow-100 text-yellow-800' :
                              application.status === 'appointment_scheduled' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
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
                            </span>
                            <p className="text-xs text-gray-500 mt-1">
                              {application.visaTypeId === 1 ? 'B1 (İş)' : 
                                application.visaTypeId === 2 ? 'B2 (Turist)' : 
                                application.visaTypeId === 3 ? 'F1 (Öğrenci)' :
                                application.visaTypeId === 4 ? 'H1B (Çalışma)' :
                                application.visaTypeId === 5 ? 'J1 (Değişim)' : 'Diğer'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
