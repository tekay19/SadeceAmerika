import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlertTriangle, Info, Calendar, CheckCircle } from "lucide-react";

type ActionCardProps = {
  icon: string;
  iconColor: string;
  title: string;
  description: string;
  actionText: string;
  actionLink: string;
  actionVariant: "primary" | "secondary";
};

export function ActionCard({
  icon,
  iconColor,
  title,
  description,
  actionText,
  actionLink,
  actionVariant = "primary"
}: ActionCardProps) {
  
  // Choose icon component based on the icon string
  const IconComponent = () => {
    const iconSize = 24;
    switch(icon) {
      case "exclamation-triangle":
        return <AlertTriangle size={iconSize} className={cn("text-yellow-500")} />;
      case "info-circle":
        return <Info size={iconSize} className={cn("text-green-500")} />;
      case "calendar-alt":
        return <Calendar size={iconSize} className={cn("text-blue-500")} />;
      case "check-circle":
        return <CheckCircle size={iconSize} className={cn("text-green-500")} />;
      default:
        return <Info size={iconSize} className={cn("text-primary")} />;
    }
  };
  
  // Choose background color based on the iconColor
  const getBgColor = () => {
    switch(iconColor) {
      case "yellow":
        return "bg-yellow-100";
      case "green":
        return "bg-green-100";
      case "blue":
        return "bg-blue-100";
      case "red":
        return "bg-red-100";
      default:
        return "bg-primary/10";
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center">
          <div className={cn("flex-shrink-0 h-12 w-12 rounded-full flex items-center justify-center", getBgColor())}>
            <IconComponent />
          </div>
          <div className="ml-4">
            <h3 className="text-base font-medium text-gray-800">{title}</h3>
            <p className="mt-1 text-sm text-gray-600">{description}</p>
          </div>
        </div>
        <div className="mt-4">
          {actionVariant === "primary" ? (
            <Button asChild>
              <a href={actionLink} className="inline-flex items-center">
                {actionText}
              </a>
            </Button>
          ) : (
            <Button variant="outline" asChild>
              <a href={actionLink} className="inline-flex items-center">
                {actionText}
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
