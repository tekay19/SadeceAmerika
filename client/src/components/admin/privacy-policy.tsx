import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

type PrivacyPolicyProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
};

/**
 * Gizlilik Sözleşmesi bileşeni
 * Kullanıcı kayıt formunda ve ayarlarda kullanılabilir
 */
export function PrivacyPolicy({ open, onOpenChange, trigger }: PrivacyPolicyProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger ? (
        <DialogTrigger asChild>
          {trigger}
        </DialogTrigger>
      ) : (
        <DialogTrigger asChild>
          <Button variant="link" className="h-auto p-0 text-primary">Gizlilik Sözleşmesi</Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Gizlilik Sözleşmesi</DialogTitle>
          <DialogDescription>
            Lütfen aşağıdaki gizlilik sözleşmesini okuyunuz. Bu sözleşme, kişisel verilerinizin nasıl toplandığını, işlendiğini ve korunduğunu açıklar.
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="flex-1 pr-4 mt-4">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold">1. Giriş</h3>
              <p className="mt-2">
                Bu Gizlilik Sözleşmesi ("Sözleşme"), Sadece Amerika ("Veri Sorumlusu") tarafından, kişisel verilerinizin 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") ve ilgili mevzuata uygun olarak nasıl toplandığını, işlendiğini, saklandığını ve korunduğunu açıklamak amacıyla hazırlanmıştır. Amacımız, verilerinizin gizliliğini ve güvenliğini korurken, hizmetlerimizi en iyi şekilde sunmaktır.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold">2. Tanımlar</h3>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><span className="font-medium">Kişisel Veri:</span> Kimliği belirli veya belirlenebilir gerçek kişiye ilişkin her türlü bilgi.</li>
                <li><span className="font-medium">İşleme:</span> Kişisel veriler üzerinde gerçekleştirilen otomatik veya manuel her türlü işlem.</li>
                <li><span className="font-medium">Veri Sorumlusu:</span> Kişisel verilerin işlenme amaçlarını ve vasıtalarını belirleyen gerçek veya tüzel kişi.</li>
                <li><span className="font-medium">Veri Sahibinin Hakları:</span> KVKK kapsamında veri sahiplerinin, verileri ile ilgili sahip olduğu bilgi edinme, düzeltme, silme, aktarma, itiraz etme gibi haklar.</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold">3. İşlenen Kişisel Veriler</h3>
              <p className="mt-2">Sitemiz/uygulamamız kapsamında, aşağıda belirtilen kişisel verileriniz toplanabilir:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><span className="font-medium">Kimlik Bilgileri:</span> İsim, soyisim, e-posta, telefon numarası, adres gibi temel iletişim bilgileri.</li>
                <li><span className="font-medium">Kimlik Doğrulama Bilgileri:</span> Şifre, kullanıcı adı, kimlik doğrulama token'ları.</li>
                <li><span className="font-medium">Başvuru ve İşlem Bilgileri:</span> Vize başvurusu, işlem geçmişi, randevu bilgileri, yüklenen belgeler gibi işle ilgili veriler.</li>
                <li><span className="font-medium">Geri Bildirim ve Destek Bilgileri:</span> Hizmetlerimize ilişkin görüş, öneri veya şikayetleriniz.</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold">4. Kişisel Verilerin İşlenme Amaçları</h3>
              <p className="mt-2">Toplanan kişisel veriler, aşağıdaki amaçlarla işlenmektedir:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><span className="font-medium">Hizmet Sunumu:</span> Vize başvuru süreçlerinin yürütülmesi, kullanıcı destek ve hizmetlerin sağlanması.</li>
                <li><span className="font-medium">Kimlik Doğrulama ve Güvenlik:</span> Giriş, kimlik doğrulama, yetkilendirme işlemleri ve güvenliğin sağlanması.</li>
                <li><span className="font-medium">İletişim:</span> Hizmetlerle ilgili bilgilendirme, duyuru, destek ve geri bildirim işlemleri.</li>
                <li><span className="font-medium">İyileştirme ve Analiz:</span> Kullanıcı deneyiminin geliştirilmesi, hizmet kalitesinin artırılması için analiz ve raporlama işlemleri.</li>
                <li><span className="font-medium">Yasal Yükümlülükler:</span> KVKK ve ilgili mevzuat kapsamında yasal yükümlülüklerin yerine getirilmesi.</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold">5. Hukuki Sebepler</h3>
              <p className="mt-2">Kişisel verileriniz, aşağıda belirtilen hukuki sebeplere dayanarak işlenmektedir:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><span className="font-medium">Açık Rıza:</span> Kullanıcı tarafından, verilerinin işlenmesine açık rıza verilmiş olması.</li>
                <li><span className="font-medium">Sözleşmenin İfası:</span> Hizmetlerin sağlanması, sözleşme ve hizmet koşullarının yerine getirilmesi.</li>
                <li><span className="font-medium">Yasal Yükümlülük:</span> İlgili mevzuat kapsamında, yasal zorunlulukların yerine getirilmesi.</li>
                <li><span className="font-medium">Meşru Menfaat:</span> Veri sorumlusunun meşru menfaatleri doğrultusunda, ancak veri sahibinin temel hak ve özgürlüklerine zarar vermeyecek ölçüde işlenmesi.</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold">6. Verilerin Saklanma Süresi</h3>
              <p className="mt-2">
                Toplanan kişisel veriler, işleme amaçlarının gerçekleşmesi için gerekli olan süre boyunca saklanır. Yasal zorunluluklar ve meşru menfaatler doğrultusunda, saklama süresi belirlenir; işlem amacı ortadan kalktığında, veriler kanuni düzenlemeler çerçevesinde silinir veya anonim hale getirilir.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold">7. Veri Sahibinin Hakları</h3>
              <p className="mt-2">KVKK kapsamında, veri sahipleri aşağıdaki haklara sahiptir:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><span className="font-medium">Bilgi Edinme:</span> İşlenen verileriniz hakkında bilgi talep etme.</li>
                <li><span className="font-medium">Düzeltme:</span> Yanlış veya eksik verilerin düzeltilmesini isteme.</li>
                <li><span className="font-medium">Silme:</span> Gereksiz veya hukuka aykırı verilerin silinmesini talep etme.</li>
                <li><span className="font-medium">İtiraz:</span> İşlenen verilerinizin işlenmesine itiraz etme.</li>
                <li><span className="font-medium">Veri Taşınabilirliği:</span> Verilerinizi yapılandırılmış, yaygın olarak kullanılan ve makine tarafından okunabilir formatta alma.</li>
                <li><span className="font-medium">İşlemenin Sınırlanması:</span> Belirli koşullarda verilerin işlenmesinin sınırlandırılmasını isteme.</li>
              </ul>
              <p className="mt-2">
                Haklarınızı kullanmak veya sorularınız için aşağıdaki iletişim kanalları aracılığıyla bizimle iletişime geçebilirsiniz:
              </p>
              <div className="mt-2">
                <p className="font-medium">İletişim:</p>
                <p>info@mese.us</p>
                <p>+90 212 123 4567</p>
                <p>İstanbul, Türkiye</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold">8. Güvenlik Önlemleri</h3>
              <p className="mt-2">
                Verilerinizin güvenliğini sağlamak amacıyla, teknik ve idari önlemler uygulanmaktadır. Bu önlemler arasında şifreleme, erişim kontrolü, güvenlik duvarları ve düzenli denetimler yer almaktadır.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold">9. Değişiklikler</h3>
              <p className="mt-2">
                İşbu Gizlilik Sözleşmesi, zaman zaman güncellenebilir. Güncellemeler, sitemiz/uygulamamız üzerinden yayınlanacak ve geçerlilik tarihleri belirtilecektir. Güncellenen metin, yayınlandığı tarihten itibaren geçerli olacaktır.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold">10. Yürürlük</h3>
              <p className="mt-2">
                Bu Gizlilik Sözleşmesi, 15.03.2025 tarihinden itibaren geçerli olup, KVKK ve ilgili mevzuat çerçevesinde kişisel verilerinizin işlenmesi için esas teşkil eder.
              </p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}