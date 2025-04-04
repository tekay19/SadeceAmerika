import { useAuth } from "@/hooks/use-auth";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { useQuery } from "@tanstack/react-query";
import { Application, Document } from "@shared/schema";
import { Loader2, FileCheck, Clock, CheckSquare, X, AlertCircle, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Redirect } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function OfficerDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedDocId, setSelectedDocId] = useState<number | null>(null);
  const [docActionNotes, setDocActionNotes] = useState("");
  
  // Redirect if not officer
  if (user?.role !== "officer" && user?.role !== "admin") {
    return <Redirect to="/" />;
  }
  
  const { data: applications, isLoading: isLoadingApplications } = useQuery<Application[]>({
    queryKey: ["/api/applications"],
  });
  
  // Get pending documents that need review
  const getPendingApplicationIds = () => {
    if (!applications) return [];
    
    return applications
      .filter(app => 
        app.status === 'documents_pending' || 
        app.status === 'documents_reviewing'
      )
      .map(app => app.id);
  };
  
  const pendingAppIds = getPendingApplicationIds();
  
  // Fetch documents for pending applications using the dedicated API endpoint
  const { data: pendingDocuments, isLoading: isLoadingDocuments } = useQuery<Document[]>({
    queryKey: ["/api/pending-documents"],
    enabled: true, // Always enable, as the endpoint handles the empty case
  });
  
  // Filter only pending docs
  const docsToReview = pendingDocuments?.filter(doc => doc.status === 'pending') || [];
  
  // Mutation to verify document
  const verifyDocMutation = useMutation({
    mutationFn: async ({ docId, status, notes }: { docId: number, status: string, notes?: string }) => {
      const res = await apiRequest("PUT", `/api/documents/${docId}/verify`, { status, notes });
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Belge durumu güncellendi",
        description: "Belge başarıyla incelendi.",
      });
      setSelectedDocId(null);
      setDocActionNotes("");
      queryClient.invalidateQueries({ queryKey: ["/api/pending-documents"] });
      queryClient.invalidateQueries({ queryKey: ["/api/applications"] });
    },
    onError: (error: Error) => {
      toast({
        title: "İşlem başarısız",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  
  const handleVerifyDoc = (docId: number, status: string) => {
    if (!docId) return;
    
    verifyDocMutation.mutate({ 
      docId, 
      status, 
      notes: docActionNotes 
    });
  };
  
  // Calculate stats
  const stats = {
    pendingReview: docsToReview.length,
    pendingApplications: pendingAppIds.length,
    todayReviewed: 0, // This would come from backend data normally
    totalReviewed: 0, // This would come from backend data normally
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
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Görevli Paneli</h1>
              <p className="text-gray-600">Belge inceleme ve başvuru yönetimi</p>
            </div>
          </div>
          
          {/* Statistics Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">İncelenecek Belgeler</CardTitle>
                <FileCheck className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.pendingReview}</div>
                <p className="text-xs text-gray-500">İncelenmesi gereken belgeler</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Bekleyen Başvurular</CardTitle>
                <Clock className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.pendingApplications}</div>
                <p className="text-xs text-gray-500">İşlem bekleyen başvurular</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Bugün İncelenen</CardTitle>
                <CheckSquare className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.todayReviewed}</div>
                <p className="text-xs text-gray-500">Bugün incelenen belgeler</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Toplam İnceleme</CardTitle>
                <CheckSquare className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalReviewed}</div>
                <p className="text-xs text-gray-500">Toplam incelenen belge</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content Tabs */}
          <Tabs defaultValue="documents" className="space-y-4">
            <TabsList>
              <TabsTrigger value="documents">Bekleyen Belgeler</TabsTrigger>
              <TabsTrigger value="applications">Bekleyen Başvurular</TabsTrigger>
            </TabsList>
            
            {/* Documents Tab */}
            <TabsContent value="documents" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <div>
                      <CardTitle>Belge İnceleme</CardTitle>
                      <CardDescription>
                        İnceleme bekleyen belgeleri görüntüleyin ve işleyin.
                      </CardDescription>
                    </div>
                    <div className="relative max-w-xs">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input placeholder="Belge ara..." className="pl-10" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {isLoadingDocuments ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : !docsToReview || docsToReview.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <CheckSquare className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                      <p>İncelenecek bekleyen belge bulunmuyor.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {docsToReview.map((doc) => (
                        <div key={doc.id} className="border p-4 rounded-md">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-start">
                              <div className="flex-shrink-0 h-10 w-10 rounded bg-gray-100 flex items-center justify-center mr-3">
                                <FileCheck className="h-5 w-5 text-gray-500" />
                              </div>
                              <div>
                                <p className="font-medium">
                                  {doc.type === 'passport' ? 'Pasaport' :
                                   doc.type === 'photo' ? 'Fotoğraf' :
                                   doc.type === 'employment_letter' ? 'İş Belgesi' :
                                   doc.type === 'invitation_letter' ? 'Davet Mektubu' :
                                   doc.type === 'travel_itinerary' ? 'Seyahat Planı' :
                                   doc.type === 'bank_statement' ? 'Banka Hesap Dökümü' :
                                   doc.type}
                                </p>
                                <p className="text-sm text-gray-500">
                                  Başvuru #{applications?.find(a => a.id === doc.applicationId)?.applicationNumber}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  Yükleme: {new Date(doc.uploadedAt).toLocaleString('tr-TR')}
                                </p>
                              </div>
                            </div>
                            
                            {selectedDocId === doc.id ? (
                              <div className="flex flex-col gap-2">
                                <Input
                                  placeholder="İnceleme notu (opsiyonel)"
                                  value={docActionNotes}
                                  onChange={e => setDocActionNotes(e.target.value)}
                                  className="mb-2"
                                />
                                <div className="flex gap-2">
                                  <Button 
                                    size="sm" 
                                    onClick={() => handleVerifyDoc(doc.id, 'approved')}
                                    disabled={verifyDocMutation.isPending}
                                    className="flex-1"
                                  >
                                    <CheckSquare className="h-4 w-4 mr-1" />
                                    Onayla
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="destructive" 
                                    onClick={() => handleVerifyDoc(doc.id, 'rejected')}
                                    disabled={verifyDocMutation.isPending}
                                    className="flex-1"
                                  >
                                    <X className="h-4 w-4 mr-1" />
                                    Reddet
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => setSelectedDocId(null)}
                                    disabled={verifyDocMutation.isPending}
                                  >
                                    İptal
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <Button onClick={() => setSelectedDocId(doc.id)}>
                                İncele
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Applications Tab */}
            <TabsContent value="applications" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Bekleyen Başvurular</CardTitle>
                  <CardDescription>
                    İşlem bekleyen başvuruları görüntüleyin ve yönetin.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoadingApplications ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : !pendingAppIds || pendingAppIds.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <AlertCircle className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                      <p>İşlem bekleyen başvuru bulunmuyor.</p>
                    </div>
                  ) : (
                    <div className="rounded-md border">
                      <div className="grid grid-cols-5 p-3 text-sm font-medium text-gray-500 bg-gray-100">
                        <div className="col-span-2">Başvuru</div>
                        <div>Tarih</div>
                        <div>Durum</div>
                        <div className="text-right">İşlem</div>
                      </div>
                      <div className="divide-y">
                        {applications
                          ?.filter(app => pendingAppIds.includes(app.id))
                          .map((app) => (
                            <div key={app.id} className="grid grid-cols-5 p-3 text-sm">
                              <div className="col-span-2 font-medium">{app.applicationNumber}</div>
                              <div>{app.submittedAt ? new Date(app.submittedAt).toLocaleDateString('tr-TR') : '-'}</div>
                              <div>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  app.status === 'documents_pending' ? 'bg-yellow-100 text-yellow-800' :
                                  app.status === 'documents_reviewing' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {app.status === 'documents_pending' ? 'Belge Bekleniyor' :
                                  app.status === 'documents_reviewing' ? 'İnceleniyor' :
                                  app.status}
                                </span>
                              </div>
                              <div className="text-right">
                                <Button variant="ghost" size="sm" asChild>
                                  <a href={`/applications/${app.id}`}>Görüntüle</a>
                                </Button>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
