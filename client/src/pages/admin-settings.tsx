import { useAuth } from "@/hooks/use-auth";
import { Redirect } from "wouter";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Loader2, Save, Settings as SettingsIcon, Mail, Shield, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Type for settings groups
type SettingsGroups = {
  general?: {
    appName?: string;
    version?: string;
    mode?: string;
  };
  email?: {
    smtpHost?: string;
    smtpPort?: string;
    emailUser?: string;
    emailPass?: string;
  };
  security?: {
    jwtSecret?: string;
    jwtExpiresIn?: string;
    rateLimit?: string;
  };
  logging?: {
    level?: string;
    format?: string;
  };
};

export default function AdminSettings() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("general");
  
  // Redirect if not admin
  if (user?.role !== "admin") {
    return <Redirect to="/" />;
  }
  
  // Fetch all settings
  const { data: settingsData, isLoading: isLoadingSettings } = useQuery<SettingsGroups>({
    queryKey: ["/api/admin/settings"],
  });
  
  // Update settings mutation
  const updateSettingsMutation = useMutation({
    mutationFn: async (settings: Record<string, Record<string, string>>) => {
      const response = await apiRequest("PUT", "/api/admin/settings", settings);
      return response;
    },
    onSuccess: () => {
      toast({
        title: "Ayarlar güncellendi",
        description: "Sistem ayarları başarıyla güncellendi.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/settings"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Hata",
        description: `Ayarlar güncellenirken bir hata oluştu: ${error.message}`,
        variant: "destructive",
      });
    },
  });
  
  // Update single category settings
  const updateCategoryMutation = useMutation({
    mutationFn: async ({ category, settings }: { category: string; settings: Record<string, string> }) => {
      const response = await apiRequest("PUT", `/api/admin/settings/${category}`, settings);
      return response;
    },
    onSuccess: (_, variables) => {
      toast({
        title: "Kategori ayarları güncellendi",
        description: `${variables.category} kategorisi ayarları başarıyla güncellendi.`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/settings"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Hata",
        description: `Kategori ayarları güncellenirken bir hata oluştu: ${error.message}`,
        variant: "destructive",
      });
    },
  });
  
  // Handle saving all settings
  const handleSaveAllSettings = () => {
    if (settingsData) {
      updateSettingsMutation.mutate(settingsData);
    }
  };
  
  // Handle saving a specific category
  const handleSaveCategory = (category: string) => {
    if (settingsData) {
      const categorySettings = settingsData[category as keyof SettingsGroups];
      if (categorySettings) {
        updateCategoryMutation.mutate({ 
          category, 
          settings: categorySettings as Record<string, string> 
        });
      }
    }
  };
  
  // Handle input change for a specific setting
  const handleInputChange = (category: string, key: string, value: string) => {
    if (settingsData) {
      // Create a deep copy to avoid mutating the query cache
      const updatedSettings = { ...settingsData };
      
      if (!updatedSettings[category as keyof SettingsGroups]) {
        (updatedSettings as any)[category] = {};
      }
      
      (updatedSettings[category as keyof SettingsGroups] as any)[key] = value;
      
      // Update the local state directly - will be saved on save button click
      queryClient.setQueryData(["/api/admin/settings"], updatedSettings);
    }
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
              <h1 className="text-2xl font-bold text-gray-800">Sistem Ayarları</h1>
              <p className="text-gray-600">Uygulama yapılandırmasını yönetin ve düzenleyin.</p>
            </div>
            
            <Button 
              onClick={handleSaveAllSettings} 
              disabled={isLoadingSettings || updateSettingsMutation.isPending}
            >
              {updateSettingsMutation.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              Tüm Ayarları Kaydet
            </Button>
          </div>
          
          {isLoadingSettings ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="general" className="flex items-center">
                  <SettingsIcon className="mr-2 h-4 w-4" />
                  <span>Genel Ayarlar</span>
                </TabsTrigger>
                <TabsTrigger value="email" className="flex items-center">
                  <Mail className="mr-2 h-4 w-4" />
                  <span>E-posta Ayarları</span>
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center">
                  <Shield className="mr-2 h-4 w-4" />
                  <span>Güvenlik Ayarları</span>
                </TabsTrigger>
                <TabsTrigger value="logging" className="flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Loglama Ayarları</span>
                </TabsTrigger>
              </TabsList>
              
              {/* General Settings Tab */}
              <TabsContent value="general">
                <Card>
                  <CardHeader>
                    <CardTitle>Genel Ayarlar</CardTitle>
                    <CardDescription>
                      Uygulama adı, versiyonu ve çalışma modu gibi temel ayarları düzenleyin.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="appName">Uygulama Adı</Label>
                        <Input
                          id="appName"
                          value={settingsData?.general?.appName || ""}
                          onChange={(e) => handleInputChange("general", "appName", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="version">Versiyon</Label>
                        <Input
                          id="version"
                          value={settingsData?.general?.version || ""}
                          onChange={(e) => handleInputChange("general", "version", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="mode">Çalışma Modu</Label>
                        <Select 
                          value={settingsData?.general?.mode || "production"} 
                          onValueChange={(value) => handleInputChange("general", "mode", value)}
                        >
                          <SelectTrigger id="mode">
                            <SelectValue placeholder="Çalışma modu seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="development">Geliştirme</SelectItem>
                            <SelectItem value="production">Prodüksiyon</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="justify-end">
                    <Button 
                      variant="outline" 
                      onClick={() => handleSaveCategory("general")}
                      disabled={updateCategoryMutation.isPending}
                    >
                      {updateCategoryMutation.isPending && updateCategoryMutation.variables?.category === "general" ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Save className="mr-2 h-4 w-4" />
                      )}
                      Genel Ayarları Kaydet
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              {/* Email Settings Tab */}
              <TabsContent value="email">
                <Card>
                  <CardHeader>
                    <CardTitle>E-posta Ayarları</CardTitle>
                    <CardDescription>
                      SMTP sunucu ayarları ve e-posta gönderimi için gerekli yapılandırmaları düzenleyin.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="smtpHost">SMTP Host</Label>
                        <Input
                          id="smtpHost"
                          value={settingsData?.email?.smtpHost || ""}
                          onChange={(e) => handleInputChange("email", "smtpHost", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="smtpPort">SMTP Port</Label>
                        <Input
                          id="smtpPort"
                          type="number"
                          value={settingsData?.email?.smtpPort || ""}
                          onChange={(e) => handleInputChange("email", "smtpPort", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="emailUser">E-posta Adresi</Label>
                        <Input
                          id="emailUser"
                          type="email"
                          value={settingsData?.email?.emailUser || ""}
                          onChange={(e) => handleInputChange("email", "emailUser", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="emailPass">E-posta Şifresi</Label>
                        <Input
                          id="emailPass"
                          type="password"
                          value={settingsData?.email?.emailPass || ""}
                          onChange={(e) => handleInputChange("email", "emailPass", e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="justify-end">
                    <Button 
                      variant="outline" 
                      onClick={() => handleSaveCategory("email")}
                      disabled={updateCategoryMutation.isPending}
                    >
                      {updateCategoryMutation.isPending && updateCategoryMutation.variables?.category === "email" ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Save className="mr-2 h-4 w-4" />
                      )}
                      E-posta Ayarlarını Kaydet
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              {/* Security Settings Tab */}
              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Güvenlik Ayarları</CardTitle>
                    <CardDescription>
                      JWT token ve rate limiting gibi güvenlik ayarlarını yapılandırın.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="jwtSecret">JWT Secret</Label>
                        <Input
                          id="jwtSecret"
                          value={settingsData?.security?.jwtSecret || ""}
                          onChange={(e) => handleInputChange("security", "jwtSecret", e.target.value)}
                        />
                        <p className="text-xs text-gray-500">JWT token imzalama için kullanılacak gizli anahtar.</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="jwtExpiresIn">JWT Süresi</Label>
                        <Input
                          id="jwtExpiresIn"
                          value={settingsData?.security?.jwtExpiresIn || ""}
                          onChange={(e) => handleInputChange("security", "jwtExpiresIn", e.target.value)}
                        />
                        <p className="text-xs text-gray-500">Örnek: 15m (15 dakika), 1h (1 saat), 1d (1 gün)</p>
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="rateLimit">Rate Limiting</Label>
                        <Input
                          id="rateLimit"
                          type="number"
                          value={settingsData?.security?.rateLimit || ""}
                          onChange={(e) => handleInputChange("security", "rateLimit", e.target.value)}
                        />
                        <p className="text-xs text-gray-500">IP başına dakikada izin verilen maksimum istek sayısı.</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="justify-end">
                    <Button 
                      variant="outline" 
                      onClick={() => handleSaveCategory("security")}
                      disabled={updateCategoryMutation.isPending}
                    >
                      {updateCategoryMutation.isPending && updateCategoryMutation.variables?.category === "security" ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Save className="mr-2 h-4 w-4" />
                      )}
                      Güvenlik Ayarlarını Kaydet
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              {/* Logging Settings Tab */}
              <TabsContent value="logging">
                <Card>
                  <CardHeader>
                    <CardTitle>Loglama Ayarları</CardTitle>
                    <CardDescription>
                      Sistem loglarının seviyesini ve formatını yapılandırın.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="level">Log Seviyesi</Label>
                        <Select 
                          value={settingsData?.logging?.level || "info"} 
                          onValueChange={(value) => handleInputChange("logging", "level", value)}
                        >
                          <SelectTrigger id="level">
                            <SelectValue placeholder="Log seviyesi seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="error">Hata</SelectItem>
                            <SelectItem value="info">Bilgi</SelectItem>
                            <SelectItem value="debug">Debug</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="format">Log Formatı</Label>
                        <Select 
                          value={settingsData?.logging?.format || "combined"} 
                          onValueChange={(value) => handleInputChange("logging", "format", value)}
                        >
                          <SelectTrigger id="format">
                            <SelectValue placeholder="Log formatı seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="combined">Combined</SelectItem>
                            <SelectItem value="common">Common</SelectItem>
                            <SelectItem value="short">Short</SelectItem>
                            <SelectItem value="tiny">Tiny</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="justify-end">
                    <Button 
                      variant="outline" 
                      onClick={() => handleSaveCategory("logging")}
                      disabled={updateCategoryMutation.isPending}
                    >
                      {updateCategoryMutation.isPending && updateCategoryMutation.variables?.category === "logging" ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Save className="mr-2 h-4 w-4" />
                      )}
                      Loglama Ayarlarını Kaydet
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </main>
      </div>
    </div>
  );
}