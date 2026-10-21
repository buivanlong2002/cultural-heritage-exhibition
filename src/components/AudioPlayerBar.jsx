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
      className="audio-floating-player"
      style={{
        position: 'fixed',
        bottom: 'max(16px, env(safe-area-inset-bottom, 16px))',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 24px)',
        maxWidth: '680px',
        zIndex: 9900,
        animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <div
        style={{
          background: 'var(--audio-bar-bg)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1.5px solid var(--audio-bar-border)',
          borderRadius: '18px',
          padding: '10px 14px',
          boxShadow: '0 12px 35px rgba(0, 0, 0, 0.16)',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          transition: 'all 0.3s ease'
        }}
      >
        {/* Top subtle progress bar */}
        <div
          style={{
            width: '100%',
            height: '3px',
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
            gap: '6px'
          }}
        >
          {/* Status & Waveform Indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '95px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                gap: '2px',
                height: '16px',
                padding: '0 2px'
              }}
            >
              {[0.4, 0.9, 0.6, 1.0, 0.5].map((scale, i) => (
                <span
                  key={i}
                  style={{
                    width: '3px',
                    height: isPlaying ? `${scale * 14}px` : '3px',
                    background: 'var(--gold-accent)',
                    borderRadius: '2px',
                    transition: 'height 0.2s ease',
                    animation: isPlaying ? `wavePulse 0.8s ease-in-out infinite alternate ${i * 0.15}s` : 'none'
                  }}
                />
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.68rem', color: 'var(--gold-accent)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                AUDIO GUIDE
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-title)', fontWeight: 700 }}>
                {language === 'vi'
                  ? `${currentChunk}/${totalParagraphs}`
                  : `${currentChunk}/${totalParagraphs}`}
              </span>
            </div>
          </div>

          {/* Central Playback Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button
              onClick={onPrev}
              disabled={currentParagraphIndex <= 0}
              title={language === 'vi' ? 'Đoạn trước' : 'Previous section'}
              aria-label="Đoạn trước"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                color: currentParagraphIndex <= 0 ? 'var(--text-muted)' : 'var(--text-title)',
                borderRadius: '50%',
                width: '34px',
                height: '34px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: currentParagraphIndex <= 0 ? 'not-allowed' : 'pointer',
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
              }}
            >
              <SkipBack size={14} />
            </button>

            {isPlaying ? (
              <button
                onClick={onPause}
                title={language === 'vi' ? 'Tạm dừng' : 'Pause'}
                aria-label="Tạm dừng"
                style={{
                  background: 'var(--gold-gradient)',
                  border: 'none',
                  color: '#ffffff',
                  borderRadius: '50%',
                  width: '42px',
                  height: '42px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(217, 119, 6, 0.45)'
                }}
              >
                <Pause size={17} fill="#ffffff" />
              </button>
            ) : (
              <button
                onClick={isPaused ? onResume : onPlay}
                title={language === 'vi' ? 'Phát thuyết minh' : 'Play guide'}
                aria-label="Phát thuyết minh"
                style={{
                  background: 'var(--gold-gradient)',
                  border: 'none',
                  color: '#ffffff',
                  borderRadius: '50%',
                  width: '42px',
                  height: '42px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(217, 119, 6, 0.45)'
                }}
              >
                <Play size={17} fill="#ffffff" style={{ marginLeft: '2px' }} />
              </button>
            )}

            <button
              onClick={onNext}
              disabled={currentParagraphIndex >= totalParagraphs - 1}
              title={language === 'vi' ? 'Đoạn tiếp theo' : 'Next section'}
              aria-label="Đoạn tiếp theo"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                color: currentParagraphIndex >= totalParagraphs - 1 ? 'var(--text-muted)' : 'var(--text-title)',
                borderRadius: '50%',
                width: '34px',
                height: '34px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: currentParagraphIndex >= totalParagraphs - 1 ? 'not-allowed' : 'pointer',
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
              }}
            >
              <SkipForward size={14} />
            </button>
          </div>

          {/* Right Action Controls: Auto-Scroll, Speed, Stop */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            {/* Auto-scroll toggle */}
            <button
              onClick={onToggleAutoScroll}
              title={
                autoScroll
                  ? language === 'vi' ? 'Tự cuộn màn hình: Đang BẬT' : 'Auto-scroll: ON'
                  : language === 'vi' ? 'Tự cuộn màn hình: Đang TẮT' : 'Auto-scroll: OFF'
              }
              aria-label="Tự cuộn"
              style={{
                padding: '6px 9px',
                borderRadius: '8px',
                background: autoScroll ? 'var(--gold-subtle)' : 'var(--bg-card)',
                border: autoScroll ? '1px solid var(--gold-accent)' : '1px solid var(--border-subtle)',
                color: autoScroll ? 'var(--gold-accent)' : 'var(--text-muted)',
                fontSize: '0.72rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
                cursor: 'pointer'
              }}
            >
              <MoveVertical size={13} />
              <span className="hide-on-mobile">{language === 'vi' ? 'Tự cuộn' : 'Scroll'}</span>
            </button>

            {/* Playback speed */}
            <button
              onClick={onChangeRate}
              title={language === 'vi' ? 'Thay đổi tốc độ đọc' : 'Playback speed'}
              aria-label="Tốc độ đọc"
              style={{
                padding: '6px 8px',
                borderRadius: '8px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-title)',
                fontSize: '0.72rem',
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
              aria-label="Nhạc thiền"
              style={{
                padding: '6px 7px',
                borderRadius: '8px',
                background: isAmbientPlaying ? 'rgba(42, 111, 103, 0.15)' : 'var(--bg-card)',
                border: isAmbientPlaying ? '1px solid #2a6f67' : '1px solid var(--border-subtle)',
                color: isAmbientPlaying ? '#2a6f67' : 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <Music size={13} />
            </button>

            {/* Stop button */}
            <button
              onClick={onStop}
              title={language === 'vi' ? 'Dừng thuyết minh' : 'Stop audio'}
              aria-label="Dừng thuyết minh"
              style={{
                padding: '6px 7px',
                borderRadius: '8px',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.25)',
                color: '#dc2626',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <Square size={12} fill="#dc2626" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
