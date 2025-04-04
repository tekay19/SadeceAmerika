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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Calendar as CalendarIcon, Clock, Loader2, MapPin } from "lucide-react";
import { Application } from "@shared/schema";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface AppointmentCreateProps {
  application: Application;
  isOfficer: boolean;
}

export function AppointmentCreate({ application, isOfficer }: AppointmentCreateProps) {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("09:00");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  
  // Only allow appointment creation if documents are approved
  const canCreateAppointment = application.status === "documents_approved";
  
  const appointmentMutation = useMutation({
    mutationFn: async () => {
      // Combine date and time
      if (!date) throw new Error("Lütfen bir tarih seçin");
      
      const [hours, minutes] = time.split(':').map(n => parseInt(n));
      const appointmentDate = new Date(date);
      appointmentDate.setHours(hours, minutes);
      
      const res = await apiRequest(
        "POST", 
        "/api/appointments", 
        { 
          applicationId: application.id,
          date: appointmentDate.toISOString(),
          location,
          notes
        }
      );
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Randevu oluşturuldu",
        description: "Başvuru için randevu başarıyla oluşturuldu.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/applications"] });
      queryClient.invalidateQueries({ queryKey: [`/api/applications/${application.id}`] });
      queryClient.invalidateQueries({ queryKey: [`/api/appointments/${application.id}`] });
      
      // Reset form
      setDate(undefined);
      setTime("09:00");
      setLocation("");
      setNotes("");
    },
    onError: (error: Error) => {
      toast({
        title: "Randevu oluşturulamadı",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  
  // Only officers can create appointments
  if (!isOfficer) {
    return null;
  }
  
  // Don't show if application is not in the right status
  if (!canCreateAppointment) {
    return null;
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Randevu Oluştur</CardTitle>
        <CardDescription>
          Bu başvuru için görüşme randevusu planlayın
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Randevu Tarihi
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Tarih seçin"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                disabled={(date) => {
                  // Disable dates in the past
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  return date < today;
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Randevu Saati
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Randevu Yeri
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="ör. ABD Büyükelçiliği, Ankara"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Notlar
          </label>
          <Textarea
            placeholder="Randevu ile ilgili ek bilgiler"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="resize-none"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => appointmentMutation.mutate()}
          disabled={
            appointmentMutation.isPending ||
            !date ||
            !time ||
            !location
          }
          className="w-full"
        >
          {appointmentMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              İşleniyor...
            </>
          ) : (
            "Randevu Oluştur"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}