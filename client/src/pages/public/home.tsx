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
  Landmark,
  Users,
  MapPin,
  Flag
} from "lucide-react";
import { RemoteImage } from "@/components/ui/remote-image";

// Resim URL'leri
import {
  USA_FLAG_URL,
  PASSPORT_WITH_FLAG_URL,
  VISA_STAMP_URL,
  NEW_YORK_URL,
  GOLDEN_GATE_URL,
  STATUE_OF_LIBERTY_URL,
  DIVERSE_PEOPLE_URL,
  BUSINESS_MEETING_URL,
  UNIVERSITY_URL,
  APARTMENT_URL,
  PASSPORT_DOCUMENTS_URL,
  CITY_LIFE_URL,
  GRAND_CANYON_URL,
  AIRPORT_URL,
  AIRPLANE_URL
} from "@/lib/image-constants";

// Yerel logoyu koru
import logoImg from "../../assets/images/logo.jpg";

export default function HomePage() {
  return (
    <PublicLayout>
      <PageTransition>
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Background with parallax effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800">
            <div className="absolute inset-0 opacity-20">
              <RemoteImage 
                src={STATUE_OF_LIBERTY_URL} 
                fallbackUrl={NEW_YORK_URL}
                altText="Amerika'da Özgürlük Anıtı" 
                className="w-full h-full object-cover" 
              />
            </div>
            {/* Animated gradient overlay */}
            <div 
              className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 to-transparent"
              style={{ 
                backgroundSize: '400% 400%',
                animation: 'gradient-animation 15s ease infinite'
              }}
            />
            {/* Decorative elements */}
            <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-indigo-500/20 blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
            <div className="max-w-4xl mx-auto">
              {/* Top badges */}
              <div className="flex justify-center mb-8 space-x-3">
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20 text-white">
                  <div className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></div>
                  <span className="text-sm font-medium">%94 Başarı Oranı</span>
                </div>
                <div className="hidden md:flex items-center bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20 text-white">
                  <Shield className="w-4 h-4 mr-2 text-blue-300" />
                  <span className="text-sm font-medium">7/24 Profesyonel Destek</span>
                </div>
              </div>

              {/* Main content with staggered animation */}
              <div className="text-center text-white">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                  <span className="block">ABD Vize </span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                    Başvurunuzu Kolaylaştırıyoruz
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl mb-10 text-blue-100 leading-relaxed max-w-3xl mx-auto">
                  Amerika vizesi için başvuru sürecinizi 
                  <span className="font-semibold text-white"> Sadece Amerika </span> 
                  ile hızlandırın ve göçmenlik hukuku alanında uzman ekibimizle
                  endişesiz bir şekilde ABD'ye adım atın.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <Link href="/auth?mode=register">
                    <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 font-bold shadow-lg shadow-blue-900/30 px-8 py-6 text-base transition-all duration-300 hover:scale-105">
                      Hemen Başvur
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/services">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20 font-medium px-8 py-6 text-base backdrop-blur-sm">
                      Hizmetlerimizi Keşfedin
                    </Button>
                  </Link>
                </div>
              </div>
              
              {/* Stats/Features row */}
              <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 max-w-4xl mx-auto">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center text-white">
                  <div className="text-2xl md:text-3xl font-bold">5000+</div>
                  <div className="text-sm text-blue-100">Başarılı Vize</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center text-white">
                  <div className="text-2xl md:text-3xl font-bold">15+</div>
                  <div className="text-sm text-blue-100">Yıllık Tecrübe</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center text-white">
                  <div className="text-2xl md:text-3xl font-bold">%94</div>
                  <div className="text-sm text-blue-100">Başarı Oranı</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center text-white">
                  <div className="text-2xl md:text-3xl font-bold">7/24</div>
                  <div className="text-sm text-blue-100">Destek</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Wave effect at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-white transform -translate-y-1">
            <svg className="absolute -top-16 w-full h-16 text-white" preserveAspectRatio="none" viewBox="0 0 1440 54">
              <path fill="currentColor" d="M0 0L48 5.33333C96 10.6667 192 21.3333 288 32C384 42.6667 480 53.3333 576 48C672 42.6667 768 21.3333 864 10.6667C960 0 1056 0 1152 5.33333C1248 10.6667 1344 21.3333 1392 26.6667L1440 32V54H1392C1344 54 1248 54 1152 54C1056 54 960 54 864 54C768 54 672 54 576 54C480 54 384 54 288 54C192 54 96 54 48 54H0V0Z"/>
            </svg>
          </div>
          
          {/* Add CSS for gradient animation */}
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes gradient-animation {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
          `}} />
        </section>

        {/* About Summary */}
        <section className="py-20 bg-white overflow-hidden">
          <div className="container mx-auto px-4">
            {/* Section header */}
            <div className="text-center mb-10">
              <div className="inline-block bg-blue-50 px-3 py-1 rounded-full text-blue-700 text-sm font-semibold mb-3">
                Hakkımızda
              </div>
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent inline-block mb-2">
                Amerika'da Profesyonel Destek
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full mb-4"></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
              {/* Left column - Image with decorative elements */}
              <div className="relative">
                {/* Decorative elements */}
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-50 rounded-full z-0"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-indigo-50 rounded-full z-0"></div>
                
                {/* Main image */}
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500 group">
                  <RemoteImage 
                    src={DIVERSE_PEOPLE_URL} 
                    fallbackUrl={GOLDEN_GATE_URL}
                    altText="Green Card Profesyoneller" 
                    className="w-full h-96 object-cover transition-transform duration-3000 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/40 to-transparent flex flex-col justify-end">
                    <div className="p-8">
                      <div className="flex items-center bg-white/90 p-3 rounded-xl inline-block mb-3 shadow-lg transform -translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                        <img src={logoImg} alt="Sadece Amerika Logo" className="h-8 w-auto mr-2" />
                        <span className="font-bold text-blue-700">Sadece Amerika</span>
                      </div>
                      <h3 className="text-white text-2xl font-bold mb-2">
                        Green Card Sahipleri İçin Kapsamlı Hizmetler
                      </h3>
                      <p className="text-blue-100 max-w-md">
                        Amerika'da yeni hayatınıza başlarken ihtiyacınız olan profesyonel destek
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Stats badge positioned over the image */}
                <div className="absolute top-5 right-5 bg-white rounded-lg shadow-lg p-3 z-20 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold text-blue-700">15+</span>
                    <span className="text-xs text-gray-500">Yıllık Tecrübe</span>
                  </div>
                </div>
              </div>
              
              {/* Right column - Content */}
              <div className="relative">
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-2 block">
                  Mese Consultancy'nin Türkiye Uzantısı
                </span>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4 leading-tight">
                  Amerika Vizenizde 
                  <span className="text-blue-600"> Profesyonel </span> 
                  Danışmanlık
                </h2>
                
                <div className="h-1 w-16 bg-blue-600 rounded mb-6"></div>
                
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  <strong className="text-blue-700">Sadece Amerika</strong>, Amerika merkezli "Mese Consultancy"nin 
                  Türkiye uzantısı olarak 2025 yılında kurulmuştur. Vizyonumuz, ABD vize sürecinde Türk 
                  vatandaşlarına profesyonel ve güvenilir rehberlik sağlamaktır.
                </p>
                
                <p className="text-gray-600 mb-8">
                  Her başvuruyu bireysel olarak değerlendiriyor; güvenilir, şeffaf ve danışan odaklı 
                  yaklaşımımızla, hedeflerinize ulaşmanız için güçlü bir rehberlik sunuyoruz.
                </p>
                
                {/* Feature bullets */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="flex items-start">
                    <div className="bg-blue-100 rounded-full p-1 mt-1 mr-3">
                      <Shield className="h-4 w-4 text-blue-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Güvenilir Danışmanlık</h4>
                      <p className="text-sm text-gray-600">%94 başarı oranı ile vize süreçlerinizde yanınızdayız</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-100 rounded-full p-1 mt-1 mr-3">
                      <GraduationCap className="h-4 w-4 text-blue-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Uzman Kadro</h4>
                      <p className="text-sm text-gray-600">ABD eğitimli göçmenlik uzmanları ve avukatlar</p>
                    </div>
                  </div>
                </div>
                
                <Link href="/about">
                  <Button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 font-medium">
                    Hakkımızda Daha Fazla Bilgi
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Services Showcase */}
        <section className="py-24 relative overflow-hidden">
          {/* Decorative background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50"></div>
          <div className="absolute right-0 top-0 w-96 h-96 bg-blue-100 rounded-full -mr-20 -mt-20 opacity-50"></div>
          <div className="absolute left-0 bottom-0 w-64 h-64 bg-indigo-100 rounded-full -ml-10 -mb-10 opacity-50"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            {/* Section header with badge */}
            <div className="text-center mb-16">
              <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-3">
                Profesyonel Hizmetler
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Amerika'ya Açılan <span className="text-blue-600">Kapınız</span>
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full mb-6"></div>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                ABD vize süreçlerinde ve Amerika'daki yaşamınızın her adımında 
                <span className="font-medium text-gray-800"> uzman desteği.</span>
              </p>
            </div>

            {/* Service cards with hover effects */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Visitor visas */}
              <div className="group relative bg-white rounded-2xl p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden">
                <div className="absolute right-0 top-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 transition-all duration-500 group-hover:scale-125"></div>
                <div className="relative z-10">
                  <div className="bg-blue-100 text-blue-700 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:shadow-md group-hover:bg-blue-600 group-hover:text-white">
                    <FileText size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Ziyaretçi Vizeleri</h3>
                  <p className="text-gray-600 mb-4">
                    B1/B2 turist ve iş amaçlı ziyaretçi vizeleri için uçtan uca danışmanlık hizmeti ve başvuru desteği.
                  </p>
                  <Link href="/services">
                    <span className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors">
                      Detaylı Bilgi
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </Link>
                </div>
              </div>
              
              {/* Student visas */}
              <div className="group relative bg-white rounded-2xl p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden">
                <div className="absolute right-0 top-0 w-32 h-32 bg-green-50 rounded-full -mr-16 -mt-16 transition-all duration-500 group-hover:scale-125"></div>
                <div className="relative z-10">
                  <div className="bg-green-100 text-green-700 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:shadow-md group-hover:bg-green-600 group-hover:text-white">
                    <GraduationCap size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Öğrenci Vizeleri</h3>
                  <p className="text-gray-600 mb-4">
                    F1 öğrenci vizesi, okul kaydı, dil okulu yerleştirme ve üniversite kabul aşamalarında tam destek.
                  </p>
                  <Link href="/services">
                    <span className="inline-flex items-center text-green-600 font-medium hover:text-green-800 transition-colors">
                      Detaylı Bilgi
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </Link>
                </div>
              </div>
              
              {/* Investor visas */}
              <div className="group relative bg-white rounded-2xl p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden">
                <div className="absolute right-0 top-0 w-32 h-32 bg-purple-50 rounded-full -mr-16 -mt-16 transition-all duration-500 group-hover:scale-125"></div>
                <div className="relative z-10">
                  <div className="bg-purple-100 text-purple-700 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:shadow-md group-hover:bg-purple-600 group-hover:text-white">
                    <Landmark size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Yatırımcı Vizeleri</h3>
                  <p className="text-gray-600 mb-4">
                    E-1/E-2 yatırımcı vizeleri, şirket kurulumu, iş planı hazırlama ve yatırım sürecinde danışmanlık.
                  </p>
                  <Link href="/services">
                    <span className="inline-flex items-center text-purple-600 font-medium hover:text-purple-800 transition-colors">
                      Detaylı Bilgi
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </Link>
                </div>
              </div>
              
              {/* Work visas */}
              <div className="group relative bg-white rounded-2xl p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden">
                <div className="absolute right-0 top-0 w-32 h-32 bg-yellow-50 rounded-full -mr-16 -mt-16 transition-all duration-500 group-hover:scale-125"></div>
                <div className="relative z-10">
                  <div className="bg-yellow-100 text-yellow-700 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:shadow-md group-hover:bg-yellow-600 group-hover:text-white">
                    <Building size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Çalışma Vizeleri</h3>
                  <p className="text-gray-600 mb-4">
                    H-1B ve L-1 çalışma vizeleri için başvuru hazırlığı ve yasal süreç yönetimi.
                  </p>
                  <Link href="/services">
                    <span className="inline-flex items-center text-yellow-600 font-medium hover:text-yellow-800 transition-colors">
                      Detaylı Bilgi
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </Link>
                </div>
              </div>
              
              {/* Visa interview */}
              <div className="group relative bg-white rounded-2xl p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden">
                <div className="absolute right-0 top-0 w-32 h-32 bg-red-50 rounded-full -mr-16 -mt-16 transition-all duration-500 group-hover:scale-125"></div>
                <div className="relative z-10">
                  <div className="bg-red-100 text-red-700 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:shadow-md group-hover:bg-red-600 group-hover:text-white">
                    <CalendarCheck size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Vize Mülakat Hazırlığı</h3>
                  <p className="text-gray-600 mb-4">
                    Vize görüşmesi için kapsamlı hazırlık, başarı şansını artıracak strateji ve belge analizi.
                  </p>
                  <Link href="/services">
                    <span className="inline-flex items-center text-red-600 font-medium hover:text-red-800 transition-colors">
                      Detaylı Bilgi
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </Link>
                </div>
              </div>
              
              {/* Business setup */}
              <div className="group relative bg-white rounded-2xl p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden">
                <div className="absolute right-0 top-0 w-32 h-32 bg-orange-50 rounded-full -mr-16 -mt-16 transition-all duration-500 group-hover:scale-125"></div>
                <div className="relative z-10">
                  <div className="bg-orange-100 text-orange-700 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:shadow-md group-hover:bg-orange-600 group-hover:text-white">
                    <Shield size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Amerika'da İş Kurma</h3>
                  <p className="text-gray-600 mb-4">
                    ABD'de şirket kurulumu, şirket devralma ve işletme lisansları ile ilgili tam kapsamlı danışmanlık.
                  </p>
                  <Link href="/services">
                    <span className="inline-flex items-center text-orange-600 font-medium hover:text-orange-800 transition-colors">
                      Detaylı Bilgi
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Call to action button */}
            <div className="mt-16 text-center">
              <Link href="/services">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium px-8 shadow-lg shadow-blue-500/20">
                  Tüm Hizmetlerimizi Keşfedin
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Additional Services */}
        <section className="py-24 relative overflow-hidden">
          {/* Background effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-green-50"></div>
          
          {/* Decorative elements */}
          <div className="absolute left-0 top-20 w-72 h-72 bg-gradient-to-br from-blue-100 to-blue-200/50 rounded-full -ml-20 opacity-70 blur-2xl"></div>
          <div className="absolute right-0 bottom-20 w-96 h-96 bg-gradient-to-br from-green-100 to-blue-200/50 rounded-full -mr-40 opacity-70 blur-2xl"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            {/* Section title */}
            <div className="text-center mb-16">
              <div className="inline-block px-3 py-1 bg-gradient-to-r from-green-100 to-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-3">
                Özel Çözümler
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-700 via-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
                Yeni Hayatınız İçin Özel Hizmetler
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-green-500 mx-auto rounded-full mb-6"></div>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Amerika'daki yaşamınızın her aşamasında size destek olacak 
                <span className="text-blue-700 font-medium"> özel çözümler</span>
              </p>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-14">
                {/* Green Card Integration Services */}
                <div className="group relative bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500">
                  <div className="absolute right-0 bottom-0 w-56 h-56 bg-green-50 rounded-full -mb-20 -mr-20 transition-all duration-700 group-hover:scale-150 group-hover:opacity-80"></div>
                  <div className="absolute left-0 top-0 w-32 h-32 bg-blue-50 rounded-full -ml-10 -mt-10 transition-all duration-700"></div>
                  
                  <div className="relative z-10 p-8">
                    <div className="flex flex-col md:flex-row md:items-start gap-6">
                      {/* Image container */}
                      <div className="md:w-2/5 aspect-video rounded-2xl overflow-hidden shadow-lg relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 via-green-900/40 to-transparent z-10"></div>
                        <span className="absolute top-4 left-4 z-20 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                          Yeni Hizmet
                        </span>
                        <div className="absolute bottom-4 left-4 right-4 z-20">
                          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 text-center shadow-md">
                            <div className="text-green-700 font-bold text-sm">5000+ Başarılı Entegrasyon</div>
                          </div>
                        </div>
                        <RemoteImage 
                          src={BUSINESS_MEETING_URL} 
                          fallbackUrl={DIVERSE_PEOPLE_URL}
                          altText="Green Card Entegrasyon" 
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-3000" 
                        />
                      </div>
                      
                      {/* Content container */}
                      <div className="md:w-3/5">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md shadow-green-200 transform group-hover:rotate-6 transition-all duration-300">
                            <UserCheck size={28} />
                          </div>
                          <h3 className="text-2xl font-bold text-gray-800">Green Card Entegrasyon Hizmetleri</h3>
                        </div>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                          Amerika'ya yeni adım atan Green Card sahiplerine ülkeye hızlı ve sorunsuz uyum sağlamaları için kapsamlı destek. Sosyal, ekonomik ve kültürel entegrasyon.
                        </p>
                        
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                          <div className="bg-white/80 rounded-xl p-4 shadow-sm">
                            <h4 className="font-bold text-green-700 mb-3 flex items-center">
                              <span className="bg-green-100 p-1.5 rounded-lg mr-2">
                                <Users className="h-4 w-4 text-green-600" />
                              </span>
                              Sosyal Entegrasyon
                            </h4>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-start">
                                <span className="bg-green-100 text-green-600 p-0.5 rounded-full mr-2 flex-shrink-0 mt-0.5">
                                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </span>
                                <span>Kültürel uyum danışmanlığı</span>
                              </li>
                              <li className="flex items-start">
                                <span className="bg-green-100 text-green-600 p-0.5 rounded-full mr-2 flex-shrink-0 mt-0.5">
                                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </span>
                                <span>Sosyal ağ oluşturma desteği</span>
                              </li>
                              <li className="flex items-start">
                                <span className="bg-green-100 text-green-600 p-0.5 rounded-full mr-2 flex-shrink-0 mt-0.5">
                                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </span>
                                <span>Toplum etkinlikleri bilgilendirme</span>
                              </li>
                            </ul>
                          </div>
                          <div className="bg-white/80 rounded-xl p-4 shadow-sm">
                            <h4 className="font-bold text-green-700 mb-3 flex items-center">
                              <span className="bg-green-100 p-1.5 rounded-lg mr-2">
                                <GraduationCap className="h-4 w-4 text-green-600" />
                              </span>
                              Kariyer Gelişimi
                            </h4>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-start">
                                <span className="bg-green-100 text-green-600 p-0.5 rounded-full mr-2 flex-shrink-0 mt-0.5">
                                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </span>
                                <span>CV ve mülakat koçluğu</span>
                              </li>
                              <li className="flex items-start">
                                <span className="bg-green-100 text-green-600 p-0.5 rounded-full mr-2 flex-shrink-0 mt-0.5">
                                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </span>
                                <span>İş fırsatları danışmanlığı</span>
                              </li>
                              <li className="flex items-start">
                                <span className="bg-green-100 text-green-600 p-0.5 rounded-full mr-2 flex-shrink-0 mt-0.5">
                                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </span>
                                <span>Sektör spesifik networking</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                        
                        <Link href="/services">
                          <Button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium">
                            Entegrasyon Hizmetleri Hakkında
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Housing and Auto Services */}
                <div className="group relative bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500">
                  <div className="absolute right-0 bottom-0 w-56 h-56 bg-blue-50 rounded-full -mb-20 -mr-20 transition-all duration-700 group-hover:scale-150 group-hover:opacity-80"></div>
                  <div className="absolute left-0 top-0 w-32 h-32 bg-indigo-50 rounded-full -ml-10 -mt-10 transition-all duration-700"></div>
                  
                  <div className="relative z-10 p-8">
                    <div className="flex flex-col md:flex-row md:items-start gap-6">
                      {/* Image container */}
                      <div className="md:w-2/5 aspect-video rounded-2xl overflow-hidden shadow-lg relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/40 to-transparent z-10"></div>
                        <span className="absolute top-4 left-4 z-20 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                          Popüler
                        </span>
                        <div className="absolute bottom-4 left-4 right-4 z-20">
                          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 text-center shadow-md">
                            <div className="text-blue-700 font-bold text-sm">1000+ Memnun Müşteri</div>
                          </div>
                        </div>
                        <RemoteImage 
                          src={APARTMENT_URL} 
                          fallbackUrl={CITY_LIFE_URL}
                          altText="Konaklama ve Araç Kiralama" 
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-3000" 
                        />
                      </div>
                      
                      {/* Content container */}
                      <div className="md:w-3/5">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md shadow-blue-200 transform group-hover:rotate-6 transition-all duration-300">
                            <Building2 size={28} />
                          </div>
                          <h3 className="text-2xl font-bold text-gray-800">Konaklama ve Araç Kiralama</h3>
                        </div>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                          Amerika'ya adım attığınız andan itibaren konforlu ve sorunsuz bir yaşam deneyimi için konaklama ve ulaşım çözümleri. Sizin ihtiyaçlarınıza özel seçenekler.
                        </p>
                        
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                          <div className="bg-white/80 rounded-xl p-4 shadow-sm">
                            <h4 className="font-bold text-blue-700 mb-3 flex items-center">
                              <span className="bg-blue-100 p-1.5 rounded-lg mr-2">
                                <MapPin className="h-4 w-4 text-blue-600" />
                              </span>
                              Konaklama Hizmetleri
                            </h4>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-start">
                                <span className="bg-blue-100 text-blue-600 p-0.5 rounded-full mr-2 flex-shrink-0 mt-0.5">
                                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </span>
                                <span>Kısa ve uzun dönem konaklama</span>
                              </li>
                              <li className="flex items-start">
                                <span className="bg-blue-100 text-blue-600 p-0.5 rounded-full mr-2 flex-shrink-0 mt-0.5">
                                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </span>
                                <span>Mobilyalı/eşyasız opsiyonlar</span>
                              </li>
                              <li className="flex items-start">
                                <span className="bg-blue-100 text-blue-600 p-0.5 rounded-full mr-2 flex-shrink-0 mt-0.5">
                                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </span>
                                <span>Güvenli lokasyonlar</span>
                              </li>
                            </ul>
                          </div>
                          <div className="bg-white/80 rounded-xl p-4 shadow-sm">
                            <h4 className="font-bold text-blue-700 mb-3 flex items-center">
                              <span className="bg-blue-100 p-1.5 rounded-lg mr-2">
                                <Flag className="h-4 w-4 text-blue-600" />
                              </span>
                              Araç Kiralama
                            </h4>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-start">
                                <span className="bg-blue-100 text-blue-600 p-0.5 rounded-full mr-2 flex-shrink-0 mt-0.5">
                                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </span>
                                <span>Geniş araç portföyü</span>
                              </li>
                              <li className="flex items-start">
                                <span className="bg-blue-100 text-blue-600 p-0.5 rounded-full mr-2 flex-shrink-0 mt-0.5">
                                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </span>
                                <span>Esnek kiralama planları</span>
                              </li>
                              <li className="flex items-start">
                                <span className="bg-blue-100 text-blue-600 p-0.5 rounded-full mr-2 flex-shrink-0 mt-0.5">
                                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </span>
                                <span>7/24 yol yardımı</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                        
                        <Link href="/services">
                          <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium">
                            Konaklama ve Araç Hizmetleri
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
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
        <section className="py-16 bg-blue-700 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <RemoteImage 
              src={AIRPLANE_URL}
              fallbackUrl={AIRPORT_URL} 
              altText="ABD Vize Başvurusu" 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="container mx-auto px-4 relative z-10">
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