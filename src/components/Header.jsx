import { Landmark, Volume2, QrCode, Globe, Music, Sun, Moon } from 'lucide-react';

export default function Header({
  booths,
  currentBoothId,
  onSelectBooth,
  language,
  onToggleLanguage,
  isAudioPlaying,
  onStartAudio,
  onOpenQRModal,
  isAmbientPlaying,
  onToggleAmbient,
  isDarkMode,
  onToggleDarkMode
}) {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 9000,
        background: 'var(--bg-header)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-gold)',
        boxShadow: '0 4px 18px rgba(0, 0, 0, 0.04)',
        transition: 'background-color 0.3s ease, border-color 0.3s ease'
      }}
    >
      {/* Top Mobile-Friendly App Bar */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px'
        }}
      >
        {/* Brand / Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, flex: 1 }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'var(--gold-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 3px 10px rgba(217, 119, 6, 0.3)',
              color: '#ffffff',
              fontWeight: 800,
              flexShrink: 0
            }}
          >
            <Landmark size={20} />
          </div>

          <div style={{ minWidth: 0, overflow: 'hidden' }}>
            <div style={{ fontSize: '0.62rem', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--gold-accent)', fontWeight: 800, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {language === 'vi' ? 'BẢO TÀNG SỐ DI SẢN' : 'DIGITAL HERITAGE'}
            </div>
            <h1 style={{ margin: 0, fontSize: '0.96rem', fontWeight: 700, color: 'var(--text-title)', fontFamily: "var(--font-serif)", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {language === 'vi' ? 'Triển Lãm Di Sản' : 'Heritage Exhibition'}
            </h1>
          </div>
        </div>

        {/* Action Controls: Compact and Thumb-Friendly */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
          {/* Audio Quick Trigger */}
          <button
            onClick={onStartAudio}
            title={language === 'vi' ? 'Bật thuyết minh âm thanh' : 'Start audio guide'}
            aria-label="Thuyết minh âm thanh"
            style={{
              padding: '6px 10px',
              borderRadius: '9px',
              background: isAudioPlaying ? 'var(--gold-gradient)' : 'var(--gold-subtle)',
              border: '1px solid var(--border-gold)',
              color: isAudioPlaying ? '#ffffff' : 'var(--gold-accent)',
              fontWeight: 700,
              fontSize: '0.78rem',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: isAudioPlaying ? '0 0 10px rgba(217, 119, 6, 0.4)' : 'none'
            }}
          >
            <Volume2 size={15} />
            <span>
              {isAudioPlaying
                ? (language === 'vi' ? 'Đang đọc' : 'Playing')
                : (language === 'vi' ? 'Nghe' : 'Audio')}
            </span>
          </button>

          {/* Language Switcher (Hình thức 2) */}
          <button
            onClick={onToggleLanguage}
            title={language === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt'}
            aria-label="Đổi ngôn ngữ"
            style={{
              padding: '6px 9px',
              borderRadius: '9px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-gold)',
              color: 'var(--text-title)',
              fontWeight: 700,
              fontSize: '0.78rem',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-card)'
            }}
          >
            <Globe size={14} color="var(--gold-accent)" />
            <span>{language === 'vi' ? 'EN' : 'VI'}</span>
          </button>

          {/* Theme Switcher (Sáng / Tối) */}
          <button
            onClick={onToggleDarkMode}
            title={isDarkMode ? (language === 'vi' ? 'Giao diện Sáng' : 'Light Theme') : (language === 'vi' ? 'Giao diện Tối' : 'Dark Theme')}
            aria-label="Đổi giao diện sáng tối"
            style={{
              padding: '6px 8px',
              borderRadius: '9px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              color: isDarkMode ? '#ffd700' : '#b45309',
              fontSize: '0.78rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            {isDarkMode ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* QR Station Modal Button */}
          <button
            onClick={onOpenQRModal}
            title={language === 'vi' ? 'Mã QR Gian Hàng' : 'Booth QR Codes'}
            aria-label="Mã QR"
            style={{
              padding: '6px 8px',
              borderRadius: '9px',
              background: 'var(--bg-card-subtle)',
              border: '1px solid var(--border-gold)',
              color: 'var(--gold-accent)',
              fontSize: '0.78rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <QrCode size={16} />
          </button>
        </div>
      </div>

      {/* 3 Booths Tab Navigation: Smooth horizontal swipe on mobile */}
      <nav
        style={{
          background: 'var(--bg-nav)',
          borderTop: '1px solid var(--border-subtle)',
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          scrollbarWidth: 'none',
          padding: '4px 10px',
          display: 'flex',
          gap: '6px'
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            width: '100%',
            gap: '6px'
          }}
        >
          {booths.map((b) => {
            const isActive = b.id === currentBoothId;
            return (
              <button
                key={b.id}
                onClick={() => onSelectBooth(b.id)}
                style={{
                  flex: '1 1 auto',
                  padding: '8px 12px',
                  borderRadius: '10px',
                  border: isActive ? '1px solid var(--border-active-p)' : '1px solid transparent',
                  background: isActive ? 'var(--gold-subtle)' : 'transparent',
                  color: isActive ? 'var(--gold-accent)' : 'var(--text-secondary)',
                  fontWeight: isActive ? 800 : 500,
                  fontSize: '0.82rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <span
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    background: isActive ? 'var(--gold-accent)' : 'rgba(0,0,0,0.08)',
                    color: isActive ? '#ffffff' : 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    flexShrink: 0
                  }}
                >
                  {b.boothNumber}
                </span>
                <span style={{ whiteSpace: 'nowrap' }}>
                  {b.boothNumber === 1
                    ? (language === 'vi' ? 'Di tích' : 'Relics')
                    : b.boothNumber === 2
                    ? (language === 'vi' ? 'Kiến trúc' : 'Architecture')
                    : (language === 'vi' ? 'Phong tục' : 'Customs')}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
