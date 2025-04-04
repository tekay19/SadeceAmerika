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
              SadeceAmerika, ABD vize başvuru süreçlerini kolaylaştırmak ve vize başarı 
              oranını artırmak amacıyla kurulan uzman bir danışmanlık şirketidir.
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
                  alt="SadeceAmerika team"
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
                SadeceAmerika, 2010 yılında Amerika'da eğitim almış ve vize süreçlerinde bizzat deneyim kazanmış bir grup uzman tarafından kuruldu. ABD vize başvurularında yaşanan zorlukları yakından gören kurucularımız, bu süreçleri kolaylaştırmak ve başvuru sahiplerine rehberlik etmek amacıyla yola çıktı.
              </p>
              <p className="text-gray-600 mb-4">
                Kurulduğumuz günden bu yana, binlerce başvuru sahibine destek olduk ve %95'in üzerinde başarı oranıyla çalışmalarımızı sürdürüyoruz. Deneyimli ekibimiz, vize süreçlerindeki her değişikliği takip ediyor ve danışanlarımıza en güncel bilgileri sunuyor.
              </p>
              <p className="text-gray-600">
                Bugün Türkiye'nin önde gelen ABD vize danışmanlık şirketlerinden biri olarak, her vize kategorisinde uzmanlaşmış kadromuzla hizmet vermeye devam ediyoruz.
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
              <h2 className="text-3xl font-bold">Misyonumuz ve Değerlerimiz</h2>
            </div>
            <p className="text-lg text-gray-600">
              ABD vizesi almanın bir rüya değil, doğru yönlendirme ve hazırlıkla ulaşılabilir bir hedef olduğuna inanıyoruz.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-blue-100 text-blue-700 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Globe size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Misyonumuz</h3>
              <p className="text-gray-600">
                ABD vize başvurularında rehberlik ederek, başvuru sahiplerinin hayallerine giden yolda onları desteklemek ve başarı şanslarını en üst düzeye çıkarmak.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-green-100 text-green-700 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <HeartHandshake size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Değerlerimiz</h3>
              <p className="text-gray-600">
                Dürüstlük, şeffaflık ve profesyonellik temel değerlerimizdir. Her başvuru sahibine özel çözümler sunarak, güven esaslı ilişkiler kurmayı hedefliyoruz.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-purple-100 text-purple-700 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Ekibimiz</h3>
              <p className="text-gray-600">
                Amerika'da eğitim ve iş deneyimine sahip, vize süreçlerinde uzmanlaşmış danışmanlardan oluşan ekibimizle çalışıyoruz. Her bir danışmanımız alanında en az 5 yıllık deneyime sahiptir.
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
              ABD vize başvurularında size destek olan deneyimli ekibimizle tanışın.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mb-4 relative inline-block">
                <div className="w-40 h-40 rounded-full overflow-hidden mx-auto mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80" 
                    alt="Ayşe Yılmaz" 
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <h3 className="text-xl font-semibold">Ayşe Yılmaz</h3>
              <p className="text-blue-600 mb-2">Kurucu Ortak & Vize Uzmanı</p>
              <p className="text-gray-600">
                Harvard Üniversitesi Uluslararası İlişkiler mezunu. 10+ yıl ABD vize danışmanlığı deneyimi.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 relative inline-block">
                <div className="w-40 h-40 rounded-full overflow-hidden mx-auto mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80" 
                    alt="Mehmet Kaya" 
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <h3 className="text-xl font-semibold">Mehmet Kaya</h3>
              <p className="text-blue-600 mb-2">Göçmenlik Danışmanı</p>
              <p className="text-gray-600">
                Columbia Üniversitesi Hukuk Fakültesi mezunu. ABD göçmenlik hukuku üzerine uzmanlaşmış.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 relative inline-block">
                <div className="w-40 h-40 rounded-full overflow-hidden mx-auto mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80" 
                    alt="Zeynep Demir" 
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <h3 className="text-xl font-semibold">Zeynep Demir</h3>
              <p className="text-blue-600 mb-2">Öğrenci Vizesi Uzmanı</p>
              <p className="text-gray-600">
                NYU Eğitim Fakültesi mezunu. 8+ yıl öğrenci ve değişim vizesi danışmanlığı deneyimi.
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
            Deneyimli ekibimizle ABD vize başvurunuzu kolaylaştırın ve başarı şansınızı artırın.
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