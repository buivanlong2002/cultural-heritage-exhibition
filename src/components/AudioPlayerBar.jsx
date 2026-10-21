import { Play, Pause, Square, SkipBack, SkipForward, MoveVertical, Music } from 'lucide-react';

export default function AudioPlayerBar({
  isPlaying,
  isPaused,
  currentParagraphIndex,
  totalParagraphs,
  autoScroll,
  onToggleAutoScroll,
  playbackRate,
  onChangeRate,
  onPlay,
  onPause,
  onResume,
  onStop,
  onNext,
  onPrev,
  language,
  isAmbientPlaying,
  onToggleAmbient
}) {
  const currentChunk = currentParagraphIndex >= 0 ? currentParagraphIndex + 1 : 0;
  const progressPercent = totalParagraphs > 0 ? (currentChunk / totalParagraphs) * 100 : 0;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 32px)',
        maxWidth: '720px',
        zIndex: 9900,
        animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <div
        style={{
          background: 'var(--audio-bar-bg)',
          backdropFilter: 'blur(20px)',
          border: '1.5px solid var(--audio-bar-border)',
          borderRadius: '20px',
          padding: '12px 18px',
          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.16), 0 0 1px rgba(0,0,0,0.2)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          transition: 'all 0.3s ease'
        }}
      >
        {/* Top subtle progress bar */}
        <div
          style={{
            width: '100%',
            height: '3.5px',
            background: 'var(--border-subtle)',
            borderRadius: '2px',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              width: `${progressPercent}%`,
              height: '100%',
              background: 'var(--gold-gradient)',
              transition: 'width 0.3s ease'
            }}
          />
        </div>

        {/* Main Controls Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px'
          }}
        >
          {/* Status & Waveform Indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: '130px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                gap: '2px',
                height: '18px',
                padding: '0 4px'
              }}
            >
              {[0.4, 0.9, 0.6, 1.0, 0.5].map((scale, i) => (
                <span
                  key={i}
                  style={{
                    width: '3.5px',
                    height: isPlaying ? `${scale * 16}px` : '4px',
                    background: 'var(--gold-accent)',
                    borderRadius: '2px',
                    transition: 'height 0.2s ease',
                    animation: isPlaying ? `wavePulse 0.8s ease-in-out infinite alternate ${i * 0.15}s` : 'none'
                  }}
                />
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.74rem', color: 'var(--gold-accent)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {language === 'vi' ? 'THUYẾT MINH ÂM THANH' : 'AUDIO GUIDE'}
              </span>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-title)', fontWeight: 700 }}>
                {language === 'vi'
                  ? `Đoạn ${currentChunk} / ${totalParagraphs}`
                  : `Section ${currentChunk} / ${totalParagraphs}`}
              </span>
            </div>
          </div>

          {/* Central Playback Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={onPrev}
              disabled={currentParagraphIndex <= 0}
              title={language === 'vi' ? 'Đoạn trước' : 'Previous section'}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                color: currentParagraphIndex <= 0 ? 'var(--text-muted)' : 'var(--text-title)',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: currentParagraphIndex <= 0 ? 'not-allowed' : 'pointer',
                boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
              }}
            >
              <SkipBack size={15} />
            </button>

            {isPlaying ? (
              <button
                onClick={onPause}
                title={language === 'vi' ? 'Tạm dừng' : 'Pause'}
                style={{
                  background: 'var(--gold-gradient)',
                  border: 'none',
                  color: '#ffffff',
                  borderRadius: '50%',
                  width: '44px',
                  height: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(217, 119, 6, 0.45)'
                }}
              >
                <Pause size={18} fill="#ffffff" />
              </button>
            ) : (
              <button
                onClick={isPaused ? onResume : onPlay}
                title={language === 'vi' ? 'Phát thuyết minh' : 'Play guide'}
                style={{
                  background: 'var(--gold-gradient)',
                  border: 'none',
                  color: '#ffffff',
                  borderRadius: '50%',
                  width: '44px',
                  height: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(217, 119, 6, 0.45)'
                }}
              >
                <Play size={18} fill="#ffffff" style={{ marginLeft: '2px' }} />
              </button>
            )}

            <button
              onClick={onNext}
              disabled={currentParagraphIndex >= totalParagraphs - 1}
              title={language === 'vi' ? 'Đoạn tiếp theo' : 'Next section'}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                color: currentParagraphIndex >= totalParagraphs - 1 ? 'var(--text-muted)' : 'var(--text-title)',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: currentParagraphIndex >= totalParagraphs - 1 ? 'not-allowed' : 'pointer',
                boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
              }}
            >
              <SkipForward size={15} />
            </button>
          </div>

          {/* Right Action Controls: Auto-Scroll, Speed, Stop */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {/* Auto-scroll toggle */}
            <button
              onClick={onToggleAutoScroll}
              title={
                autoScroll
                  ? language === 'vi' ? 'Tự cuộn màn hình: Đang BẬT' : 'Auto-scroll: ON'
                  : language === 'vi' ? 'Tự cuộn màn hình: Đang TẮT' : 'Auto-scroll: OFF'
              }
              style={{
                padding: '7px 11px',
                borderRadius: '9px',
                background: autoScroll ? 'var(--gold-subtle)' : 'var(--bg-card)',
                border: autoScroll ? '1px solid var(--gold-accent)' : '1px solid var(--border-subtle)',
                color: autoScroll ? 'var(--gold-accent)' : 'var(--text-muted)',
                fontSize: '0.74rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                cursor: 'pointer'
              }}
            >
              <MoveVertical size={13} />
              <span className="hide-on-mobile">{language === 'vi' ? 'Tự cuộn' : 'Scroll'}</span>
            </button>

            {/* Playback speed */}
            <button
              onClick={onChangeRate}
              title={language === 'vi' ? 'Thay đổi tốc độ đọc' : 'Change playback speed'}
              style={{
                padding: '7px 10px',
                borderRadius: '9px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-title)',
                fontSize: '0.74rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {playbackRate}x
            </button>

            {/* Ambient Chime Music Toggle */}
            <button
              onClick={onToggleAmbient}
              title={isAmbientPlaying ? (language === 'vi' ? 'Tắt nhạc thiền' : 'Mute ambient chime') : (language === 'vi' ? 'Bật nhạc thiền' : 'Play ambient chime')}
              style={{
                padding: '7px 9px',
                borderRadius: '9px',
                background: isAmbientPlaying ? 'rgba(42, 111, 103, 0.15)' : 'var(--bg-card)',
                border: isAmbientPlaying ? '1px solid #2a6f67' : '1px solid var(--border-subtle)',
                color: isAmbientPlaying ? '#2a6f67' : 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <Music size={14} />
            </button>

            {/* Stop button */}
            <button
              onClick={onStop}
              title={language === 'vi' ? 'Dừng thuyết minh' : 'Stop audio'}
              style={{
                padding: '7px 9px',
                borderRadius: '9px',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.25)',
                color: '#dc2626',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <Square size={13} fill="#dc2626" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
