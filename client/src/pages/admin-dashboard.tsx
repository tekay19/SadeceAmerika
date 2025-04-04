import { useAuth } from "@/hooks/use-auth";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { useQuery } from "@tanstack/react-query";
import { AdminLog, Application, User, Feedback } from "@shared/schema";
import { Loader2, Users, FileText, CheckSquare, Calendar, MessageSquare, Activity } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Redirect } from "wouter";

export default function AdminDashboard() {
  const { user } = useAuth();
  
  // Redirect if not admin
  if (user?.role !== "admin") {
    return <Redirect to="/" />;
  }
  
  const { data: applications, isLoading: isLoadingApplications } = useQuery<Application[]>({
    queryKey: ["/api/applications"],
  });
  
  const { data: adminLogs, isLoading: isLoadingLogs } = useQuery<AdminLog[]>({
    queryKey: ["/api/admin/logs"],
  });
  
  const { data: feedbacks, isLoading: isLoadingFeedbacks } = useQuery<Feedback[]>({
    queryKey: ["/api/admin/feedbacks"],
  });
  
  // Get statistics
  const stats = {
    totalApplications: applications?.length || 0,
    pendingReview: applications?.filter(app => 
      app.status === 'documents_pending' || 
      app.status === 'documents_reviewing'
    ).length || 0,
    approved: applications?.filter(app => app.status === 'approved').length || 0,
    rejected: applications?.filter(app => app.status === 'rejected').length || 0,
    scheduled: applications?.filter(app => app.status === 'appointment_scheduled').length || 0,
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
              <h1 className="text-2xl font-bold text-gray-800">Yönetici Paneli</h1>
              <p className="text-gray-600">Sistem durumunu ve istatistiklerini görüntüleyin.</p>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" className="hidden md:flex items-center">
                <Activity className="mr-2 h-4 w-4" />
                Rapor Oluştur
              </Button>
              <Button>
                <span className="hidden md:inline mr-2">Yeni İşlem</span>
                <span className="md:hidden">Yeni</span>
              </Button>
            </div>
          </div>
          
          {/* Statistics Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Toplam Başvuru</CardTitle>
                <FileText className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalApplications}</div>
                <p className="text-xs text-gray-500">Tüm zamanlarda yapılan başvurular</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">İnceleme Bekleyen</CardTitle>
                <CheckSquare className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.pendingReview}</div>
                <p className="text-xs text-gray-500">İncelenmesi gereken başvurular</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Onaylanan</CardTitle>
                <CheckSquare className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.approved}</div>
                <p className="text-xs text-gray-500">Onaylanan vize başvuruları</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Randevu Alanlar</CardTitle>
                <Calendar className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.scheduled}</div>
                <p className="text-xs text-gray-500">Randevusu atanan başvurular</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content Tabs */}
          <Tabs defaultValue="applications" className="space-y-4">
            <TabsList>
              <TabsTrigger value="applications">Başvurular</TabsTrigger>
              <TabsTrigger value="activity">Aktivite Logları</TabsTrigger>
              <TabsTrigger value="feedback">Geri Bildirimler</TabsTrigger>
            </TabsList>
            
            {/* Applications Tab */}
            <TabsContent value="applications" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Son Başvurular</CardTitle>
                  <CardDescription>
                    Sistemdeki son başvuruları görüntüleyin ve yönetin.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoadingApplications ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : !applications || applications.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <FileText className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                      <p>Henüz hiç başvuru bulunmuyor.</p>
                    </div>
                  ) : (
                    <div className="rounded-md border">
                      <div className="grid grid-cols-6 p-3 text-sm font-medium text-gray-500 bg-gray-100">
                        <div className="col-span-2">Başvuru</div>
                        <div>Tarih</div>
                        <div>Vize Tipi</div>
                        <div>Durum</div>
                        <div className="text-right">İşlem</div>
                      </div>
                      <div className="divide-y">
                        {applications.slice(0, 10).map((app) => (
                          <div key={app.id} className="grid grid-cols-6 p-3 text-sm">
                            <div className="col-span-2 font-medium">{app.applicationNumber}</div>
                            <div>{app.submittedAt ? new Date(app.submittedAt).toLocaleDateString('tr-TR') : '-'}</div>
                            <div>
                              {app.visaTypeId === 1 ? 'B1 (İş)' : 
                               app.visaTypeId === 2 ? 'B2 (Turist)' : 
                               app.visaTypeId === 3 ? 'F1 (Öğrenci)' : 
                               app.visaTypeId === 4 ? 'H1B (Çalışma)' : 
                               app.visaTypeId === 5 ? 'J1 (Değişim)' : '-'}
                            </div>
                            <div>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                app.status === 'approved' ? 'bg-green-100 text-green-800' :
                                app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                app.status === 'documents_reviewing' ? 'bg-yellow-100 text-yellow-800' :
                                app.status === 'appointment_scheduled' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {app.status === 'draft' ? 'Taslak' :
                                 app.status === 'submitted' ? 'Gönderildi' :
                                 app.status === 'documents_pending' ? 'Belge Bekleniyor' :
                                 app.status === 'documents_reviewing' ? 'İnceleniyor' :
                                 app.status === 'documents_approved' ? 'Belgeler Onaylandı' :
                                 app.status === 'appointment_scheduled' ? 'Randevu Planlandı' :
                                 app.status === 'interview_completed' ? 'Görüşme Tamamlandı' :
                                 app.status === 'approved' ? 'Onaylandı' :
                                 app.status === 'rejected' ? 'Reddedildi' :
                                 app.status === 'additional_documents_required' ? 'Ek Belge Gerekli' :
                                 'Bilinmeyen Durum'}
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
                  
                  <div className="flex justify-end mt-4">
                    <Button variant="outline" asChild>
                      <a href="/applications">Tüm Başvuruları Görüntüle</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Activity Logs Tab */}
            <TabsContent value="activity" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Sistem Aktivite Logları</CardTitle>
                  <CardDescription>
                    Sistemdeki yönetici ve görevli aktivitelerini görüntüleyin.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoadingLogs ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : !adminLogs || adminLogs.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Activity className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                      <p>Henüz hiç aktivite logu bulunmuyor.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {adminLogs.slice(0, 10).map((log) => (
                        <div key={log.id} className="flex p-3 border rounded-md">
                          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                            <Users className="h-6 w-6 text-gray-500" />
                          </div>
                          <div>
                            <p className="font-medium">{log.action}</p>
                            <p className="text-sm text-gray-500">{log.details}</p>
                            <p className="text-xs text-gray-400 mt-1">
                              {new Date(log.timestamp).toLocaleString('tr-TR')}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Feedback Tab */}
            <TabsContent value="feedback" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Kullanıcı Geri Bildirimleri</CardTitle>
                  <CardDescription>
                    Kullanıcılardan gelen geri bildirimleri görüntüleyin.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoadingFeedbacks ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : !feedbacks || feedbacks.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <MessageSquare className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                      <p>Henüz hiç geri bildirim bulunmuyor.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {feedbacks.slice(0, 5).map((feedback) => (
                        <div key={feedback.id} className="p-4 border rounded-md">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-medium">Kullanıcı #{feedback.userId}</p>
                            <span className="text-xs text-gray-500">
                              {new Date(feedback.submittedAt).toLocaleString('tr-TR')}
                            </span>
                          </div>
                          <p className="text-gray-700">{feedback.message}</p>
                        </div>
                      ))}
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
