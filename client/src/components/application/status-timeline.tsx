import { CheckIcon, Loader2, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type StatusStep = {
  title: string;
  description: string;
  date?: string;
  status: 'completed' | 'current' | 'upcoming';
  icon: React.ReactNode;
};

type StatusTimelineProps = {
  status: string;
};

export function StatusTimeline({ status }: StatusTimelineProps) {
  // Determine which steps are completed, current and upcoming based on the application status
  let steps: StatusStep[] = [
    {
      title: "Kayıt Tamamlandı",
      description: "Hesabınız başarıyla oluşturuldu ve doğrulandı.",
      date: new Date().toLocaleDateString('tr-TR'),
      status: 'completed',
      icon: <CheckIcon className="h-4 w-4" />,
    },
    {
      title: "Başvuru Formu Tamamlandı",
      description: "Vize başvuru formunuz başarıyla gönderildi.",
      date: status !== 'draft' ? new Date().toLocaleDateString('tr-TR') : undefined,
      status: status === 'draft' ? 'current' : 'completed',
      icon: status === 'draft' ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckIcon className="h-4 w-4" />,
    },
    {
      title: "Belge İncelemesi",
      description: "Yüklemiş olduğunuz belgeler inceleniyor. Bu süreç yaklaşık 5-7 iş günü içerisinde tamamlanacaktır.",
      date: ['documents_reviewing', 'documents_approved', 'appointment_scheduled', 'interview_completed', 'approved', 'rejected'].includes(status) ? new Date().toLocaleDateString('tr-TR') : undefined,
      status: status === 'documents_pending' ? 'current' : 
              status === 'additional_documents_required' ? 'current' :
              ['documents_reviewing', 'documents_approved', 'appointment_scheduled', 'interview_completed', 'approved', 'rejected'].includes(status) ? 'completed' : 'upcoming',
      icon: status === 'documents_pending' || status === 'additional_documents_required' ? <Loader2 className="h-4 w-4 animate-spin" /> : 
            ['documents_reviewing', 'documents_approved', 'appointment_scheduled', 'interview_completed', 'approved', 'rejected'].includes(status) ? <CheckIcon className="h-4 w-4" /> : null,
    },
    {
      title: "Randevu Ataması",
      description: "Belgeleriniz onaylandıktan sonra görüşme randevunuz oluşturulacaktır.",
      date: ['appointment_scheduled', 'interview_completed', 'approved', 'rejected'].includes(status) ? new Date().toLocaleDateString('tr-TR') : undefined,
      status: status === 'documents_approved' ? 'current' :
              ['appointment_scheduled', 'interview_completed', 'approved', 'rejected'].includes(status) ? 'completed' : 'upcoming',
      icon: status === 'documents_approved' ? <Loader2 className="h-4 w-4 animate-spin" /> :
            ['appointment_scheduled', 'interview_completed', 'approved', 'rejected'].includes(status) ? <CheckIcon className="h-4 w-4" /> : null,
    },
    {
      title: "Vize Kararı",
      description: "Görüşme sonrası vize kararınız burada gösterilecektir.",
      date: ['approved', 'rejected'].includes(status) ? new Date().toLocaleDateString('tr-TR') : undefined,
      status: status === 'interview_completed' ? 'current' :
              ['approved', 'rejected'].includes(status) ? 'completed' : 'upcoming',
      icon: status === 'interview_completed' ? <Loader2 className="h-4 w-4 animate-spin" /> :
            status === 'approved' ? <CheckIcon className="h-4 w-4" /> :
            status === 'rejected' ? <XIcon className="h-4 w-4" /> : null,
    }
  ];

  return (
    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200"></div>
      
      {/* Timeline Items */}
      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={index} className="relative flex items-start">
            <div className={cn(
              "flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center z-10 border-2 border-white",
              step.status === 'completed' ? 'bg-green-100 text-green-600' : 
              step.status === 'current' ? 'bg-primary text-white' : 
              'bg-gray-200 text-gray-400'
            )}>
              {step.icon}
            </div>
            <div className="ml-4">
              <h3 className={cn(
                "text-base font-medium",
                step.status === 'completed' ? 'text-gray-800' : 
                step.status === 'current' ? 'text-gray-800' : 
                'text-gray-400'
              )}>
                {step.title}
              </h3>
              {step.date && (
                <p className="text-sm text-gray-500">{step.date}</p>
              )}
              <p className={cn(
                "mt-1 text-sm",
                step.status === 'completed' ? 'text-gray-600' : 
                step.status === 'current' ? 'text-gray-600' : 
                'text-gray-400'
              )}>
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
