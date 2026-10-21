// Traditional Vietnamese heritage ambient sound generator using Web Audio API
// Generates soft meditation bell & bamboo chimes in the Pentatonic (Ngũ Cung) scale
class HeritageAmbientSound {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.interval = null;
    // Pentatonic scale frequencies: C4, D4, F4, G4, A4, C5 (Hò, Xự, Xang, Xê, Cống)
    this.frequencies = [261.63, 293.66, 349.23, 392.00, 440.00, 523.25, 587.33];
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playBell(freq, duration = 3.5, volume = 0.08) {
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Soft attack and natural bell chime exponential decay
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(volume, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration + 0.1);
    } catch {
      // AudioContext safe fallback
    }
  }

  start() {
    if (this.isPlaying) return;
    this.init();
    if (!this.ctx) return;
    this.isPlaying = true;

    // Trigger initial chime
    this.playRandomChime();

    // Trigger serene, non-intrusive chimes every 4-7 seconds
    this.interval = setInterval(() => {
      if (this.isPlaying) {
        this.playRandomChime();
      }
    }, 4500);
  }

  playRandomChime() {
    const freq = this.frequencies[Math.floor(Math.random() * this.frequencies.length)];
    this.playBell(freq, 4.0, 0.05);
    // Occasionally add harmonious sub-octave tone
    if (Math.random() > 0.6) {
      setTimeout(() => {
        if (this.isPlaying) {
          const subFreq = freq * 0.75;
          this.playBell(subFreq, 3.0, 0.03);
        }
      }, 300);
    }
  }

  stop() {
    this.isPlaying = false;
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }
}

export const ambientSound = new HeritageAmbientSound();
