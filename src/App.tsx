import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Language, translations } from './data/translations';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { CarsPage } from './pages/CarsPage';
import { BoatsPage } from './pages/BoatsPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';

export default function App() {
  const [lang, setLang] = useState<Language>('EN');
  const t = translations[lang];

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#faf8f5] selection:bg-teal-500 selection:text-white font-sans text-slate-800 overflow-x-clip">
        {/* 1. Global Header Navigation */}
        <Header lang={lang} onLanguageChange={setLang} t={t} />

        {/* 2. Main Page Content Routes */}
        <main className="flex-grow pt-16 sm:pt-20">
          <Routes>
            <Route path="/" element={<HomePage lang={lang} t={t} />} />
            <Route path="/cars" element={<CarsPage lang={lang} />} />
            <Route path="/boats" element={<BoatsPage lang={lang} />} />
            <Route path="/blog" element={<BlogPage lang={lang} />} />
            <Route path="/blog/:slug" element={<BlogPostPage lang={lang} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* 3. Global Footer */}
        <Footer t={t} lang={lang} />

        {/* 4. Global Floating WhatsApp Action Button */}
        <FloatingWhatsApp lang={lang} />
      </div>
    </BrowserRouter>
  );
}
