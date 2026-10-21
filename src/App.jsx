import { useState, useEffect, useCallback } from 'react';
import { EXHIBITION_BOOTHS } from './data/exhibitionData';
import { useAudioGuide } from './hooks/useAudioGuide';
import { ambientSound } from './utils/ambientAudio';
import ReadingProgressBar from './components/ReadingProgressBar';
import Header from './components/Header';
import BoothArticle from './components/BoothArticle';
import AudioPlayerBar from './components/AudioPlayerBar';
import QRStationModal from './components/QRStationModal';
import ImageLightbox from './components/ImageLightbox';
import { QrCode, Sparkles, Globe, Sun, Moon } from 'lucide-react';

export default function App() {
  // Theme State: Bright Light Mode is default (false = light, true = dark)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('heritage_theme');
      return saved === 'dark';
    }
    return false;
  });

  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (isDarkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
    }
    localStorage.setItem('heritage_theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  // 1. URL-based Booth selection (for QR code scan direct access)
  const [currentBoothId, setCurrentBoothId] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const boothParam = params.get('booth');
      const found = EXHIBITION_BOOTHS.find(b => b.id === boothParam);
      if (found) return found.id;
    }
    return EXHIBITION_BOOTHS[0].id;
  });

  // 2. Language State (vi / en) - Hình thức 2
  const [language, setLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('heritage_lang');
      if (saved === 'vi' || saved === 'en') return saved;
    }
    return 'vi';
  });

  const toggleLanguage = useCallback(() => {
    setLanguage(prev => {
      const next = prev === 'vi' ? 'en' : 'vi';
      localStorage.setItem('heritage_lang', next);
      return next;
    });
  }, []);

  // Update URL query param when booth changes
  const selectBooth = useCallback((boothId) => {
    setCurrentBoothId(boothId);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('booth', boothId);
      window.history.pushState({}, '', url.toString());
    }
  }, []);

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const boothParam = params.get('booth');
      const found = EXHIBITION_BOOTHS.find(b => b.id === boothParam);
      if (found) {
        setCurrentBoothId(found.id);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Find active booth object
  const currentBooth = EXHIBITION_BOOTHS.find(b => b.id === currentBoothId) || EXHIBITION_BOOTHS[0];

  // 3. Audio Guide State & Auto-scroll synchronization - Hình thức 3
  const [activeParagraphId, setActiveParagraphId] = useState(null);

  const audioGuide = useAudioGuide({
    booth: currentBooth,
    language,
    onParagraphChange: (id) => setActiveParagraphId(id)
  });

  // 4. Ambient Chime State
  const [isAmbientPlaying, setIsAmbientPlaying] = useState(false);
  const toggleAmbient = useCallback(() => {
    const state = ambientSound.toggle();
    setIsAmbientPlaying(state);
  }, []);

  // 5. Image Lightbox State
  const [lightbox, setLightbox] = useState({ isOpen: false, image: null, caption: '' });
  const openLightbox = (image, caption) => setLightbox({ isOpen: true, image, caption });
  const closeLightbox = () => setLightbox({ isOpen: false, image: null, caption: '' });

  // 6. QR Station Hub Modal State
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  // Playback rate cycle helper
  const handleRateCycle = () => {
    const rates = [0.8, 1.0, 1.25];
    const nextIdx = (rates.indexOf(audioGuide.playbackRate) + 1) % rates.length;
    audioGuide.setPlaybackRate(rates[nextIdx]);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Reading Progress Bar */}
      <ReadingProgressBar />

      {/* Main Header with Bright/Dark Theme toggle */}
      <Header
        booths={EXHIBITION_BOOTHS}
        currentBoothId={currentBoothId}
        onSelectBooth={selectBooth}
        language={language}
        onToggleLanguage={toggleLanguage}
        isAudioPlaying={audioGuide.isPlaying}
        onStartAudio={audioGuide.startAudio}
        onOpenQRModal={() => setIsQRModalOpen(true)}
        isAmbientPlaying={isAmbientPlaying}
        onToggleAmbient={toggleAmbient}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      {/* Main Article Content */}
      <main style={{ flex: 1 }}>
        <BoothArticle
          booth={currentBooth}
          language={language}
          activeParagraphId={activeParagraphId}
          isAudioPlaying={audioGuide.isPlaying}
          onStartAudio={audioGuide.startAudio}
          onPauseAudio={audioGuide.pauseAudio}
          onJumpToParagraph={(id) => {
            audioGuide.jumpToParagraphById(id);
          }}
          onOpenLightbox={openLightbox}
          onSelectBooth={selectBooth}
          allBooths={EXHIBITION_BOOTHS}
          onOpenQRModal={() => setIsQRModalOpen(true)}
        />
      </main>

      {/* Floating Audio Player Bar (Hình thức 3) */}
      {(audioGuide.isPlaying || audioGuide.isPaused || audioGuide.currentParagraphIndex >= 0) && (
        <AudioPlayerBar
          isPlaying={audioGuide.isPlaying}
          isPaused={audioGuide.isPaused}
          currentParagraphIndex={audioGuide.currentParagraphIndex}
          totalParagraphs={audioGuide.totalParagraphs}
          autoScroll={audioGuide.autoScroll}
          onToggleAutoScroll={() => audioGuide.setAutoScroll(prev => !prev)}
          playbackRate={audioGuide.playbackRate}
          onChangeRate={handleRateCycle}
          onPlay={audioGuide.startAudio}
          onPause={audioGuide.pauseAudio}
          onResume={audioGuide.resumeAudio}
          onStop={audioGuide.stopAudio}
          onNext={audioGuide.nextParagraph}
          onPrev={audioGuide.prevParagraph}
          language={language}
          isAmbientPlaying={isAmbientPlaying}
          onToggleAmbient={toggleAmbient}
        />
      )}

      {/* Lightbox for zooming photos */}
      {lightbox.isOpen && (
        <ImageLightbox
          image={lightbox.image}
          caption={lightbox.caption}
          onClose={closeLightbox}
        />
      )}

      {/* QR Station Modal (For Exhibition Organizers and Visitors) */}
      {isQRModalOpen && (
        <QRStationModal
          booths={EXHIBITION_BOOTHS}
          language={language}
          currentBoothId={currentBoothId}
          onSelectBooth={selectBooth}
          onClose={() => setIsQRModalOpen(false)}
        />
      )}

      {/* Heritage Footer */}
      <footer
        style={{
          borderTop: '1px solid var(--footer-border)',
          background: 'var(--footer-bg)',
          padding: '40px 20px 52px 20px',
          textAlign: 'center',
          color: 'var(--text-secondary)',
          fontSize: '0.86rem',
          transition: 'background-color 0.3s ease, border-color 0.3s ease'
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'center' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--gold-accent)',
              fontWeight: 800,
              fontSize: '0.92rem',
              letterSpacing: '1px'
            }}
          >
            <Sparkles size={16} />
            <span>{language === 'vi' ? 'KHÔNG GIAN TRẢI NGHIỆM DI SẢN BẢO TÀNG SỐ' : 'DIGITAL HERITAGE SMART MUSEUM'}</span>
          </div>

          <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.65, maxWidth: '600px' }}>
            {language === 'vi'
              ? 'Dự án ứng dụng công nghệ quét mã QR và thuyết minh âm thanh thông minh tại 3 gian trưng bày: Di tích lịch sử, Công trình kiến trúc và Phong tục tập quán.'
              : 'Smart museum exhibition application with QR code integration, bilingual presentation, and auto-scrolling audio guide across 3 heritage pavilions.'}
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '6px' }}>
            <button
              onClick={() => setIsQRModalOpen(true)}
              style={{
                background: 'var(--gold-subtle)',
                border: '1px solid var(--border-gold)',
                padding: '7px 15px',
                borderRadius: '9px',
                color: 'var(--gold-accent)',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <QrCode size={13} />
              <span>{language === 'vi' ? 'Quản lý & In Mã QR 3 Gian' : 'Print 3 Booth QR Codes'}</span>
            </button>

            <button
              onClick={toggleLanguage}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                padding: '7px 15px',
                borderRadius: '9px',
                color: 'var(--text-primary)',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <Globe size={13} />
              <span>{language === 'vi' ? 'English Version' : 'Phiên bản Tiếng Việt'}</span>
            </button>

            <button
              onClick={toggleDarkMode}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                padding: '7px 15px',
                borderRadius: '9px',
                color: 'var(--text-primary)',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              {isDarkMode ? <Sun size={13} /> : <Moon size={13} />}
              <span>{isDarkMode ? (language === 'vi' ? 'Giao diện Sáng' : 'Light Mode') : (language === 'vi' ? 'Giao diện Tối' : 'Dark Mode')}</span>
            </button>
          </div>

          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px', width: '100%', marginTop: '10px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} Cultural Heritage Exhibition. Gìn giữ & Tỏa sáng Di sản Dân tộc Việt Nam.
          </div>
        </div>
      </footer>
    </div>
  );
}
