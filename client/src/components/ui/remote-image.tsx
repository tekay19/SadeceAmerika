import { useState } from "react";
import { cn } from "@/lib/utils";

interface RemoteImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackUrl?: string;
  altText: string;
  className?: string;
}

/**
 * RemoteImage component for rendering images from remote URLs with fallback handling
 */
export function RemoteImage({
  src,
  fallbackUrl,
  altText,
  className,
  ...props
}: RemoteImageProps) {
  const [imgSrc, setImgSrc] = useState<string | undefined>(src);
  const [error, setError] = useState(false);

  const handleError = () => {
    setError(true);
    if (fallbackUrl) {
      setImgSrc(fallbackUrl);
    }
  };

  return (
    <div className={cn("overflow-hidden relative", className)}>
      {imgSrc ? (
        <img
          src={imgSrc}
          alt={altText}
          onError={handleError}
          className={cn("w-full h-full object-cover", error && "opacity-90")}
          {...props}
        />
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
          {altText || "Resim Yüklenemedi"}
        </div>
      )}
    </div>
  );
}