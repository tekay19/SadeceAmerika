import * as XLSX from 'xlsx';
import { User, Application } from '@shared/schema';

/**
 * Kullanıcı verilerini Excel dosyasına dönüştürüp indirir
 */
export function exportUsersToExcel(users: User[]): void {
  // Excel için veri hazırlama
  const data = users.map(user => ({
    'ID': user.id,
    'Kullanıcı Adı': user.username,
    'Ad': user.firstName,
    'Soyad': user.lastName,
    'E-posta': user.email,
    'Telefon': user.phone || '',
    'Rol': user.role === 'admin' ? 'Yönetici' : user.role === 'officer' ? 'Memur' : 'Kullanıcı',
    'Kayıt Tarihi': user.createdAt ? new Date(user.createdAt).toLocaleDateString('tr-TR') : '',
  }));

  // Excel çalışma kitabı oluşturma
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Kullanıcılar');

  // Sütunların genişliklerini ayarlama
  const colWidths = [
    { wch: 5 },    // ID
    { wch: 15 },   // Kullanıcı Adı
    { wch: 15 },   // Ad
    { wch: 15 },   // Soyad
    { wch: 25 },   // E-posta
    { wch: 15 },   // Telefon
    { wch: 10 },   // Rol
    { wch: 12 },   // Kayıt Tarihi
  ];
  ws['!cols'] = colWidths;

  // Excel dosyasını indirme
  XLSX.writeFile(wb, 'kullanicilar.xlsx');
}

/**
 * Başvuru verilerini Excel dosyasına dönüştürüp indirir
 */
export function exportApplicationsToExcel(applications: Application[]): void {
  // Excel için veri hazırlama
  const data = applications.map(app => {
    // Başvuru durumunu Türkçe'ye çevirme
    let statusText = 'Bilinmeyen Durum';
    if (app.status === 'draft') statusText = 'Taslak';
    else if (app.status === 'submitted') statusText = 'Gönderildi';
    else if (app.status === 'documents_pending') statusText = 'Belge Bekleniyor';
    else if (app.status === 'documents_reviewing') statusText = 'İnceleniyor';
    else if (app.status === 'documents_approved') statusText = 'Belgeler Onaylandı';
    else if (app.status === 'appointment_scheduled') statusText = 'Randevu Planlandı';
    else if (app.status === 'interview_completed') statusText = 'Görüşme Tamamlandı';
    else if (app.status === 'approved') statusText = 'Onaylandı';
    else if (app.status === 'rejected') statusText = 'Reddedildi';
    else if (app.status === 'additional_documents_required') statusText = 'Ek Belge Gerekli';

    // Başvuru verilerini tablo formatında hazırlama
    return {
      'Başvuru ID': app.id,
      'Başvuru No': app.applicationNumber || '',
      'Ad': app.firstName || '',
      'Soyad': app.lastName || '',
      'Yaş': app.age || '',
      'Telefon': app.phone || '',
      'Meslek': app.occupation || '',
      'Durum': statusText,
      'Başvuru Tarihi': app.submittedAt ? new Date(app.submittedAt).toLocaleDateString('tr-TR') : 
                         app.applicationDate ? new Date(app.applicationDate).toLocaleDateString('tr-TR') : '',
      'Son Güncelleme': app.lastUpdated ? new Date(app.lastUpdated).toLocaleDateString('tr-TR') : '',
      'Notlar': app.notes || '',
    };
  });

  // Excel çalışma kitabı oluşturma
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Başvurular');

  // Sütunların genişliklerini ayarlama
  const colWidths = [
    { wch: 10 },   // Başvuru ID
    { wch: 15 },   // Başvuru No
    { wch: 15 },   // Ad
    { wch: 15 },   // Soyad
    { wch: 7 },    // Yaş
    { wch: 15 },   // Telefon
    { wch: 15 },   // Meslek
    { wch: 20 },   // Durum
    { wch: 15 },   // Başvuru Tarihi
    { wch: 15 },   // Son Güncelleme
    { wch: 30 },   // Notlar
  ];
  ws['!cols'] = colWidths;

  // Excel dosyasını indirme
  XLSX.writeFile(wb, 'basvurular.xlsx');
}