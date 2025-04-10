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
  Building2,
  FileText,
  CalendarCheck
} from "lucide-react";
import { RemoteImage } from "@/components/ui/remote-image";

// Vize formları ve pasaport resimleri
import {
  VISA_STAMP_URL,
  VISA_FORM_URL,
  PASSPORT_DOCUMENTS_URL,
  PASSPORT_WITH_FLAG_URL,
  CITY_LIFE_URL,
  NEW_YORK_URL,
  GOLDEN_GATE_URL,
  STATUE_OF_LIBERTY_URL,
  DIVERSE_PEOPLE_URL,
  BUSINESS_MEETING_URL,
  GRAND_CANYON_URL,
  AIRPORT_URL,
  AIRPLANE_URL
} from "@/lib/image-constants";

// Konaklama ve yatırım görselleri için URL
const APARTMENT_URL = "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1000&auto=format&fit=crop";
const INVESTMENT_URL = "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=1000&auto=format&fit=crop";

export default function ServicesPage() {
  return (
    <PublicLayout>
      <PageTransition>
        {/* Hero */}
        <section className="relative py-28 overflow-hidden">
          <div className="absolute inset-0 z-0">
            {/* Parallax background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-800 via-blue-700 to-indigo-800">
              <div className="absolute inset-0 opacity-20">
                <RemoteImage 
                  src={STATUE_OF_LIBERTY_URL}
                  fallbackUrl={NEW_YORK_URL}
                  altText="Amerika Vize Hizmetleri"
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
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Top badges */}
              <div className="flex justify-center mb-8 space-x-3">
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20 text-white">
                  <div className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></div>
                  <span className="text-sm font-medium">%94 Başarı Oranı</span>
                </div>
                <div className="hidden md:flex items-center bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20 text-white">
                  <Globe className="w-4 h-4 mr-2 text-blue-300" />
                  <span className="text-sm font-medium">Tüm Vize Türleri</span>
                </div>
              </div>
            
              {/* Main content with staggered animation */}
              <div className="text-center text-white">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                  <span className="block">Profesyonel </span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                    Vize Hizmetlerimiz
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl mb-10 text-blue-100 leading-relaxed max-w-3xl mx-auto">
                  Amerika merkezli 
                  <span className="font-semibold text-white"> Mese Consultancy</span>'nin 
                  Türkiye uzantısı olarak, göçmenlik hukuku alanındaki tecrübemizle vize başvurunuzu
                  başarıyla tamamlamanıza yardımcı oluyoruz.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <Link href="/auth?mode=register">
                    <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 font-bold shadow-lg shadow-blue-900/30 px-8 py-6 text-base transition-all duration-300 hover:scale-105">
                      Hemen Başvur
                      <Plane className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20 font-medium px-8 py-6 text-base backdrop-blur-sm">
                      İletişime Geçin
                      <MessagesSquare className="ml-2 h-5 w-5" />
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

        {/* Visa Services */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-3">
                Uzman Danışmanlık
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                ABD Vize <span className="text-blue-600">Kategorileri</span>
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full mb-6"></div>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Geniş deneyimimizle her türlü Amerika Birleşik Devletleri vize başvurusunda
                <span className="font-medium text-gray-800"> profesyonel destek </span> sağlıyoruz.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
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
        <section className="py-24 bg-gradient-to-r from-blue-50 to-indigo-50 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute left-0 top-0 w-64 h-64 bg-blue-100 rounded-full -ml-20 -mt-20 opacity-50"></div>
          <div className="absolute right-0 bottom-0 w-96 h-96 bg-indigo-100 rounded-full -mr-40 -mb-40 opacity-50"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-3">
                Kolay & Profesyonel
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Başvuru <span className="text-blue-600">Süreci</span>
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full mb-6"></div>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Vize başvuru sürecinizi sizin için kolaylaştırıyoruz. Adım adım rehberlikle
                endişesiz bir deneyim sunuyoruz.
              </p>
            </div>
            
            <div className="max-w-5xl mx-auto">
              {/* Process Steps */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative group">
                  {/* Number step */}
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold shadow-md group-hover:scale-110 transition-transform duration-300">
                    1
                  </div>
                  
                  {/* Connection line */}
                  <div className="hidden lg:block absolute h-0.5 bg-gradient-to-r from-blue-300 to-blue-200 right-0 top-10 w-full -mr-4 transform translate-x-1/2 z-0"></div>
                  
                  <div className="text-center mt-6">
                    <div className="bg-blue-100 text-blue-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Users size={28} />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-800">Üyelik Oluşturma</h3>
                    <p className="text-gray-600">
                      Sistemimize üye olarak vize başvuru sürecinizi başlatın ve profesyonel danışmanlık hizmetlerimizden faydalanın.
                    </p>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative group">
                  {/* Number step */}
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold shadow-md group-hover:scale-110 transition-transform duration-300">
                    2
                  </div>
                  
                  {/* Connection line */}
                  <div className="hidden lg:block absolute h-0.5 bg-gradient-to-r from-blue-300 to-blue-200 right-0 top-10 w-full -mr-4 transform translate-x-1/2 z-0"></div>
                  
                  <div className="text-center mt-6">
                    <div className="bg-blue-100 text-blue-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <FileText size={28} />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-800">Bilgi ve Belge Girişi</h3>
                    <p className="text-gray-600">
                      Vize başvurunuz için gerekli tüm bilgi ve belgeleri güvenli sistemimize yükleyin ve başvurunuzu tamamlayın.
                    </p>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative group">
                  {/* Number step */}
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold shadow-md group-hover:scale-110 transition-transform duration-300">
                    3
                  </div>
                  
                  {/* Connection line */}
                  <div className="hidden lg:block absolute h-0.5 bg-gradient-to-r from-blue-300 to-blue-200 right-0 top-10 w-full -mr-4 transform translate-x-1/2 z-0"></div>
                  
                  <div className="text-center mt-6">
                    <div className="bg-blue-100 text-blue-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <GraduationCap size={28} />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-800">Uzman İncelemesi</h3>
                    <p className="text-gray-600">
                      Göçmenlik hukuku uzmanlarımız başvurunuzu detaylı şekilde inceleyip gerekli düzeltmeleri yapar ve stratejik öneriler sunar.
                    </p>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative group">
                  {/* Number step */}
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold shadow-md group-hover:scale-110 transition-transform duration-300">
                    4
                  </div>
                  
                  <div className="text-center mt-6">
                    <div className="bg-blue-100 text-blue-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <CalendarCheck size={28} />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-800">Vize Mülakatı ve Takip</h3>
                    <p className="text-gray-600">
                      Büyükelçilik randevunuzu organize eder, mülakat hazırlığı sağlar ve başvuru sürecinizi adım adım takip ederiz.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Call to Action */}
              <div className="text-center mt-16">
                <Link href="/auth?mode=register">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium shadow-lg shadow-blue-300/30 px-8">
                    Hemen Başvuruya Başlayın
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Investor Visa Special Section */}
        <section className="py-24 bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute left-0 top-20 w-72 h-72 bg-gradient-to-br from-purple-200 to-purple-300/30 rounded-full -ml-20 opacity-70 blur-2xl"></div>
          <div className="absolute right-0 bottom-20 w-96 h-96 bg-gradient-to-br from-indigo-200 to-blue-200/30 rounded-full -mr-40 opacity-70 blur-2xl"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-3">
                Özel Hizmet
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 bg-clip-text text-transparent mb-4">
                Amerika'da Yatırımcı Olarak Yaşam
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto rounded-full mb-6"></div>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Yatırımcı vizeleri ile ABD'de iş kurma, yaşama ve çalışma fırsatlarından yararlanın.
                Ailenizle birlikte Amerika'da yeni bir hayata başlayın.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="text-3xl font-bold mb-6">Amerika'da Yatırımcı Vizesi ile Yaşamak ve İş Kurmak</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Amerika, yatırım yapmak isteyen yabancı girişimcilere özel yatırımcı vizesi seçenekleri sunar. 
                  Bu vizeler, ABD'de iş kurmak, yaşamak, çalışmak ve aileyle birlikte uzun süreli olarak ikamet 
                  etmek isteyenler için ideal bir fırsattır.
                </p>
                
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">🎯 Yatırımcı Vizeleri Kimler İçin Uygun?</h3>
                  <ul className="space-y-2 pl-5">
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">✓</span>
                      <span>Amerika'da yeni bir iş kurmak isteyen girişimciler</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">✓</span>
                      <span>Mevcut bir işletmeyi satın alarak yönetmek isteyen yatırımcılar</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">✓</span>
                      <span>ABD'de uzun vadeli yaşamak isteyen aileler</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">✓</span>
                      <span>Ticaret hayatını Amerika'ya taşımayı hedefleyen profesyoneller</span>
                    </li>
                  </ul>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">📌 Yatırımcıdan Beklenen Temel Şartlar</h3>
                  <ul className="space-y-2 pl-5">
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">✓</span>
                      <span>Gerçek bir işletmeye yatırım yapılmalı</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">✓</span>
                      <span>Yatırım aktif ve sürdürülebilir bir ticari faaliyet olmalı</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">✓</span>
                      <span>Yatırımcı, işletmenin yönetiminde aktif rol almalı</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">✓</span>
                      <span>İşletme, istihdam sağlamaya uygun yapıda olmalı</span>
                    </li>
                  </ul>
                </div>
                
                <div className="flex space-x-4">
                  <Link href="/auth?mode=register">
                    <Button className="bg-purple-600 hover:bg-purple-700">Başvuru Yap</Button>
                  </Link>
                  <Link href="/auth?mode=register">
                    <Button variant="outline" className="border-purple-600 text-purple-700 hover:bg-purple-50">Detaylı Bilgi Al</Button>
                  </Link>
                </div>
              </div>
              
              <div className="order-1 lg:order-2 mb-8 lg:mb-0">
                <div className="relative">
                  <div className="rounded-lg overflow-hidden shadow-xl">
                    <RemoteImage 
                      src={INVESTMENT_URL}
                      fallbackUrl={BUSINESS_MEETING_URL}
                      altText="Amerika'da Yatırımcı Vizesi" 
                      className="w-full h-[500px] object-cover" 
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg w-48">
                    <div className="flex items-center">
                      <div className="bg-purple-100 text-purple-700 w-12 h-12 rounded-full flex items-center justify-center mr-3">
                        <Landmark size={24} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">E-2 Yatırımcı Vizesi</h4>
                        <p className="text-xs text-gray-500">5 yıla kadar geçerli</p>
                      </div>
                    </div>
                  </div>
                </div>
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
                <div className="h-48 relative overflow-hidden">
                  <RemoteImage 
                    src={BUSINESS_MEETING_URL} 
                    fallbackUrl={DIVERSE_PEOPLE_URL}
                    altText="Green Card Entegrasyon" 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">Yeni Hizmet</span>
                  </div>
                </div>
                
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
                <div className="h-48 relative overflow-hidden">
                  <RemoteImage 
                    src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1000&auto=format&fit=crop" 
                    fallbackUrl={CITY_LIFE_URL}
                    altText="Konaklama ve Araç Kiralama" 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">Popüler</span>
                  </div>
                </div>
                
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