import { PublicLayout } from "@/components/layout/public-layout";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function PrivacyPolicy() {
  return (
    <PublicLayout>
      <div className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Gizlilik Sözleşmesi / Aydınlatma Metni</h1>
            
            <ScrollArea className="h-[calc(100vh-350px)]">
              <div className="pr-4 space-y-6">
                <section>
                  <h2 className="text-xl font-semibold text-gray-700 mb-3">1. Giriş</h2>
                  <p className="text-gray-600 leading-relaxed">
                    Bu Gizlilik Sözleşmesi ("Sözleşme"), SadeceAmerika ("Veri Sorumlusu") tarafından, kişisel verilerinizin 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") ve ilgili mevzuata uygun olarak nasıl toplandığını, işlendiğini, saklandığını ve korunduğunu açıklamak amacıyla hazırlanmıştır. Amacımız, verilerinizin gizliliğini ve güvenliğini korurken, hizmetlerimizi en iyi şekilde sunmaktır.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-700 mb-3">2. Tanımlar</h2>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li><strong>Kişisel Veri:</strong> Kimliği belirli veya belirlenebilir gerçek kişiye ilişkin her türlü bilgi.</li>
                    <li><strong>İşleme:</strong> Kişisel veriler üzerinde gerçekleştirilen otomatik veya manuel her türlü işlem.</li>
                    <li><strong>Veri Sorumlusu:</strong> Kişisel verilerin işlenme amaçlarını ve vasıtalarını belirleyen gerçek veya tüzel kişi.</li>
                    <li><strong>Veri Sahibinin Hakları:</strong> KVKK kapsamında veri sahiplerinin, verileri ile ilgili sahip olduğu bilgi edinme, düzeltme, silme, aktarma, itiraz etme gibi haklar.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-700 mb-3">3. İşlenen Kişisel Veriler</h2>
                  <p className="text-gray-600 mb-3">
                    Sitemiz/uygulamamız kapsamında, aşağıda belirtilen kişisel verileriniz toplanabilir:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li><strong>Kimlik Bilgileri:</strong> İsim, soyisim, e-posta, telefon numarası, adres gibi temel iletişim bilgileri.</li>
                    <li><strong>Kimlik Doğrulama Bilgileri:</strong> Şifre, kullanıcı adı, kimlik doğrulama token&apos;ları.</li>
                    <li><strong>Başvuru ve İşlem Bilgileri:</strong> Vize başvurusu, işlem geçmişi, randevu bilgileri, yüklenen belgeler gibi işle ilgili veriler.</li>
                    <li><strong>Geri Bildirim ve Destek Bilgileri:</strong> Hizmetlerimize ilişkin görüş, öneri veya şikayetleriniz.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-700 mb-3">4. Kişisel Verilerin İşlenme Amaçları</h2>
                  <p className="text-gray-600 mb-3">
                    Toplanan kişisel veriler, aşağıdaki amaçlarla işlenmektedir:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li><strong>Hizmet Sunumu:</strong> Vize başvuru süreçlerinin yürütülmesi, kullanıcı destek ve hizmetlerin sağlanması.</li>
                    <li><strong>Kimlik Doğrulama ve Güvenlik:</strong> Giriş, kimlik doğrulama, yetkilendirme işlemleri ve güvenliğin sağlanması.</li>
                    <li><strong>İletişim:</strong> Hizmetlerle ilgili bilgilendirme, duyuru, destek ve geri bildirim işlemleri.</li>
                    <li><strong>İyileştirme ve Analiz:</strong> Kullanıcı deneyiminin geliştirilmesi, hizmet kalitesinin artırılması için analiz ve raporlama işlemleri.</li>
                    <li><strong>Yasal Yükümlülükler:</strong> KVKK ve ilgili mevzuat kapsamında yasal yükümlülüklerin yerine getirilmesi.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-700 mb-3">5. Hukuki Sebepler</h2>
                  <p className="text-gray-600 mb-3">
                    Kişisel verileriniz, aşağıda belirtilen hukuki sebeplere dayanarak işlenmektedir:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li><strong>Açık Rıza:</strong> Kullanıcı tarafından, verilerinin işlenmesine açık rıza verilmiş olması.</li>
                    <li><strong>Sözleşmenin İfası:</strong> Hizmetlerin sağlanması, sözleşme ve hizmet koşullarının yerine getirilmesi.</li>
                    <li><strong>Yasal Yükümlülük:</strong> İlgili mevzuat kapsamında, yasal zorunlulukların yerine getirilmesi.</li>
                    <li><strong>Meşru Menfaat:</strong> Veri sorumlusunun meşru menfaatleri doğrultusunda, ancak veri sahibinin temel hak ve özgürlüklerine zarar vermeyecek ölçüde işlenmesi.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-700 mb-3">6. Verilerin Saklanma Süresi</h2>
                  <p className="text-gray-600 leading-relaxed">
                    Toplanan kişisel veriler, işleme amaçlarının gerçekleşmesi için gerekli olan süre boyunca saklanır. Yasal zorunluluklar ve meşru menfaatler doğrultusunda, saklama süresi belirlenir; işlem amacı ortadan kalktığında, veriler kanuni düzenlemeler çerçevesinde silinir veya anonim hale getirilir.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-700 mb-3">7. Veri Sahibinin Hakları</h2>
                  <p className="text-gray-600 mb-3">
                    KVKK kapsamında, veri sahipleri aşağıdaki haklara sahiptir:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li><strong>Bilgi Edinme:</strong> İşlenen verileriniz hakkında bilgi talep etme.</li>
                    <li><strong>Düzeltme:</strong> Yanlış veya eksik verilerin düzeltilmesini isteme.</li>
                    <li><strong>Silme:</strong> Gereksiz veya hukuka aykırı verilerin silinmesini talep etme.</li>
                    <li><strong>İtiraz:</strong> İşlenen verilerinizin işlenmesine itiraz etme.</li>
                    <li><strong>Veri Taşınabilirliği:</strong> Verilerinizi yapılandırılmış, yaygın olarak kullanılan ve makine tarafından okunabilir formatta alma.</li>
                    <li><strong>İşlemenin Sınırlanması:</strong> Belirli koşullarda verilerin işlenmesinin sınırlandırılmasını isteme.</li>
                  </ul>
                  <p className="text-gray-600 mt-3">
                    Haklarınızı kullanmak veya sorularınız için aşağıdaki iletişim kanalları aracılığıyla bizimle iletişime geçebilirsiniz:
                  </p>
                  <div className="mt-3 text-gray-600">
                    <p><strong>İletişim:</strong></p>
                    <p>info@sadeceamerika.com</p>
                    <p>+90 212 000 00 00</p>
                    <p>İstanbul, Türkiye</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-700 mb-3">8. Güvenlik Önlemleri</h2>
                  <p className="text-gray-600 leading-relaxed">
                    Verilerinizin güvenliğini sağlamak amacıyla, teknik ve idari önlemler uygulanmaktadır. Bu önlemler arasında şifreleme, erişim kontrolü, güvenlik duvarları ve düzenli denetimler yer almaktadır.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-700 mb-3">9. Değişiklikler</h2>
                  <p className="text-gray-600 leading-relaxed">
                    İşbu Gizlilik Sözleşmesi, zaman zaman güncellenebilir. Güncellemeler, sitemiz/uygulamamız üzerinden yayınlanacak ve geçerlilik tarihleri belirtilecektir. Güncellenen metin, yayınlandığı tarihten itibaren geçerli olacaktır.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-700 mb-3">10. Yürürlük</h2>
                  <p className="text-gray-600 leading-relaxed">
                    Bu Gizlilik Sözleşmesi, 15 Nisan 2023 tarihinden itibaren geçerli olup, KVKK ve ilgili mevzuat çerçevesinde kişisel verilerinizin işlenmesi için esas teşkil eder.
                  </p>
                </section>
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}