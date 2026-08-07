import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Language } from '../data/translations';
import { SEOHead } from '../components/SEOHead';
import { BLOG_POSTS } from '../data/blogData';
import { SITE_CONFIG } from '../data/siteConfig';
import {
  BookOpen,
  Clock,
  ArrowLeft,
  MessageCircle,
  CheckCircle2,
  Camera,
  Compass,
  Ship,
  Car,
  Bike,
} from 'lucide-react';

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
      <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-4">
        <h1 className="text-3xl font-extrabold text-slate-900">Article Not Found</h1>
        <p className="text-slate-600 text-sm">The travel guide you are looking for does not exist or has been moved.</p>
        <Link to="/blog" className="inline-flex items-center gap-2 px-6 py-3 bg-teal-700 text-white font-bold rounded-full text-xs">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Travel Guides</span>
        </Link>
      </div>
    );
  }

  const postContent = post.content[lang];

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title[lang],
    description: post.excerpt[lang],
    image: post.coverImage,
    author: {
      '@type': 'Organization',
      name: 'HelloBajo Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'HelloBajo',
      logo: {
        '@type': 'ImageObject',
        url: 'https://hellobajo.com/logo.png',
      },
    },
    datePublished: post.publishDate || '2026-08-01',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://hellobajo.com/blog/${post.slug}`,
    },
  };

  const renderFormattedText = (text: string) => {
    if (!text) return null;
    const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      const label = match[1];
      const url = match[2];
      if (url.startsWith('/')) {
        parts.push(
          <Link
            key={match.index}
            to={url}
            className="text-teal-700 hover:text-teal-800 font-extrabold underline decoration-teal-500/40 hover:decoration-teal-600 transition-colors inline-flex items-center gap-0.5"
          >
            <span>{label}</span>
          </Link>
        );
      } else {
        parts.push(
          <a
            key={match.index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-700 hover:text-teal-800 font-extrabold underline decoration-teal-500/40 hover:decoration-teal-600 transition-colors"
          >
            {label}
          </a>
        );
      }
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  const whatsappMessage =
    lang === 'EN'
      ? `Hi HelloBajo! I am reading "${post.title.EN}" and I would like to ask a few questions.`
      : lang === 'ZH'
      ? `你好 HelloBajo！我正在阅读《${post.title.ZH}》，想咨询一些行程细节。`
      : `Halo HelloBajo! Saya sedang membaca "${post.title.ID}" dan ingin berkonsultasi seputar perjalanan.`;

  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  // Smart single closing CTA generator based on category/topic
  const getClosingCta = () => {
    const category = post.category;

    if (category === 'Scooter Guide' || category === 'Road Safety') {
      return {
        icon: <Bike className="w-6 h-6 text-teal-700" />,
        title:
          lang === 'EN'
            ? 'Ready to Explore Labuan Bajo on Two Wheels?'
            : lang === 'ZH'
            ? '准备好开启拉布安巴佐骑行之旅了吗？'
            : 'Siap Jelajahi Labuan Bajo dengan Motor?',
        desc:
          lang === 'EN'
            ? 'Browse our fleet of modern automatic scooters with zero deposit, clean SNI helmets, and free Komodo Airport delivery.'
            : lang === 'ZH'
            ? '浏览我们的最新自动挡摩托车车队，享受零押金、包含头盔与科莫多机场免费送车。'
            : 'Pilih armada motor matic terbaru kami dengan bebas deposit, helm SNI bersih, dan antar-jemput gratis di bandara.',
        btnLabel:
          lang === 'EN'
            ? 'Explore Our Scooter Fleet'
            : lang === 'ZH'
            ? '查看我们的摩托车车队'
            : 'Lihat Armada Motor Kami',
        link: '/#fleet',
        isExternal: false,
      };
    }

    if (category === 'Car Charter') {
      return {
        icon: <Car className="w-6 h-6 text-teal-700" />,
        title:
          lang === 'EN'
            ? 'Planning a Family or Group Trip in Flores?'
            : lang === 'ZH'
            ? '规划全家或团队弗洛雷斯出行？'
            : 'Rencanakan Liburan Keluarga di Flores?',
        desc:
          lang === 'EN'
            ? 'Book a comfortable 7-seater AC car charter with a friendly local driver, full fuel, and flexible hotel/airport transfers.'
            : lang === 'ZH'
            ? '预订舒适双重冷气 7 座包车，配专职本地司机、全包油费与无忧机场接送。'
            : 'Pesan mobil 7-seater AC dingin dengan driver lokal berpengalaman, BBM penuh, dan jemputan bandara.',
        btnLabel:
          lang === 'EN'
            ? 'Book Private Car Charter'
            : lang === 'ZH'
            ? '预订包车与私人司机'
            : 'Sewa Mobil & Driver Private',
        link: '/cars',
        isExternal: false,
      };
    }

    if (post.id === 'post-diving') {
      return {
        icon: <Bike className="w-6 h-6 text-teal-700" />,
        title:
          lang === 'EN'
            ? 'Need Easy Transport Around Labuan Bajo?'
            : lang === 'ZH'
            ? '在拉布安巴佐需要便捷的陆地交通吗？'
            : 'Butuh Transportasi Darat Praktis di Labuan Bajo?',
        desc:
          lang === 'EN'
            ? 'Rent a well-maintained automatic scooter with HelloBajo for easy rides between your hotel, local dive centers, and sunset viewpoints.'
            : lang === 'ZH'
            ? '在 HelloBajo 租用优质踏板摩托车，轻松往返于酒店、本地潜店与落日观景点之间。'
            : 'Sewa motor matic terawat di HelloBajo untuk kemudahan bepergian antara hotel, dive shop lokal, dan spot sunset.',
        btnLabel:
          lang === 'EN'
            ? 'Rent a Scooter with HelloBajo'
            : lang === 'ZH'
            ? '预订 HelloBajo 摩托车'
            : 'Sewa Motor di HelloBajo',
        link: '/',
        isExternal: false,
      };
    }

    if (category === 'Island Tours' || category === 'Sailing & Packing') {
      return {
        icon: <Ship className="w-6 h-6 text-teal-700" />,
        title:
          lang === 'EN'
            ? 'Ready for Your Komodo Island Hopping Cruise?'
            : lang === 'ZH'
            ? '准备好开启科莫多出海跳岛之旅了吗？'
            : 'Siap Tour Island Hopping Komodo?',
        desc:
          lang === 'EN'
            ? 'Compare 1-day high-speed boat packages or luxury Phinisi liveaboard cruises for an unforgettable Komodo adventure.'
            : lang === 'ZH'
            ? '对比 1 天高速快艇一日游与 3天2晚 豪华 Phinisi 木质帆船出海行程。'
            : 'Pilih paket speedboat 1 hari atau kapal Phinisi menginap untuk petualangan tak terlupakan.',
        btnLabel:
          lang === 'EN'
            ? 'View Speedboat & Boat Packages'
            : lang === 'ZH'
            ? '查看快艇与出海行程'
            : 'Lihat Paket Kapal & Speedboat',
        link: '/boats',
        isExternal: false,
      };
    }

    // Default Informational (Culinary, Diving, Packing, Travel Tips, etc.)
    return {
      icon: <Compass className="w-6 h-6 text-teal-700" />,
      title:
        lang === 'EN'
          ? 'Have Questions About Your Trip?'
          : lang === 'ZH'
          ? '对行程有任何疑问？'
          : 'Punya Pertanyaan Seputar Perjalanan?',
      desc:
        lang === 'EN'
          ? 'Message the local travel team at HelloBajo directly via WhatsApp for honest recommendations and route guidance.'
          : lang === 'ZH'
          ? '通过 WhatsApp 直接联系 HelloBajo 本地团队，获取实用的路线建议与全程支持。'
          : 'Hubungi tim lokal HelloBajo langsung via WhatsApp untuk saran rute jujur dan konsultasi gratis.',
      btnLabel:
        lang === 'EN'
          ? 'Chat with Local Team via WhatsApp'
          : lang === 'ZH'
          ? 'WhatsApp 咨询本地团队'
          : 'Konsultasi via WhatsApp',
      link: whatsappUrl,
      isExternal: true,
    };
  };

  const closingCta = getClosingCta();

  return (
    <div className="bg-[#FAF9F6] text-slate-800 pt-6 pb-20">
      <SEOHead
        title={`${post.title[lang]} | HelloBajo Travel Guides`}
        description={post.excerpt[lang]}
        canonicalUrl={`https://hellobajo.com/blog/${post.slug}`}
        ogImage={post.coverImage}
        ogType="article"
        schema={articleSchema}
      />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Navigation Breadcrumb */}
        <div className="pt-2 flex items-center justify-between text-xs text-slate-500 font-semibold">
          <Link to="/blog" className="inline-flex items-center gap-1.5 hover:text-teal-700 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>{lang === 'EN' ? 'Back to Travel Guides' : lang === 'ZH' ? '返回所有攻略' : 'Kembali ke Panduan Wisata'}</span>
          </Link>
          <span className="bg-teal-50 text-teal-800 px-3 py-1 rounded-full font-bold uppercase tracking-wider text-[10px] border border-teal-200/80">
            {post.category}
          </span>
        </div>

        {/* Title & Clean Metadata Header */}
        <div className="space-y-4">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            {post.title[lang]}
          </h1>

          <div className="flex items-center gap-3 text-xs text-slate-500 font-medium pt-2 border-b border-stone-200 pb-4">
            <span className="flex items-center gap-1.5 text-slate-600">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>{post.readTime}</span>
            </span>
            <span>•</span>
            <span className="text-slate-500">{post.publishDate}</span>
          </div>
        </div>

        {/* Hero Cover Image */}
        <div className="rounded-3xl overflow-hidden shadow-xl border border-stone-200/80 bg-slate-900 aspect-[16/9]">
          <img src={post.coverImage} alt={post.title[lang]} className="w-full h-full object-cover" />
        </div>

        {/* Main Single-Column Article Body */}
        <div className="space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
          
          {/* Intro Paragraph */}
          {postContent.introParagraph && (
            <p className="text-slate-800 font-normal leading-relaxed text-base sm:text-lg">
              {renderFormattedText(postContent.introParagraph)}
            </p>
          )}

          {/* Table of Contents Box (Clean numbering guaranteed) */}
          {postContent.toc && postContent.toc.length > 0 && (
            <div className="bg-stone-100/90 p-5 sm:p-6 rounded-2xl border border-stone-200/80">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-teal-700" />
                <span>{lang === 'EN' ? 'Table of Contents' : lang === 'ZH' ? '本文目录' : 'Daftar Isi Artikel'}</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-800 font-medium">
                {postContent.toc.map((heading, idx) => {
                  const cleanHeading = heading.replace(/^(\d+[\.\)]\s*)+/, '');
                  return (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-teal-700 font-extrabold">{idx + 1}.</span>
                      <span>{cleanHeading}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* 2-3 Small Activity Photos Layout */}
          {post.galleryImages && post.galleryImages.length > 0 && (
            <div className="my-6 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-black text-slate-800 uppercase tracking-widest">
                <Camera className="w-4 h-4 text-teal-600" />
                <span>
                  {lang === 'EN'
                    ? 'Activity & Highlight Photos'
                    : lang === 'ZH'
                    ? '行程与活动实拍图集'
                    : 'Foto Aktivitas & Suasana'}
                </span>
              </div>
              <div
                className={`grid grid-cols-2 ${
                  post.galleryImages.slice(0, 3).length >= 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'
                } gap-2.5 sm:gap-3.5`}
              >
                {post.galleryImages.slice(0, 3).map((imgUrl, idx) => (
                  <div
                    key={idx}
                    className="group relative rounded-2xl overflow-hidden border border-stone-200/90 bg-stone-100 shadow-2xs aspect-[4/3]"
                  >
                    <img
                      src={imgUrl}
                      alt={`${post.title[lang]} activity photo ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                      <span className="text-[10px] font-bold text-white flex items-center gap-1">
                        <Camera className="w-3 h-3 text-teal-300" />
                        <span>Photo #{idx + 1}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Standard Paragraphs (If no sections provided) */}
          {(!postContent.sections || postContent.sections.length === 0) && (
            <>
              {postContent.paragraphs.slice(0, 2).map((pText, i) => (
                <p key={i} className="text-slate-800 font-normal leading-relaxed text-sm sm:text-base">
                  {renderFormattedText(pText)}
                </p>
              ))}
            </>
          )}

          {/* Structured Sections with clean <h2>, <h3>, and list formatting */}
          {postContent.sections && postContent.sections.length > 0 && (
            <div className="space-y-12">
              {postContent.sections.map((sec, secIdx) => {
                return (
                  <section key={secIdx} className="space-y-4 pt-2">
                    {sec.heading && (
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight pb-2 border-b border-stone-200/80">
                        {sec.heading}
                      </h2>
                    )}

                    {sec.intro && (
                      <p className="text-slate-800 font-normal leading-relaxed text-sm sm:text-base">
                        {renderFormattedText(sec.intro)}
                      </p>
                    )}

                    {/* Contextual Inline Image ONLY if explicitly defined for this section */}
                    {sec.image && (
                      <div className="my-6 rounded-2xl overflow-hidden border border-stone-200/90 bg-stone-50 shadow-sm group">
                        <div className="relative aspect-[16/9] sm:aspect-[21/9] overflow-hidden">
                          <img
                            src={sec.image}
                            alt={sec.heading}
                            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                          />
                        </div>
                        <div className="px-4 py-2.5 bg-stone-100/90 text-[11px] sm:text-xs text-slate-600 font-medium italic border-t border-stone-200/70 flex items-center gap-1.5">
                          <Camera className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                          <span>{sec.imageCaption || sec.heading.replace(/^(\d+[\.\)]\s*)+/, '')}</span>
                        </div>
                      </div>
                    )}

                    {sec.paragraphs && sec.paragraphs.map((p, pIdx) => (
                      <p key={pIdx} className="text-slate-800 font-normal leading-relaxed text-sm sm:text-base">
                        {renderFormattedText(p)}
                      </p>
                    ))}

                    {sec.items && sec.items.length > 0 && (
                      <ul className="space-y-3 pt-1">
                        {sec.items.map((item, itemIdx) => (
                          <li key={itemIdx} className="bg-white p-4.5 rounded-2xl border border-stone-200/90 shadow-2xs space-y-1.5">
                            {item.subtitle && (
                              <h3 className="text-sm sm:text-base font-black text-teal-900 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-teal-600 inline-block shrink-0" />
                                <span>{item.subtitle}</span>
                              </h3>
                            )}
                            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal pl-4">
                              {renderFormattedText(item.text)}
                            </p>
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                );
              })}
            </div>
          )}

          {/* Remaining Standard Paragraphs (If no sections provided) */}
          {(!postContent.sections || postContent.sections.length === 0) && (
            <>
              {postContent.paragraphs.slice(2).map((pText, i) => (
                <p key={i + 2} className="text-slate-800 font-normal leading-relaxed text-sm sm:text-base">
                  {pText}
                </p>
              ))}
            </>
          )}

          {/* Callout Note Box */}
          {postContent.calloutNote && (
            <div className="bg-teal-50/70 border-l-4 border-teal-600 p-5 rounded-r-2xl space-y-1.5 shadow-xs">
              <div className="flex items-center gap-2 text-teal-900 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>{lang === 'EN' ? 'Local Tip' : lang === 'ZH' ? '本地建议' : 'Tips Khusus Warga Lokal'}</span>
              </div>
              <p className="text-xs sm:text-sm text-teal-950 font-medium leading-relaxed">
                {renderFormattedText(postContent.calloutNote)}
              </p>
            </div>
          )}

          {/* SINGLE ELEGANT CLOSING CTA AT THE END OF ARTICLE */}
          <div className="pt-8 pb-4">
            <div className="bg-stone-50 border border-teal-200/80 p-6 sm:p-8 rounded-3xl space-y-4 text-center sm:text-left shadow-xs">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <div className="w-10 h-10 rounded-2xl bg-teal-100/80 flex items-center justify-center">
                  {closingCta.icon}
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
                  HelloBajo Travel Concierge
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                {closingCta.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                {closingCta.desc}
              </p>

              <div className="pt-2">
                {closingCta.isExternal ? (
                  <a
                    href={closingCta.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-teal-800 hover:bg-teal-900 text-white font-extrabold rounded-2xl text-xs sm:text-sm transition-all shadow-sm cursor-pointer"
                  >
                    <MessageCircle className="w-4.5 h-4.5" />
                    <span>{closingCta.btnLabel}</span>
                  </a>
                ) : (
                  <Link
                    to={closingCta.link}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-teal-800 hover:bg-teal-900 text-white font-extrabold rounded-2xl text-xs sm:text-sm transition-all shadow-sm cursor-pointer"
                  >
                    <span>{closingCta.btnLabel}</span>
                    <ArrowLeft className="w-4 h-4 rotate-180" />
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Back to Guides Link */}
          <div className="pt-4 text-center border-t border-stone-200">
            <Link to="/blog" className="inline-flex items-center gap-2 text-xs font-extrabold text-slate-500 hover:text-teal-700 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>{lang === 'EN' ? 'Back to All Travel Guides' : lang === 'ZH' ? '返回所有旅行攻略' : 'Kembali ke Semua Panduan Wisata'}</span>
            </Link>
          </div>

        </div>

      </article>
    </div>
  );
};

