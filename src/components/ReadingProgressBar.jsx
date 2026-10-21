import { useState, useEffect } from 'react';

export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${progress}%`,
        height: '3.5px',
        background: 'linear-gradient(90deg, #b8860b, #d4af37, #ffd700, #ffb347)',
        boxShadow: '0 0 10px rgba(255, 215, 0, 0.7), 0 0 4px rgba(212, 175, 55, 0.9)',
        zIndex: 9999,
        transition: 'width 0.1s ease-out',
        pointerEvents: 'none'
      }}
    />
  );
}
