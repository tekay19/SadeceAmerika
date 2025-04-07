import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Search, Filter, X } from "lucide-react";
import { Application } from "@shared/schema";

// Başvuru filtreleme kriterleri için arayüz
interface ApplicationFilters {
  searchTerm: string;
  status: string;
  dateRange: {
    from: string;
    to: string;
  };
}

// Varsayılan filtre değerleri
const defaultFilters: ApplicationFilters = {
  searchTerm: "",
  status: "all",
  dateRange: {
    from: "",
    to: ""
  }
};

interface ApplicationFilterProps {
  applications: Application[];
  onFilterChange: (filteredApplications: Application[]) => void;
}

export function ApplicationFilter({ applications, onFilterChange }: ApplicationFilterProps) {
  const [filters, setFilters] = useState<ApplicationFilters>(defaultFilters);
  const [isExpanded, setIsExpanded] = useState(false);

  // Filtreleri uygula ve sonuçları üst bileşene gönder
  const applyFilters = () => {
    let filtered = [...applications];

    // Arama terimi filtresi (ad, soyad, telefon ve başvuru no üzerinde)
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(app => {
        return (
          (app.firstName && app.firstName.toLowerCase().includes(searchLower)) ||
          (app.lastName && app.lastName.toLowerCase().includes(searchLower)) ||
          (app.phone && app.phone.toLowerCase().includes(searchLower)) ||
          (app.applicationNumber && app.applicationNumber.toLowerCase().includes(searchLower))
        );
      });
    }

    // Durum filtresi
    if (filters.status && filters.status !== "all") {
      filtered = filtered.filter(app => app.status === filters.status);
    }

    // Tarih aralığı filtresi
    if (filters.dateRange.from || filters.dateRange.to) {
      filtered = filtered.filter(app => {
        const appDate = app.submittedAt ? new Date(app.submittedAt) : 
                        app.applicationDate ? new Date(app.applicationDate) : null;
        
        if (!appDate) return true; // Tarihi olmayan başvuruları göstermeye devam et
        
        // Başlangıç tarihi kontrolü
        if (filters.dateRange.from) {
          const fromDate = new Date(filters.dateRange.from);
          if (appDate < fromDate) return false;
        }
        
        // Bitiş tarihi kontrolü
        if (filters.dateRange.to) {
          const toDate = new Date(filters.dateRange.to);
          toDate.setHours(23, 59, 59, 999); // Günün sonuna ayarla
          if (appDate > toDate) return false;
        }
        
        return true;
      });
    }

    onFilterChange(filtered);
  };

  // Filtreleri temizle
  const resetFilters = () => {
    setFilters(defaultFilters);
    onFilterChange(applications); // Orijinal listeyi geri yükle
  };

  // Filtre değişikliklerini yönet
  const handleFilterChange = (name: string, value: any) => {
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFilters({
        ...filters,
        [parent]: {
          ...filters[parent as keyof ApplicationFilters],
          [child]: value
        }
      });
    } else {
      setFilters({ ...filters, [name]: value });
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Başvuru Filtreleme</CardTitle>
            <CardDescription>
              Başvuruları filtrelemek için aşağıdaki seçenekleri kullanın
            </CardDescription>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Filter className="h-4 w-4 mr-2" />
            {isExpanded ? "Filtreleri Gizle" : "Filtreleri Göster"}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Hızlı Arama Kısmı */}
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Ad, soyad, telefon veya başvuru numarası ile ara..."
              className="pl-9"
              value={filters.searchTerm}
              onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
            />
            {filters.searchTerm && (
              <button 
                onClick={() => handleFilterChange('searchTerm', '')}
                className="absolute right-2.5 top-2.5 text-gray-500 hover:text-gray-700"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <Button onClick={applyFilters}>
            <Search className="h-4 w-4 mr-2" />
            Ara
          </Button>
        </div>

        {/* Genişletilmiş Filtreler */}
        {isExpanded && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Durum</Label>
              <Select 
                value={filters.status} 
                onValueChange={(value) => handleFilterChange('status', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Tüm durumlar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tüm Durumlar</SelectItem>
                  <SelectItem value="draft">Taslak</SelectItem>
                  <SelectItem value="submitted">Gönderildi</SelectItem>
                  <SelectItem value="documents_pending">Belge Bekleniyor</SelectItem>
                  <SelectItem value="documents_reviewing">İnceleniyor</SelectItem>
                  <SelectItem value="documents_approved">Belgeler Onaylandı</SelectItem>
                  <SelectItem value="appointment_scheduled">Randevu Planlandı</SelectItem>
                  <SelectItem value="interview_completed">Görüşme Tamamlandı</SelectItem>
                  <SelectItem value="approved">Onaylandı</SelectItem>
                  <SelectItem value="rejected">Reddedildi</SelectItem>
                  <SelectItem value="additional_documents_required">Ek Belge Gerekli</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fromDate">Başlangıç Tarihi</Label>
              <Input
                type="date"
                id="fromDate"
                value={filters.dateRange.from}
                onChange={(e) => handleFilterChange('dateRange.from', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="toDate">Bitiş Tarihi</Label>
              <Input
                type="date"
                id="toDate"
                value={filters.dateRange.to}
                onChange={(e) => handleFilterChange('dateRange.to', e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Filtre işlemleri butonları */}
        {isExpanded && (
          <div className="mt-4 flex justify-end space-x-2">
            <Button variant="outline" onClick={resetFilters}>
              Filtreleri Temizle
            </Button>
            <Button onClick={applyFilters}>
              Filtreleri Uygula
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}