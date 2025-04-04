import { PublicLayout } from "@/components/layout/public-layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { PageTransition } from "@/components/ui/page-transition";
import { 
  Briefcase, 
  Building, 
  Globe, 
  GraduationCap, 
  Users, 
  MessagesSquare, 
  Plane, 
  Landmark,
  Building2
} from "lucide-react";

export default function ServicesPage() {
  return (
    <PublicLayout>
      <PageTransition>
        {/* Hero */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">Vize Hizmetlerimiz</h1>
              <p className="text-xl text-gray-600">
                Sadece Amerika olarak, ABD vize başvuru süreçlerinizde size destek oluyoruz. 
                Amerika merkezli Mese Consultancy'nin Türkiye uzantısı olarak, göçmenlik hukuku alanındaki tecrübemizle vize başvurunuzu başarıyla tamamlamanıza yardımcı oluyoruz.
              </p>
            </div>
          </div>
        </section>

        {/* Visa Services */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16">Vize Kategorileri</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* B1/B2 Visa */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-2 bg-blue-600"></div>
                <div className="p-6">
                  <div className="bg-blue-100 text-blue-700 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                    <Plane size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">B1/B2 Ziyaretçi Vizesi</h3>
                  <p className="text-gray-600 mb-4">
                    Amerika Birleşik Devletleri'ni turistik (B2) veya iş amaçlı (B1) ziyaret etmek isteyen bireyler için en yaygın kullanılan vize türüdür.
                  </p>
                  <ul className="space-y-2 mb-6 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Formların doğru doldurulması</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Gerekli belgelerin hazırlanması</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Mülakat öncesi hazırlık ve strateji</span>
                    </li>
                  </ul>
                  <Link href="/auth?mode=register">
                    <Button variant="outline" className="w-full">Başvuru Yap</Button>
                  </Link>
                </div>
              </div>

              {/* F1 Student Visa */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-2 bg-green-600"></div>
                <div className="p-6">
                  <div className="bg-green-100 text-green-700 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                    <GraduationCap size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">F1 Öğrenci Vizesi</h3>
                  <p className="text-gray-600 mb-4">
                    Amerika'da üniversite, kolej veya dil okullarında tam zamanlı öğrenim görme hakkı tanıyan temel vize türüdür.
                  </p>
                  <ul className="space-y-2 mb-6 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>6 farklı eyalette anlaşmalı okullar</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Okul kaydı ve I-20 belgesi temini</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Vize mülakatı hazırlığı</span>
                    </li>
                  </ul>
                  <Link href="/auth?mode=register">
                    <Button variant="outline" className="w-full">Başvuru Yap</Button>
                  </Link>
                </div>
              </div>

              {/* E-1/E-2 Visa */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-2 bg-purple-600"></div>
                <div className="p-6">
                  <div className="bg-purple-100 text-purple-700 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                    <Landmark size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">E-1/E-2 Yatırımcı Vizesi</h3>
                  <p className="text-gray-600 mb-4">
                    Amerika'da ticaret yapmak veya yatırım yoluyla iş kurmak isteyen bireyler için büyük fırsatlar sunan vize türleri.
                  </p>
                  <ul className="space-y-2 mb-6 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Amerika'da şirket kuruluş işlemleri</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Profesyonel iş planı hazırlama</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Yatırım belgelerinin hazırlanması</span>
                    </li>
                  </ul>
                  <Link href="/auth?mode=register">
                    <Button variant="outline" className="w-full">Başvuru Yap</Button>
                  </Link>
                </div>
              </div>

              {/* L-1 Visa */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-2 bg-yellow-600"></div>
                <div className="p-6">
                  <div className="bg-yellow-100 text-yellow-700 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                    <Building2 size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">L-1 Şirket İçi Transfer Vizesi</h3>
                  <p className="text-gray-600 mb-4">
                    Türkiye'de faaliyet gösteren bir şirketin yöneticisi, uzman personeli ya da sahibi olarak Amerika'da şube açmak isteyen girişimciler için.
                  </p>
                  <ul className="space-y-2 mb-6 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Amerika'da yeni şirket kuruluşu</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Detaylı iş planı hazırlanması</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Şirketler arası bağlantı belgelendirmesi</span>
                    </li>
                  </ul>
                  <Link href="/auth?mode=register">
                    <Button variant="outline" className="w-full">Başvuru Yap</Button>
                  </Link>
                </div>
              </div>

              {/* H-1B Visa */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-2 bg-red-600"></div>
                <div className="p-6">
                  <div className="bg-red-100 text-red-700 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                    <Building size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">H-1B Çalışma Vizesi</h3>
                  <p className="text-gray-600 mb-4">
                    Amerika'da bir işveren sponsorluğunda çalışmak isteyen, uzmanlık gerektiren bir alanda eğitim veya deneyime sahip profesyoneller için.
                  </p>
                  <ul className="space-y-2 mb-6 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>H-1B USCIS kayıt işlemleri</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>LCA başvurusu ve takibi</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>İşveren-çalışan evraklarının hazırlanması</span>
                    </li>
                  </ul>
                  <Link href="/auth?mode=register">
                    <Button variant="outline" className="w-full">Başvuru Yap</Button>
                  </Link>
                </div>
              </div>

              {/* Business Setup */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-2 bg-teal-600"></div>
                <div className="p-6">
                  <div className="bg-teal-100 text-teal-700 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                    <Briefcase size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Amerika'da Şirket Kurulumu</h3>
                  <p className="text-gray-600 mb-4">
                    Amerika'da iş kurmak, şirket devralmak veya mevcut işinizi Amerika'ya taşımak isteyen girişimciler için tam kapsamlı hizmetler.
                  </p>
                  <ul className="space-y-2 mb-6 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Şirket kuruluşu (LLC, Corporation vb.)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Amerika'da ofis adresi sağlanması</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>İşletme lisansları ve belgeler temini</span>
                    </li>
                  </ul>
                  <Link href="/auth?mode=register">
                    <Button variant="outline" className="w-full">Başvuru Yap</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Process Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16">Başvuru Süreci</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mx-auto mb-4 relative">
                  <span className="text-xl font-bold">1</span>
                  <div className="hidden lg:block absolute w-full h-0.5 bg-blue-200 right-0 top-1/2 -z-10 -mr-5 transform translate-x-full"></div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Üyelik Oluşturma</h3>
                <p className="text-gray-600">Sistemimize üye olarak başvuru sürecinizi başlatın.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mx-auto mb-4 relative">
                  <span className="text-xl font-bold">2</span>
                  <div className="hidden lg:block absolute w-full h-0.5 bg-blue-200 right-0 top-1/2 -z-10 -mr-5 transform translate-x-full"></div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Bilgi ve Belge Girişi</h3>
                <p className="text-gray-600">Vize başvurunuz için gerekli bilgi ve belgeleri sisteme yükleyin.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mx-auto mb-4 relative">
                  <span className="text-xl font-bold">3</span>
                  <div className="hidden lg:block absolute w-full h-0.5 bg-blue-200 right-0 top-1/2 -z-10 -mr-5 transform translate-x-full"></div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Uzman İncelemesi</h3>
                <p className="text-gray-600">Uzmanlarımız başvurunuzu inceleyip gerekli düzeltmeleri yapar.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">4</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Vize Mülakatı ve Takip</h3>
                <p className="text-gray-600">Büyükelçilik randevunuzu alıp, vize görüşmenize hazırlanın.</p>
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
                      <Users size={28} />
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
                  
                  <Link href="/auth?mode=register">
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
                  
                  <Link href="/auth?mode=register">
                    <Button variant="outline" className="w-full border-blue-600 text-blue-700 hover:bg-blue-50">Detaylı Bilgi</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </PageTransition>
    </PublicLayout>
  );
}