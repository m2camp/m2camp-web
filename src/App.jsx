import React, { useState, useEffect } from 'react';
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
  Megaphone
} from 'lucide-react';

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Navigation */}
      <nav 
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <Mountain className={`w-8 h-8 ${isScrolled ? 'text-slate-900' : 'text-white'}`} />
            <span className={`text-2xl font-bold tracking-tight ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
              M2CAMP
            </span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {['Concept', 'Service', 'Profile'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`text-sm font-medium tracking-wide hover:text-amber-500 transition-colors ${
                  isScrolled ? 'text-slate-600' : 'text-slate-300'
                }`}
              >
                {item}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2.5 rounded-full font-medium transition-all transform hover:scale-105 shadow-lg shadow-amber-500/30"
            >
              無料相談を予約
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
          <div className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden flex flex-col p-6 space-y-4">
            {['Concept', 'Service', 'Profile'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-left text-slate-800 font-medium py-2 border-b border-slate-100"
              >
                {item}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-amber-500 text-white w-full py-3 rounded-lg font-bold"
            >
              無料相談を予約
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header id="hero" className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 opacity-40">
           <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-3/5 space-y-8">
              <div className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-full text-amber-400 text-sm font-medium tracking-wider mb-4">
                MIYAZAKI × METROPOLIS
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                東京の戦略を、<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                  宮崎の実装へ。
                </span>
              </h1>
              <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-2xl">
                AI導入、事業計画、マーケティング、組織づくり。<br />
                IT企業 事業統括クラスの知見を、御社の経営の「ベースキャンプ」に。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
                >
                  事業相談を申し込む <ArrowRight className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => scrollToSection('concept')}
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-full font-medium text-lg transition-all backdrop-blur-sm"
                >
                  M2CAMPとは
                </button>
              </div>
            </div>
            {/* Visual Element */}
            <div className="md:w-2/5 hidden md:block">
              <div className="relative">
                <div className="absolute -inset-4 bg-amber-500/20 rounded-full blur-3xl"></div>
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-slate-700 shadow-2xl relative">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 border-b border-slate-700 pb-4">
                      <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center text-blue-400">
                        <TrendingUp />
                      </div>
                      <div>
                        <div className="text-slate-400 text-sm">Target</div>
                        <div className="text-white font-bold text-lg">月商100万 → 1000万</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 border-b border-slate-700 pb-4">
                      <div className="w-12 h-12 bg-amber-600/20 rounded-lg flex items-center justify-center text-amber-400">
                        <Users />
                      </div>
                      <div>
                        <div className="text-slate-400 text-sm">Organization</div>
                        <div className="text-white font-bold text-lg">0名 → 数十名組織化</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center text-purple-400">
                        <Cpu />
                      </div>
                      <div>
                        <div className="text-slate-400 text-sm">Operation</div>
                        <div className="text-white font-bold text-lg">AIによる業務自動化</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Concept Section */}
      <section id="concept" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Why M2CAMP?</h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              「M2CAMP」は、宮崎の企業が次のステージへ登るための前線基地（ベースキャンプ）です。<br />
              東京の最先端ノウハウと、宮崎の現場への深い理解を融合させます。
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* M2 Explanation */}
            <div className="bg-slate-50 p-10 rounded-3xl border border-slate-100 shadow-sm h-full">
              <div className="text-6xl font-bold text-slate-200 mb-4">M2</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <span className="text-blue-600">M</span>etropolis × <span className="text-amber-500">M</span>iyazaki
              </h3>
              <p className="text-slate-600 mb-6">
                東京（Metropolis）の最新テクノロジーと経営戦略を、宮崎（Miyazaki）の風土や商習慣に合わせて実装します。<br/>
                単なるコンサルティングではなく、宮崎に拠点を置くパートナーとして伴走します。
              </p>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">東京の知見</span>
                <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">宮崎の実装</span>
              </div>
            </div>

            {/* CAMP Explanation */}
            <div className="space-y-6">
              {[
                { letter: 'C', word: 'Creative / Cloud', desc: '融資・補助金獲得のための緻密な事業計画とクラウド活用', icon: Lightbulb, color: 'text-yellow-500' },
                { letter: 'A', word: 'AI / Automation', desc: 'ChatGPT等の生成AIによる業務自動化とコスト削減', icon: Cpu, color: 'text-purple-500' },
                { letter: 'M', word: 'Marketing', desc: '大手代理店出身の知見による売上・集客構造の改革', icon: BarChart3, color: 'text-blue-500' },
                { letter: 'P', word: 'People / Place', desc: '未経験から戦力化する採用・組織作りとオフィス設計', icon: Users, color: 'text-green-500' },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className={`w-12 h-12 shrink-0 rounded-lg bg-white shadow-sm border border-slate-100 flex items-center justify-center font-bold text-2xl ${item.color}`}>
                    {item.letter}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg mb-1">{item.word}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service Section */}
      <section id="service" className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-amber-500 font-bold tracking-wider text-sm uppercase mb-2 block">Our Solutions</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                ヒト・モノ・カネ・情報の<br />
                すべてを最適化する。
              </h2>
            </div>
            <p className="text-slate-600 max-w-md">
              部分的な改善ではありません。経営視点（PL責任）を持った参謀として、事業のコアから変革します。
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Service 1: Business Plan */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow group">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Briefcase className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">経営戦略・事業計画</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                社長の頭の中にある構想を、銀行や投資家が納得するレベルの「事業計画書」に落とし込みます。融資・補助金獲得から、中長期のロードマップ策定まで対応。
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-slate-500">
                  <CheckCircle2 className="w-4 h-4 text-blue-500" /> 中期経営計画策定
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-500">
                  <CheckCircle2 className="w-4 h-4 text-blue-500" /> 新規事業立ち上げ支援
                </li>
              </ul>
            </div>

            {/* Service 2: AI/DX */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow group">
              <div className="w-14 h-14 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <Cpu className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">AI導入・業務DX</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                「人が足りない」を技術で解決します。ChatGPTによる業務自動化や、バックオフィス（労務・経理）のSaaS化により、固定費を抑えて生産性を倍増させます。
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-slate-500">
                  <CheckCircle2 className="w-4 h-4 text-purple-500" /> 生成AI活用コンサル
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-500">
                  <CheckCircle2 className="w-4 h-4 text-purple-500" /> クラウドツール導入
                </li>
              </ul>
            </div>

            {/* Service 3: Marketing */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow group">
              <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center text-red-600 mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors">
                <Megaphone className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">デジタルマーケティング</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                国内大手代理店出身の知見により、広告費を最適化し、売上に直結する集客構造を作ります。Web・SNS・CRMを統合した戦略を設計します。
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-slate-500">
                  <CheckCircle2 className="w-4 h-4 text-red-500" /> Web広告・SNS運用戦略
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-500">
                  <CheckCircle2 className="w-4 h-4 text-red-500" /> リブランディング支援
                </li>
              </ul>
            </div>

            {/* Service 4: HR/Office */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow group">
              <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center text-green-600 mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">組織・採用・オフィス</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                宮崎現地で0名から数十名規模へ組織を作り上げた経験に基づく、実践的な採用支援。人事評価制度の設計から、人が集まるオフィス空間のプロデュースまで。
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-slate-500">
                  <CheckCircle2 className="w-4 h-4 text-green-500" /> 採用代行・制度設計
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-500">
                  <CheckCircle2 className="w-4 h-4 text-green-500" /> オフィス移転PM
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Section */}
      <section id="profile" className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-900/10 -skew-x-12 transform translate-x-20"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:w-1/3">
              <div className="inline-block text-amber-500 font-bold tracking-wider text-sm uppercase mb-4">
                Representative
              </div>
              <h2 className="text-4xl font-bold mb-8">
                現役・IT企業事業統括が<br />
                あなたの「社外No.2」に。
              </h2>
              <div className="w-20 h-1 bg-amber-500 mb-8"></div>
              <p className="text-slate-400 leading-relaxed mb-8">
                私はコンサルタントではありません。自ら事業を作り、人を雇い、PL責任を負ってきた「実務家」です。<br/><br/>
                東京の最前線で培ったAI・マーケティングの知見と、宮崎の地でゼロから組織を作り上げた泥臭い経験。<br/><br/>
                この2つを掛け合わせ、宮崎の企業の皆様に「本物の経営支援」を提供したいと考え、M2CAMPを立ち上げました。
              </p>
            </div>

            <div className="lg:w-2/3 bg-slate-800/50 p-8 md:p-12 rounded-2xl border border-slate-700 backdrop-blur-sm">
              <div className="mb-8">
                <div className="text-2xl font-bold">プロフィール</div>
              </div>

              <div className="space-y-8 relative">
                {/* Timeline Line */}
                <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-slate-700 md:left-4"></div>

                {/* Career Item 1 */}
                <div className="relative pl-8 md:pl-12">
                  <div className="absolute left-[-5px] md:left-[11px] top-2 w-3 h-3 rounded-full bg-blue-500 border-4 border-slate-800"></div>
                  <h4 className="text-lg font-bold text-white mb-1">国内大手広告代理店</h4>
                  <p className="text-slate-400 text-sm">
                    大手クライアントのWebマーケティングを統括、ブランディングから獲得広告の運用、SNS運用まで幅広く対応。
                  </p>
                </div>

                {/* Career Item 2 */}
                <div className="relative pl-8 md:pl-12">
                  <div className="absolute left-[-5px] md:left-[11px] top-2 w-3 h-3 rounded-full bg-amber-500 border-4 border-slate-800"></div>
                  <h4 className="text-lg font-bold text-white mb-1">IT企業新規事業責任者</h4>
                  <p className="text-slate-400 text-sm mb-2">
                    新規事業立ち上げを含む事業責任者を歴任し、事業の0→1、1→10どちらも経験。
                  </p>
                </div>

                {/* Career Item 3 */}
                <div className="relative pl-8 md:pl-12">
                  <div className="absolute left-[-5px] md:left-[11px] top-2 w-3 h-3 rounded-full bg-green-500 border-4 border-slate-800"></div>
                  <h4 className="text-lg font-bold text-white mb-1">宮崎にて0から50名規模の会社立ち上げ経験</h4>
                  <p className="text-slate-400 text-sm">
                    経営者として、オフィス設計から採用・制度構築まで一気通貫で担当。未経験者中心の現地採用で組織化・黒字化に成功。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-gradient-to-br from-blue-50 to-slate-50 p-8 md:p-12 rounded-3xl shadow-sm border border-blue-100 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">無料・経営戦略診断のご案内</h2>
            <p className="text-slate-600 mb-8">
              毎月3社限定で、御社の現状を分析し、<br/>
              「AI導入」「事業計画」「組織課題」に関するロードマップを無料で作成します。
            </p>
            
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-8">
               <div className="bg-white px-6 py-4 rounded-xl shadow-sm border border-slate-100 w-full md:w-auto">
                 <div className="text-sm text-slate-500 mb-1">場所</div>
                 <div className="font-bold text-slate-900">宮崎市内 / オンライン</div>
               </div>
               <div className="bg-white px-6 py-4 rounded-xl shadow-sm border border-slate-100 w-full md:w-auto">
                 <div className="text-sm text-slate-500 mb-1">時間</div>
                 <div className="font-bold text-slate-900">60分</div>
               </div>
            </div>

            <button className="w-full md:w-auto bg-amber-500 hover:bg-amber-600 text-white text-lg font-bold px-12 py-4 rounded-full shadow-lg shadow-amber-500/20 transition-all transform hover:scale-105">
              無料診断・相談を申し込む
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Mountain className="w-6 h-6 text-white" />
            <span className="text-xl font-bold text-white">M2CAMP</span>
          </div>
          <div className="text-sm">
            © {new Date().getFullYear()} M2CAMP. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;