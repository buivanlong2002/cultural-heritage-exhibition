import { X, ZoomIn } from 'lucide-react';

export default function ImageLightbox({ image, caption, onClose }) {
  if (!image) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 7, 10, 0.92)',
        backdropFilter: 'blur(12px)',
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.25s ease-out'
      }}
    >
      <button
        onClick={onClose}
        aria-label="Đóng ảnh"
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          background: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(212, 175, 55, 0.4)',
          borderRadius: '50%',
          width: '44px',
          height: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffd700',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
      >
        <X size={24} />
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '92vw',
          maxHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <img
          src={image}
          alt={caption || 'Chi tiết hiện vật'}
          style={{
            maxWidth: '100%',
            maxHeight: '75vh',
            objectFit: 'contain',
            borderRadius: '12px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(212, 175, 55, 0.2)',
            border: '1px solid rgba(212, 175, 55, 0.3)'
          }}
        />
        {caption && (
          <p
            style={{
              marginTop: '16px',
              color: '#e2d9c8',
              fontSize: '0.95rem',
              textAlign: 'center',
              maxWidth: '650px',
              fontStyle: 'italic',
              lineHeight: 1.5,
              textShadow: '0 2px 4px rgba(0,0,0,0.8)'
            }}
          >
            {caption}
          </p>
        )}
      </div>
    </div>
  );
}
