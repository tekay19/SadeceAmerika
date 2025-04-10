import { PublicLayout } from "@/components/layout/public-layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { PageTransition } from "@/components/ui/page-transition";
import { 
  Award, 
  Globe, 
  HeartHandshake, 
  History, 
  Users
} from "lucide-react";

// Görseller
import visa1Img from "../../assets/images/visa1.jpeg";
import visa2Img from "../../assets/images/visa2.jpeg";
import visa3Img from "../../assets/images/visa3.jpeg";
import visa4Img from "../../assets/images/visa4.jpeg";
import visa5Img from "../../assets/images/visa5.jpeg";
import usaFlagImg from "../../assets/images/usa_flag.jpg";
import logoImg from "../../assets/images/logo.jpg";

export default function AboutPage() {
  return (
    <PublicLayout>
      <PageTransition>
        {/* Hero */}
        <section className="relative py-28 overflow-hidden">
          {/* Background with animated gradient */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-800 via-indigo-700 to-blue-700">
              <div className="absolute inset-0 opacity-20">
                <img src={usaFlagImg} alt="ABD Bayrağı" className="w-full h-full object-cover" />
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
              <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-blue-500/20 blur-3xl"></div>
              <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-indigo-500/20 blur-3xl"></div>
            </div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Top badges */}
              <div className="flex justify-center mb-8 space-x-3">
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20 text-white">
                  <div className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></div>
                  <span className="text-sm font-medium">2025'den Beri</span>
                </div>
                <div className="hidden md:flex items-center bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20 text-white">
                  <Globe className="w-4 h-4 mr-2 text-blue-300" />
                  <span className="text-sm font-medium">Amerika & Türkiye</span>
                </div>
              </div>
              
              {/* Logo with animation */}
              <div className="mb-8">
                <div className="inline-block bg-white/20 p-3 rounded-full backdrop-blur-sm shadow-xl 
                  transition-transform duration-500 hover:scale-105 hover:shadow-blue-500/30">
                  <img 
                    src={logoImg} 
                    alt="Sadece Amerika Logo" 
                    className="h-20 w-auto"
                  />
                </div>
              </div>
              
              {/* Main Content */}
              <div className="text-center text-white">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                  <span className="block">Merhaba, Biz </span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                    Sadece Amerika'yız
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl mb-10 text-blue-100 leading-relaxed max-w-3xl mx-auto">
                  Amerika merkezli <span className="font-semibold text-white">Mese Consultancy</span>'nin 
                  Türkiye uzantısı olarak 2025 yılında Ankara'da kurulduk. Vize yolculuğunuzun her aşamasında
                  yanınızdayız.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <Link href="/contact">
                    <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 font-bold shadow-lg shadow-blue-900/30 px-8 py-6 text-base transition-all duration-300 hover:scale-105">
                      Bizimle İletişime Geçin
                      <HeartHandshake className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/services">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20 font-medium px-8 py-6 text-base backdrop-blur-sm">
                      Hizmetlerimizi İnceleyin
                      <Globe className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
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

        {/* Story Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-3">
                Hikayemiz
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Kuruluş <span className="text-blue-600">Hikayemiz</span>
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full mb-6"></div>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Amerika ve Türkiye arasında köprü kurarak vize süreçlerinizde yanınızda oluyoruz.
              </p>
            </div>
            
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2">
                <div className="relative group">
                  {/* Background blur effect */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition duration-1000"></div>
                  
                  {/* Main image with border */}
                  <div className="relative overflow-hidden rounded-xl border-2 border-white shadow-xl transform transition duration-500 group-hover:scale-[1.01]">
                    <img 
                      src={visa1Img} 
                      alt="Sadece Amerika ofisi"
                      className="w-full h-auto object-cover rounded-xl z-10"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
                    
                    {/* Badge */}
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg py-2 px-4 shadow-lg transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition duration-500">
                      <div className="flex items-center">
                        <History className="text-blue-600 mr-2" size={18} />
                        <span className="text-blue-800 font-semibold">2025'den beri hizmetinizdeyiz</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:w-1/2">
                <div className="space-y-6">
                  <div className="inline-flex items-center bg-blue-50 rounded-full py-1 px-4 text-blue-700 text-sm font-medium">
                    <History className="mr-2" size={16} />
                    2025'de Ankara'da Kurulduk
                  </div>
                  
                  <h3 className="text-3xl font-bold text-gray-800 leading-tight">
                    Türkiye ve Amerika arasında <span className="text-blue-600">güçlü bir köprü</span> oluşturuyoruz
                  </h3>
                  
                  <div className="space-y-4 text-gray-600 leading-relaxed">
                    <p className="text-lg">
                      <span className="font-semibold text-gray-800">Sadece Amerika</span>, Amerika merkezli "Mese Consultancy"nin Türkiye uzantısı olarak 2025 yılında Ankara'da kurulmuştur. Mese Consultancy, 2023 yılında Dallas, Texas'ta kurulmuş, ziyaretçilerden öğrencilere, yatırımcılardan göçmenlik planlaması yapan birey ve kurumlara kadar geniş bir yelpazeye hizmet sunan, Amerika Göçmenlik Hukuku alanında uzmanlaşmış bir danışmanlık kurumudur.
                    </p>
                    
                    <p className="text-lg">
                      Amacımız, Türkiye'de yaşayan vize başvurucularının Amerika Birleşik Devletleri'ne yönelik tüm vize işlemlerinde; vize başvurusundan başlayarak, Amerika'da şirket kurma, yerleşim süreci, eğitim ve yatırım planlaması gibi konularda <span className="font-semibold text-gray-800">doğru bilgi, derinlikli yönlendirme ve donanımlı avukat kadromuzla profesyonel destek</span> sunmaktır.
                    </p>
                    
                    <div className="border-l-4 border-blue-500 pl-4 italic bg-blue-50 p-4 rounded-r-lg">
                      "Vize başvurucularımızın süreçlerini en etkin, verimli ve stressiz şekilde tamamlamalarını sağlamak için çalışıyoruz. Ekibimiz, Amerika göçmenlik hukuku alanında 6 yıllık deneyime sahip hukuk profesyonellerinden oluşmaktadır."
                    </div>
                  </div>
                  
                  {/* Statistics */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                    <div>
                      <div className="text-3xl font-bold text-blue-600">6+</div>
                      <div className="text-sm text-gray-600">Yıllık Deneyim</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-blue-600">500+</div>
                      <div className="text-sm text-gray-600">Başarılı Başvuru</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-blue-600">2</div>
                      <div className="text-sm text-gray-600">Ülkede Ofis</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* İstanbul Ofislerimiz */}
        <section className="py-24 bg-gradient-to-r from-blue-50 to-indigo-50 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute left-0 top-0 w-64 h-64 bg-blue-100 rounded-full opacity-50 -ml-32 -mt-32"></div>
          <div className="absolute right-0 bottom-0 w-96 h-96 bg-indigo-100 rounded-full opacity-50 -mr-40 -mb-40"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-3">
                Fiziksel Mekanlarımız
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                İstanbul <span className="text-blue-600">Ofislerimiz</span>
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full mb-6"></div>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                İstanbul'daki merkez ofisimiz ve danışmanlık alanlarımızda sizlere en kaliteli hizmeti sunuyoruz.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Office 1 */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={visa2Img} 
                    alt="İstanbul Genel Merkezi" 
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 p-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="bg-white/90 backdrop-blur-sm text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                      Genel Merkez
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start mb-4">
                    <div className="bg-blue-100 text-blue-700 w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <div className="h-6 w-6 text-blue-700">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                        İstanbul, Bahçelievler Ofisi
                      </h3>
                      <p className="text-gray-500 text-sm">Sadece Amerika Genel Merkezi</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">
                    Tüm operasyonlarımızın yönetildiği merkez ofisimizde vize başvurularınızı profesyonel ekibimizle yönetiyoruz.
                  </p>
                  
                  <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      <span>Pazartesi - Cuma: 09:00 - 18:00</span>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      İletişim →
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Office 2 */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={visa3Img} 
                    alt="Toplantı ve Danışmanlık Alanı" 
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 p-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="bg-white/90 backdrop-blur-sm text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                      Danışmanlık Bölümü
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start mb-4">
                    <div className="bg-indigo-100 text-indigo-700 w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <div className="h-6 w-6 text-indigo-700">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">
                        Toplantı ve Danışmanlık Alanı
                      </h3>
                      <p className="text-gray-500 text-sm">Özel Görüşme Alanları</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">
                    Kişisel vize danışmanlığı, belge incelemesi ve başvuru stratejilerinizi konuşabileceğimiz özel toplantı alanlarımız.
                  </p>
                  
                  <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      <span>Randevu ile: 10:00 - 16:00</span>
                    </div>
                    <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                      Randevu Al →
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Office 3 */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={visa4Img} 
                    alt="İstanbul Bekleme Salonu" 
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 p-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="bg-white/90 backdrop-blur-sm text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                      Müşteri Alanı
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start mb-4">
                    <div className="bg-purple-100 text-purple-700 w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <div className="h-6 w-6 text-purple-700">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">
                        İstanbul Bekleme Salonu
                      </h3>
                      <p className="text-gray-500 text-sm">Konforlu Bekleme Alanı</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">
                    Danışmanlık randevunuzu beklerken konforlu bekleme salonumuzda güncel dergiler ve ikramlarımızdan yararlanabilirsiniz.
                  </p>
                  
                  <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      <span>Wi-Fi ve Ücretsiz İkramlar</span>
                    </div>
                    <button className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                      Tesis Bilgisi →
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Map Location Badge */}
            <div className="flex justify-center mt-12">
              <div className="inline-flex items-center bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
                <div className="bg-blue-100 text-blue-700 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">İstanbul, Bahçelievler</h4>
                  <p className="text-gray-500 text-sm">E-5 üzeri Metroport AVM yanı</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission and Values */}
        <section className="py-24 bg-gradient-to-r from-white to-blue-50 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute right-0 top-1/4 w-64 h-64 bg-blue-100 rounded-full opacity-30 -mr-32"></div>
          <div className="absolute left-0 bottom-1/4 w-96 h-96 bg-indigo-100 rounded-full opacity-30 -ml-40"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-3">
                Kurumsal Değerlerimiz
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                İlkeler ve <span className="text-blue-600">Değerlerimiz</span>
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full mb-6"></div>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Her başvuruyu bireysel olarak ele alıyor; güvenilir, şeffaf ve danışan odaklı yaklaşımımızla
                hedeflerinize ulaşmanız için güçlü bir rehberlik sunuyoruz.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {/* Value 1 - Güvenilirlik */}
              <div className="group bg-white rounded-xl shadow-md hover:shadow-xl p-6 transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
                {/* Background gradient (hidden by default, shows on hover) */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Icon */}
                <div className="relative z-10">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-md transform transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110">
                    <Globe size={32} className="text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">Güvenilirlik</h3>
                  
                  <p className="text-gray-600 mb-6 relative z-10">
                    Vize başvurucularına karşı Amerika Göçmenlik Hukuku'nu en doğru biçimde aktarıyor,
                    her adımda şeffaf bilgi ve yol haritası sunuyoruz.
                  </p>
                  
                  {/* Bottom indicator that appears on hover */}
                  <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300 rounded-full"></div>
                </div>
              </div>
              
              {/* Value 2 - Profesyonellik */}
              <div className="group bg-white rounded-xl shadow-md hover:shadow-xl p-6 transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
                {/* Background gradient (hidden by default, shows on hover) */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Icon */}
                <div className="relative z-10">
                  <div className="bg-gradient-to-br from-green-500 to-green-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-md transform transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110">
                    <HeartHandshake size={32} className="text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">Profesyonellik</h3>
                  
                  <p className="text-gray-600 mb-6 relative z-10">
                    6 yıllık Amerika göçmenlik hukuku deneyimiyle, her başvuruyu en yüksek standartlarda
                    ve titizlikle ele alıyoruz.
                  </p>
                  
                  {/* Bottom indicator that appears on hover */}
                  <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-300 rounded-full"></div>
                </div>
              </div>
              
              {/* Value 3 - Danışan Odaklılık */}
              <div className="group bg-white rounded-xl shadow-md hover:shadow-xl p-6 transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
                {/* Background gradient (hidden by default, shows on hover) */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Icon */}
                <div className="relative z-10">
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-md transform transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110">
                    <Users size={32} className="text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">Danışan Odaklılık</h3>
                  
                  <p className="text-gray-600 mb-6 relative z-10">
                    Danışanlarımızın bireysel hedeflerine ulaşabilmesi için onların özel eğitim ve iş geçmişine
                    uygun göçmenlik planı oluşturuyoruz.
                  </p>
                  
                  {/* Bottom indicator that appears on hover */}
                  <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-300 rounded-full"></div>
                </div>
              </div>
              
              {/* Value 4 - Sürekli Gelişim */}
              <div className="group bg-white rounded-xl shadow-md hover:shadow-xl p-6 transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
                {/* Background gradient (hidden by default, shows on hover) */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-amber-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Icon */}
                <div className="relative z-10">
                  <div className="bg-gradient-to-br from-amber-500 to-amber-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-md transform transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110">
                    <Award size={32} className="text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors">Sürekli Gelişim</h3>
                  
                  <p className="text-gray-600 mb-6 relative z-10">
                    Vize ve göçmenlik prosedürlerindeki güncel gelişmeleri yakından takip ederek,
                    hizmet kalitemizi sürekli artırıyoruz.
                  </p>
                  
                  {/* Bottom indicator that appears on hover */}
                  <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-300 rounded-full"></div>
                </div>
              </div>
            </div>
            
            {/* Testimonial Quote */}
            <div className="max-w-3xl mx-auto mt-16 bg-white p-8 rounded-2xl shadow-xl border border-gray-100 relative">
              <div className="absolute -top-5 -left-5 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-serif">
                "
              </div>
              
              <p className="text-xl italic text-gray-600 text-center leading-relaxed mb-6">
                Amerika'daki göçmenlik hukuku deneyimimiz ve Türkiye'deki kapsamlı hizmet ağımızla, 
                başvuru sahiplerinin hayallerine giden yolda en güvenilir köprü olmaya devam ediyoruz.
              </p>
              
              <div className="flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold mr-3">
                  MS
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Murat Şimşek</p>
                  <p className="text-gray-500 text-sm">Kurucu & Göçmenlik Danışmanı</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-gray-50">
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
                  <div className="w-40 h-40 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-2xl font-bold mx-auto">
                    MS
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
                  <div className="w-40 h-40 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-2xl font-bold mx-auto">
                    İK
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
                  <div className="w-40 h-40 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 text-2xl font-bold mx-auto">
                    TCS
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
                  <div className="w-40 h-40 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-700 text-2xl font-bold mx-auto">
                    SÇ
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

        {/* İstanbul Office Showcase */}
        <section className="py-24 bg-gradient-to-br from-indigo-50 via-blue-50 to-white relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute left-0 top-0 w-64 h-64 bg-indigo-100 rounded-full opacity-50 -ml-32 -mt-20"></div>
          <div className="absolute right-0 bottom-0 w-96 h-96 bg-blue-100 rounded-full opacity-50 -mr-48 -mb-24"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-3">
                Uluslararası İşbirliği
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                İstanbul'dan <span className="text-indigo-600">Amerika'ya</span>
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-indigo-500 to-blue-500 mx-auto rounded-full mb-6"></div>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                İki kıta arasında profesyonel bir köprü kurarak vize sürecinizi kolaylaştırıyoruz.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="space-y-6">
                  <div className="inline-flex items-center bg-indigo-50 rounded-full py-1 px-4 text-indigo-700 text-sm font-medium mb-2">
                    <Globe className="mr-2" size={16} />
                    Türkiye & Amerika İşbirliği
                  </div>
                  
                  <h3 className="text-3xl font-bold text-gray-800 leading-tight">
                    Vize süreciniz <span className="text-indigo-600">iki ülkede de</span> profesyonel ellerle yönetiliyor
                  </h3>
                  
                  <div className="space-y-4 text-gray-600 leading-relaxed">
                    <p className="text-lg">
                      İstanbul ofisimiz ile Amerika'daki ortaklarımız arasında güçlü bir iş birliği içerisinde çalışıyoruz. Bu sayede hem Amerika'daki işlemlerinizi hem de Türkiye'deki hazırlıklarınızı <span className="font-semibold text-gray-800">tek elden yönetebiliyoruz</span>.
                    </p>
                    
                    <p className="text-lg">
                      İstanbul Bahçelievler'deki merkez ofisimiz, göçmenlik hukuku alanında uzmanlaşmış danışmanlarımızın çalıştığı ve vize başvurularınızın tüm ön hazırlık işlemlerinin titizlikle yürütüldüğü yerdir.
                    </p>
                    
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-indigo-100">
                      <h4 className="font-bold text-indigo-700 mb-2 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-2">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        İşimizin Akışı
                      </h4>
                      <p className="text-gray-600">
                        İstanbul'da gerçekleştirilen ön görüşmeler ve hazırlık çalışmalarının ardından, dosyanız Amerika'daki ortaklarımız tarafından incelenerek vize başvuru süreciniz en doğru şekilde yönlendirilir.
                      </p>
                    </div>
                    
                    {/* Features list */}
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="flex items-start">
                        <div className="bg-indigo-100 rounded-full p-1 mr-3 mt-0.5">
                          <svg className="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700">7/24 İletişim</span>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-indigo-100 rounded-full p-1 mr-3 mt-0.5">
                          <svg className="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700">Çift Dil Desteği</span>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-indigo-100 rounded-full p-1 mr-3 mt-0.5">
                          <svg className="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700">Şeffaf Süreç</span>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-indigo-100 rounded-full p-1 mr-3 mt-0.5">
                          <svg className="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700">Hızlı Çözümler</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="order-1 lg:order-2 relative">
                <div className="relative group">
                  {/* Background blur effect */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition duration-1000"></div>
                  
                  {/* Main image with decorative elements */}
                  <div className="relative">
                    <div className="relative overflow-hidden rounded-xl border-2 border-white shadow-xl transform transition duration-500 group-hover:scale-[1.01]">
                      <img 
                        src={visa5Img} 
                        alt="İstanbul ofisi"
                        className="w-full h-auto object-cover rounded-xl z-10"
                      />
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
                    </div>
                    
                    {/* Decorative flag elements */}
                    <div className="absolute -top-6 -right-6 w-16 h-16 bg-white rounded-lg shadow-lg p-2 transform rotate-3">
                      <img src={usaFlagImg} alt="USA Flag" className="w-full h-full object-cover rounded" />
                    </div>
                    
                    {/* Stats badge */}
                    <div className="absolute -bottom-4 -left-4 bg-white/95 rounded-lg py-2 px-4 shadow-lg">
                      <div className="flex items-center">
                        <div className="text-3xl font-bold text-indigo-600 mr-3">2</div>
                        <div className="text-left">
                          <p className="font-medium text-gray-900">Ülke</p>
                          <p className="text-gray-500 text-xs">1 Süreç</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 relative overflow-hidden">
          {/* Background with animated gradient */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-800 via-indigo-700 to-blue-700">
              <div className="absolute inset-0 opacity-20">
                <img src={visa4Img} alt="Amerika vizesi" className="w-full h-full object-cover object-center" />
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
              <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-blue-500/20 blur-3xl"></div>
              <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-indigo-500/20 blur-3xl"></div>
            </div>
          </div>
          
          {/* Content */}
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-12 text-center">
                <div className="inline-flex items-center justify-center bg-white/20 rounded-full p-3 mb-8">
                  <img src={usaFlagImg} alt="ABD Bayrağı" className="h-12 w-auto rounded shadow-md" />
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  Amerika Hayaliniz İçin <br /> 
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                    Hazır mısınız?
                  </span>
                </h2>
                
                <p className="text-xl md:text-2xl mb-10 text-blue-100 leading-relaxed">
                  Sadece Amerika olarak, Türkiye'den Amerika'ya uzanan yolda, 
                  güvenilir çözüm ortağınız olmayı hedefliyoruz.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <Link href="/auth?mode=register">
                    <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 font-bold shadow-lg shadow-blue-900/30 px-8 py-6 text-base transition-all duration-300 hover:scale-105">
                      Hemen Başvuru Yapın
                      <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20 font-medium px-8 py-6 text-base backdrop-blur-sm">
                      İletişime Geçin
                      <HeartHandshake className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>
              
              {/* Stats and Trust signals */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-white mb-1">500+</div>
                  <div className="text-blue-100 text-sm">Başarılı Başvuru</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-white mb-1">6+</div>
                  <div className="text-blue-100 text-sm">Yıl Deneyim</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-white mb-1">7/24</div>
                  <div className="text-blue-100 text-sm">Destek</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-white mb-1">%98</div>
                  <div className="text-blue-100 text-sm">Müşteri Memnuniyeti</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </PageTransition>
    </PublicLayout>
  );
}