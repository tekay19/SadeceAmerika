#!/bin/bash
# MySQL ve Hostinger komutları için yardımcı script

# Renkli çıktı için
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}===== MySQL ve Hostinger Komutları =====${NC}"
echo ""

case $1 in
  "setup")
    echo -e "${YELLOW}MySQL veritabanı kurulumu başlatılıyor...${NC}"
    node mysql-setup.js
    ;;
    
  "check")
    echo -e "${YELLOW}MySQL bağlantı testi yapılıyor...${NC}"
    node check-mysql-connection.js
    ;;
    
  "deploy")
    echo -e "${YELLOW}Hostinger deployment süreci başlatılıyor...${NC}"
    node hostinger-deploy.js
    ;;
    
  *)
    echo -e "${GREEN}Kullanılabilir komutlar:${NC}"
    echo -e "  ${YELLOW}./mysql-commands.sh setup${NC} - MySQL veritabanını kur"
    echo -e "  ${YELLOW}./mysql-commands.sh check${NC} - MySQL bağlantısını test et" 
    echo -e "  ${YELLOW}./mysql-commands.sh deploy${NC} - Hostinger deployment sürecini başlat"
    echo ""
    echo -e "${GREEN}Örnek:${NC}"
    echo -e "  ${YELLOW}./mysql-commands.sh setup${NC}"
    ;;
esac

echo ""