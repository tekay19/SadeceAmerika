import { PublicLayout } from "@/components/layout/public-layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
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
      
      {/* Detailed Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Hizmetlerimizin Detayları</h2>
            
            <div className="space-y-12">
              <div className="bg-blue-50 p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">B1/B2 Ziyaretçi Vizesi Danışmanlığı</h3>
                <p className="text-gray-700 mb-6">
                  Amerika Birleşik Devletleri'ni turistik (B2) veya iş amaçlı (B1) ziyaret etmek isteyen bireyler için B1/B2 vizesi en yaygın kullanılan vize türüdür. Ancak, bu vizeye başvuru süreci dikkat ve doğru yönlendirme gerektirir.
                </p>
                <p className="text-gray-700">
                  Sadece Amerika olarak, danışanlarımıza B1/B2 vize başvuru sürecinde uçtan uca destek sunuyoruz. Formların doğru doldurulmasından, gerekli belgelerin hazırlanmasına; mülakat öncesi hazırlıktan, başvuru stratejisinin oluşturulmasına kadar her adımda uzman kadromuzla yanınızdayız.
                </p>
              </div>
              
              <div className="bg-green-50 p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">F1 Öğrenci Vizesi Danışmanlığı</h3>
                <p className="text-gray-700 mb-6">
                  Amerika'da eğitim almak isteyen öğrenciler için F1 vizesi, üniversite, kolej veya dil okullarında tam zamanlı öğrenim görme hakkı tanıyan temel vize türüdür. Ancak F1 vizesi başvuru süreci, okul kaydından vize mülakatına kadar dikkatli planlanması gereken resmi bir süreçtir.
                </p>
                <p className="text-gray-700">
                  Sadece Amerika olarak, F1 vizesi başvurusu yapacak olan danışanlarımıza kapsamlı danışmanlık hizmeti sunuyoruz. Amerika'nın 6 farklı eyaletinde anlaşmalı olduğumuz 10'dan fazla prestijli dil okulu aracılığıyla ya da öğrencinin kabul aldığı herhangi bir üniversite veya kolej üzerinden okul kaydını gerçekleştiriyor, "International Student Card" belgesinin alınmasından vize randevusuna kadar tüm süreci adım adım birlikte yönetiyoruz.
                </p>
              </div>
              
              <div className="bg-purple-50 p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">E-1/E-2 Yatırımcı Vizesi Danışmanlığı</h3>
                <p className="text-gray-700 mb-6">
                  Amerika'da ticaret yapmak veya yatırım yoluyla iş kurmak isteyen bireyler için E-1 ve E-2 vize türleri, ABD ile Türkiye arasında imzalanan ticaret anlaşmaları kapsamında büyük fırsatlar sunar. Bu vize türleriyle ABD'de aktif bir şekilde iş yürütebilir, uzun vadeli ticari varlık oluşturabilirsiniz.
                </p>
                <p className="text-gray-700">
                  Sadece Amerika olarak, E-1 (Ticaret Vizesi) ve E-2 (Yatırımcı Vizesi) başvurularında baştan sona kapsamlı danışmanlık hizmeti sunuyoruz. Başvuru sürecinde hazırlanması gereken tüm resmi ve stratejik belgeler tarafımızdan özenle organize edilir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Size Nasıl Yardımcı Olabiliriz?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Amerika'daki yeni hayatınıza güçlü bir başlangıç yapmak için uzman ekibimiz yanınızda.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" variant="secondary">İletişime Geçin</Button>
            </Link>
            <Link href="/auth?mode=register">
              <Button size="lg" className="bg-white text-blue-700">Hemen Başvurun</Button>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}