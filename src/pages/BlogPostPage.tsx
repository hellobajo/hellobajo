import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Language } from '../data/translations';
import { SEOHead } from '../components/SEOHead';
import { BLOG_POSTS } from '../data/blogData';
import { SITE_CONFIG } from '../data/siteConfig';
import { BookOpen, Clock, User, ArrowLeft, Bike, MessageCircle, Share2, CheckCircle } from 'lucide-react';

interface BlogPostPageProps {
  lang: Language;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ lang }) => {
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-4">
        <h1 className="text-3xl font-extrabold text-slate-900">Article Not Found</h1>
        <p className="text-slate-600 text-sm">The travel article you are looking for does not exist or has been moved.</p>
        <Link to="/blog" className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white font-bold rounded-full text-xs">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Travel Guides</span>
        </Link>
      </div>
    );
  }

  const postContent = post.content[lang];

  // Schema.org Article Structured Data
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title[lang],
    description: post.excerpt[lang],
    image: post.coverImage,
    author: {
      '@type': 'Organization',
      name: 'HelloBajo Scooter Rental',
      url: 'https://hellobajo.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'HelloBajo',
      logo: {
        '@type': 'ImageObject',
        url: 'https://hellobajo.com/logo.png',
      },
    },
    datePublished: '2026-08-01',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://hellobajo.com/blog/${post.slug}`,
    },
  };

  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    lang === 'EN'
      ? `Hi HelloBajo! I read your article "${post.title.EN}" and I want to rent a scooter.`
      : `Halo HelloBajo! Saya baca artikel "${post.title.ID}" dan mau tanya sewa motor.`
  )}`;

  return (
    <div className="bg-[#faf8f5] text-slate-800 pt-6 pb-20">
      <SEOHead
        title={`${post.title[lang]} | HelloBajo Travel Guides`}
        description={post.excerpt[lang]}
        canonicalUrl={`https://hellobajo.com/blog/${post.slug}`}
        ogImage={post.coverImage}
        ogType="article"
        schema={articleSchema}
      />

      {/* Article Header & Cover */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation Breadcrumb */}
        <div className="pt-4 flex items-center justify-between text-xs text-slate-500 font-semibold">
          <Link to="/blog" className="inline-flex items-center gap-1.5 hover:text-teal-600 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>{lang === 'EN' ? 'Back to All Guides' : lang === 'ZH' ? '返回所有攻略' : 'Kembali ke Semua Artikel'}</span>
          </Link>
          <span className="bg-teal-50 text-teal-700 px-2.5 py-0.5 rounded-md font-bold uppercase tracking-wider text-[10px]">
            {post.category}
          </span>
        </div>

        {/* Title & Metadata */}
        <div className="space-y-4">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {post.title[lang]}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium pt-2 border-b border-stone-200 pb-4">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-teal-600" />
              <strong className="text-slate-800">{post.author}</strong>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-teal-600" />
              <span>{post.readTime}</span>
            </span>
            <span>•</span>
            <span>{post.publishDate}</span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-slate-900 aspect-[16/9]">
          <img src={post.coverImage} alt={post.title[lang]} className="w-full h-full object-cover" />
        </div>

        {/* Article Body + Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Article Content */}
          <div className="lg:col-span-8 space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
            
            {/* Table of Contents Accordion Card */}
            {postContent.toc && postContent.toc.length > 0 && (
              <div className="bg-stone-100/80 p-5 rounded-2xl border border-stone-200">
                <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-teal-600" />
                  <span>{lang === 'EN' ? 'Table of Contents' : lang === 'ZH' ? '本文目录' : 'Daftar Isi Artikel'}</span>
                </h3>
                <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                  {postContent.toc.map((heading, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-teal-600 font-bold">{idx + 1}.</span>
                      <span>{heading}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Paragraphs */}
            {postContent.paragraphs.map((pText, i) => (
              <p key={i} className="text-slate-700 font-normal leading-relaxed">
                {pText}
              </p>
            ))}

            {/* Callout Note Box */}
            {postContent.calloutNote && (
              <div className="bg-teal-50 border-l-4 border-teal-600 p-5 rounded-r-2xl space-y-2">
                <div className="flex items-center gap-2 text-teal-800 font-bold text-sm">
                  <CheckCircle className="w-4 h-4 text-teal-600" />
                  <span>{lang === 'EN' ? 'Local Insider Tip' : lang === 'ZH' ? '本地骑行建议' : 'Tips Lokal'}</span>
                </div>
                <p className="text-xs sm:text-sm text-teal-900 font-medium">
                  {postContent.calloutNote}
                </p>
              </div>
            )}

            {/* Author Signoff */}
            <div className="pt-6 border-t border-stone-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-600 text-white font-extrabold flex items-center justify-center text-sm shadow-md">
                  HB
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">HelloBajo Editorial Team</h4>
                  <p className="text-[11px] text-slate-500">Labuan Bajo Local Scooter & Travel Experts</p>
                </div>
              </div>
            </div>

          </div>

          {/* Sticky Sidebar CTA Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-24 bg-white p-6 rounded-3xl border border-stone-200 shadow-xl space-y-4 text-center">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto">
                <Bike className="w-6 h-6" />
              </div>

              <h3 className="text-lg font-extrabold text-slate-900">
                {lang === 'EN' ? 'Need a Scooter in Labuan Bajo?' : lang === 'ZH' ? '要在拉布安巴佐租摩托车吗？' : 'Sewa Motor di Labuan Bajo'}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                {lang === 'EN'
                  ? 'Easy airport LBJ pickup (Rp 20k fee), zero security deposit, clean helmets & 24/7 roadside assistance.'
                  : lang === 'ZH'
                  ? '机场 LBJ 专人打卡送车 (Rp 20k/次)，零押金，送双头盔与雨衣。'
                  : 'Bebas deposit, antar jemput ke Bandara Komodo (biaya petugas Rp 20rb), helm bersih, & respon WhatsApp cepat.'}
              </p>

              <div className="bg-slate-50 p-3 rounded-xl text-xs font-extrabold text-teal-700">
                {lang === 'EN' ? 'Daily Rates from Rp 100,000' : lang === 'ZH' ? '日租金 Rp 100,000 起' : 'Harga Sewa Mulai Rp 100rb / Hari'}
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-teal-600 hover:bg-teal-500 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white text-teal-600" />
                <span>{lang === 'EN' ? 'Book via WhatsApp' : lang === 'ZH' ? 'WhatsApp 立即预订' : 'Sewa via WhatsApp'}</span>
              </a>

              <Link to="/" className="block text-xs font-bold text-slate-500 hover:text-teal-600 transition-colors pt-1">
                {lang === 'EN' ? 'Explore Our Scooter Fleet' : lang === 'ZH' ? '查看所有车型与规格' : 'Lihat Pilihan Motor Kami'}
              </Link>
            </div>
          </div>

        </div>

      </article>
    </div>
  );
};
