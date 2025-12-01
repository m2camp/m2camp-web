import React, { useState, useEffect, useRef } from 'react';
import { 
  Mountain, 
  MapPin, 
  Briefcase, 
  Users, 
  Cpu, 
  BarChart3, 
  ArrowRight, 
  Menu, 
  X, 
  CheckCircle2,
  TrendingUp,
  Lightbulb,
  Megaphone,
  ChevronRight,
  Mail
} from 'lucide-react';

// アニメーション用のラッパーコンポーネント
const FadeInSection = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    }, { threshold: 0.1 }); // 10%見えたら発火

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// ▼▼▼ 追加機能：ファビコンを動的に設定するフック ▼▼▼
const useFavicon = () => {
  useEffect(() => {
    // ロゴ（Mountain）と同じSVGをデータURIとして作成
    // 色は amber-500 (#f59e0b) に設定
    const svgString = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m8 3 4 8 5-5 5 15H2L8 3z"/>
      </svg>
    `;
    const encodedSvg = encodeURIComponent(svgString);
    const dataUri = `data:image/svg+xml,${encodedSvg}`;

    // 既存のファビコンリンクを探すか、新しく作成する
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = dataUri;
  }, []);
};
// ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ファビコン設定を実行
  useFavicon();

  // ▼▼▼ 設定箇所：問い合わせフォームURL ▼▼▼
  const CONTACT_FORM_URL = "https://forms.gle/Vfn1H5GsPNUCxStG7"; 
  // ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // ヘッダー分のオフセット
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const openContactForm = () => {
    window.open(CONTACT_FORM_URL, '_blank');
    setIsMenuOpen(false);
  };

  // ▼▼▼ 修正箇所：色のクラス定義を明示的に行うヘルパー関数 ▼▼▼
  const getServiceStyles = (color) => {
    const styles = {
      blue: {
        iconBox: "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white",
        checkIcon: "text-blue-500",
        hoverBg: "group-hover:bg-blue-600"
      },
      purple: {
        iconBox: "bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white",
        checkIcon: "text-purple-500",
        hoverBg: "group-hover:bg-purple-600"
      },
      red: {
        iconBox: "bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white",
        checkIcon: "text-red-500",
        hoverBg: "group-hover:bg-red-600"
      },
      green: {
        iconBox: "bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white",
        checkIcon: "text-green-500",
        hoverBg: "group-hover:bg-green-600"
      }
    };
    return styles[color] || styles.blue;
  };
  // ▲▲▲ 修正箇所ここまで ▲▲▲

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 antialiased selection:bg-amber-200 selection:text-amber-900">
      
      {/* Navigation */}
      <nav 
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => scrollToSection('hero')}>
            <div className={`p-1 rounded-lg transition-colors ${isScrolled ? 'bg-slate-100' : 'bg-white/10'}`}>
              <Mountain className={`w-6 h-6 ${isScrolled ? 'text-slate-900' : 'text-white'}`} />
            </div>
            <span className={`text-xl md:text-2xl font-bold tracking-tight ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
              M2CAMP
            </span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {['Concept', 'Service', 'Profile'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`text-sm font-bold tracking-wide hover:text-amber-500 transition-colors relative group ${
                  isScrolled ? 'text-slate-600' : 'text-slate-300'
                }`}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 transition-all group-hover:w-full"></span>
              </button>
            ))}
            <button 
              onClick={openContactForm}
              className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all transform hover:scale-105 shadow-lg shadow-amber-500/30 flex items-center gap-2"
            >
              無料相談を予約 <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
              {isMenuOpen ? (
                <X className={isScrolled ? 'text-slate-900' : 'text-white'} />
              ) : (
                <Menu className={isScrolled ? 'text-slate-900' : 'text-white'} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-2xl md:hidden flex flex-col p-6 space-y-4 border-t border-slate-100 animate-in slide-in-from-top-5 duration-200">
            {['Concept', 'Service', 'Profile'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-left text-slate-800 font-bold py-3 border-b border-slate-100 hover:text-amber-500 active:text-amber-600"
              >
                {item}
              </button>
            ))}
            <button 
              onClick={openContactForm}
              className="bg-amber-500 text-white w-full py-4 rounded-xl font-bold mt-4 shadow-md flex items-center justify-center gap-2"
            >
              <Mail className="w-5 h-5" /> 無料相談を予約
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900 pt-20">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
           <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900" />
           {/* Grid Pattern */}
           <div className="absolute inset-0 opacity-10" 
             style={{ 
               backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)', 
               backgroundSize: '40px 40px' 
             }}>
           </div>
           {/* Glow Effects */}
           <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] animate-pulse"></div>
           <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px]"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20">
            
            {/* Hero Text */}
            <div className="md:w-3/5 space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
                東京水準を、<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500">
                  宮崎らしさで。
                </span>
              </h1>
              
              <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-2xl font-light">
                <strong className="text-white font-medium">「絵に描いた餅」で終わらせない。</strong><br/>
                上場企業レベルの知見を、<br className="md:hidden"/>御社の経営に合った形でご支援します。
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  onClick={openContactForm}
                  className="bg-amber-500 hover:bg-amber-600 hover:scale-105 active:scale-95 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-[0_0_30px_rgba(245,158,11,0.3)] flex items-center justify-center gap-2"
                >
                  事業相談を申し込む <ArrowRight className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => scrollToSection('concept')}
                  className="bg-white/5 hover:bg-white/10 text-white border border-white/20 px-8 py-4 rounded-full font-medium text-lg transition-all backdrop-blur-sm flex items-center justify-center gap-2 group"
                >
                  M2CAMPとは <span className="group-hover:translate-x-1 transition-transform">↓</span>
                </button>
              </div>
            </div>

            {/* Hero Visual Card */}
            <div className="md:w-2/5 hidden md:block animate-in fade-in slide-in-from-right-10 duration-1000 delay-300">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-amber-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
                <div className="bg-slate-900/90 backdrop-blur-xl p-8 rounded-2xl border border-slate-700/50 shadow-2xl relative">
                  <div className="space-y-6">
                    <div className="flex items-center gap-5 border-b border-slate-800 pb-5">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-white shadow-lg">
                        <TrendingUp className="w-7 h-7" />
                      </div>
                      <div>
                        <div className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">Growth Target</div>
                        <div className="text-white font-bold text-xl">月商1,000万 <span className="text-slate-500 mx-2">→</span> 1億</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-5 border-b border-slate-800 pb-5">
                      <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl flex items-center justify-center text-white shadow-lg">
                        <Users className="w-7 h-7" />
                      </div>
                      <div>
                        <div className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">Organization</div>
                        <div className="text-white font-bold text-xl">0名 <span className="text-slate-500 mx-2">→</span> 数十名組織化</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center text-white shadow-lg">
                        <Cpu className="w-7 h-7" />
                      </div>
                      <div>
                        <div className="text-purple-400 text-xs font-bold uppercase tracking-wider mb-1">Automation</div>
                        <div className="text-white font-bold text-xl">AIによる業務自動化</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block text-slate-500">
           <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-slate-500 to-transparent mx-auto mb-2"></div>
           <span className="text-xs tracking-widest uppercase">Scroll</span>
        </div>
      </header>

      {/* Trouble/Pain Point Section */}
      <section id="trouble" className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <FadeInSection>
            <div className="text-center mb-16">
              <span className="text-amber-500 font-bold tracking-wider text-sm uppercase mb-3 block">Pain Points</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                こんな<span className="bg-amber-100 px-1">経営の悩み</span>、抱えていませんか？
              </h2>
              <p className="text-slate-600">
                宮崎の企業様の多くが直面する、「成長の壁」です。
              </p>
            </div>
          </FadeInSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "DX・AIと言われても…", desc: "何から手をつければいいか分からず、結局昔ながらの手作業が続いている。", icon: Cpu },
              { title: "人が採用できない", desc: "求人を出しても反応がない。採用してもすぐに辞めてしまい、組織が育たない。", icon: Users },
              { title: "売上の天井が見えた", desc: "今のやり方ではこれ以上の成長が見込めない。新しい一手が必要だがアイデアがない。", icon: BarChart3 },
            ].map((item, i) => (
              <FadeInSection key={i} delay={i * 200}>
                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 relative group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  
                  <div className="w-14 h-14 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-amber-500 mb-6 relative z-10">
                    <item.icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-4 relative z-10">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed relative z-10">{item.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Concept Section */}
      <section id="concept" className="py-24 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-6">
          <FadeInSection>
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Why M2CAMP?</h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                「M2CAMP」は、宮崎の企業が次のステージへ登るための<br className="hidden md:block"/>前線基地（ベースキャンプ）です。
              </p>
            </div>
          </FadeInSection>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* M2 Explanation */}
            <FadeInSection>
              <div className="bg-white p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 h-full relative overflow-hidden">
                <div className="absolute top-[-20px] right-[-20px] text-[12rem] font-black text-slate-50 leading-none select-none z-0">M2</div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold text-slate-900 mb-8 flex items-center flex-wrap gap-2">
                    <span className="text-blue-600 border-b-4 border-blue-600/30">M</span>etropolis 
                    <span className="text-slate-400 text-xl mx-2">×</span>
                    <span className="text-amber-500 border-b-4 border-amber-500/30">M</span>iyazaki
                  </h3>
                  <p className="text-slate-600 mb-8 text-lg leading-loose">
                    東京（Metropolis）の最新テクノロジーとスピード感を、<br/>
                    宮崎（Miyazaki）の風土や商習慣に合わせて実装します。<br/>
                    <span className="font-bold text-slate-800 bg-amber-100/50 px-1">「東京の真似事」ではなく「宮崎での最適解」</span>を導き出します。
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-bold border border-blue-100">Tech & Strategy</span>
                    <span className="px-4 py-2 bg-amber-50 text-amber-700 rounded-full text-sm font-bold border border-amber-100">Local Implementation</span>
                  </div>
                </div>
              </div>
            </FadeInSection>

            {/* CAMP Explanation */}
            <div className="space-y-4">
              {[
                { letter: 'C', word: 'Creative / Cloud', desc: '融資・補助金獲得のための緻密な事業計画とクラウド活用', icon: Lightbulb, color: 'text-yellow-500', bg: 'bg-yellow-50' },
                { letter: 'A', word: 'AI / Automation', desc: 'ChatGPT等の生成AIによる業務自動化とコスト削減', icon: Cpu, color: 'text-purple-500', bg: 'bg-purple-50' },
                { letter: 'M', word: 'Marketing', desc: '大手代理店出身の知見による売上・集客構造の改革', icon: BarChart3, color: 'text-blue-500', bg: 'bg-blue-50' },
                { letter: 'P', word: 'People / Place', desc: '未経験から戦力化する採用・組織作りとオフィス設計', icon: Users, color: 'text-green-500', bg: 'bg-green-50' },
              ].map((item, index) => (
                <FadeInSection key={index} delay={index * 100}>
                  <div className="flex items-center gap-6 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 group">
                    <div className={`w-14 h-14 shrink-0 rounded-xl ${item.bg} flex items-center justify-center font-black text-2xl ${item.color} group-hover:scale-110 transition-transform`}>
                      {item.letter}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg mb-1 flex items-center gap-2">
                        {item.word}
                        <item.icon className="w-4 h-4 text-slate-400" />
                      </h4>
                      <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service Section */}
      <section id="service" className="py-24 bg-white relative">
        {/* Background decorative blob */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-slate-50 skew-y-3 transform origin-top-left -z-1"></div>

        <div className="container mx-auto px-6 relative z-10">
          <FadeInSection>
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div>
                <span className="text-amber-500 font-bold tracking-wider text-sm uppercase mb-2 block">Our Solutions</span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                  ヒト・モノ・カネ・情報の<br />
                  すべてを最適化する。
                </h2>
              </div>
              <p className="text-slate-600 max-w-md border-l-4 border-amber-500 pl-4 py-2 bg-white/50 backdrop-blur-sm">
                部分的な改善ではありません。<br/>
                経営視点（PL責任）を持った参謀として、事業のコアから変革します。
              </p>
            </div>
          </FadeInSection>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Service Cards */}
            {[
              { 
                icon: Briefcase, 
                title: "経営戦略・事業計画", 
                desc: "社長の頭の中にある構想を、銀行や投資家が納得するレベルの「事業計画書」に落とし込みます。",
                tags: ["中期経営計画策定", "新規事業立ち上げ支援", "収益シミュレーション作成"],
                color: "blue"
              },
              { 
                icon: Cpu, 
                title: "AI導入・業務DX", 
                desc: "「人が足りない」を技術で解決。ChatGPTによる自動化やバックオフィスSaaS化で生産性を倍増。",
                tags: ["生成AI活用コンサル", "クラウドツール導入", "ペーパーレス化"],
                color: "purple"
              },
              { 
                icon: Megaphone, 
                title: "デジタルマーケティング", 
                desc: "国内大手代理店出身の知見により、広告費を最適化。Web・SNS・CRMを統合した戦略を設計。",
                tags: ["Web広告・SNS運用", "LP/サイト制作ディレクション", "リブランディング"],
                color: "red"
              },
              { 
                icon: Users, 
                title: "組織・採用・オフィス", 
                desc: "宮崎現地で0名から50名規模へ組織化。実践的な採用支援と人が集まるオフィス空間プロデュース。",
                tags: ["採用代行・制度設計", "オフィス移転PM", "マネージャー育成"],
                color: "green"
              }
            ].map((service, index) => {
              // ▼▼▼ 修正箇所：スタイルの取得 ▼▼▼
              const styles = getServiceStyles(service.color);
              
              return (
                <FadeInSection key={index} delay={index * 150}>
                  <div className="bg-white p-8 rounded-2xl shadow-lg shadow-slate-200/40 border border-slate-100 hover:shadow-xl hover:border-slate-200 transition-all duration-300 group h-full flex flex-col">
                    {/* ▼▼▼ 修正箇所：動的クラス生成をやめ、定義済みのスタイルを適用 ▼▼▼ */}
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 transform group-hover:rotate-6 ${styles.iconBox}`}>
                      <service.icon className="w-7 h-7" />
                    </div>
                    {/* ▲▲▲ 修正箇所ここまで ▲▲▲ */}
                    
                    <h3 className="text-xl font-bold text-slate-900 mb-4">{service.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-grow">
                      {service.desc}
                    </p>
                    <div className="space-y-3 pt-6 border-t border-slate-100">
                      {service.tags.map((tag, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                          {/* チェックアイコンの色も同様に修正 */}
                          <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${styles.checkIcon}`} /> 
                          {tag}
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeInSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Profile Section */}
      <section id="profile" className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-blue-900/10 -skew-x-12 transform translate-x-20"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-amber-900/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <FadeInSection>
            <div className="flex flex-col lg:flex-row gap-16 items-start">
              <div className="lg:w-1/3 sticky top-24">
                <div className="inline-block text-amber-500 font-bold tracking-wider text-sm uppercase mb-4 pl-1">
                  Representative
                </div>
                <h2 className="text-4xl font-bold mb-8 leading-tight">
                  上場企業<br/>経営経験者が<br />
                  あなたの<br/>
                  <span className="text-amber-400">「社外No.2」</span>に。
                </h2>
                <div className="w-20 h-1.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mb-8"></div>
                <p className="text-slate-300 leading-relaxed mb-8 text-lg">
                  私はコンサルタントではありません。<br/>
                  自ら事業を作り、人を雇い、PL責任を負ってきた<strong className="text-white">「実務家」</strong>です。<br/><br/>
                  東京の最前線で培ったAI・マーケティングの知見と、宮崎の地でゼロから組織を作り上げた泥臭い経験。<br/><br/>
                  この2つを掛け合わせ、宮崎の企業の皆様に「本物の経営支援」を提供します。
                </p>
              </div>

              <div className="lg:w-2/3 bg-slate-800/50 p-8 md:p-12 rounded-3xl border border-slate-700 backdrop-blur-sm relative shadow-2xl">
                <div className="mb-10 flex items-center justify-between">
                  <div className="text-2xl font-bold flex items-center gap-3">
                     Profile / Background
                  </div>
                </div>

                <div className="space-y-12 relative">
                  {/* Timeline Line */}
                  <div className="absolute left-[7px] md:left-[15px] top-2 bottom-2 w-0.5 bg-slate-700"></div>

                  {[
                    { color: "blue", title: "国内大手広告代理店", text: "大手クライアントのWebマーケティングを統括、ブランディングから獲得広告の運用、SNS運用まで幅広く対応。" },
                    { color: "amber", title: "IT企業 新規事業責任者", text: "新規事業立ち上げを含む事業責任者を歴任し、事業の0→1、1→10どちらも経験。数億規模の事業管理に従事。" },
                    { color: "green", title: "宮崎にて0から50名規模の会社立ち上げ", text: "経営者として、オフィス設計から採用・制度構築まで一気通貫で担当。未経験者中心の現地採用で組織化・黒字化に成功。" }
                  ].map((career, i) => (
                     <div key={i} className="relative pl-10 md:pl-16 group">
                      <div className={`absolute left-0 md:left-[8px] top-2 w-4 h-4 rounded-full bg-${career.color}-500 border-4 border-slate-800 group-hover:scale-125 transition-transform shadow-[0_0_10px_rgba(255,255,255,0.3)]`}></div>
                      <h4 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">{career.title}</h4>
                      <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                        {career.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white relative">
        <div className="container mx-auto px-6 max-w-5xl">
          <FadeInSection>
            <div className="bg-gradient-to-br from-blue-900 to-slate-900 p-1 md:p-1 rounded-[2.5rem] shadow-2xl">
              <div className="bg-white rounded-[2.3rem] p-8 md:p-16 text-center overflow-hidden relative">
                {/* Decorative BG */}
                <div className="absolute top-0 left-0 w-full h-32 bg-slate-50"></div>
                
                <div className="relative z-10">
                  <div className="inline-block bg-amber-100 text-amber-800 px-4 py-1 rounded-full text-sm font-bold mb-6 animate-pulse">
                    毎月3社限定・無料
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                    経営戦略ロードマップ<br/>無料作成キャンペーン
                  </h2>
                  <p className="text-slate-600 mb-10 text-lg max-w-2xl mx-auto">
                    御社の現状をヒアリングし、「AI導入」「事業計画」「組織課題」に関する<br className="hidden md:block"/>
                    具体的なアクションプランを無料でご提案します。
                  </p>
                  
                  <div className="flex flex-col md:flex-row gap-4 justify-center items-stretch mb-10 max-w-2xl mx-auto">
                     <div className="bg-slate-50 px-8 py-6 rounded-2xl border border-slate-100 flex-1">
                       <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Location</div>
                       <div className="font-bold text-slate-900 text-lg">宮崎市内 / オンライン</div>
                     </div>
                     <div className="bg-slate-50 px-8 py-6 rounded-2xl border border-slate-100 flex-1">
                       <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Time</div>
                       <div className="font-bold text-slate-900 text-lg">60分 〜 90分</div>
                     </div>
                  </div>

                  <button 
                    onClick={openContactForm}
                    className="w-full md:w-auto bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xl font-bold px-16 py-5 rounded-full shadow-xl shadow-amber-500/30 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3 mx-auto"
                  >
                    <Mail className="w-6 h-6" /> 無料診断・相談を申し込む
                  </button>
                  <p className="mt-6 text-slate-400 text-sm">※ 無理な営業は一切いたしませんのでご安心ください</p>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
            <div className="flex items-center gap-2 group cursor-pointer" onClick={() => scrollToSection('hero')}>
              <div className="bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-colors">
                <Mountain className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">M2CAMP</span>
            </div>
            <div className="flex gap-8 text-sm font-medium">
              {['Concept', 'Service', 'Profile', 'Contact'].map((item) => (
                <button 
                  key={item} 
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="hover:text-amber-500 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-600">
            <p>© {new Date().getFullYear()} M2CAMP. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating CTA for Mobile (Only shows when scrolled) */}
      <div className={`fixed bottom-6 right-6 z-40 transition-all duration-500 md:hidden ${isScrolled ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
        <button 
          onClick={openContactForm}
          className="bg-amber-500 text-white p-4 rounded-full shadow-2xl shadow-amber-500/40 hover:bg-amber-600 active:scale-90 transition-all flex items-center justify-center"
        >
          <Mail className="w-6 h-6" />
        </button>
      </div>

    </div>
  );
};

export default App;