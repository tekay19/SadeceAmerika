import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

/**
 * Dil değiştirme bileşeni
 * Bu bileşen kullanıcının uygulama dilini değiştirmesini sağlar.
 */
export function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  // Dil değiştirme fonksiyonu
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-1 px-2 py-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <Globe className="h-4 w-4" />
          <span className="text-sm font-medium">{currentLanguage === 'tr' ? 'TR' : 'EN'}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32">
        <DropdownMenuItem 
          onClick={() => changeLanguage('tr')}
          className={`${currentLanguage === 'tr' ? 'bg-gray-100 font-medium' : ''} cursor-pointer`}
        >
          🇹🇷 {t('language.tr')}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => changeLanguage('en')}
          className={`${currentLanguage === 'en' ? 'bg-gray-100 font-medium' : ''} cursor-pointer`}
        >
          🇺🇸 {t('language.en')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguageSwitcher;