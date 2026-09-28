import React, { useState, useMemo, useEffect } from 'react';
import {
  APP_DATA,
  FullTextParagraph,
  DetailedSection,
  VocabItem,
  ExamQuestion
} from './data';
import {
  Volume2,
  Languages,
  Eye,
  EyeOff,
  Sparkles,
  BookOpen,
  HelpCircle,
  Bookmark,
  CheckCircle2,
  RotateCcw,
  Search,
  Check,
  ChevronDown,
  Layers,
  Flame,
  Award,
  ArrowRight,
  Shuffle,
  Home
} from 'lucide-react';

type TabType = 'home' | 'full-text' | 'explanation' | 'exam' | 'vocabulary' | 'short-text' | 'quiz';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllTranslations, setShowAllTranslations] = useState(false);
  const [primaryLang, setPrimaryLang] = useState<'es' | 'hy'>('es'); // Primary displayed language
  
  // Track revealed items by unique IDs
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});
  
  // Track mastered exam questions (stored in localStorage)
  const [masteredQuestions, setMasteredQuestions] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('metal_ages_mastered_q');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Track mastered vocab words
  const [masteredVocab, setMasteredVocab] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('metal_ages_mastered_v');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswerRevealed, setQuizAnswerRevealed] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<ExamQuestion[]>([]);

  useEffect(() => {
    try {
      localStorage.setItem('metal_ages_mastered_q', JSON.stringify(masteredQuestions));
    } catch {
      // ignore
    }
  }, [masteredQuestions]);

  useEffect(() => {
    try {
      localStorage.setItem('metal_ages_mastered_v', JSON.stringify(masteredVocab));
    } catch {
      // ignore
    }
  }, [masteredVocab]);

  // Audio speech synthesis for Spanish
  const speakSpanish = (text: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const toggleItemReveal = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setRevealedIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const isItemRevealed = (id: string) => {
    if (showAllTranslations) return true;
    return !!revealedIds[id];
  };

  const toggleMasteredQuestion = (id: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setMasteredQuestions(prev =>
      prev.includes(id) ? prev.filter(q => q !== id) : [...prev, id]
    );
  };

  const toggleMasteredVocab = (id: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setMasteredVocab(prev =>
      prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]
    );
  };

  const startQuiz = () => {
    const shuffled = [...APP_DATA.examQuestions].sort(() => 0.5 - Math.random());
    setQuizQuestions(shuffled);
    setQuizIndex(0);
    setQuizScore(0);
    setQuizAnswerRevealed(false);
    setQuizFinished(false);
  };

  const nextQuizQuestion = (correct: boolean) => {
    if (correct) {
      setQuizScore(s => s + 1);
    }
    if (quizIndex + 1 < quizQuestions.length) {
      setQuizIndex(i => i + 1);
      setQuizAnswerRevealed(false);
    } else {
      setQuizFinished(true);
    }
  };

  // Filtered vocabulary
  const filteredVocab = useMemo(() => {
    if (!searchQuery.trim()) return APP_DATA.vocabulary;
    const q = searchQuery.toLowerCase().trim();
    return APP_DATA.vocabulary.filter(
      item => item.es.toLowerCase().includes(q) || item.hy.toLowerCase().includes(q) || (item.category && item.category.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  // Filtered exam questions
  const filteredQuestions = useMemo(() => {
    if (!searchQuery.trim()) return APP_DATA.examQuestions;
    const q = searchQuery.toLowerCase().trim();
    return APP_DATA.examQuestions.filter(
      item =>
        item.questionEs.toLowerCase().includes(q) ||
        item.questionHy.toLowerCase().includes(q) ||
        item.answerEs.toLowerCase().includes(q) ||
        item.answerHy.toLowerCase().includes(q) ||
        item.id.toString() === q
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-stone-100/70 text-stone-900 pb-20 font-sans">
      {/* Top Banner / Hero Header */}
      <header className="bg-gradient-to-r from-amber-900 via-stone-800 to-amber-950 text-white shadow-lg sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-xs font-bold uppercase tracking-wider rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {APP_DATA.header.unit}
                </span>
                <span className="text-xs text-stone-300 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  Cobre · Bronce · Hierro
                </span>
              </div>
              <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-white mt-1 flex flex-wrap items-center gap-x-2">
                <span>{APP_DATA.header.titleEs}</span>
                <span className="text-amber-400 font-medium text-base sm:text-xl">
                  {APP_DATA.header.titleHy}
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-stone-300 mt-0.5">
                {APP_DATA.header.subtitleHy}
              </p>
            </div>

            {/* Quick Global Action Controls */}
            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              <button
                onClick={() => setPrimaryLang(prev => (prev === 'es' ? 'hy' : 'es'))}
                title="Փոխել հիմնական լեզուն"
                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-stone-700/80 hover:bg-stone-600 text-stone-200 border border-stone-600 transition flex items-center gap-1.5 shadow-xs"
              >
                <Languages className="w-3.5 h-3.5 text-amber-400" />
                <span>{primaryLang === 'es' ? '🇪🇸 → 🇦🇲' : '🇦🇲 → 🇪🇸'}</span>
              </button>

              <button
                onClick={() => setShowAllTranslations(prev => !prev)}
                title={showAllTranslations ? "Թաքցնել թարգմանությունները" : "Ցույց տալ բոլոր թարգմանությունները"}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition flex items-center gap-1.5 shadow-xs ${
                  showAllTranslations
                    ? 'bg-amber-500 text-stone-950 border-amber-400 font-semibold'
                    : 'bg-stone-700/80 hover:bg-stone-600 text-stone-200 border-stone-600'
                }`}
              >
                {showAllTranslations ? (
                  <>
                    <EyeOff className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Թաքցնել թարգմանությունները</span>
                    <span className="sm:hidden">Թաքցնել</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5 text-amber-400" />
                    <span className="hidden sm:inline">Ցույց տալ բոլորը</span>
                    <span className="sm:hidden">Բոլորը</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-stone-900/90 border-t border-stone-700/60 overflow-x-auto scrollbar-none">
          <div className="max-w-6xl mx-auto px-4 flex space-x-1 sm:space-x-2 py-2">
            {[
              { id: 'home', labelEs: 'Inicio', labelHy: 'Գլխավոր', icon: Home },
              { id: 'full-text', labelEs: 'Texto completo', labelHy: 'Լիարժեք տեքստ', icon: BookOpen },
              { id: 'explanation', labelEs: 'Explicación (1-12)', labelHy: 'Մանրամասն', icon: Layers },
              { id: 'exam', labelEs: 'Preguntas (24)', labelHy: 'Քննության հարցեր', icon: HelpCircle, badge: `${masteredQuestions.length}/24` },
              { id: 'vocabulary', labelEs: 'Vocabulario (22)', labelHy: 'Բառարան', icon: Bookmark, badge: `${masteredVocab.length}/22` },
              { id: 'short-text', labelEs: 'Texto corto', labelHy: 'Կարճ տեքստ', icon: Sparkles },
              { id: 'quiz', labelEs: 'Quiz / Test', labelHy: 'Քվիզ', icon: Award }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as TabType);
                    if (tab.id === 'quiz' && quizQuestions.length === 0) {
                      startQuiz();
                    }
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition ${
                    isActive
                      ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                      : 'text-stone-300 hover:text-white hover:bg-stone-800'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-stone-950' : 'text-amber-400'}`} />
                  <span>{tab.labelHy}</span>
                  <span className="text-[11px] opacity-80 hidden md:inline">({tab.labelEs})</span>
                  {tab.badge && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? 'bg-stone-900 text-amber-300' : 'bg-stone-800 text-stone-300 border border-stone-700'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Helpful Hint banner */}
      <div className="max-w-6xl mx-auto px-4 mt-4">
        <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-3 sm:p-4 text-stone-800 flex items-start gap-3 shadow-xs">
          <div className="p-2 rounded-lg bg-amber-100 text-amber-800 shrink-0 mt-0.5">
            <Languages className="w-5 h-5" />
          </div>
          <div className="text-xs sm:text-sm">
            <p className="font-semibold text-amber-950">
              💡 Ինչպես օգտագործել՝
            </p>
            <p className="text-stone-700 mt-0.5">
              Սեղմեք <strong>ցանկացած իսպաներեն նախադասության, հարցի, պատասխանի կամ բառի վրա</strong>՝ հայերեն թարգմանությունն անմիջապես տեսնելու համար։
              Լսելու համար սեղմեք <Volume2 className="w-3.5 h-3.5 inline text-amber-700" /> կոճակը։
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 mt-6">
        {/* TAB 0: HOME / ГЛАВНАЯ / ԳԼԽԱՎՈՐ */}
        {activeTab === 'home' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-6 sm:p-8">
              {/* Top Spanish Block */}
              <div className="rounded-2xl border border-amber-300/80 bg-gradient-to-br from-amber-50/80 via-white to-stone-50 p-6 sm:p-7 shadow-xs">
                <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-amber-200">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">🇪🇸</span>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
                      {APP_DATA.mainSummary.titleEs}
                    </h2>
                  </div>
                  <button
                    onClick={() => speakSpanish(APP_DATA.mainSummary.paragraphsEs.join(' '))}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-stone-200 hover:border-amber-400 text-stone-700 hover:text-amber-900 text-xs font-semibold shadow-xs transition"
                    title="Լսել ամբողջ տեքստը իսպաներեն"
                  >
                    <Volume2 className="w-4 h-4 text-amber-600" />
                    <span>Լսել ամբողջը (Escuchar todo)</span>
                  </button>
                </div>

                <div className="space-y-3.5 text-base sm:text-lg text-stone-800 leading-relaxed font-normal">
                  {APP_DATA.mainSummary.paragraphsEs.map((para, i) => (
                    <div key={i} className="flex items-start justify-between gap-3 group p-2 rounded-lg hover:bg-amber-100/40 transition">
                      <p className="flex-1">{para}</p>
                      <button
                        onClick={() => speakSpanish(para)}
                        className="opacity-40 group-hover:opacity-100 p-1 text-stone-400 hover:text-amber-800 transition"
                        title="Լսել"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Armenian Block completely */}
              <div className="mt-6 rounded-2xl border border-stone-300/80 bg-gradient-to-br from-stone-50 via-white to-amber-50/30 p-6 sm:p-7 shadow-xs">
                <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-stone-200">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">🇦🇲</span>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
                      {APP_DATA.mainSummary.titleHy}
                    </h2>
                  </div>
                  <span className="text-xs text-amber-900 font-semibold bg-amber-100/90 px-3 py-1 rounded-md border border-amber-300">
                    Հայերեն թարգմանություն
                  </span>
                </div>

                <div className="space-y-3.5 text-base sm:text-lg text-stone-800 leading-relaxed font-normal">
                  {APP_DATA.mainSummary.paragraphsHy.map((para, i) => (
                    <div key={i} className="p-2 rounded-lg hover:bg-stone-100/50 transition">
                      <p>{para}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Navigation Cards below */}
              <div className="mt-8 pt-6 border-t border-stone-200">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3.5">
                  Ուսումնական բաժիններ / Secciones de estudio
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <button
                    onClick={() => setActiveTab('full-text')}
                    className="p-4 rounded-xl border border-stone-200 hover:border-amber-400 hover:bg-amber-50/40 text-left transition flex items-center justify-between group shadow-xs"
                  >
                    <div>
                      <div className="flex items-center gap-1.5 font-bold text-stone-900 text-sm">
                        <BookOpen className="w-4 h-4 text-amber-600" />
                        <span>Լիարժեք տեքստ</span>
                      </div>
                      <p className="text-xs text-stone-500 mt-0.5">12 պարբերություն ինտերակտիվ</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition" />
                  </button>

                  <button
                    onClick={() => setActiveTab('explanation')}
                    className="p-4 rounded-xl border border-stone-200 hover:border-amber-400 hover:bg-amber-50/40 text-left transition flex items-center justify-between group shadow-xs"
                  >
                    <div>
                      <div className="flex items-center gap-1.5 font-bold text-stone-900 text-sm">
                        <Layers className="w-4 h-4 text-amber-600" />
                        <span>Մանրամասն բացատրություն</span>
                      </div>
                      <p className="text-xs text-stone-500 mt-0.5">1-12 թեմաներ և փուլեր</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition" />
                  </button>

                  <button
                    onClick={() => setActiveTab('exam')}
                    className="p-4 rounded-xl border border-stone-200 hover:border-amber-400 hover:bg-amber-50/40 text-left transition flex items-center justify-between group shadow-xs"
                  >
                    <div>
                      <div className="flex items-center gap-1.5 font-bold text-stone-900 text-sm">
                        <HelpCircle className="w-4 h-4 text-amber-600" />
                        <span>Քննության հարցեր</span>
                      </div>
                      <p className="text-xs text-stone-500 mt-0.5">24 հարց և պատասխան</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition" />
                  </button>

                  <button
                    onClick={() => setActiveTab('vocabulary')}
                    className="p-4 rounded-xl border border-stone-200 hover:border-amber-400 hover:bg-amber-50/40 text-left transition flex items-center justify-between group shadow-xs"
                  >
                    <div>
                      <div className="flex items-center gap-1.5 font-bold text-stone-900 text-sm">
                        <Bookmark className="w-4 h-4 text-amber-600" />
                        <span>Կարևոր բառապաշար</span>
                      </div>
                      <p className="text-xs text-stone-500 mt-0.5">22 բառ քարտերով</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 1: FULL TEXT */}
        {activeTab === 'full-text' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-5 sm:p-7">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-stone-100 gap-2">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-stone-900 flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-amber-600" />
                    <span>Լիարժեք տեքստ՝ հասկանալու և պատմելու համար</span>
                  </h2>
                </div>
                <div className="text-xs text-stone-500 bg-stone-100 px-3 py-1.5 rounded-lg border border-stone-200 self-start sm:self-center">
                  Սեղմեք պարբերության վրա՝ թարգմանությունը բացելու համար
                </div>
              </div>

              {/* Timeline pill */}
              <div className="mb-6 p-3 bg-amber-50/70 border border-amber-200 rounded-xl flex items-center justify-between flex-wrap gap-2 text-xs text-amber-900 font-medium">
                <span className="font-bold flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-orange-600" />
                  Փուլերը (Etapas):
                </span>
                <div className="flex items-center gap-2">
                  <span className="bg-amber-100 text-amber-900 px-2.5 py-1 rounded-md border border-amber-300">
                    1. Cobre (Պղինձ)
                  </span>
                  <span>→</span>
                  <span className="bg-amber-200/80 text-amber-950 px-2.5 py-1 rounded-md border border-amber-300">
                    2. Bronce (Բրոնզ)
                  </span>
                  <span>→</span>
                  <span className="bg-stone-300 text-stone-900 px-2.5 py-1 rounded-md border border-stone-400 font-semibold">
                    3. Hierro (Երկաթ)
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {APP_DATA.fullText.map((p, idx) => {
                  const revealed = isItemRevealed(p.id);
                  return (
                    <div
                      key={p.id}
                      onClick={() => toggleItemReveal(p.id)}
                      className={`group cursor-pointer rounded-xl border p-4 sm:p-5 transition duration-150 ${
                        revealed
                          ? 'bg-amber-50/40 border-amber-300/80 shadow-xs'
                          : 'bg-stone-50/60 hover:bg-stone-100/70 border-stone-200'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2 text-xs font-bold text-amber-700">
                          <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-[11px]">
                            {idx + 1}
                          </span>
                          <span className="uppercase tracking-wider">
                            {primaryLang === 'es' ? 'Español' : 'Հայերեն'}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={(e) => speakSpanish(p.es, e)}
                            title="Լսել իսպաներեն արտասանությունը"
                            className="p-1.5 rounded-lg text-stone-500 hover:text-amber-700 hover:bg-amber-100 transition"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                          <span className={`text-xs px-2 py-0.5 rounded flex items-center gap-1 font-medium transition ${
                            revealed ? 'bg-amber-200 text-amber-900' : 'bg-stone-200 text-stone-600 group-hover:bg-amber-100 group-hover:text-amber-800'
                          }`}>
                            {revealed ? 'Հայերենը բաց է' : 'Սեղմեք թարգմանել'}
                          </span>
                        </div>
                      </div>

                      {/* Main text (default Spanish or reversed) */}
                      <p className="mt-2 text-base sm:text-lg text-stone-900 leading-relaxed font-normal">
                        {primaryLang === 'es' ? p.es : p.hy}
                      </p>

                      {/* Translation box (revealed on click) */}
                      {revealed && (
                        <div className="mt-3.5 pt-3.5 border-t border-amber-200/80 bg-white/70 p-3.5 rounded-lg">
                          <div className="text-xs font-semibold text-amber-800 mb-1 flex items-center gap-1">
                            <span>{primaryLang === 'es' ? '🇦🇲 Հայերեն թարգմանություն' : '🇪🇸 Español'}</span>
                          </div>
                          <p className="text-stone-800 text-sm sm:text-base leading-relaxed">
                            {primaryLang === 'es' ? p.hy : p.es}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DETAILED EXPLANATION (1 to 12) */}
        {activeTab === 'explanation' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-5 sm:p-7">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-stone-100 gap-2">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-stone-900 flex items-center gap-2">
                    <Layers className="w-6 h-6 text-amber-600" />
                    <span>Մանրամասն բացատրություն (1-12)</span>
                  </h2>
                  <p className="text-stone-500 text-sm mt-0.5">
                    Explicación detallada: temas clave de la Edad de los Metales
                  </p>
                </div>
                <div className="text-xs text-stone-500 bg-stone-100 px-3 py-1.5 rounded-lg border border-stone-200">
                  Սեղմեք յուրաքանչյուր կետի վրա՝ հայերեն թարգմանությունը տեսնելու համար
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {APP_DATA.detailedSections.map((sec) => (
                  <div
                    key={sec.id}
                    className="border border-stone-200 rounded-xl overflow-hidden bg-stone-50/40 shadow-xs hover:border-amber-300 transition"
                  >
                    {/* Header of Section */}
                    <div
                      onClick={() => toggleItemReveal(`sec-title-${sec.id}`)}
                      className="bg-gradient-to-r from-stone-800 to-amber-900 text-white p-4 cursor-pointer hover:bg-stone-700 transition flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-amber-400 text-stone-950 font-extrabold flex items-center justify-center text-sm shadow-xs shrink-0">
                          {sec.number}
                        </span>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-base sm:text-lg font-bold text-white">
                              {sec.titleEs}
                            </h3>
                            <button
                              onClick={(e) => speakSpanish(sec.titleEs, e)}
                              className="p-1 rounded text-stone-300 hover:text-amber-300 transition"
                              title="Լսել իսպաներեն"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-xs sm:text-sm text-amber-200 font-medium">
                            {sec.titleHy}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-stone-300 bg-stone-900/60 px-2 py-1 rounded hidden sm:inline">
                        Սեղմեք բացատրությունները
                      </span>
                    </div>

                    <div className="p-4 sm:p-5 space-y-4">
                      {/* Special note if available (like Cobre -> Bronce -> Hierro) */}
                      {sec.specialNote && (
                        <div
                          onClick={() => toggleItemReveal(`note-${sec.id}`)}
                          className="bg-amber-100/70 border border-amber-300 rounded-xl p-3.5 cursor-pointer hover:bg-amber-100 transition"
                        >
                          <div className="flex items-center justify-between text-xs font-bold text-amber-900 mb-1">
                            <span>📌 PARA RECORDAR / ՀԻՇԵԼՈՒ ՀԱՄԱՐ</span>
                            <span className="text-[11px] text-amber-700">Սեղմեք թարգմանել</span>
                          </div>
                          <p className="text-stone-900 font-semibold text-sm sm:text-base">
                            🇪🇸 {sec.specialNote.es}
                          </p>
                          {(isItemRevealed(`note-${sec.id}`) || showAllTranslations) && (
                            <p className="text-amber-950 text-sm mt-1.5 pt-1.5 border-t border-amber-200">
                              🇦🇲 {sec.specialNote.hy}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Regular Items */}
                      {sec.items && sec.items.map((item, iIdx) => {
                        const itemId = `${sec.id}-item-${iIdx}`;
                        const revealed = isItemRevealed(itemId);
                        return (
                          <div
                            key={itemId}
                            onClick={() => toggleItemReveal(itemId)}
                            className={`p-3.5 rounded-lg border cursor-pointer transition ${
                              revealed
                                ? 'bg-amber-50/60 border-amber-300'
                                : 'bg-white hover:bg-amber-50/30 border-stone-200'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <span className="text-amber-700 font-bold text-xs">🇪🇸</span>
                                <span className="text-stone-900 text-sm sm:text-base font-normal">
                                  {item.es}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 shrink-0">
                                <button
                                  onClick={(e) => speakSpanish(item.es, e)}
                                  className="p-1 text-stone-400 hover:text-amber-700"
                                  title="Լսել"
                                >
                                  <Volume2 className="w-3.5 h-3.5" />
                                </button>
                                <span className="text-[11px] text-stone-400 font-medium">
                                  {revealed ? '🇦🇲' : 'թարգմանել'}
                                </span>
                              </div>
                            </div>
                            {revealed && (
                              <div className="mt-2 pt-2 border-t border-stone-200/80 text-stone-800 text-sm flex items-start gap-2">
                                <span className="text-amber-700 font-bold text-xs mt-0.5">🇦🇲</span>
                                <span className="leading-snug">{item.hy}</span>
                              </div>
                            )}
                          </div>
                        );
                      })}

                      {/* Subsections if available (e.g., Cobre / Bronce / Hierro or Megaliths) */}
                      {sec.subsections && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mt-2">
                          {sec.subsections.map((sub, sIdx) => {
                            const subId = `${sec.id}-sub-${sIdx}`;
                            return (
                              <div
                                key={subId}
                                className="bg-white rounded-xl border border-stone-200 p-3.5 shadow-2xs flex flex-col justify-between"
                              >
                                <div>
                                  <div className="flex items-center justify-between pb-2 border-b border-stone-100 mb-2">
                                    <div>
                                      <h4 className="font-bold text-stone-900 text-sm sm:text-base flex items-center gap-1">
                                        <span>{sub.titleEs}</span>
                                        <button
                                          onClick={(e) => speakSpanish(sub.titleEs, e)}
                                          className="p-0.5 text-stone-400 hover:text-amber-600"
                                          title="Լսել"
                                        >
                                          <Volume2 className="w-3 h-3" />
                                        </button>
                                      </h4>
                                      <p className="text-xs text-amber-700 font-medium">
                                        {sub.titleHy}
                                      </p>
                                    </div>
                                    <span className="text-[10px] uppercase font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                                      {sec.number === 2 ? `Փուլ ${sIdx + 1}` : 'Կառույց'}
                                    </span>
                                  </div>

                                  <div className="space-y-2 mt-2">
                                    {sub.items.map((subItem, siIdx) => {
                                      const subItemId = `${subId}-${siIdx}`;
                                      const isRevealed = isItemRevealed(subItemId);
                                      return (
                                        <div
                                          key={subItemId}
                                          onClick={() => toggleItemReveal(subItemId)}
                                          className={`p-2 rounded-lg cursor-pointer text-xs sm:text-sm border transition ${
                                            isRevealed
                                              ? 'bg-amber-50 border-amber-300'
                                              : 'bg-stone-50 hover:bg-stone-100 border-stone-200'
                                          }`}
                                        >
                                          <div className="flex items-start justify-between gap-1">
                                            <p className="text-stone-900 font-medium">
                                              🇪🇸 {subItem.es}
                                            </p>
                                            <button
                                              onClick={(e) => speakSpanish(subItem.es, e)}
                                              className="text-stone-400 hover:text-amber-700 shrink-0"
                                            >
                                              <Volume2 className="w-3 h-3" />
                                            </button>
                                          </div>
                                          {isRevealed && (
                                            <p className="mt-1.5 pt-1.5 border-t border-stone-200 text-stone-700 text-xs">
                                              🇦🇲 {subItem.hy}
                                            </p>
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: EXAM QUESTIONS (24) */}
        {activeTab === 'exam' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-5 sm:p-7">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-stone-100 gap-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-stone-900 flex items-center gap-2">
                    <HelpCircle className="w-6 h-6 text-amber-600" />
                    <span>Քննության հարցեր և պատասխաններ (24)</span>
                  </h2>
                  <p className="text-stone-500 text-sm mt-0.5">
                    Preguntas y respuestas para el examen con autoevaluación
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-stone-600">
                    Յուրացված՝ <strong className="text-amber-700">{masteredQuestions.length}</strong> / 24
                  </span>
                  {masteredQuestions.length > 0 && (
                    <button
                      onClick={() => setMasteredQuestions([])}
                      className="text-xs text-stone-400 hover:text-stone-600 underline"
                      title="Զրոյացնել առաջընթացը"
                    >
                      զրոյացնել
                    </button>
                  )}
                </div>
              </div>

              {/* Search & Filter */}
              <div className="mb-6 flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Որոնել հարցերում կամ պատասխաններում (իսպաներեն կամ հայերեն)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-2.5 text-xs text-stone-400 hover:text-stone-600"
                    >
                      մաքրել
                    </button>
                  )}
                </div>

                <button
                  onClick={() => {
                    setActiveTab('quiz');
                    startQuiz();
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-medium text-sm flex items-center justify-center gap-1.5 transition shadow-xs"
                >
                  <Award className="w-4 h-4" />
                  <span>Սկսել թեստավորում (Quiz)</span>
                </button>
              </div>

              {/* Questions List */}
              <div className="space-y-4">
                {filteredQuestions.map((q) => {
                  const qKey = `q-${q.id}`;
                  const aKey = `ans-${q.id}`;
                  const ansRevealed = isItemRevealed(aKey);
                  const qRevealed = isItemRevealed(qKey);
                  const isMastered = masteredQuestions.includes(q.id);

                  return (
                    <div
                      key={q.id}
                      className={`rounded-xl border transition duration-150 ${
                        isMastered
                          ? 'bg-emerald-50/30 border-emerald-300'
                          : 'bg-stone-50/60 hover:bg-stone-50 border-stone-200'
                      }`}
                    >
                      {/* Question Header */}
                      <div className="p-4 sm:p-5">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                              isMastered ? 'bg-emerald-600 text-white' : 'bg-amber-100 text-amber-900'
                            }`}>
                              {q.id}
                            </span>
                            <span className="text-xs uppercase tracking-wider font-semibold text-stone-500">
                              Հարց #{q.id}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => toggleMasteredQuestion(q.id, e)}
                              className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1 border transition ${
                                isMastered
                                  ? 'bg-emerald-100 text-emerald-800 border-emerald-300 font-semibold'
                                  : 'bg-white text-stone-500 border-stone-300 hover:bg-stone-100'
                              }`}
                            >
                              <CheckCircle2 className={`w-3.5 h-3.5 ${isMastered ? 'text-emerald-700' : 'text-stone-400'}`} />
                              <span>{isMastered ? 'Յուրացված է' : 'Նշել յուրացված'}</span>
                            </button>
                          </div>
                        </div>

                        {/* Question Text in Spanish */}
                        <div
                          onClick={() => toggleItemReveal(qKey)}
                          className="mt-3 cursor-pointer group flex items-start justify-between gap-3 bg-white p-3 rounded-lg border border-stone-200 hover:border-amber-400 transition"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-amber-700">🇪🇸</span>
                              <p className="text-base sm:text-lg font-semibold text-stone-900">
                                {q.questionEs}
                              </p>
                            </div>
                            {/* Question translation revealed */}
                            {qRevealed && (
                              <div className="mt-2 pt-2 border-t border-stone-100 text-stone-700 text-sm sm:text-base flex items-start gap-2">
                                <span className="text-xs font-bold text-amber-700 mt-0.5">🇦🇲</span>
                                <p className="font-medium text-stone-800">{q.questionHy}</p>
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              onClick={(e) => speakSpanish(q.questionEs, e)}
                              className="p-1.5 rounded text-stone-400 hover:text-amber-700 hover:bg-stone-100"
                              title="Լսել հարցը"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                            <span className="text-[11px] text-stone-400 font-medium">
                              {qRevealed ? '🇦🇲' : 'թարգմանել'}
                            </span>
                          </div>
                        </div>

                        {/* Answer Button or Revealed Answer */}
                        <div className="mt-3">
                          {!ansRevealed ? (
                            <button
                              onClick={() => toggleItemReveal(aKey)}
                              className="w-full py-2.5 px-4 rounded-lg bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-xs"
                            >
                              <Eye className="w-4 h-4" />
                              <span>Տեսնել պատասխանը (Ver respuesta)</span>
                            </button>
                          ) : (
                            <div
                              onClick={() => toggleItemReveal(`ans-hy-${q.id}`)}
                              className="p-4 rounded-xl bg-amber-50/80 border border-amber-300/80 cursor-pointer hover:bg-amber-50 transition"
                            >
                              <div className="flex items-center justify-between text-xs font-semibold text-amber-900 mb-1">
                                <div className="flex items-center gap-1.5">
                                  <Check className="w-3.5 h-3.5 text-amber-700" />
                                  <span>ՊԱՏԱՍԽԱՆ (RESPUESTA):</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={(e) => speakSpanish(q.answerEs, e)}
                                    className="p-1 rounded text-stone-600 hover:text-amber-800 hover:bg-amber-200/50"
                                    title="Լսել պատասխանը"
                                  >
                                    <Volume2 className="w-3.5 h-3.5" />
                                  </button>
                                  <span className="text-[11px] text-amber-800 font-medium">
                                    Սեղմեք թարգմանել
                                  </span>
                                </div>
                              </div>

                              <p className="text-base sm:text-lg text-stone-900 font-medium mt-1">
                                🇪🇸 {q.answerEs}
                              </p>

                              {(isItemRevealed(`ans-hy-${q.id}`) || showAllTranslations) && (
                                <div className="mt-2.5 pt-2.5 border-t border-amber-200/80 text-stone-800 text-sm sm:text-base">
                                  <p className="font-normal text-stone-900">
                                    🇦🇲 {q.answerHy}
                                  </p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: VOCABULARY (22 words) */}
        {activeTab === 'vocabulary' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-5 sm:p-7">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-stone-100 gap-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-stone-900 flex items-center gap-2">
                    <Bookmark className="w-6 h-6 text-amber-600" />
                    <span>Կարևոր բառապաշար (22 բառ)</span>
                  </h2>
                  <p className="text-stone-500 text-sm mt-0.5">
                    Vocabulario importante con pronunciación y tarjetas de estudio
                  </p>
                </div>

                <div className="text-xs text-stone-600">
                  Սովորած՝ <strong className="text-amber-700">{masteredVocab.length}</strong> / {APP_DATA.vocabulary.length}
                </div>
              </div>

              {/* Search bar */}
              <div className="relative mb-6">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Որոնել բառեր (իսպաներեն կամ հայերեն)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                {filteredVocab.map((item) => {
                  const vocabKey = `vocab-${item.id}`;
                  const isRevealed = isItemRevealed(vocabKey);
                  const isMastered = masteredVocab.includes(item.id);

                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleItemReveal(vocabKey)}
                      className={`group cursor-pointer rounded-xl border p-4 transition flex flex-col justify-between ${
                        isMastered
                          ? 'bg-emerald-50/40 border-emerald-300'
                          : isRevealed
                          ? 'bg-amber-50/50 border-amber-300'
                          : 'bg-stone-50 hover:bg-stone-100/80 border-stone-200'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
                          <span className="font-semibold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded text-[11px]">
                            {item.category || 'Բառ'}
                          </span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={(e) => speakSpanish(item.es, e)}
                              className="p-1 rounded text-stone-400 hover:text-amber-700 hover:bg-stone-200/60"
                              title="Լսել իսպաներեն արտասանությունը"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={(e) => toggleMasteredVocab(item.id, e)}
                              className={`p-1 rounded ${
                                isMastered ? 'text-emerald-600' : 'text-stone-300 hover:text-emerald-600'
                              }`}
                              title={isMastered ? 'Յուրացված է' : 'Նշել յուրացված'}
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Spanish Word */}
                        <div className="text-base sm:text-lg font-bold text-stone-900 group-hover:text-amber-800 transition">
                          🇪🇸 {item.es}
                        </div>

                        {/* Armenian translation */}
                        {isRevealed ? (
                          <div className="mt-2.5 pt-2 border-t border-amber-200/80 text-sm font-semibold text-stone-800">
                            🇦🇲 {item.hy}
                          </div>
                        ) : (
                          <div className="mt-2 text-xs text-stone-400 font-medium flex items-center gap-1">
                            <span>սեղմեք թարգմանելու համար</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Full Comparison Table view */}
              <div className="mt-10 pt-6 border-t border-stone-200">
                <h3 className="text-base font-bold text-stone-900 mb-3 flex items-center gap-2">
                  <span>Բառարանի ամբողջական ցանկ (Աղյուսակ)</span>
                </h3>
                <div className="overflow-x-auto rounded-xl border border-stone-200 shadow-2xs">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-stone-800 text-white text-xs uppercase font-semibold">
                      <tr>
                        <th className="py-2.5 px-4 w-12 text-center">#</th>
                        <th className="py-2.5 px-4">Español (Իսպաներեն)</th>
                        <th className="py-2.5 px-4">Հայերեն (Armenio)</th>
                        <th className="py-2.5 px-4 w-28 text-center">Գործողություն</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200 bg-white">
                      {APP_DATA.vocabulary.map((v, i) => (
                        <tr
                          key={v.id}
                          className="hover:bg-amber-50/40 transition cursor-pointer"
                          onClick={() => toggleItemReveal(`table-v-${v.id}`)}
                        >
                          <td className="py-2.5 px-4 text-center font-bold text-xs text-stone-400">
                            {i + 1}
                          </td>
                          <td className="py-2.5 px-4 font-semibold text-stone-900">
                            {v.es}
                          </td>
                          <td className="py-2.5 px-4 text-stone-800">
                            {isItemRevealed(`table-v-${v.id}`) ? (
                              <span className="font-medium text-amber-900">{v.hy}</span>
                            ) : (
                              <span className="text-stone-400 text-xs italic">սեղմեք ցույց տալու</span>
                            )}
                          </td>
                          <td className="py-2.5 px-4 text-center">
                            <button
                              onClick={(e) => speakSpanish(v.es, e)}
                              className="px-2 py-1 text-xs rounded bg-stone-100 hover:bg-amber-100 text-stone-700 hover:text-amber-900 inline-flex items-center gap-1"
                            >
                              <Volume2 className="w-3 h-3" />
                              <span>Լսել</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: SHORT TEXT */}
        {activeTab === 'short-text' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-5 sm:p-7">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-stone-100 gap-2">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-stone-900 flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-amber-600" />
                    <span>Կարճ տեքստ՝ քննությանն արագ կրկնելու համար</span>
                  </h2>
                  <p className="text-stone-500 text-sm mt-0.5">
                    Texto corto resumen: repaso rápido para el examen
                  </p>
                </div>
                <div className="text-xs text-stone-500 bg-stone-100 px-3 py-1.5 rounded-lg border border-stone-200">
                  Սեղմեք պարբերության վրա՝ թարգմանելու համար
                </div>
              </div>

              <div className="space-y-5">
                {APP_DATA.shortText.paragraphs.map((st, sIdx) => {
                  const stKey = `st-${st.id}`;
                  const revealed = isItemRevealed(stKey);

                  return (
                    <div
                      key={st.id}
                      onClick={() => toggleItemReveal(stKey)}
                      className={`p-5 rounded-xl border cursor-pointer transition ${
                        revealed
                          ? 'bg-amber-50/50 border-amber-300 shadow-xs'
                          : 'bg-stone-50 hover:bg-stone-100/70 border-stone-200'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
                        <span className="font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded">
                          Պարբերություն {sIdx + 1}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => speakSpanish(st.es, e)}
                            className="p-1 rounded text-stone-400 hover:text-amber-700 hover:bg-amber-100 transition"
                            title="Լսել իսպաներեն"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                          <span className="text-[11px] text-stone-500">
                            {revealed ? 'Հայերենը բաց է' : 'Սեղմեք թարգմանել'}
                          </span>
                        </div>
                      </div>

                      {/* Spanish */}
                      <p className="text-stone-900 text-base sm:text-lg leading-relaxed font-normal">
                        🇪🇸 {st.es}
                      </p>

                      {/* Armenian */}
                      {revealed && (
                        <div className="mt-3.5 pt-3.5 border-t border-amber-200/80 bg-white/80 p-3 rounded-lg">
                          <div className="text-xs font-semibold text-amber-800 mb-1">
                            🇦🇲 ՀԱՅԵՐԵՆ:
                          </div>
                          <p className="text-stone-800 text-sm sm:text-base leading-relaxed">
                            {st.hy}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: QUIZ / TEST MODE */}
        {activeTab === 'quiz' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-5 sm:p-7">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-stone-100 gap-2">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-stone-900 flex items-center gap-2">
                    <Award className="w-6 h-6 text-amber-600" />
                    <span>Քննության ինքնաստուգում (Quiz Test)</span>
                  </h2>
                  <p className="text-stone-500 text-sm mt-0.5">
                    Ստուգեք ձեր գիտելիքները 24 քննական հարցերով
                  </p>
                </div>
                <button
                  onClick={startQuiz}
                  className="px-3.5 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium flex items-center gap-1.5 self-start sm:self-center transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Վերսկսել խառը հերթականությամբ</span>
                </button>
              </div>

              {!quizFinished && quizQuestions.length > 0 ? (
                <div className="max-w-2xl mx-auto space-y-6 py-4">
                  {/* Progress bar */}
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-stone-500 mb-1.5">
                      <span>Հարց {quizIndex + 1} / {quizQuestions.length}</span>
                      <span>Միավորներ՝ {quizScore}</span>
                    </div>
                    <div className="w-full bg-stone-200 rounded-full h-2">
                      <div
                        className="bg-amber-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((quizIndex + 1) / quizQuestions.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Active Question Card */}
                  <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center justify-between text-xs font-bold text-stone-400 mb-3">
                      <span className="bg-amber-100 text-amber-800 px-2.5 py-1 rounded">
                        Հարց #{quizQuestions[quizIndex].id}
                      </span>
                      <button
                        onClick={() => speakSpanish(quizQuestions[quizIndex].questionEs)}
                        className="text-stone-500 hover:text-amber-700 flex items-center gap-1"
                      >
                        <Volume2 className="w-4 h-4" />
                        <span>Լսել</span>
                      </button>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg sm:text-xl font-bold text-stone-900 leading-snug">
                        🇪🇸 {quizQuestions[quizIndex].questionEs}
                      </h3>
                      <p className="text-base text-stone-600 font-medium">
                        🇦🇲 {quizQuestions[quizIndex].questionHy}
                      </p>
                    </div>

                    {/* Answer reveal */}
                    {!quizAnswerRevealed ? (
                      <div className="mt-6 pt-4 border-t border-stone-200">
                        <button
                          onClick={() => setQuizAnswerRevealed(true)}
                          className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-sm shadow-xs transition"
                        >
                          Տեսնել ճիշտ պատասխանը
                        </button>
                      </div>
                    ) : (
                      <div className="mt-6 pt-4 border-t border-amber-200 space-y-4">
                        <div className="p-4 rounded-xl bg-amber-50 border border-amber-300">
                          <div className="flex items-center justify-between text-xs font-bold text-amber-900 mb-1">
                            <span>ՃԻՇՏ ՊԱՏԱՍԽԱՆԸ՝</span>
                            <button
                              onClick={() => speakSpanish(quizQuestions[quizIndex].answerEs)}
                              className="text-stone-500 hover:text-amber-800"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-base sm:text-lg font-bold text-stone-900">
                            🇪🇸 {quizQuestions[quizIndex].answerEs}
                          </p>
                          <p className="text-sm sm:text-base font-normal text-stone-800 mt-1">
                            🇦🇲 {quizQuestions[quizIndex].answerHy}
                          </p>
                        </div>

                        <div className="text-center text-xs font-semibold text-stone-600">
                          Ինչպե՞ս պատասխանեցիք.
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <button
                            onClick={() => nextQuizQuestion(false)}
                            className="py-2.5 px-4 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 font-semibold text-sm transition"
                          >
                            ❌ Չգիտեի / Սխալ
                          </button>
                          <button
                            onClick={() => nextQuizQuestion(true)}
                            className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition"
                          >
                            ✅ Ճիշտ գիտեի
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* Quiz Finished State */
                <div className="max-w-md mx-auto text-center py-10 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
                    <Award className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-stone-900">
                    Թեստն ավարտվեց!
                  </h3>
                  <p className="text-stone-600">
                    Դուք ճիշտ պատասխանեցիք <strong className="text-amber-700">{quizScore}</strong> հարցի՝ {quizQuestions.length}-ից։
                  </p>
                  <button
                    onClick={startQuiz}
                    className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-sm shadow-xs transition"
                  >
                    Կրկնել թեստը նորից
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-4 mt-12 text-center text-xs text-stone-500 border-t border-stone-200 pt-6">
        <p className="font-medium text-stone-600">
          Unit 1: Prehistory · 4. The Metal Ages — La Edad de los Metales — Մետաղների դարաշրջանը
        </p>
        <p className="mt-1 text-stone-400">
          Իսպաներենի և հայերենի ինտերակտիվ ուսումնական ձեռնարկ
        </p>
      </footer>
    </div>
  );
}
