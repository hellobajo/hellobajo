import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Language } from '../data/translations';
import { SEOHead } from '../components/SEOHead';
import { BLOG_POSTS } from '../data/blogData';
import { BookOpen, Search, Clock, Tag, User, ArrowRight, Bike } from 'lucide-react';

interface BlogPageProps {
  lang: Language;
}

export const BlogPage: React.FC<BlogPageProps> = ({ lang }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = ['All', 'Scooter Guide', 'Travel Tips', 'Island Tours'];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const titleMatch = post.title[lang].toLowerCase().includes(searchTerm.toLowerCase());
    const excerptMatch = post.excerpt[lang].toLowerCase().includes(searchTerm.toLowerCase());
    const catMatch = selectedCategory === 'All' || post.category === selectedCategory;
    return (titleMatch || excerptMatch) && catMatch;
  });

  const pageTitle =
    lang === 'EN'
      ? 'Labuan Bajo Travel Guides & Scooter Rental Articles | HelloBajo'
      : lang === 'ZH'
      ? '拉布安巴佐旅游攻略与摩托车骑行指南 | HelloBajo'
      : 'Panduan Wisata Labuan Bajo & Tips Sewa Motor | HelloBajo';

  const pageDescription =
    lang === 'EN'
      ? 'Explore local travel guides, scooter riding tips, airport pickup rules, and route itineraries for Labuan Bajo, Komodo National Park & Flores.'
      : lang === 'ZH'
      ? '探索拉布安巴佐本地旅游攻略、摩托车骑行技巧、科莫多国家公园岛屿打卡及机场交接规则。'
      : 'Kumpulan artikel dan panduan wisata Labuan Bajo: rute motor pesisir Golo Mori, tips sewa motor tanpa deposit, dan perbandingan tour Komodo.';

  return (
    <div className="bg-[#faf8f5] text-slate-800 pt-6 pb-16">
      <SEOHead
        title={pageTitle}
        description={pageDescription}
        canonicalUrl="https://hellobajo.com/blog"
      />

      {/* Hero Header */}
      <section className="bg-slate-900 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/20 border border-teal-400/40 text-teal-300 text-xs font-bold uppercase tracking-widest">
            <BookOpen className="w-4 h-4" />
            <span>{lang === 'EN' ? 'LABUAN BAJO TRAVEL GUIDES' : lang === 'ZH' ? '拉布安巴佐旅游攻略' : 'PANDUAN WISATA LABUAN BAJO'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            {lang === 'EN' ? 'Insider Guides, Routes & Travel Tips' : lang === 'ZH' ? '本地攻略 · 路线指南 · 租车技巧' : 'Panduan Rute Wisata & Tips Berkendara'}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            {lang === 'EN'
              ? 'Everything you need to plan a memorable trip to Labuan Bajo, Komodo Island, and Flores overland on two wheels.'
              : lang === 'ZH'
              ? '助您轻松规划拉布安巴佐、科莫多国家公园与弗洛雷斯骑行之旅的宝藏攻略。'
              : 'Informasi terlengkap rute motor, destinasi wisata, dan tips liburan hemat di Labuan Bajo.'}
          </p>
        </div>
      </section>

      {/* Search & Category Filter Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-stone-200/90 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'bg-stone-100 text-slate-600 hover:bg-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={lang === 'EN' ? 'Search articles...' : lang === 'ZH' ? '搜索攻略...' : 'Cari artikel...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

        </div>
      </section>

      {/* Blog Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200">
            <p className="text-slate-500 text-sm">
              {lang === 'EN' ? 'No articles found matching your search.' : lang === 'ZH' ? '未找到符合条件的文章。' : 'Tidak ada artikel yang sesuai pencarian.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-3xl border border-stone-200/90 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all group"
              >
                <div>
                  <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                    <img
                      src={post.coverImage}
                      alt={post.title[lang]}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-teal-300 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5" />
                        <span>{post.author}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{post.readTime}</span>
                      </span>
                    </div>

                    <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug group-hover:text-teal-600 transition-colors">
                      <Link to={`/blog/${post.slug}`}>{post.title[lang]}</Link>
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {post.excerpt[lang]}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {post.tags.map((tag) => (
                        <span key={tag} className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-stone-100 mt-4">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-extrabold text-teal-600 hover:text-teal-700 transition-colors"
                  >
                    <span>{lang === 'EN' ? 'Read Full Article' : lang === 'ZH' ? '阅读完整攻略' : 'Baca Artikel Lengkap'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* CTA Banner: Rent Scooter */}
        <div className="mt-16 bg-slate-900 text-white p-8 sm:p-12 rounded-3xl border border-slate-800 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left max-w-xl">
            <div className="inline-flex items-center gap-2 text-teal-400 font-bold text-xs uppercase tracking-widest">
              <Bike className="w-4 h-4" />
              <span>READY TO RIDE LABUAN BAJO?</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold">
              {lang === 'EN' ? 'Rent Your Scooter with Zero Deposit Today' : lang === 'ZH' ? '今日即可免押金预订您的专属坐骑' : 'Sewa Motor Tanpa Deposit Sekarang'}
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm">
              {lang === 'EN'
                ? 'Delivery to Komodo International Airport (LBJ) & hotels (Rp 20k staff fee), clean helmets included.'
                : lang === 'ZH'
                ? '科莫多国际机场 (LBJ) 专人送车 (Rp 20k/次)，配清洁双头盔与雨衣。'
                : 'Antar jemput ke Bandara Komodo (LBJ) & hotel (biaya petugas Rp 20rb).'}
            </p>
          </div>

          <Link
            to="/"
            className="px-8 py-4 bg-teal-600 hover:bg-teal-500 text-white font-extrabold text-sm rounded-full shadow-lg transition-all shrink-0"
          >
            {lang === 'EN' ? 'Book Scooter from Rp 100k' : lang === 'ZH' ? '从 Rp 100k 起预订' : 'Sewa Motor Mulai Rp 100k'}
          </Link>
        </div>

      </section>
    </div>
  );
};
