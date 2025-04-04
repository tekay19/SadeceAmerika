import { PublicLayout } from "@/components/layout/public-layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Award, 
  Globe, 
  HeartHandshake, 
  History, 
  Users
} from "lucide-react";

export default function AboutPage() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Hakkımızda</h1>
            <p className="text-xl text-gray-600">
              Sadece Amerika, Amerika merkezli "Mese Consultancy"nin Türkiye uzantısı olarak 2025 yılında Ankara'da kurulmuştur.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="bg-blue-100 absolute -top-4 -left-4 w-full h-full rounded-lg"></div>
                <img 
                  src="https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=800&q=80" 
                  alt="Sadece Amerika team"
                  className="rounded-lg relative z-10 w-full h-auto object-cover"
                />
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="flex items-center mb-4">
                <History className="text-blue-600 mr-2" size={24} />
                <h2 className="text-2xl font-bold">Kuruluş Hikayemiz</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Sadece Amerika, Amerika merkezli "Mese Consultancy"nin Türkiye uzantısı olarak 2025 yılında Ankara'da kurulmuştur. Mese Consultancy, 2023 yılında Dallas, Texas'ta kurulmuş, ziyaretçilerden öğrencilere, yatırımcılardan göçmenlik planlaması yapan birey ve kurumlara kadar geniş bir yelpazeye hizmet sunan, Amerika Göçmenlik Hukuku alanında uzmanlaşmış bir danışmanlık kurumudur.
              </p>
              <p className="text-gray-600 mb-4">
                Sadece Amerika olarak amacımız, Türkiye'de yaşayan vize başvurucularının Amerika Birleşik Devletleri'ne yönelik tüm vize işlemlerinde; vize başvurusundan başlayarak, Amerika'da şirket kurma, yerleşim süreci, eğitim ve yatırım planlaması gibi konularda doğru bilgi, derinlikli yönlendirme ve donanımlı avukat kadromuzla profesyonel destek sunmaktır.
              </p>
              <p className="text-gray-600">
                Vize başvurucularımızın süreçlerini en etkin, verimli ve stressiz şekilde tamamlamalarını sağlamak için çalışıyoruz. Ekibimiz, Amerika göçmenlik hukuku alanında 6 yıllık deneyime sahip hukuk profesyonellerinden oluşmaktadır.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <Award className="text-blue-600 mr-2" size={24} />
              <h2 className="text-3xl font-bold">Değerlerimiz</h2>
            </div>
            <p className="text-lg text-gray-600">
              Her başvuruyu bireysel olarak ele alıyor; güvenilir, şeffaf ve danışan odaklı yaklaşımımızla, onların hedeflerine ulaşmaları için güçlü bir rehberlik sunuyoruz.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-blue-100 text-blue-700 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Globe size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Güvenilirlik</h3>
              <p className="text-gray-600">
                Vize başvurucularına karşı Amerika Göçmenlik Hukuku'nu en doğru biçimde aktarıyor, her adımda şeffaf bilgi ve yol haritası sunuyoruz.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-green-100 text-green-700 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <HeartHandshake size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Profesyonellik</h3>
              <p className="text-gray-600">
                6 yıllık Amerika göçmenlik hukuku deneyimine sahip hukuk ekibimizle, her başvuruyu en yüksek standartlarda ve titizlikle ele alıyoruz.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-purple-100 text-purple-700 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Danışan Odaklılık</h3>
              <p className="text-gray-600">
                Danışanlarımızın bireysel hedeflerine ulaşabilmesi için onların özel eğitim ve iş geçmişine uygun Amerika Göçmenlik Planı oluşturuyoruz.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-yellow-100 text-yellow-700 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Award size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Sürekli Gelişim</h3>
              <p className="text-gray-600">
                Vize ve göçmenlik prosedürlerindeki güncel gelişmeleri yakından takip ederek, hizmet kalitemizi sürekli artırıyoruz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Uzman Ekibimiz</h2>
            <p className="text-lg text-gray-600">
              Amerika vize başvurularınızda size destek olan deneyimli ekibimizle tanışın.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="mb-4 relative inline-block">
                <div className="w-40 h-40 rounded-full overflow-hidden mx-auto mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80" 
                    alt="Murat Şimşek" 
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <h3 className="text-xl font-semibold">Murat Şimşek</h3>
              <p className="text-blue-600 mb-2">Kurucu Ortak & Vize Uzmanı</p>
              <p className="text-gray-600">
                Amerika göçmenlik hukuku üzerine 6+ yıl deneyimli uzman.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 relative inline-block">
                <div className="w-40 h-40 rounded-full overflow-hidden mx-auto mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80" 
                    alt="İsmail Kaçmaz" 
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <h3 className="text-xl font-semibold">İsmail Kaçmaz</h3>
              <p className="text-blue-600 mb-2">Göçmenlik Danışmanı</p>
              <p className="text-gray-600">
                Özellikle yatırımcı vizeleri konusunda uzmanlaşmış danışman.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 relative inline-block">
                <div className="w-40 h-40 rounded-full overflow-hidden mx-auto mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80" 
                    alt="Tayyip Can Sarıtaş" 
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <h3 className="text-xl font-semibold">Tayyip Can Sarıtaş</h3>
              <p className="text-blue-600 mb-2">Öğrenci Vizesi Uzmanı</p>
              <p className="text-gray-600">
                F1 ve J1 vizeleri konusunda uzmanlaşmış danışman.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 relative inline-block">
                <div className="w-40 h-40 rounded-full overflow-hidden mx-auto mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80" 
                    alt="Samet Çetinbay" 
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <h3 className="text-xl font-semibold">Samet Çetinbay</h3>
              <p className="text-blue-600 mb-2">İş Vizesi Uzmanı</p>
              <p className="text-gray-600">
                H-1B ve L-1 iş vizeleri konusunda uzmanlaşmış danışman.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Amerika Vizeniz İçin Hazır mısınız?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Sadece Amerika olarak, Türkiye'den Amerika'ya uzanan yolda, güvenilir çözüm ortağınız olmayı hedefliyoruz.
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