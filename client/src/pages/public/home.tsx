import { PublicLayout } from "@/components/layout/public-layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  ArrowRight, 
  CalendarCheck, 
  CheckCircle, 
  FileText, 
  Rocket, 
  Shield, 
  Star, 
  Sparkles,
  UserCheck
} from "lucide-react";

export default function HomePage() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden">
        <div className="absolute top-0 left-0 right-0 bottom-0 opacity-30">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-400/10 rounded-full filter blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center bg-blue-700/40 backdrop-blur-sm py-1 px-4 rounded-full mb-6 border border-blue-500/50">
              <Sparkles className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Amerika vizesi için güvenilir çözüm ortağınız</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              ABD Vize Başvurunuzu <span className="text-blue-300">Kolaylaştırıyoruz</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Amerika vizesi için başvuru sürecinizi hızlandırın ve 
              uzman ekibimizle endişesiz bir şekilde vize almanın
              keyfini yaşayın.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/dashboard">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 font-medium px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-2px]">
                  Hemen Başvur
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20 font-medium px-8 py-6 text-lg transition-all duration-300 hover:translate-y-[-2px]">
                  Hizmetlerimiz
                </Button>
              </Link>
            </div>
            <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-blue-300" />
                <span>%95 Başarı Oranı</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-blue-300" />
                <span>5.000+ Mutlu Müşteri</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-blue-300" />
                <span>24/7 Destek</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block text-primary font-semibold mb-2">Avantajlarımız</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Neden SadeceAmerika?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              ABD vize başvurunuzun her aşamasında yanınızda duruyoruz.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px] border border-gray-100">
              <div className="bg-blue-600 text-white w-14 h-14 rounded-lg flex items-center justify-center mb-5">
                <FileText size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Kolay Başvuru</h3>
              <p className="text-gray-600">
                Kullanıcı dostu bir arayüzle başvuru formlarınızı adım adım doldurabilirsiniz.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px] border border-gray-100">
              <div className="bg-green-600 text-white w-14 h-14 rounded-lg flex items-center justify-center mb-5">
                <UserCheck size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Uzman Destek</h3>
              <p className="text-gray-600">
                Deneyimli danışmanlarımız belge hazırlama ve görüşme hazırlığında size destek olur.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px] border border-gray-100">
              <div className="bg-purple-600 text-white w-14 h-14 rounded-lg flex items-center justify-center mb-5">
                <CalendarCheck size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Randevu Takibi</h3>
              <p className="text-gray-600">
                Vize görüşmesi randevunuzu kolayca oluşturup takip edebilirsiniz.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px] border border-gray-100">
              <div className="bg-orange-600 text-white w-14 h-14 rounded-lg flex items-center justify-center mb-5">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Güvenli Süreç</h3>
              <p className="text-gray-600">
                Verileriniz ve belgeleriniz tamamen güvenli bir şekilde saklanır.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-10">
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 text-blue-600 rounded-full">
                  <Star size={28} />
                </div>
                <h3 className="text-4xl font-bold text-gray-900 mb-2">95%</h3>
                <p className="text-lg text-gray-600">Başarı Oranı</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-100 text-green-600 rounded-full">
                  <UserCheck size={28} />
                </div>
                <h3 className="text-4xl font-bold text-gray-900 mb-2">5,000+</h3>
                <p className="text-lg text-gray-600">Mutlu Müşteri</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-purple-100 text-purple-600 rounded-full">
                  <CalendarCheck size={28} />
                </div>
                <h3 className="text-4xl font-bold text-gray-900 mb-2">10+</h3>
                <p className="text-lg text-gray-600">Yıllık Deneyim</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 bottom-0 opacity-20">
          <div className="absolute top-10 right-10 w-96 h-96 bg-white/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-400/10 rounded-full filter blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm py-1 px-4 rounded-full mb-6">
              <Rocket className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Vakit Kaybetmeyin</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Amerikaya Giden Yolunuzu Açalım</h2>
            <p className="text-xl mb-10 opacity-90">
              Hemen üye olun ve vize başvuru sürecinizi kolaylaştırın. Uzman ekibimiz sizin için çalışmaya hazır.
            </p>
            <Link href="/dashboard">
              <Button size="lg" className="bg-white hover:bg-blue-50 text-primary hover:text-primary/90 font-medium px-8 py-6 text-lg shadow-lg transition-all duration-300 hover:translate-y-[-2px] flex items-center mx-auto">
                Hemen Başlayın
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}