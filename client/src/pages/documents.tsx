import { useAuth } from "@/hooks/use-auth";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Application, Document } from "@shared/schema";
import { Loader2, Upload, FileText, Check, X, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Documents() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedApplication, setSelectedApplication] = useState<number | null>(null);
  const [fileType, setFileType] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const { data: applications, isLoading: isLoadingApplications } = useQuery<Application[]>({
    queryKey: ["/api/applications"],
  });

  const { data: documents, isLoading: isLoadingDocuments } = useQuery<Document[]>({
    queryKey: ["/api/documents", selectedApplication],
    enabled: !!selectedApplication,
  });
  
  const uploadMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch("/api/documents/upload", {
        method: "POST",
        body: formData,
        credentials: "include"
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || response.statusText);
      }
      
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: "Belge Yüklendi",
        description: "Belgeniz başarıyla yüklendi.",
      });
      setSelectedFile(null);
      queryClient.invalidateQueries({ queryKey: ["/api/documents", selectedApplication] });
    },
    onError: (error: Error) => {
      toast({
        title: "Belge Yüklenemedi",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };
  
  const handleUpload = () => {
    if (!selectedFile || !selectedApplication || !fileType) {
      toast({
        title: "Eksik Bilgi",
        description: "Lütfen başvuru, belge tipi ve dosya seçin.",
        variant: "destructive",
      });
      return;
    }
    
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("applicationId", selectedApplication.toString());
    formData.append("type", fileType);
    
    uploadMutation.mutate(formData);
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
            <h1 className="text-2xl font-bold text-gray-800">Belgelerim</h1>
          </div>
          
          {isLoadingApplications ? (
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
                Belge yükleyebilmek için önce bir vize başvurusu oluşturmanız gerekmektedir.
              </p>
              <Button asChild>
                <a href="/applications/new">Yeni Başvuru Oluştur</a>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Upload Form */}
              <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h2 className="text-lg font-semibold mb-4">Yeni Belge Yükle</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Başvuru Seç</label>
                      <select 
                        className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm"
                        value={selectedApplication || ""}
                        onChange={(e) => setSelectedApplication(Number(e.target.value))}
                      >
                        <option value="">Başvuru Seçin</option>
                        {applications.map(app => (
                          <option key={app.id} value={app.id}>
                            {app.applicationNumber} - {app.status === 'draft' ? 'Taslak' : 'Gönderildi'}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Belge Türü</label>
                      <select 
                        className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm"
                        value={fileType}
                        onChange={(e) => setFileType(e.target.value)}
                      >
                        <option value="">Belge Türünü Seçin</option>
                        <option value="passport">Pasaport</option>
                        <option value="photo">Fotoğraf</option>
                        <option value="employment_letter">İş Belgesi</option>
                        <option value="invitation_letter">Davet Mektubu</option>
                        <option value="travel_itinerary">Seyahat Planı</option>
                        <option value="bank_statement">Banka Hesap Dökümü</option>
                        <option value="other">Diğer</option>
                      </select>
                    </div>
                    
                    <div className="mt-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Dosya Seç</label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600">
                            <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary/90">
                              <span>Dosya yükle</span>
                              <input 
                                id="file-upload" 
                                name="file-upload" 
                                type="file" 
                                className="sr-only"
                                onChange={handleFileChange}
                              />
                            </label>
                            <p className="pl-1">veya sürükleyip bırakın</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            PDF, JPG, PNG veya DOC (en fazla 5MB)
                          </p>
                          {selectedFile && (
                            <p className="text-sm text-gray-800 font-medium mt-2">
                              Seçilen dosya: {selectedFile.name}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full mt-4" 
                      onClick={handleUpload}
                      disabled={uploadMutation.isPending || !selectedFile || !selectedApplication || !fileType}
                    >
                      {uploadMutation.isPending ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Upload className="mr-2 h-4 w-4" />
                      )}
                      Belgeyi Yükle
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Right Column - Document List */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="border-b border-gray-200 px-6 py-4">
                    <h2 className="text-lg font-semibold">Yüklenen Belgeler</h2>
                  </div>
                  
                  {!selectedApplication ? (
                    <div className="p-6 text-center text-gray-500">
                      <AlertCircle className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                      <p>Belgeleri görüntülemek için lütfen bir başvuru seçin.</p>
                    </div>
                  ) : isLoadingDocuments ? (
                    <div className="p-6 text-center">
                      <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                    </div>
                  ) : !documents || documents.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">
                      <AlertCircle className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                      <p>Bu başvuru için henüz belge yüklenmemiş.</p>
                    </div>
                  ) : (
                    <ul className="divide-y divide-gray-200">
                      {documents.map(doc => (
                        <li key={doc.id} className="px-6 py-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 rounded bg-gray-100 flex items-center justify-center">
                                <FileText className="h-5 w-5 text-gray-500" />
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-gray-800">
                                  {doc.type === 'passport' ? 'Pasaport' :
                                   doc.type === 'photo' ? 'Fotoğraf' :
                                   doc.type === 'employment_letter' ? 'İş Belgesi' :
                                   doc.type === 'invitation_letter' ? 'Davet Mektubu' :
                                   doc.type === 'travel_itinerary' ? 'Seyahat Planı' :
                                   doc.type === 'bank_statement' ? 'Banka Hesap Dökümü' :
                                   doc.type}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {doc.uploadedAt ? new Date(doc.uploadedAt).toLocaleString('tr-TR') : '-'}
                                </p>
                                {doc.notes && (
                                  <p className="text-xs text-gray-700 italic mt-1">
                                    Not: {doc.notes}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-2 ${
                                doc.status === 'approved' ? 'bg-green-100 text-green-800' :
                                doc.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                doc.status === 'missing' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {doc.status === 'pending' ? 'İnceleniyor' :
                                 doc.status === 'approved' ? 'Onaylandı' :
                                 doc.status === 'rejected' ? 'Reddedildi' :
                                 doc.status === 'missing' ? 'Eksik' : 'Bilinmeyen Durum'}
                              </span>
                              
                              {doc.status === 'approved' ? (
                                <Check className="h-5 w-5 text-green-500" />
                              ) : doc.status === 'rejected' ? (
                                <X className="h-5 w-5 text-red-500" />
                              ) : (
                                <Button variant="ghost" size="sm">Görüntüle</Button>
                              )}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
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
