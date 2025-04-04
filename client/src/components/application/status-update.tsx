import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Application } from "@shared/schema";

interface StatusUpdateProps {
  application: Application;
  isOfficer: boolean;
}

type ApplicationStatus = 
  | 'draft'
  | 'submitted'
  | 'documents_pending'
  | 'documents_reviewing'
  | 'documents_approved'
  | 'additional_documents_required'
  | 'appointment_scheduled'
  | 'interview_completed'
  | 'approved'
  | 'rejected'
  | 'completed';

export function StatusUpdate({ application, isOfficer }: StatusUpdateProps) {
  const { toast } = useToast();
  const [status, setStatus] = useState<ApplicationStatus>(application.status as ApplicationStatus);
  const [notes, setNotes] = useState("");
  
  const statusMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest(
        "PUT", 
        `/api/applications/${application.id}`, 
        { status, notes }
      );
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Başvuru durumu güncellendi",
        description: "Başvurunun durumu başarıyla güncellendi.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/applications"] });
      queryClient.invalidateQueries({ queryKey: [`/api/applications/${application.id}`] });
      setNotes("");
    },
    onError: (error: Error) => {
      toast({
        title: "İşlem başarısız",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  
  const getNextStatusOptions = () => {
    // Define available status transitions based on current status
    const statusMap: Record<string, string[]> = {
      'draft': ['submitted'],
      'submitted': ['documents_pending', 'documents_reviewing', 'rejected'],
      'documents_pending': ['documents_reviewing', 'rejected'],
      'documents_reviewing': ['documents_approved', 'additional_documents_required', 'rejected'],
      'documents_approved': ['appointment_scheduled', 'rejected'],
      'additional_documents_required': ['documents_reviewing', 'rejected'],
      'appointment_scheduled': ['interview_completed', 'rejected'],
      'interview_completed': ['approved', 'rejected'],
      'approved': ['completed'],
      'rejected': ['documents_pending'], // Allow reapplying after rejection
    };
    
    return statusMap[application.status] || [];
  };
  
  const getStatusLabel = (statusCode: string) => {
    const statusLabels: Record<string, string> = {
      'draft': 'Taslak',
      'submitted': 'Gönderildi',
      'documents_pending': 'Belge Bekleniyor',
      'documents_reviewing': 'İnceleniyor',
      'documents_approved': 'Belgeler Onaylandı',
      'additional_documents_required': 'Ek Belge Gerekli',
      'appointment_scheduled': 'Randevu Planlandı',
      'interview_completed': 'Görüşme Tamamlandı',
      'approved': 'Onaylandı',
      'rejected': 'Reddedildi',
      'completed': 'Tamamlandı'
    };
    
    return statusLabels[statusCode] || statusCode;
  };
  
  // Only officers can update certain statuses
  if (!isOfficer) {
    return null;
  }
  
  const nextStatusOptions = getNextStatusOptions();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Başvuru Durumu Güncelle</CardTitle>
        <CardDescription>
          Bu başvurunun durumunu ve notlarını güncelleyin
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Mevcut Durum
          </label>
          <p className="text-sm text-gray-800 font-medium border p-2 rounded bg-gray-50">
            {getStatusLabel(application.status)}
          </p>
        </div>
        
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Yeni Durum
          </label>
          <Select 
            defaultValue={application.status} 
            onValueChange={(value: string) => setStatus(value as ApplicationStatus)}
            disabled={nextStatusOptions.length === 0}
          >
            <SelectTrigger>
              <SelectValue placeholder="Durum seçin" />
            </SelectTrigger>
            <SelectContent>
              {nextStatusOptions.map(statusOption => (
                <SelectItem key={statusOption} value={statusOption}>
                  {getStatusLabel(statusOption)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {nextStatusOptions.length === 0 && (
            <p className="text-xs text-yellow-600 mt-1">
              Bu aşamada durum değişikliği yapılamaz
            </p>
          )}
        </div>
        
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            İşlem Notu
          </label>
          <Textarea
            placeholder="Bu durum değişikliği ile ilgili notlar..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="resize-none"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => statusMutation.mutate()}
          disabled={
            statusMutation.isPending ||
            status === application.status ||
            nextStatusOptions.length === 0
          }
          className="w-full"
        >
          {statusMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              İşleniyor...
            </>
          ) : (
            "Durumu Güncelle"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}