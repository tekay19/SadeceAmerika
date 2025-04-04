import { PublicLayout } from "@/components/layout/public-layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Briefcase, 
  Building, 
  Globe, 
  GraduationCap, 
  Heart, 
  MessagesSquare, 
  Plane, 
  UsersRound 
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
              SadeceAmerika olarak, ABD vize başvuru süreçlerinizde size destek oluyoruz. 
              Alanında uzman danışmanlarımız, başvurunuzun her aşamasında yanınızda.
            </p>
          </div>
        </div>
      </section>

      {/* Visa Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Vize Kategorileri</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Tourist Visa */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-2 bg-blue-600"></div>
              <div className="p-6">
                <div className="bg-blue-100 text-blue-700 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                  <Plane size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">Turist Vizesi (B-2)</h3>
                <p className="text-gray-600 mb-4">
                  Amerika'yı turistik amaçla ziyaret etmek, aile ve arkadaş ziyareti yapmak veya tedavi görmek isteyenler için.
                </p>
                <ul className="space-y-2 mb-6 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Vize görüşmesine hazırlık</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>DS-160 formu doldurma desteği</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Gerekli belgelerin hazırlanması</span>
                  </li>
                </ul>
                <Link href="/auth?mode=register">
                  <Button variant="outline" className="w-full">Başvuru Yap</Button>
                </Link>
              </div>
            </div>

            {/* Business Visa */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-2 bg-purple-600"></div>
              <div className="p-6">
                <div className="bg-purple-100 text-purple-700 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                  <Briefcase size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">İş Vizesi (B-1)</h3>
                <p className="text-gray-600 mb-4">
                  İş toplantıları, konferanslar, şirket ziyaretleri ve ticari görüşmeler için Amerika'ya seyahat etmek isteyenler için.
                </p>
                <ul className="space-y-2 mb-6 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Davet mektubu yönetimi</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>İş bağlantılarının belgelendirilmesi</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Vize mülakatı pratikleri</span>
                  </li>
                </ul>
                <Link href="/auth?mode=register">
                  <Button variant="outline" className="w-full">Başvuru Yap</Button>
                </Link>
              </div>
            </div>

            {/* Student Visa */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-2 bg-green-600"></div>
              <div className="p-6">
                <div className="bg-green-100 text-green-700 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                  <GraduationCap size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">Öğrenci Vizesi (F-1)</h3>
                <p className="text-gray-600 mb-4">
                  Amerika'da eğitim almak, dil okulu, lisans, yüksek lisans veya doktora programlarına katılmak isteyenler için.
                </p>
                <ul className="space-y-2 mb-6 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>I-20 formu takibi</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Finansal belgelerin hazırlanması</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>SEVIS ücreti ödeme desteği</span>
                  </li>
                </ul>
                <Link href="/auth?mode=register">
                  <Button variant="outline" className="w-full">Başvuru Yap</Button>
                </Link>
              </div>
            </div>

            {/* Exchange Visitor */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-2 bg-yellow-600"></div>
              <div className="p-6">
                <div className="bg-yellow-100 text-yellow-700 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                  <UsersRound size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">Değişim Ziyaretçisi (J-1)</h3>
                <p className="text-gray-600 mb-4">
                  Kültürel değişim programları, staj, akademik programlar ve iş değişim programları için Amerika'ya seyahat edenler için.
                </p>
                <ul className="space-y-2 mb-6 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>DS-2019 formu takibi</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Program sponsoruyla iletişim</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>2 yıl ikametgah şartı danışmanlığı</span>
                  </li>
                </ul>
                <Link href="/auth?mode=register">
                  <Button variant="outline" className="w-full">Başvuru Yap</Button>
                </Link>
              </div>
            </div>

            {/* Work Visa */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-2 bg-red-600"></div>
              <div className="p-6">
                <div className="bg-red-100 text-red-700 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                  <Building size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">Çalışma Vizesi (H-1B)</h3>
                <p className="text-gray-600 mb-4">
                  Amerika'da işverenleri tarafından sponsorluk edilen, özel uzmanlık gerektiren işlerde çalışmak isteyenler için.
                </p>
                <ul className="space-y-2 mb-6 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>İşveren dokümanları danışmanlığı</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>LCA başvuru takibi</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Eğitim ve deneyim belgelendirme</span>
                  </li>
                </ul>
                <Link href="/auth?mode=register">
                  <Button variant="outline" className="w-full">Başvuru Yap</Button>
                </Link>
              </div>
            </div>

            {/* Investor Visa */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-2 bg-teal-600"></div>
              <div className="p-6">
                <div className="bg-teal-100 text-teal-700 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                  <Globe size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">Yatırımcı Vizesi (E-2)</h3>
                <p className="text-gray-600 mb-4">
                  Amerika'da önemli miktarda yatırım yapan ve işletme yöneten yatırımcılar için.
                </p>
                <ul className="space-y-2 mb-6 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>İş planı hazırlama desteği</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Finansal yatırım belgelendirme</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Yatırım kaynağı meşruiyeti gösterimi</span>
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
      
      {/* CTA */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Size Nasıl Yardımcı Olabiliriz?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Vize başvurunuzla ilgili sorularınız mı var? Uzman ekibimiz size yardımcı olmak için hazır.
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