import { Volume2, Play, Pause, ZoomIn, Sparkles, MapPin, Calendar, Award, Clock, ArrowRight, ArrowLeft, QrCode } from 'lucide-react';

export default function BoothArticle({
  booth,
  language,
  activeParagraphId,
  isAudioPlaying,
  onStartAudio,
  onPauseAudio,
  onJumpToParagraph,
  onOpenLightbox,
  onSelectBooth,
  allBooths,
  onOpenQRModal
}) {
  const currentIdx = allBooths.findIndex(b => b.id === booth.id);
  const prevBooth = currentIdx > 0 ? allBooths[currentIdx - 1] : null;
  const nextBooth = currentIdx < allBooths.length - 1 ? allBooths[currentIdx + 1] : null;

  const statIcons = [<Calendar size={14} />, <Award size={14} />, <MapPin size={14} />, <Clock size={14} />];

  return (
    <article className="rwd-article">
      {/* Pavilion Badge & Title */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 14px',
            borderRadius: '20px',
            background: 'var(--gold-subtle)',
            border: '1px solid var(--border-gold)',
            color: 'var(--gold-primary)',
            fontSize: '0.78rem',
            fontWeight: 800,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            marginBottom: '12px'
          }}
        >
          <Sparkles size={13} />
          {booth.tag[language] || booth.tag.vi}
        </div>

        <h1
          style={{
            fontSize: 'clamp(1.5rem, 4.5vw, 2.6rem)',
            color: 'var(--text-title)',
            fontFamily: "var(--font-serif)",
            fontWeight: 700,
            lineHeight: 1.25,
            margin: '0 0 12px 0',
            textShadow: '0 1px 2px rgba(0,0,0,0.04)'
          }}
        >
          {booth.title[language] || booth.title.vi}
        </h1>

        <p
          style={{
            fontSize: 'clamp(0.95rem, 2vw, 1.08rem)',
            color: 'var(--gold-primary)',
            fontStyle: 'italic',
            maxWidth: '680px',
            margin: '0 auto',
            lineHeight: 1.6
          }}
        >
          {booth.subtitle[language] || booth.subtitle.vi}
        </p>
      </div>

      {/* Hero Exhibition Image */}
      <div
        className="rwd-hero-img-box"
        onClick={() => onOpenLightbox(booth.heroImage, booth.heroCaption[language] || booth.heroCaption.vi)}
        title={language === 'vi' ? 'Nhấn để phóng to hình ảnh' : 'Click to view full image'}
      >
        <img
          src={booth.heroImage}
          alt={booth.title[language] || booth.title.vi}
          className="rwd-hero-img"
        />

        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            background: 'rgba(0, 0, 0, 0.72)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            color: '#ffd700',
            padding: '5px 12px',
            borderRadius: '16px',
            fontSize: '0.72rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            border: '1px solid rgba(255, 215, 0, 0.35)'
          }}
        >
          <ZoomIn size={13} />
          <span>{language === 'vi' ? 'Phóng to' : 'Zoom'}</span>
        </div>
      </div>

      {/* Hero Image Caption */}
      <p
        style={{
          textAlign: 'center',
          fontSize: '0.86rem',
          color: 'var(--text-muted)',
          fontStyle: 'italic',
          marginTop: '-10px',
          marginBottom: '22px'
        }}
      >
        {booth.heroCaption[language] || booth.heroCaption.vi}
      </p>

      {/* Heritage Stats Grid: Responsive 4 cols on desktop, 2 cols on mobile */}
      <div className="rwd-stats-grid">
        {booth.stats.map((st, i) => (
          <div
            key={i}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-gold)',
              borderRadius: '12px',
              padding: '11px 13px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: 'var(--shadow-card)'
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'var(--gold-subtle)',
                color: 'var(--gold-accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              {statIcons[i] || <Sparkles size={14} />}
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {st.label[language] || st.label.vi}
              </div>
              <div style={{ fontSize: '0.88rem', color: 'var(--text-title)', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {st.value[language] || st.value.vi}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Audio Tour Feature Callout Banner */}
      <div className="rwd-audio-banner">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: '220px', flex: 1 }}>
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              background: 'var(--gold-gradient)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 3px 12px rgba(217, 119, 6, 0.35)',
              flexShrink: 0
            }}
          >
            <Volume2 size={23} />
          </div>
          <div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-title)' }}>
              {language === 'vi' ? 'Thuyết Minh Âm Thanh Tự Động' : 'Smart Museum Audio Tour'}
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--gold-primary)', lineHeight: 1.4 }}>
              {language === 'vi'
                ? 'Website tự đọc bài viết và tự động cuộn màn hình theo từng đoạn'
                : 'Auto-reads aloud and smoothly scrolls down paragraph by paragraph'}
            </div>
          </div>
        </div>

        <button
          onClick={isAudioPlaying ? onPauseAudio : onStartAudio}
          className="rwd-audio-btn"
          style={{
            background: isAudioPlaying ? 'var(--gold-subtle)' : 'var(--gold-gradient)',
            border: isAudioPlaying ? '1.5px solid var(--gold-accent)' : 'none',
            color: isAudioPlaying ? 'var(--gold-accent)' : '#ffffff',
            boxShadow: isAudioPlaying ? 'none' : '0 4px 14px rgba(217, 119, 6, 0.35)'
          }}
        >
          {isAudioPlaying ? (
            <>
              <Pause size={17} />
              <span>{language === 'vi' ? 'Tạm Dừng Thuyết Minh' : 'Pause Audio'}</span>
            </>
          ) : (
            <>
              <Play size={17} fill="#ffffff" />
              <span>{language === 'vi' ? 'Bắt Đầu Nghe Thuyết Minh' : 'Play Audio Tour'}</span>
            </>
          )}
        </button>
      </div>

      {/* Main Text Content Sections */}
      <div>
        {booth.sections.map((sec, secIdx) => (
          <section key={sec.id} style={{ marginBottom: '36px' }}>
            {/* Section Title */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '16px',
                borderBottom: '1.5px solid var(--border-gold)',
                paddingBottom: '8px'
              }}
            >
              <h2
                style={{
                  fontSize: 'clamp(1.15rem, 2.5vw, 1.32rem)',
                  fontFamily: "var(--font-serif)",
                  color: 'var(--text-title)',
                  margin: 0,
                  fontWeight: 700
                }}
              >
                {sec.title[language] || sec.title.vi}
              </h2>
            </div>

            {/* Paragraphs as touchable cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {sec.paragraphs.map((p) => {
                const isActive = activeParagraphId === p.id;

                return (
                  <div
                    key={p.id}
                    id={p.id}
                    onClick={() => onJumpToParagraph(p.id)}
                    className="rwd-paragraph-card"
                    style={{
                      background: isActive ? 'var(--bg-active-p)' : 'var(--bg-card)',
                      border: isActive
                        ? '2px solid var(--border-active-p)'
                        : '1px solid var(--border-subtle)',
                      boxShadow: isActive ? 'var(--shadow-active)' : 'var(--shadow-card)'
                    }}
                    title={language === 'vi' ? 'Chạm để nghe đoạn này' : 'Click to listen to this section'}
                  >
                    {/* Active Paragraph Indicator */}
                    {isActive && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '-10px',
                          left: '14px',
                          background: 'var(--gold-gradient)',
                          color: '#ffffff',
                          fontSize: '0.66rem',
                          fontWeight: 800,
                          padding: '2px 8px',
                          borderRadius: '6px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '3px',
                          letterSpacing: '0.5px',
                          boxShadow: '0 2px 8px rgba(217, 119, 6, 0.4)'
                        }}
                      >
                        <Volume2 size={11} />
                        <span>{language === 'vi' ? 'ĐANG PHÁT' : 'NOW PLAYING'}</span>
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onJumpToParagraph(p.id);
                        }}
                        aria-label="Phát đoạn này"
                        style={{
                          marginTop: '2px',
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          background: isActive ? 'var(--gold-accent)' : 'var(--gold-subtle)',
                          color: isActive ? '#ffffff' : 'var(--gold-accent)',
                          border: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          flexShrink: 0
                        }}
                      >
                        <Volume2 size={15} />
                      </button>

                      <p
                        className="rwd-paragraph-text"
                        style={{
                          color: isActive ? 'var(--text-title)' : 'var(--text-primary)',
                          fontWeight: isActive ? 600 : 400
                        }}
                      >
                        {p[language] || p.vi}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Insert Detail Photo after Section 2 */}
            {secIdx === 1 && booth.detailImage && (
              <div
                style={{
                  marginTop: '24px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid var(--border-gold)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                  cursor: 'pointer',
                  background: 'var(--bg-secondary)'
                }}
                onClick={() => onOpenLightbox(booth.detailImage, booth.detailCaption[language] || booth.detailCaption.vi)}
                title={language === 'vi' ? 'Nhấn để phóng to hình ảnh' : 'Click to view full image'}
              >
                <img
                  src={booth.detailImage}
                  alt={booth.detailCaption[language] || booth.detailCaption.vi}
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: 'min(45vh, 420px)',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
                <div
                  style={{
                    padding: '10px 14px',
                    background: 'var(--bg-card)',
                    fontSize: '0.84rem',
                    color: 'var(--gold-primary)',
                    fontStyle: 'italic',
                    textAlign: 'center',
                    borderTop: '1px solid var(--border-gold)'
                  }}
                >
                  🔍 {booth.detailCaption[language] || booth.detailCaption.vi}
                </div>
              </div>
            )}
          </section>
        ))}
      </div>

      {/* Historical Callout Quote */}
      {booth.highlightQuote && (
        <div className="rwd-quote-box">
          {booth.highlightQuote[language] || booth.highlightQuote.vi}
        </div>
      )}

      {/* Navigation to Other Booths */}
      <div
        style={{
          borderTop: '1px solid var(--border-gold)',
          paddingTop: '26px',
          marginTop: '34px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}
      >
        <div className="rwd-booth-nav-grid">
          {prevBooth ? (
            <button
              onClick={() => {
                onSelectBooth(prevBooth.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="rwd-booth-nav-btn"
              style={{
                padding: '11px 16px',
                borderRadius: '12px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-gold)',
                color: 'var(--text-title)',
                fontSize: '0.84rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-card)'
              }}
            >
              <ArrowLeft size={15} />
              <span>{language === 'vi' ? `Gian 0${prevBooth.boothNumber}: ${prevBooth.tag.vi.split('•')[1] || prevBooth.tag.vi}` : `Zone 0${prevBooth.boothNumber}`}</span>
            </button>
          ) : <div />}

          {nextBooth ? (
            <button
              onClick={() => {
                onSelectBooth(nextBooth.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="rwd-booth-nav-btn"
              style={{
                padding: '11px 16px',
                borderRadius: '12px',
                background: 'var(--gold-gradient)',
                border: 'none',
                color: '#ffffff',
                fontSize: '0.84rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(217, 119, 6, 0.35)'
              }}
            >
              <span>{language === 'vi' ? `Gian 0${nextBooth.boothNumber}: ${nextBooth.tag.vi.split('•')[1] || nextBooth.tag.vi}` : `Zone 0${nextBooth.boothNumber}`}</span>
              <ArrowRight size={15} />
            </button>
          ) : <div />}
        </div>

        <div style={{ textAlign: 'center', marginTop: '6px' }}>
          <button
            onClick={onOpenQRModal}
            style={{
              background: 'transparent',
              border: '1px dashed var(--gold-accent)',
              borderRadius: '10px',
              padding: '9px 18px',
              color: 'var(--gold-accent)',
              fontSize: '0.82rem',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}
          >
            <QrCode size={15} />
            <span>{language === 'vi' ? 'Xem mã QR 3 gian cho điện thoại' : 'View QR codes for mobile'}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
