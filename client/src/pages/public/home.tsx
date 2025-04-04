import { PublicLayout } from "@/components/layout/public-layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  ArrowRight, 
  CalendarCheck, 
  FileText, 
  Shield, 
  UserCheck
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
              Amerika vizesi için başvuru sürecinizi hızlandırın ve 
              uzman ekibimizle endişesiz bir şekilde vize almanın
              keyfini yaşayın.
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

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Neden SadeceAmerika?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              ABD vize başvurunuzun her aşamasında yanınızda duruyoruz.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="bg-blue-100 text-blue-700 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <FileText size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Kolay Başvuru</h3>
              <p className="text-gray-600">
                Kullanıcı dostu bir arayüzle başvuru formlarınızı adım adım doldurabilirsiniz.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="bg-green-100 text-green-700 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <UserCheck size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Uzman Destek</h3>
              <p className="text-gray-600">
                Deneyimli danışmanlarımız belge hazırlama ve görüşme hazırlığında size destek olur.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="bg-purple-100 text-purple-700 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <CalendarCheck size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Randevu Takibi</h3>
              <p className="text-gray-600">
                Vize görüşmesi randevunuzu kolayca oluşturup takip edebilirsiniz.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="bg-orange-100 text-orange-700 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Güvenli Süreç</h3>
              <p className="text-gray-600">
                Verileriniz ve belgeleriniz tamamen güvenli bir şekilde saklanır.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Amerikaya Giden Yolunuzu Açalım</h2>
            <p className="text-lg text-gray-600 mb-8">
              Hemen üye olun ve vize başvuru sürecinizi kolaylaştırın. Uzman ekibimiz sizin için çalışmaya hazır.
            </p>
            <Link href="/auth?mode=register">
              <Button size="lg" className="flex items-center mx-auto">
                Hemen Başlayın
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}