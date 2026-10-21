import { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { X, Download, ExternalLink, Printer } from 'lucide-react';

export default function QRStationModal({ booths, language, currentBoothId, onSelectBooth, onClose }) {
  const [qrImages, setQrImages] = useState({});

  useEffect(() => {
    const origin = window.location.origin;
    const pathname = window.location.pathname;
    const codes = {};

    const generateAll = async () => {
      for (const b of booths) {
        const url = `${origin}${pathname}?booth=${b.id}`;
        try {
          const dataUrl = await QRCode.toDataURL(url, {
            width: 320,
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
  }, [booths]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(10px)',
        zIndex: 9990,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        overflowY: 'auto'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--bg-card)',
          border: '1.5px solid var(--border-gold)',
          borderRadius: '24px',
          padding: '30px 26px',
          maxWidth: '860px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.2), 0 0 1px rgba(0,0,0,0.1)',
          color: 'var(--text-primary)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--border-gold)', paddingBottom: '16px' }}>
          <div>
            <span style={{ color: 'var(--gold-accent)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 800 }}>
              {language === 'vi' ? 'TRUNG TÂM MÃ QR TRIỂN LÃM' : 'EXHIBITION QR STATION HUB'}
            </span>
            <h2 style={{ margin: '4px 0 0 0', fontSize: '1.45rem', color: 'var(--text-title)', fontFamily: "var(--font-serif)", fontWeight: 700 }}>
              {language === 'vi' ? '3 Mã QR Tương Ứng 3 Gian Trưng Bày' : '3 QR Codes for the 3 Pavilions'}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Đóng"
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '50%',
              width: '38px',
              height: '38px',
              color: 'var(--text-title)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={20} />
          </button>
        </div>

        <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
          {language === 'vi'
            ? 'Tại mỗi gian trưng bày thực tế, ban tổ chức in và đặt 1 mã QR tương ứng dưới đây. Khách tham quan dùng camera điện thoại quét mã sẽ truy cập trực tiếp vào bài thuyết minh của gian đó.'
            : 'At each physical exhibition zone, place the corresponding QR code below. Visitors scan with their smartphone camera to directly open that zone’s guide.'}
        </p>

        {/* 3 QR Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px',
            marginBottom: '26px'
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
                  borderRadius: '18px',
                  padding: '18px',
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
                      fontSize: '0.72rem',
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

                <div
                  style={{
                    background: '#ffffff',
                    padding: '10px',
                    borderRadius: '14px',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
                    marginBottom: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: '160px',
                    minHeight: '160px',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  {qr?.dataUrl ? (
                    <img
                      src={qr.dataUrl}
                      alt={`QR Booth ${b.boothNumber}`}
                      style={{ width: '150px', height: '150px', display: 'block' }}
                    />
                  ) : (
                    <div style={{ color: '#888', fontSize: '0.8rem' }}>Generating QR...</div>
                  )}
                </div>

                <div style={{ fontWeight: 800, fontSize: '0.82rem', color: 'var(--gold-accent)', textTransform: 'uppercase', marginBottom: '4px' }}>
                  {b.tag[language] || b.tag.vi}
                </div>

                <div style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-title)', marginBottom: '16px', minHeight: '44px', lineHeight: 1.35 }}>
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
                      padding: '9px 12px',
                      borderRadius: '10px',
                      background: isCurrent ? 'var(--gold-gradient)' : 'var(--bg-card)',
                      border: isCurrent ? 'none' : '1px solid var(--border-gold)',
                      color: isCurrent ? '#ffffff' : 'var(--text-title)',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px',
                      cursor: 'pointer',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
                    }}
                  >
                    <ExternalLink size={14} />
                    {language === 'vi' ? 'Mở gian' : 'Open'}
                  </button>

                  {qr?.dataUrl && (
                    <a
                      href={qr.dataUrl}
                      download={`QR_Gian_${b.boothNumber}_${b.id}.png`}
                      title={language === 'vi' ? 'Tải ảnh QR về máy' : 'Download QR Image'}
                      style={{
                        padding: '9px 12px',
                        borderRadius: '10px',
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

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', borderTop: '1px solid var(--border-gold)', paddingTop: '18px' }}>
          <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
            💡 {language === 'vi' ? 'Gợi ý: Quét mã bằng camera iPhone / Android để thử nghiệm trải nghiệm di động' : 'Tip: Scan with smartphone camera to test mobile experience'}
          </div>

          <button
            onClick={handlePrint}
            style={{
              padding: '11px 20px',
              borderRadius: '12px',
              background: 'var(--gold-gradient)',
              color: '#ffffff',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.9rem',
              boxShadow: '0 4px 14px rgba(217, 119, 6, 0.35)'
            }}
          >
            <Printer size={16} />
            {language === 'vi' ? 'In Biển Mã QR Gian Hàng' : 'Print Exhibition Cards'}
          </button>
        </div>
      </div>
    </div>
  );
}
