import { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { X, Download, ExternalLink, Printer, Smartphone, Wifi, Globe } from 'lucide-react';

export default function QRStationModal({ booths, language, currentBoothId, onSelectBooth, onClose }) {
  const [qrImages, setQrImages] = useState({});
  // Suggest the LAN Wi-Fi IP so phones on the same network can scan directly
  const [targetBaseUrl, setTargetBaseUrl] = useState(() => {
    if (typeof window !== 'undefined') {
      const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      // If running on localhost on developer machine, suggest the Wi-Fi IP 192.168.65.20:5174
      if (isLocal) {
        return `http://192.168.65.20:${window.location.port || '5174'}`;
      }
      return `${window.location.origin}${window.location.pathname}`;
    }
    return 'http://192.168.65.20:5174';
  });

  const [useCustomUrl, setUseCustomUrl] = useState(false);

  useEffect(() => {
    const codes = {};

    const generateAll = async () => {
      for (const b of booths) {
        const cleanBase = targetBaseUrl.replace(/\/+$/, '');
        const url = cleanBase.includes('?') 
          ? `${cleanBase}&booth=${b.id}` 
          : `${cleanBase}?booth=${b.id}`;

        try {
          const dataUrl = await QRCode.toDataURL(url, {
            width: 340,
            margin: 2,
            color: {
              dark: '#1c1409',
              light: '#ffffff'
            }
          });
          codes[b.id] = { dataUrl, url };
        } catch (err) {
          console.error('QR generation error:', err);
        }
      }
      setQrImages(codes);
    };

    generateAll();
  }, [booths, targetBaseUrl]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.7)',
        backdropFilter: 'blur(10px)',
        zIndex: 9990,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '12px',
        overflowY: 'auto'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--bg-card)',
          border: '1.5px solid var(--border-gold)',
          borderRadius: '24px',
          padding: '24px 20px',
          maxWidth: '860px',
          width: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.25)',
          color: 'var(--text-primary)'
        }}
      >
        {/* Header Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid var(--border-gold)', paddingBottom: '14px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--gold-accent)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 800 }}>
              <Smartphone size={15} />
              <span>{language === 'vi' ? 'QUÉT MÃ QR BẰNG ĐIỆN THOẠI' : 'MOBILE QR CODE SCANNING'}</span>
            </div>
            <h2 style={{ margin: '4px 0 0 0', fontSize: '1.35rem', color: 'var(--text-title)', fontFamily: "var(--font-serif)", fontWeight: 700 }}>
              {language === 'vi' ? '3 Mã QR Gian Hàng Triển Lãm' : '3 Pavilion QR Codes'}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Đóng"
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              color: 'var(--text-title)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Mobile Scanning Instructions Banner */}
        <div
          style={{
            background: 'var(--gold-subtle)',
            border: '1px solid var(--border-gold)',
            borderRadius: '14px',
            padding: '12px 14px',
            marginBottom: '18px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', fontWeight: 700, color: 'var(--gold-accent)' }}>
            <Wifi size={16} />
            <span>
              {language === 'vi'
                ? 'Hướng dẫn quét bằng camera điện thoại thông thường:'
                : 'Instructions for standard smartphone camera scanning:'}
            </span>
          </div>
          <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
            {language === 'vi'
              ? '1. Bật ứng dụng Camera (hoặc Zalo / Google Lens) trên điện thoại.'
              : '1. Open standard Camera (or QR reader) on your smartphone.'}
            <br />
            {language === 'vi'
              ? '2. Hướng camera vào mã QR của gian muốn xem (điện thoại cùng kết nối Wi-Fi).'
              : '2. Point camera at the pavilion QR code (ensure phone is on Wi-Fi).'}
            <br />
            {language === 'vi'
              ? '3. Chạm vào liên kết hiện lên để truy cập ngay bài thuyết minh của gian đó.'
              : '3. Tap the link banner to instantly access that pavilion’s guide.'}
          </p>

          {/* Network IP selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginTop: '4px', paddingTop: '6px', borderTop: '1px dashed var(--border-gold)' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              {language === 'vi' ? 'Địa chỉ liên kết mã QR:' : 'QR Target URL:'}
            </span>
            <input
              type="text"
              value={targetBaseUrl}
              onChange={(e) => setTargetBaseUrl(e.target.value)}
              style={{
                flex: 1,
                minWidth: '220px',
                padding: '5px 10px',
                borderRadius: '8px',
                border: '1px solid var(--border-gold)',
                background: 'var(--bg-card)',
                color: 'var(--text-title)',
                fontSize: '0.8rem',
                fontFamily: 'monospace'
              }}
            />
          </div>
        </div>

        {/* 3 QR Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px',
            marginBottom: '20px'
          }}
        >
          {booths.map((b) => {
            const qr = qrImages[b.id];
            const isCurrent = b.id === currentBoothId;

            return (
              <div
                key={b.id}
                style={{
                  background: isCurrent ? 'var(--bg-active-p)' : 'var(--bg-card-subtle)',
                  border: isCurrent ? '2px solid var(--border-active-p)' : '1px solid var(--border-gold)',
                  borderRadius: '16px',
                  padding: '16px 14px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  position: 'relative',
                  boxShadow: isCurrent ? 'var(--shadow-active)' : 'var(--shadow-card)'
                }}
              >
                {isCurrent && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-10px',
                      background: 'var(--gold-gradient)',
                      color: '#ffffff',
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      padding: '2px 10px',
                      borderRadius: '10px',
                      letterSpacing: '0.5px',
                      boxShadow: '0 2px 8px rgba(217, 119, 6, 0.4)'
                    }}
                  >
                    {language === 'vi' ? 'Đang mở' : 'Current'}
                  </span>
                )}

                {/* QR Code Container */}
                <div
                  style={{
                    background: '#ffffff',
                    padding: '8px',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    marginBottom: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '160px',
                    height: '160px',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  {qr?.dataUrl ? (
                    <img
                      src={qr.dataUrl}
                      alt={`QR Booth ${b.boothNumber}`}
                      style={{ width: '100%', height: '100%', display: 'block' }}
                    />
                  ) : (
                    <div style={{ color: '#888', fontSize: '0.8rem' }}>Generating QR...</div>
                  )}
                </div>

                <div style={{ fontWeight: 800, fontSize: '0.8rem', color: 'var(--gold-accent)', textTransform: 'uppercase', marginBottom: '2px' }}>
                  {b.tag[language] || b.tag.vi}
                </div>

                <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-title)', marginBottom: '12px', minHeight: '40px', lineHeight: 1.3 }}>
                  {b.title[language] || b.title.vi}
                </div>

                <div style={{ display: 'flex', gap: '8px', width: '100%', marginTop: 'auto' }}>
                  <button
                    onClick={() => {
                      onSelectBooth(b.id);
                      onClose();
                    }}
                    style={{
                      flex: 1,
                      padding: '8px 10px',
                      borderRadius: '9px',
                      background: isCurrent ? 'var(--gold-gradient)' : 'var(--bg-card)',
                      border: isCurrent ? 'none' : '1px solid var(--border-gold)',
                      color: isCurrent ? '#ffffff' : 'var(--text-title)',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    <ExternalLink size={14} />
                    {language === 'vi' ? 'Xem gian' : 'Open'}
                  </button>

                  {qr?.dataUrl && (
                    <a
                      href={qr.dataUrl}
                      download={`QR_Gian_${b.boothNumber}_${b.id}.png`}
                      title={language === 'vi' ? 'Tải ảnh QR về máy' : 'Download QR Image'}
                      style={{
                        padding: '8px 10px',
                        borderRadius: '9px',
                        background: 'var(--gold-subtle)',
                        border: '1px solid var(--border-gold)',
                        color: 'var(--gold-accent)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        textDecoration: 'none'
                      }}
                    >
                      <Download size={14} />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', borderTop: '1px solid var(--border-gold)', paddingTop: '16px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            📱 {language === 'vi' ? 'Thử mở camera điện thoại quét ngay mã QR trên màn hình!' : 'Try scanning the QR on screen with your phone camera!'}
          </div>

          <button
            onClick={handlePrint}
            style={{
              padding: '10px 18px',
              borderRadius: '10px',
              background: 'var(--gold-gradient)',
              color: '#ffffff',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.86rem',
              boxShadow: '0 4px 12px rgba(217, 119, 6, 0.35)'
            }}
          >
            <Printer size={15} />
            {language === 'vi' ? 'In Biển Mã QR Gian Hàng' : 'Print Exhibition Cards'}
          </button>
        </div>
      </div>
    </div>
  );
}
