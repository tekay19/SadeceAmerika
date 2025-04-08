# Hostinger Deployment Guide for Visa Application System

Bu belge, Visa Application System'in Hostinger'a nasıl deploy edileceğini detaylı olarak açıklar.

## Ön Gereksinimler

1. Hostinger hesabı
2. MySQL veritabanına erişim
3. Node.js destekli bir hosting planı

## Adım 1: Veritabanı Oluşturma

1. Hostinger kontrol panelinden MySQL veritabanı oluşturun
2. Veritabanı adını, kullanıcı adını ve şifreyi not alın
3. `.env` dosyasına bu bilgileri ekleyin:

```
DB_HOST=<hostinger_db_host>
DB_USER=<hostinger_db_user>
DB_PASSWORD=<hostinger_db_password>
DB_NAME=<hostinger_db_name>
```

## Adım 2: Proje Dosyalarını Hazırlama

1. Tüm proje dosyalarını bir zip dosyasına sıkıştırın
2. `.env` dosyasına aşağıdaki gibi ekleme yapın:

```
NODE_ENV=production
# SMTP ayarları
SMTP_HOST=<smtp_host>
SMTP_PORT=<smtp_port>
SMTP_USER=<smtp_kullanici>
SMTP_PASS=<smtp_sifre>
EMAIL_FROM=<gonderen_email>
```

## Adım 3: Veritabanı Kurulumu

1. Hostinger'da veritabanını kurmak için aşağıdaki komutu çalıştırın:

```bash
node mysql-setup.js
```

Bu komut MySQL şemasını ve gerekli tabloları oluşturacaktır.

## Adım 4: Uygulamayı Çalıştırma

1. Node.js uygulamasını kurmak için:

```bash
npm install
npm run build
NODE_ENV=production npm start
```

2. Hostinger kontrol panelinde Node.js uygulaması ayarlarını yapın:
   - Ana dosya olarak `server/index.js` belirtin
   - Sunucu portu olarak `5000` girin

## Adım 5: Domainleri Yapılandırma

1. Hostinger kontrol panelinden domain ayarlarını yapın
2. Eğer özel bir domain kullanıyorsanız, DNS kayıtlarını güncelleyin

## Notlar

- MySQL kullanımı için `MySQLStorage` sınıfı otomatik olarak kullanılacaktır.
- `.env` dosyasına DB_ ile başlayan veritabanı bağlantı bilgilerini eklediğinizden emin olun.
- Uygulama otomatik olarak MySQL depolamasını algılayıp kullanacaktır.
- MySQL sürümünün 5.7 veya üzeri olduğundan emin olun.

## Sorun Giderme

- Eğer veritabanı bağlantı hatası alırsanız `.env` dosyasındaki bağlantı bilgilerini kontrol edin
- MySQL için "Access denied" hatası alırsanız veritabanı kullanıcı izinlerini kontrol edin
- Hostinger'ın Node.js desteği için gerekirse destek ekibiyle iletişime geçin