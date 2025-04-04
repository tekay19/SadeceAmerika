import { PublicLayout } from "@/components/layout/public-layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  ArrowRight, 
  CalendarCheck, 
  FileText, 
  Shield, 
  UserCheck,
  GraduationCap,
  Building,
  Landmark
} from "lucide-react";

export default function HomePage() {
  return (
    <PublicLayout>
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
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mx-auto mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80" 
                  alt="Murat Şimşek" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold">Murat Şimşek</h3>
              <p className="text-blue-600 text-sm">Kurucu & Vize Uzmanı</p>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mx-auto mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80" 
                  alt="İsmail Kaçmaz" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold">İsmail Kaçmaz</h3>
              <p className="text-blue-600 text-sm">Göçmenlik Danışmanı</p>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mx-auto mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80" 
                  alt="Tayyip Can Sarıtaş" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold">Tayyip Can Sarıtaş</h3>
              <p className="text-blue-600 text-sm">Öğrenci Vizesi Uzmanı</p>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mx-auto mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80" 
                  alt="Samet Çetinbay" 
                  className="w-full h-full object-cover"
                />
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
    </PublicLayout>
  );
}