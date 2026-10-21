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

  const statIcons = [<Calendar size={15} />, <Award size={15} />, <MapPin size={15} />, <Clock size={15} />];

  return (
    <article
      style={{
        maxWidth: '880px',
        margin: '0 auto',
        padding: '32px 20px 140px 20px',
        color: 'var(--text-primary)',
        lineHeight: 1.8
      }}
    >
      {/* Pavilion Badge & Title */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 18px',
            borderRadius: '24px',
            background: 'var(--gold-subtle)',
            border: '1px solid var(--border-gold)',
            color: 'var(--gold-primary)',
            fontSize: '0.82rem',
            fontWeight: 700,
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            marginBottom: '16px'
          }}
        >
          <Sparkles size={14} />
          {booth.tag[language] || booth.tag.vi}
        </div>

        <h1
          style={{
            fontSize: 'clamp(1.75rem, 4.2vw, 2.7rem)',
            color: 'var(--text-title)',
            fontFamily: "var(--font-serif)",
            fontWeight: 700,
            lineHeight: 1.25,
            margin: '0 0 16px 0',
            textShadow: '0 1px 2px rgba(0,0,0,0.05)'
          }}
        >
          {booth.title[language] || booth.title.vi}
        </h1>

        <p
          style={{
            fontSize: '1.08rem',
            color: 'var(--gold-primary)',
            fontStyle: 'italic',
            maxWidth: '720px',
            margin: '0 auto',
            lineHeight: 1.6
          }}
        >
          {booth.subtitle[language] || booth.subtitle.vi}
        </p>
      </div>

      {/* Hero Exhibition Image */}
      <div
        style={{
          position: 'relative',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 15px 35px rgba(0, 0, 0, 0.12), 0 0 1px rgba(0, 0, 0, 0.2)',
          border: '1px solid var(--border-gold)',
          marginBottom: '24px',
          cursor: 'pointer',
          background: 'var(--bg-secondary)'
        }}
        onClick={() => onOpenLightbox(booth.heroImage, booth.heroCaption[language] || booth.heroCaption.vi)}
        title={language === 'vi' ? 'Nhấn để phóng to hình ảnh' : 'Click to view full image'}
      >
        <img
          src={booth.heroImage}
          alt={booth.title[language] || booth.title.vi}
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: '490px',
            objectFit: 'cover',
            display: 'block',
            transition: 'transform 0.4s ease'
          }}
        />

        <div
          style={{
            position: 'absolute',
            bottom: '14px',
            right: '14px',
            background: 'rgba(0, 0, 0, 0.72)',
            backdropFilter: 'blur(8px)',
            color: '#ffd700',
            padding: '6px 14px',
            borderRadius: '20px',
            fontSize: '0.75rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            border: '1px solid rgba(255, 215, 0, 0.35)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
          }}
        >
          <ZoomIn size={14} />
          <span>{language === 'vi' ? 'Phóng to ảnh' : 'Zoom image'}</span>
        </div>
      </div>

      {/* Hero Image Caption */}
      <p
        style={{
          textAlign: 'center',
          fontSize: '0.9rem',
          color: 'var(--text-muted)',
          fontStyle: 'italic',
          marginTop: '-12px',
          marginBottom: '28px'
        }}
      >
        {booth.heroCaption[language] || booth.heroCaption.vi}
      </p>

      {/* Heritage Stats Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
          gap: '12px',
          marginBottom: '32px'
        }}
      >
        {booth.stats.map((st, i) => (
          <div
            key={i}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-gold)',
              borderRadius: '14px',
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: 'var(--shadow-card)'
            }}
          >
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '10px',
                background: 'var(--gold-subtle)',
                color: 'var(--gold-accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {statIcons[i] || <Sparkles size={15} />}
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {st.label[language] || st.label.vi}
              </div>
              <div style={{ fontSize: '0.94rem', color: 'var(--text-title)', fontWeight: 700 }}>
                {st.value[language] || st.value.vi}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Audio Tour Feature Banner (Hình thức 3) */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-gold)',
          borderRadius: '18px',
          padding: '20px 22px',
          marginBottom: '38px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          boxShadow: 'var(--shadow-card)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'var(--gold-gradient)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(217, 119, 6, 0.35)'
            }}
          >
            <Volume2 size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.02rem', fontWeight: 700, color: 'var(--text-title)' }}>
              {language === 'vi' ? 'Trải Nghiệm Thuyết Minh Âm Thanh Tự Động' : 'Smart Museum Audio Tour'}
            </div>
            <div style={{ fontSize: '0.84rem', color: 'var(--gold-primary)' }}>
              {language === 'vi'
                ? 'Website sẽ tự đọc bài viết và tự động cuộn màn hình theo từng đoạn'
                : 'The guide reads aloud and smoothly auto-scrolls down paragraph by paragraph'}
            </div>
          </div>
        </div>

        <button
          onClick={isAudioPlaying ? onPauseAudio : onStartAudio}
          style={{
            padding: '11px 22px',
            borderRadius: '12px',
            background: isAudioPlaying ? 'var(--gold-subtle)' : 'var(--gold-gradient)',
            border: isAudioPlaying ? '1px solid var(--gold-accent)' : 'none',
            color: isAudioPlaying ? 'var(--gold-accent)' : '#ffffff',
            fontWeight: 700,
            fontSize: '0.88rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            boxShadow: isAudioPlaying ? 'none' : '0 4px 16px rgba(217, 119, 6, 0.35)'
          }}
        >
          {isAudioPlaying ? (
            <>
              <Pause size={16} />
              <span>{language === 'vi' ? 'Tạm Dừng Audio' : 'Pause Audio'}</span>
            </>
          ) : (
            <>
              <Play size={16} fill="#ffffff" />
              <span>{language === 'vi' ? 'Bắt Đầu Nghe' : 'Play Tour'}</span>
            </>
          )}
        </button>
      </div>

      {/* Main Text Content Sections */}
      <div>
        {booth.sections.map((sec, secIdx) => (
          <section key={sec.id} style={{ marginBottom: '40px' }}>
            {/* Section Title */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '18px',
                borderBottom: '1.5px solid var(--border-gold)',
                paddingBottom: '10px'
              }}
            >
              <h2
                style={{
                  fontSize: '1.28rem',
                  fontFamily: "var(--font-serif)",
                  color: 'var(--text-title)',
                  margin: 0,
                  fontWeight: 700
                }}
              >
                {sec.title[language] || sec.title.vi}
              </h2>
            </div>

            {/* Paragraphs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {sec.paragraphs.map((p) => {
                const isActive = activeParagraphId === p.id;

                return (
                  <div
                    key={p.id}
                    id={p.id}
                    onClick={() => onJumpToParagraph(p.id)}
                    style={{
                      position: 'relative',
                      padding: '18px 22px',
                      borderRadius: '14px',
                      background: isActive ? 'var(--bg-active-p)' : 'var(--bg-card)',
                      border: isActive
                        ? '2px solid var(--border-active-p)'
                        : '1px solid var(--border-subtle)',
                      boxShadow: isActive ? 'var(--shadow-active)' : 'var(--shadow-card)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    title={language === 'vi' ? 'Chạm để nghe đoạn này' : 'Click to listen to this section'}
                  >
                    {/* Active Paragraph Indicator */}
                    {isActive && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '-11px',
                          left: '16px',
                          background: 'var(--gold-gradient)',
                          color: '#ffffff',
                          fontSize: '0.68rem',
                          fontWeight: 800,
                          padding: '2px 10px',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          letterSpacing: '0.5px',
                          boxShadow: '0 2px 8px rgba(217, 119, 6, 0.4)'
                        }}
                      >
                        <Volume2 size={12} />
                        <span>{language === 'vi' ? 'ĐANG PHÁT' : 'NOW PLAYING'}</span>
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onJumpToParagraph(p.id);
                        }}
                        aria-label="Phát đoạn này"
                        style={{
                          marginTop: '3px',
                          width: '30px',
                          height: '30px',
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
                        <Volume2 size={14} />
                      </button>

                      <p
                        style={{
                          margin: 0,
                          fontSize: '1.04rem',
                          color: isActive ? 'var(--text-title)' : 'var(--text-primary)',
                          fontWeight: isActive ? 600 : 400,
                          lineHeight: 1.88,
                          textAlign: 'justify'
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
                  marginTop: '30px',
                  borderRadius: '18px',
                  overflow: 'hidden',
                  border: '1px solid var(--border-gold)',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.08)',
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
                    maxHeight: '450px',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
                <div
                  style={{
                    padding: '14px 18px',
                    background: 'var(--bg-card)',
                    fontSize: '0.9rem',
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
        <div
          style={{
            position: 'relative',
            background: 'var(--bg-card)',
            borderLeft: '5px solid var(--gold-accent)',
            borderRadius: '0 16px 16px 0',
            padding: '22px 26px',
            margin: '42px 0',
            fontStyle: 'italic',
            fontSize: '1.08rem',
            color: 'var(--gold-primary)',
            lineHeight: 1.78,
            boxShadow: 'var(--shadow-card)'
          }}
        >
          {booth.highlightQuote[language] || booth.highlightQuote.vi}
        </div>
      )}

      {/* Navigation to Other Booths */}
      <div
        style={{
          borderTop: '1px solid var(--border-gold)',
          paddingTop: '32px',
          marginTop: '40px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          {prevBooth ? (
            <button
              onClick={() => {
                onSelectBooth(prevBooth.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{
                padding: '11px 18px',
                borderRadius: '12px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-gold)',
                color: 'var(--text-title)',
                fontSize: '0.86rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-card)'
              }}
            >
              <ArrowLeft size={16} />
              <span>{language === 'vi' ? `Gian trước: ${prevBooth.tag.vi}` : `Previous: ${prevBooth.tag.en}`}</span>
            </button>
          ) : <div />}

          {nextBooth ? (
            <button
              onClick={() => {
                onSelectBooth(nextBooth.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{
                padding: '11px 18px',
                borderRadius: '12px',
                background: 'var(--gold-gradient)',
                border: 'none',
                color: '#ffffff',
                fontSize: '0.86rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(217, 119, 6, 0.35)'
              }}
            >
              <span>{language === 'vi' ? `Gian tiếp: ${nextBooth.tag.vi}` : `Next: ${nextBooth.tag.en}`}</span>
              <ArrowRight size={16} />
            </button>
          ) : <div />}
        </div>

        <div style={{ textAlign: 'center', marginTop: '12px' }}>
          <button
            onClick={onOpenQRModal}
            style={{
              background: 'transparent',
              border: '1px dashed var(--gold-accent)',
              borderRadius: '10px',
              padding: '10px 20px',
              color: 'var(--gold-accent)',
              fontSize: '0.84rem',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}
          >
            <QrCode size={15} />
            <span>{language === 'vi' ? 'Xem mã QR của gian này & các gian khác' : 'View QR codes for all booths'}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
