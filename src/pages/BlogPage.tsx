import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Language } from '../data/translations';
import { SEOHead } from '../components/SEOHead';
import { BLOG_POSTS } from '../data/blogData';
import { RIDING_DESTINATIONS } from '../data/images';
import {
  BookOpen,
  Search,
  Clock,
  User,
  ArrowRight,
  Compass,
} from 'lucide-react';

interface BlogPageProps {
  lang: Language;
}

export const BlogPage: React.FC<BlogPageProps> = ({ lang }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    'All',
    'Culinary & Dining',
    'Diving & Marine',
    'Sailing & Packing',
    'Scooter Guide',
    'Travel Tips',
    'Island Tours',
    'Car Charter',
  ];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const titleMatch = post.title[lang].toLowerCase().includes(searchTerm.toLowerCase());
    const excerptMatch = post.excerpt[lang].toLowerCase().includes(searchTerm.toLowerCase());
    const catMatch = selectedCategory === 'All' || post.category === selectedCategory;
    return (titleMatch || excerptMatch) && catMatch;
  });

  const featuredPost = BLOG_POSTS.find((p) => p.isFeatured) || BLOG_POSTS[0];
  const secondaryFeatured = BLOG_POSTS.filter((p) => p.id !== featuredPost.id).slice(0, 2);
  const isDefaultView = searchTerm === '' && selectedCategory === 'All';

  const pageTitle =
    lang === 'EN'
      ? 'Labuan Bajo Travel Guides | HelloBajo'
      : lang === 'ZH'
      ? '拉布安巴佐旅行指南与攻略 | HelloBajo'
      : 'Panduan Wisata & Travel Guides Labuan Bajo | HelloBajo';

  const pageDescription =
    lang === 'EN'
      ? 'Honest local tips, hidden routes, and complete travel guides for your Labuan Bajo adventure.'
      : lang === 'ZH'
      ? '真诚的本地建议、私藏路线与拉布安巴佐完整旅行指南。'
      : 'Tips lokal jujur, rute tersembunyi, dan panduan perjalanan lengkap untuk petualangan Labuan Bajo Anda.';

  const getReadArticleLabel = () => {
    if (lang === 'ZH') return '阅读文章';
    if (lang === 'ID') return 'Baca Artikel';
    return 'Read Article';
  };

  const getAuthorLabel = () => {
    if (lang === 'ID') return 'Oleh Tim HelloBajo';
    if (lang === 'ZH') return 'HelloBajo 团队';
    return 'By HelloBajo Team';
  };

  return (
    <div className="bg-[#FAF9F6] text-slate-800 min-h-screen pb-20">
      <SEOHead title={pageTitle} description={pageDescription} canonicalUrl="https://hellobajo.com/blog" />

      {/* 1. CLEAN HERO SECTION */}
      <section className="relative bg-stone-100/80 border-b border-stone-200/80 py-16 sm:py-20 overflow-hidden">
        {/* Soft background scenic image overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src={RIDING_DESTINATIONS.bukitCinta}
            alt="Labuan Bajo Sunset View"
            className="w-full h-full object-cover opacity-15 filter brightness-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-50/90 via-stone-50/80 to-[#FAF9F6]" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-bold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-teal-600" />
            <span>
              {lang === 'EN'
                ? 'Travel Guides & Insights'
                : lang === 'ZH'
                ? '旅行指南与本地攻略'
                : 'Panduan Wisata & Info Lokal'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            {lang === 'EN'
              ? 'Labuan Bajo Travel Guides'
              : lang === 'ZH'
              ? '拉布安巴佐旅行指南'
              : 'Panduan Wisata Labuan Bajo'}
          </h1>

          {/* User Requested Subtitle */}
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
            {lang === 'EN'
              ? 'Honest local tips, hidden routes, and complete travel guides for your Labuan Bajo adventure.'
              : lang === 'ZH'
              ? '真诚的本地建议、私藏路线与拉布安巴佐完整旅行指南。'
              : 'Tips lokal jujur, rute tersembunyi, dan panduan perjalanan lengkap untuk petualangan Labuan Bajo Anda.'}
          </p>
        </div>
      </section>

      {/* 2. FEATURED GUIDES (DEFAULT VIEW) */}
      {isDefaultView && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Main Featured Article (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200/90 shadow-lg hover:shadow-xl overflow-hidden flex flex-col justify-between transition-all group">
              <Link to={`/blog/${featuredPost.slug}`} className="block flex-1">
                <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                  <img
                    src={featuredPost.coverImage}
                    alt={featuredPost.title[lang]}
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                  <span className="absolute top-4 left-4 bg-teal-600 text-white font-extrabold text-xs px-3.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {featuredPost.category}
                  </span>

                  <div className="absolute bottom-4 left-4 right-4 text-white flex items-center justify-between text-xs font-semibold">
                    <span className="flex items-center gap-1.5 bg-slate-950/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
                      <User className="w-3.5 h-3.5 text-teal-400" />
                      <span>{getAuthorLabel()}</span>
                    </span>
                    <span className="flex items-center gap-1.5 bg-slate-950/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>{featuredPost.readTime}</span>
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-4">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug group-hover:text-teal-700 transition-colors">
                    {featuredPost.title[lang]}
                  </h2>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                    {featuredPost.content[lang].introParagraph
                      ? featuredPost.content[lang].introParagraph.slice(0, 220) + '...'
                      : featuredPost.excerpt[lang]}
                  </p>

                  {/* Highlights Checklist */}
                  {featuredPost.content[lang].toc && featuredPost.content[lang].toc.length > 0 && (
                    <div className="bg-stone-50/90 border border-stone-200/80 p-3.5 sm:p-4 rounded-2xl space-y-2">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-teal-800 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-teal-600" />
                        <span>{lang === 'EN' ? 'Key Topics Covered:' : lang === 'ZH' ? '包含主要主题：' : 'Topik Utama Artikel:'}</span>
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-700 font-medium">
                        {featuredPost.content[lang].toc.slice(0, 4).map((tocItem, i) => (
                          <li key={i} className="flex items-center gap-1.5 line-clamp-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-600 shrink-0" />
                            <span>{tocItem.replace(/^(\d+[\.\)]\s*)+/, '')}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {featuredPost.tags.map((tag) => (
                      <span key={tag} className="bg-stone-100 text-slate-600 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>

              {/* Single Clean Action Button */}
              <div className="p-6 sm:p-8 pt-0 border-t border-stone-100 mt-2 flex items-center justify-between">
                <Link
                  to={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-bold text-teal-700 group-hover:text-teal-800 transition-colors bg-teal-50 hover:bg-teal-100 px-4 py-2.5 rounded-xl border border-teal-200/80"
                >
                  <span>{getReadArticleLabel()}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Supporting Featured Stack (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              {secondaryFeatured.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="bg-white rounded-3xl border border-stone-200/90 shadow-md hover:shadow-xl p-5 sm:p-6 transition-all group flex flex-col justify-between h-full overflow-hidden"
                >
                  <div>
                    {/* Cover Image Thumbnail */}
                    <div className="relative aspect-[16/9] sm:aspect-[21/9] lg:aspect-[16/8] bg-slate-100 rounded-2xl overflow-hidden mb-4">
                      <img
                        src={post.coverImage}
                        alt={post.title[lang]}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                      <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-teal-800 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                        {post.category}
                      </span>
                      <span className="absolute bottom-2.5 right-3 text-[10px] text-white font-medium flex items-center gap-1 bg-slate-950/60 px-2.5 py-0.5 rounded-md backdrop-blur-xs">
                        <Clock className="w-3 h-3 text-teal-400" />
                        {post.readTime}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug group-hover:text-teal-700 transition-colors">
                        {post.title[lang]}
                      </h3>

                      <p className="text-slate-600 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                        {post.excerpt[lang]}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-stone-100 mt-4 flex items-center justify-between text-xs font-bold text-teal-700">
                    <span>{getReadArticleLabel()}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. SEARCH & CATEGORY FILTER BAR */}
      <section className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 ${isDefaultView ? 'mt-12' : '-mt-4'}`}>
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/90 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-stone-100 text-slate-600 hover:bg-stone-200/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={lang === 'EN' ? 'Search guides...' : lang === 'ZH' ? '搜索文章...' : 'Cari panduan...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
          </div>
        </div>
      </section>

      {/* 4. MAIN ARTICLES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {lang === 'EN' ? 'All Travel Guides' : lang === 'ZH' ? '所有旅行指南' : 'Semua Panduan Wisata'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              {lang === 'EN'
                ? `Showing ${filteredPosts.length} travel articles`
                : lang === 'ZH'
                ? `共 ${filteredPosts.length} 篇攻略指南`
                : `Menampilkan ${filteredPosts.length} artikel panduan`}
            </p>
          </div>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 space-y-3">
            <p className="text-slate-500 text-sm font-semibold">
              {lang === 'EN'
                ? 'No articles found matching your search term.'
                : lang === 'ZH'
                ? '未找到符合搜索条件的文章。'
                : 'Tidak ada artikel yang sesuai kata kunci pencarian Anda.'}
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 bg-teal-700 text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="bg-white rounded-3xl border border-stone-200/90 shadow-sm hover:shadow-xl overflow-hidden flex flex-col justify-between transition-all group cursor-pointer"
              >
                <div>
                  <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                    <img
                      src={post.coverImage}
                      alt={post.title[lang]}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-teal-800 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                      {post.category}
                    </span>

                    <span className="absolute bottom-2.5 right-3 text-[10px] text-white font-medium flex items-center gap-1 bg-slate-950/60 px-2.5 py-0.5 rounded-md backdrop-blur-xs">
                      <Clock className="w-3 h-3 text-teal-400" />
                      {post.readTime}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                      <User className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span>{getAuthorLabel()}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug group-hover:text-teal-700 transition-colors">
                      {post.title[lang]}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed font-normal">
                      {post.excerpt[lang]}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="bg-stone-100 text-slate-600 text-[10px] font-medium px-2.5 py-0.5 rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Footer with single clean action button */}
                <div className="p-6 pt-0 border-t border-stone-100 mt-3 flex items-center justify-between text-xs font-extrabold text-teal-700 group-hover:text-teal-800">
                  <span>{getReadArticleLabel()}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
