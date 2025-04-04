import { PublicLayout } from "@/components/layout/public-layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { PageTransition } from "@/components/ui/page-transition";
import { 
  ArrowRight, 
  CalendarCheck, 
  FileText, 
  Shield, 
  UserCheck,
  GraduationCap,
  Building,
  Building2,
  Landmark
} from "lucide-react";

export default function HomePage() {
  return (
    <PublicLayout>
      <PageTransition>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="container mx-auto px-4 py-20 md:py-28">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                ABD Vize Başvurunuzu Kolaylaştırıyoruz
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Amerika vizesi için başvuru sürecinizi "Sadece Amerika" ile 
                hızlandırın ve göçmenlik hukuku alanında uzman ekibimizle
                endişesiz bir şekilde ABD'ye adım atın.
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href="/auth?mode=register">
                  <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
                    Hemen Başvur
                  </Button>
                </Link>
                <Link href="/services">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Hizmetlerimiz
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* About Summary */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Mese Consultancy'nin Türkiye Uzantısı</h2>
              <p className="text-lg text-gray-600">
                Sadece Amerika, Amerika merkezli "Mese Consultancy"nin Türkiye uzantısı olarak 2025 yılında Ankara'da kurulmuştur. 
                Her başvuruyu bireysel olarak ele alıyor; güvenilir, şeffaf ve danışan odaklı yaklaşımımızla, hedeflerinize ulaşmanız için güçlü bir rehberlik sunuyoruz.
              </p>
            </div>
          </div>
        </section>

        {/* Services Showcase */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Amerika'ya Açılan Kapınız</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                ABD vize süreçlerinde ve Amerika'daki yaşamınızın her adımında uzman desteği.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="bg-blue-100 text-blue-700 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <FileText size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Ziyaretçi Vizeleri</h3>
                <p className="text-gray-600">
                  B1/B2 turist ve iş amaçlı ziyaretçi vizeleri için uçtan uca danışmanlık hizmeti ve başvuru desteği.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="bg-green-100 text-green-700 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <GraduationCap size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Öğrenci Vizeleri</h3>
                <p className="text-gray-600">
                  F1 öğrenci vizesi, okul kaydı, dil okulu yerleştirme ve üniversite kabul aşamalarında tam destek.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="bg-purple-100 text-purple-700 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Landmark size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Yatırımcı Vizeleri</h3>
                <p className="text-gray-600">
                  E-1/E-2 yatırımcı vizeleri, şirket kurulumu, iş planı hazırlama ve yatırım sürecinde danışmanlık.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="bg-yellow-100 text-yellow-700 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Building size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Çalışma Vizeleri</h3>
                <p className="text-gray-600">
                  H-1B ve L-1 çalışma vizeleri için başvuru hazırlığı ve yasal süreç yönetimi.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="bg-red-100 text-red-700 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <CalendarCheck size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Vize Mülakat Hazırlığı</h3>
                <p className="text-gray-600">
                  Vize görüşmesi için kapsamlı hazırlık, başarı şansını artıracak strateji ve belge analizi.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="bg-orange-100 text-orange-700 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Shield size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Amerika'da İş Kurma</h3>
                <p className="text-gray-600">
                  ABD'de şirket kurulumu, şirket devralma ve işletme lisansları ile ilgili tam kapsamlı danışmanlık.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Additional Services */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-green-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Yeni Hayatınız İçin Özel Hizmetler</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Amerika'daki yaşamınızın her aşamasında size destek olacak özel hizmetlerimiz.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Green Card Integration Services */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden transform transition duration-300 hover:shadow-md hover:-translate-y-1">
                <div className="h-3 bg-green-600"></div>
                <div className="p-6">
                  <div className="flex items-start mb-4">
                    <div className="bg-green-100 text-green-700 w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                      <UserCheck size={28} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Green Card Entegrasyon Hizmetleri</h3>
                      <p className="text-gray-600 mb-4">
                        Amerika'ya yeni adım atan Green Card sahiplerine ülkeye hızlı ve sorunsuz uyum sağlamaları için kapsamlı destek.
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <h4 className="font-semibold text-green-700 mb-2">Sosyal Entegrasyon</h4>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-start">
                          <span className="text-green-500 mr-1">✓</span>
                          <span>Kültürel uyum danışmanlığı</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-1">✓</span>
                          <span>Sosyal ağ oluşturma</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-700 mb-2">Kariyer Gelişimi</h4>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-start">
                          <span className="text-green-500 mr-1">✓</span>
                          <span>CV ve mülakat koçluğu</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-1">✓</span>
                          <span>İş fırsatları danışmanlığı</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <Link href="/services">
                    <Button variant="outline" className="w-full border-green-600 text-green-700 hover:bg-green-50">Detaylı Bilgi</Button>
                  </Link>
                </div>
              </div>

              {/* Housing and Auto Services */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden transform transition duration-300 hover:shadow-md hover:-translate-y-1">
                <div className="h-3 bg-blue-600"></div>
                <div className="p-6">
                  <div className="flex items-start mb-4">
                    <div className="bg-blue-100 text-blue-700 w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                      <Building2 size={28} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Konaklama ve Araç Kiralama</h3>
                      <p className="text-gray-600 mb-4">
                        Amerika'ya adım attığınız andan itibaren konforlu ve sorunsuz bir yaşam deneyimi için konaklama ve ulaşım çözümleri.
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <h4 className="font-semibold text-blue-700 mb-2">Konaklama Hizmetleri</h4>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-1">✓</span>
                          <span>Kısa ve uzun dönem kiralama</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-1">✓</span>
                          <span>Mobilyalı/eşyasız seçenekler</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-700 mb-2">Araç Kiralama</h4>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-1">✓</span>
                          <span>Geniş araç portföyü</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-1">✓</span>
                          <span>Esnek kiralama planları</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <Link href="/services">
                    <Button variant="outline" className="w-full border-blue-600 text-blue-700 hover:bg-blue-50">Detaylı Bilgi</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Showcase */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Uzman Ekibimiz</h2>
              <p className="text-lg text-gray-600">
                Amerika göçmenlik hukuku alanında deneyimli, Amerika'da eğitim ve iş tecrübesine sahip profesyoneller.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-700 text-2xl font-bold">MS</span>
                </div>
                <h3 className="text-lg font-semibold">Murat Şimşek</h3>
                <p className="text-blue-600 text-sm">Kurucu & Vize Uzmanı</p>
              </div>
              
              <div className="text-center">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-700 text-2xl font-bold">İK</span>
                </div>
                <h3 className="text-lg font-semibold">İsmail Kaçmaz</h3>
                <p className="text-blue-600 text-sm">Göçmenlik Danışmanı</p>
              </div>
              
              <div className="text-center">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-700 text-2xl font-bold">TCS</span>
                </div>
                <h3 className="text-lg font-semibold">Tayyip Can Sarıtaş</h3>
                <p className="text-blue-600 text-sm">Öğrenci Vizesi Uzmanı</p>
              </div>
              
              <div className="text-center">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-yellow-700 text-2xl font-bold">SÇ</span>
                </div>
                <h3 className="text-lg font-semibold">Samet Çetinbay</h3>
                <p className="text-blue-600 text-sm">İş Vizesi Uzmanı</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-700 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Amerika'daki Geleceğiniz İçin İlk Adım</h2>
              <p className="text-xl mb-8">
                Hemen üye olun ve vize başvuru sürecinizi Sadece Amerika ile kolaylaştırın. Uzman ekibimiz hizmetinizde.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/auth?mode=register">
                  <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100 flex items-center">
                    Hemen Başvurun
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-600">
                    İletişime Geçin
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </PageTransition>
    </PublicLayout>
  );
}