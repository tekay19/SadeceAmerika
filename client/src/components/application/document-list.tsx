import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Document } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Loader2, FileText, Upload, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

type DocumentListProps = {
  applicationId: number;
};

export function DocumentList({ applicationId }: DocumentListProps) {
  const [showAll, setShowAll] = useState(false);
  
  const { data: documents, isLoading } = useQuery<Document[]>({
    queryKey: ["/api/documents", applicationId],
    enabled: !!applicationId,
  });
  
  // Map document type to readable name
  const getDocumentTypeName = (type: string) => {
    const typeMap: Record<string, string> = {
      'passport': 'Pasaport Kopyası',
      'photo': 'Fotoğraf',
      'employment_letter': 'İş Belgesi',
      'invitation_letter': 'Davet Mektubu',
      'travel_itinerary': 'Seyahat Planı',
      'bank_statement': 'Banka Hesap Dökümü',
    };
    
    return typeMap[type] || type;
  };
  
  // Get document status badge color and text
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return { color: 'bg-green-100 text-green-800', text: 'Onaylandı' };
      case 'rejected':
        return { color: 'bg-red-100 text-red-800', text: 'Reddedildi' };
      case 'missing':
        return { color: 'bg-red-100 text-red-800', text: 'Eksik' };
      case 'pending':
      default:
        return { color: 'bg-yellow-100 text-yellow-800', text: 'İnceleniyor' };
    }
  };
  
  const documentTypes = [
    'passport',
    'photo',
    'employment_letter',
    'invitation_letter',
    'travel_itinerary',
    'bank_statement',
  ];
  
  // Check if each required document exists and its status
  const documentStatuses = documentTypes.map(type => {
    const doc = documents?.find(doc => doc.type === type);
    return {
      type,
      exists: !!doc,
      document: doc,
      status: doc?.status || 'missing'
    };
  });
  
  // Count total uploaded documents
  const totalDocuments = documentStatuses.length;
  const uploadedDocuments = documentStatuses.filter(doc => doc.exists).length;
  
  // Show a limited number of documents when showAll is false
  const visibleDocuments = showAll ? documentStatuses : documentStatuses.slice(0, 5);
  
  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Yüklenen Belgeler</h2>
        <Button
          variant="link"
          className="text-sm font-medium text-primary hover:text-primary/90"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Daha Az Göster" : "Tümünü Görüntüle"}
          <span className="ml-1 text-xs">{`→`}</span>
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Belge Listesi</span>
                <span className="text-sm text-gray-500">{uploadedDocuments}/{totalDocuments} Tamamlandı</span>
              </div>
            </div>
            
            <ul className="divide-y divide-gray-200">
              {visibleDocuments.map((docStatus) => {
                const statusBadge = getStatusBadge(docStatus.status);
                
                return (
                  <li key={docStatus.type} className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded bg-gray-100 flex items-center justify-center">
                          <FileText className="h-5 w-5 text-gray-500" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-800">
                            {getDocumentTypeName(docStatus.type)}
                          </p>
                          <p className="text-xs text-gray-500">
                            {docStatus.document?.uploadedAt 
                              ? new Date(docStatus.document.uploadedAt).toLocaleString('tr-TR')
                              : 'Henüz Yüklenmedi'}
                          </p>
                          {docStatus.document?.notes && (
                            <p className="text-xs text-gray-700 italic mt-1">
                              Not: {docStatus.document.notes}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className={cn(
                          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-2",
                          statusBadge.color
                        )}>
                          {statusBadge.text}
                        </span>
                        
                        {docStatus.status === 'approved' ? (
                          <Check className="h-5 w-5 text-green-500" />
                        ) : docStatus.status === 'rejected' ? (
                          <X className="h-5 w-5 text-red-500" />
                        ) : docStatus.status === 'missing' ? (
                          <Button 
                            size="sm" 
                            className="text-primary font-medium text-sm"
                            asChild
                          >
                            <a href="/documents">Yükle</a>
                          </Button>
                        ) : (
                          <Button variant="ghost" size="sm">Görüntüle</Button>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            
            {documentStatuses.length > 5 && !showAll && (
              <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-center">
                <Button 
                  variant="link" 
                  onClick={() => setShowAll(true)}
                  className="text-primary hover:text-primary/90"
                >
                  {documentStatuses.length - 5} daha fazla belge göster
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
