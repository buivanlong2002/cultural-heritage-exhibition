import { useState, useEffect, useRef, useCallback } from 'react';

export function useAudioGuide({ booth, language, onParagraphChange }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState(-1);
  const [autoScroll, setAutoScroll] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [supported, setSupported] = useState(true);
  const [availableVoices, setAvailableVoices] = useState([]);

  // Flatten all paragraphs of the current booth for sequential reading
  const allParagraphs = useRef([]);
  useEffect(() => {
    if (!booth) return;
    const list = [];
    booth.sections.forEach((sec, sIdx) => {
      sec.paragraphs.forEach((p, pIdx) => {
        list.push({
          id: p.id,
          secIndex: sIdx,
          pIndex: pIdx,
          text: p[language] || p.vi,
          secTitle: sec.title[language] || sec.title.vi
        });
      });
    });
    allParagraphs.current = list;
  }, [booth, language]);

  // Load voices
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setSupported(false);
      return;
    }
    const updateVoices = () => {
      const v = window.speechSynthesis.getVoices();
      setAvailableVoices(v);
    };
    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;
  }, []);

  const stopAudio = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentParagraphIndex(-1);
    if (onParagraphChange) onParagraphChange(null);
  }, [onParagraphChange]);

  // Read a specific paragraph index
  const playParagraph = useCallback((index) => {
    if (!('speechSynthesis' in window)) return;
    const items = allParagraphs.current;
    if (index < 0 || index >= items.length) {
      stopAudio();
      return;
    }

    window.speechSynthesis.cancel();

    const targetItem = items[index];
    setCurrentParagraphIndex(index);
    setIsPlaying(true);
    setIsPaused(false);

    if (onParagraphChange) {
      onParagraphChange(targetItem.id);
    }

    // Auto scroll if enabled
    if (autoScroll) {
      setTimeout(() => {
        const el = document.getElementById(targetItem.id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 80);
    }

    const utterance = new SpeechSynthesisUtterance(targetItem.text);
    utterance.lang = language === 'vi' ? 'vi-VN' : 'en-US';
    utterance.rate = playbackRate;

    // Select suitable voice
    if (availableVoices.length > 0) {
      const targetLang = language === 'vi' ? 'vi' : 'en';
      const voice = availableVoices.find(v => v.lang.toLowerCase().startsWith(targetLang));
      if (voice) {
        utterance.voice = voice;
      }
    }

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      // Proceed to next paragraph
      if (index + 1 < items.length) {
        playParagraph(index + 1);
      } else {
        // Finished all
        stopAudio();
      }
    };

    utterance.onerror = (e) => {
      if (e.error !== 'canceled' && e.error !== 'interrupted') {
        // Continue to next on minor error
        if (index + 1 < items.length) {
          playParagraph(index + 1);
        } else {
          stopAudio();
        }
      }
    };

    window.speechSynthesis.speak(utterance);
  }, [language, playbackRate, autoScroll, availableVoices, onParagraphChange, stopAudio]);

  const startAudio = useCallback(() => {
    if (currentParagraphIndex >= 0 && isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
    } else {
      playParagraph(0);
    }
  }, [currentParagraphIndex, isPaused, playParagraph]);

  const pauseAudio = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsPlaying(false);
    }
  }, []);

  const resumeAudio = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
    }
  }, []);

  const nextParagraph = useCallback(() => {
    const nextIdx = currentParagraphIndex + 1;
    if (nextIdx < allParagraphs.current.length) {
      playParagraph(nextIdx);
    } else {
      stopAudio();
    }
  }, [currentParagraphIndex, playParagraph, stopAudio]);

  const prevParagraph = useCallback(() => {
    const prevIdx = Math.max(0, currentParagraphIndex - 1);
    playParagraph(prevIdx);
  }, [currentParagraphIndex, playParagraph]);

  const jumpToParagraphById = useCallback((pId) => {
    const idx = allParagraphs.current.findIndex(p => p.id === pId);
    if (idx !== -1) {
      playParagraph(idx);
    }
  }, [playParagraph]);

  // Clean up when booth or language changes
  useEffect(() => {
    stopAudio();
  }, [booth?.id, language, stopAudio]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return {
    isPlaying,
    isPaused,
    currentParagraphIndex,
    currentParagraphId: allParagraphs.current[currentParagraphIndex]?.id || null,
    totalParagraphs: allParagraphs.current.length,
    autoScroll,
    setAutoScroll,
    playbackRate,
    setPlaybackRate,
    startAudio,
    stopAudio,
    pauseAudio,
    resumeAudio,
    nextParagraph,
    prevParagraph,
    playParagraph,
    jumpToParagraphById,
    supported
  };
}
