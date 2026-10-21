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
        borderBottom: '1px solid var(--border-gold)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        transition: 'background-color 0.3s ease, border-color 0.3s ease'
      }}
    >
      {/* Top Banner Row */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '12px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px'
        }}
      >
        {/* Brand / Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'var(--gold-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(217, 119, 6, 0.3)',
              color: '#ffffff',
              fontWeight: 800
            }}
          >
            <Landmark size={22} />
          </div>

          <div>
            <div style={{ fontSize: '0.68rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold-accent)', fontWeight: 700 }}>
              {language === 'vi' ? 'BẢO TÀNG SỐ DI SẢN' : 'DIGITAL HERITAGE MUSEUM'}
            </div>
            <h1 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-title)', fontFamily: "var(--font-serif)" }}>
              {language === 'vi' ? 'Triển Lãm Di Sản Văn Hóa' : 'Cultural Heritage Exhibition'}
            </h1>
          </div>
        </div>

        {/* Action Controls: Audio, Ambient, Language Toggle, Theme, QR Station */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Audio Quick Trigger */}
          <button
            onClick={onStartAudio}
            title={language === 'vi' ? 'Bắt đầu thuyết minh âm thanh' : 'Start audio guide'}
            style={{
              padding: '7px 12px',
              borderRadius: '10px',
              background: isAudioPlaying ? 'var(--gold-gradient)' : 'var(--gold-subtle)',
              border: '1px solid var(--border-gold)',
              color: isAudioPlaying ? '#ffffff' : 'var(--gold-accent)',
              fontWeight: 700,
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: isAudioPlaying ? '0 0 12px rgba(217, 119, 6, 0.4)' : 'none'
            }}
          >
            <Volume2 size={16} />
            <span className="hide-on-mobile">
              {isAudioPlaying
                ? (language === 'vi' ? 'Đang đọc...' : 'Playing...')
                : (language === 'vi' ? 'Nghe Audio' : 'Audio Tour')}
            </span>
          </button>

          {/* Ambient Bell Music */}
          <button
            onClick={onToggleAmbient}
            title={language === 'vi' ? 'Nhạc chuông thiền truyền thống' : 'Ambient temple chime'}
            style={{
              padding: '7px 10px',
              borderRadius: '10px',
              background: isAmbientPlaying ? 'rgba(42, 111, 103, 0.15)' : 'var(--bg-card-subtle)',
              border: isAmbientPlaying ? '1px solid #2a6f67' : '1px solid var(--border-subtle)',
              color: isAmbientPlaying ? '#2a6f67' : 'var(--text-secondary)',
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer'
            }}
          >
            <Music size={15} />
            <span className="hide-on-mobile">{language === 'vi' ? 'Nhạc thiền' : 'Ambient'}</span>
          </button>

          {/* Language Switcher (Hình thức 2) */}
          <button
            onClick={onToggleLanguage}
            title={language === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt'}
            style={{
              padding: '7px 11px',
              borderRadius: '10px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-gold)',
              color: 'var(--text-primary)',
              fontWeight: 700,
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              letterSpacing: '0.5px',
              boxShadow: 'var(--shadow-card)'
            }}
          >
            <Globe size={15} color="var(--gold-accent)" />
            <span>{language === 'vi' ? '🇻🇳 VI | EN' : '🇬🇧 EN | VI'}</span>
          </button>

          {/* Theme Switcher (Sáng / Tối) */}
          <button
            onClick={onToggleDarkMode}
            title={isDarkMode ? (language === 'vi' ? 'Chuyển sang giao diện Sáng' : 'Switch to Light theme') : (language === 'vi' ? 'Chuyển sang giao diện Tối' : 'Switch to Dark theme')}
            style={{
              padding: '7px 10px',
              borderRadius: '10px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              color: isDarkMode ? '#ffd700' : '#b45309',
              fontSize: '0.8rem',
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
            title={language === 'vi' ? 'Mã QR 3 Gian Trưng Bày' : 'Exhibition QR Codes'}
            style={{
              padding: '7px 11px',
              borderRadius: '10px',
              background: 'var(--bg-card-subtle)',
              border: '1px solid var(--border-gold)',
              color: 'var(--gold-accent)',
              fontSize: '0.8rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              cursor: 'pointer'
            }}
          >
            <QrCode size={16} />
            <span className="hide-on-mobile">{language === 'vi' ? 'Mã QR Gian' : 'QR Desk'}</span>
          </button>
        </div>
      </div>

      {/* 3 Booths Tab Navigation (Gian 1, Gian 2, Gian 3) */}
      <nav
        style={{
          background: 'var(--bg-nav)',
          borderTop: '1px solid var(--border-subtle)',
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          scrollbarWidth: 'none'
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            padding: '4px 14px',
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
                  padding: '9px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  borderBottom: isActive ? '3px solid var(--gold-accent)' : '3px solid transparent',
                  background: isActive ? 'var(--gold-subtle)' : 'transparent',
                  color: isActive ? 'var(--gold-accent)' : 'var(--text-secondary)',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.86rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <span
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: isActive ? 'var(--gold-accent)' : 'rgba(0,0,0,0.08)',
                    color: isActive ? '#ffffff' : 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.72rem',
                    fontWeight: 700
                  }}
                >
                  {b.boothNumber}
                </span>
                <span>{b.tag[language] || b.tag.vi}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
