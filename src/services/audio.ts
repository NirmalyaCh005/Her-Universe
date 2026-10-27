/**
 * Web Audio API Sound Effects & Saiyaara Movie Songs Mashup Synthesizer
 * Zero external audio file dependencies needed!
 * Plays dreamy music box & acoustic chime versions of:
 * - Saiyaara (Ek Tha Tiger)
 * - Banjaara
 * - Dil Diyan Gallan
 * - Complete Saiyaara Movie Songs Mashup Medley
 * Plus optional custom MP3 audio support if provided.
 */

export interface MashupTrack {
  id: string;
  title: string;
  subtitle: string;
  movie: string;
  notes: { freq: number; dur: number; bass?: number }[];
}

// Frequency constants
const NOTE = {
  // Bass / Roots (Octave 2 & 3)
  E2: 82.41, F2: 87.31, G2: 98.00, Gs2: 103.83, A2: 110.00, B2: 123.47,
  C3: 130.81, Cs3: 138.59, D3: 146.83, Ds3: 155.56, E3: 164.81, Fs3: 185.00, G3: 196.00, Gs3: 207.65, A3: 220.00, B3: 246.94,
  // Mid Range (Octave 4)
  C4: 261.63, Cs4: 277.18, D4: 293.66, Ds4: 311.13, E4: 329.63, F4: 349.23, Fs4: 369.99, G4: 392.00, Gs4: 415.30, A4: 440.00, As4: 466.16, B4: 493.88,
  // Treble / Melody (Octave 5)
  C5: 523.25, Cs5: 554.37, D5: 587.33, Ds5: 622.25, E5: 659.25, F5: 698.46, Fs5: 739.99, G5: 783.99, Gs5: 830.61, A5: 880.00, As5: 932.33, B5: 987.77,
  // High Sparkles (Octave 6)
  C6: 1046.50, Cs6: 1108.73, Ds6: 1244.51, E6: 1318.51,
  REST: 0,
};

// 1. Saiyaara Melody Sequence (Ek Tha Tiger)
const saiyaaraMelody = [
  // "Aasmaan... tera mera hua"
  { freq: NOTE.Cs5, dur: 420, bass: NOTE.Cs3 },
  { freq: NOTE.Ds5, dur: 420 },
  { freq: NOTE.E5, dur: 680, bass: NOTE.A2 },
  { freq: NOTE.E5, dur: 320 },
  { freq: NOTE.Ds5, dur: 320 },
  { freq: NOTE.Cs5, dur: 320 },
  { freq: NOTE.B4, dur: 700, bass: NOTE.E3 },
  // "Khwaab ki tarah dhuaan dhuaan"
  { freq: NOTE.B4, dur: 360 },
  { freq: NOTE.Cs5, dur: 360 },
  { freq: NOTE.Ds5, dur: 580, bass: NOTE.B2 },
  { freq: NOTE.Ds5, dur: 340 },
  { freq: NOTE.Cs5, dur: 340 },
  { freq: NOTE.B4, dur: 340 },
  { freq: NOTE.As4, dur: 650, bass: NOTE.Fs3 },
  // "Saiyaara tu saiyaara..."
  { freq: NOTE.Gs4, dur: 280, bass: NOTE.Cs3 },
  { freq: NOTE.Cs5, dur: 340 },
  { freq: NOTE.Ds5, dur: 340 },
  { freq: NOTE.E5, dur: 780, bass: NOTE.A2 },
  // "Saiyaara tu saiyaara..."
  { freq: NOTE.Gs4, dur: 280, bass: NOTE.B2 },
  { freq: NOTE.Cs5, dur: 340 },
  { freq: NOTE.Ds5, dur: 340 },
  { freq: NOTE.E5, dur: 780, bass: NOTE.E3 },
  // "Sitaron ke jahan mein milenge ab yaara..."
  { freq: NOTE.E5, dur: 340, bass: NOTE.A2 },
  { freq: NOTE.Ds5, dur: 340 },
  { freq: NOTE.Cs5, dur: 340 },
  { freq: NOTE.Ds5, dur: 340 },
  { freq: NOTE.E5, dur: 450, bass: NOTE.Gs2 },
  { freq: NOTE.Ds5, dur: 340 },
  { freq: NOTE.Cs5, dur: 340 },
  { freq: NOTE.B4, dur: 450, bass: NOTE.B2 },
  { freq: NOTE.Cs5, dur: 520 },
  { freq: NOTE.As4, dur: 420 },
  { freq: NOTE.Gs4, dur: 900, bass: NOTE.Cs3 },
  // "Tu jo mila... toh yun laga... Sab mil gaya..."
  { freq: NOTE.Gs4, dur: 340 },
  { freq: NOTE.Cs5, dur: 360, bass: NOTE.A2 },
  { freq: NOTE.Ds5, dur: 400 },
  { freq: NOTE.E5, dur: 680, bass: NOTE.B2 },
  { freq: NOTE.Ds5, dur: 340 },
  { freq: NOTE.Cs5, dur: 340 },
  { freq: NOTE.B4, dur: 520, bass: NOTE.E3 },
  { freq: NOTE.Cs5, dur: 950, bass: NOTE.Cs3 },
];

// 2. Banjaara Melody Sequence
const banjaaraMelody = [
  // "Jaise koi kinara... deta ho sahara..."
  { freq: NOTE.E5, dur: 360, bass: NOTE.E3 },
  { freq: NOTE.Fs5, dur: 360 },
  { freq: NOTE.G5, dur: 580, bass: NOTE.C3 },
  { freq: NOTE.Fs5, dur: 340 },
  { freq: NOTE.E5, dur: 450 },
  { freq: NOTE.D5, dur: 340 },
  { freq: NOTE.C5, dur: 340, bass: NOTE.A2 },
  { freq: NOTE.D5, dur: 340 },
  { freq: NOTE.E5, dur: 560, bass: NOTE.B2 },
  { freq: NOTE.D5, dur: 340 },
  { freq: NOTE.C5, dur: 340 },
  { freq: NOTE.B4, dur: 750, bass: NOTE.E3 },
  // "Banjaara ko ghar mila..."
  { freq: NOTE.E5, dur: 340, bass: NOTE.C3 },
  { freq: NOTE.G5, dur: 360 },
  { freq: NOTE.A5, dur: 420, bass: NOTE.D3 },
  { freq: NOTE.B5, dur: 680, bass: NOTE.G2 },
  { freq: NOTE.A5, dur: 420 },
  { freq: NOTE.G5, dur: 360 },
  { freq: NOTE.E5, dur: 920, bass: NOTE.E3 },
];

// 3. Dil Diyan Gallan Melody Sequence
const dilDiyanGallanMelody = [
  // "Kacchi doriyon doriyon se... mainu tu baandh le..."
  { freq: NOTE.E5, dur: 350, bass: NOTE.A2 },
  { freq: NOTE.E5, dur: 350 },
  { freq: NOTE.Gs5, dur: 450, bass: NOTE.Cs3 },
  { freq: NOTE.Fs5, dur: 350 },
  { freq: NOTE.E5, dur: 350 },
  { freq: NOTE.Ds5, dur: 350, bass: NOTE.B2 },
  { freq: NOTE.E5, dur: 450 },
  { freq: NOTE.Fs5, dur: 620, bass: NOTE.E3 },
  // "Dil diyan gallan... karange roz roz beh ke..."
  { freq: NOTE.Gs4, dur: 340, bass: NOTE.Cs3 },
  { freq: NOTE.Cs5, dur: 360 },
  { freq: NOTE.Cs5, dur: 360 },
  { freq: NOTE.Cs5, dur: 360 },
  { freq: NOTE.Ds5, dur: 360, bass: NOTE.A2 },
  { freq: NOTE.E5, dur: 580 },
  { freq: NOTE.Ds5, dur: 340 },
  { freq: NOTE.Cs5, dur: 340 },
  { freq: NOTE.B4, dur: 340, bass: NOTE.B2 },
  { freq: NOTE.As4, dur: 340 },
  { freq: NOTE.B4, dur: 450 },
  { freq: NOTE.Cs5, dur: 950, bass: NOTE.Cs3 },
];

// 4. Complete Saiyaara Movie Songs Mashup Medley
const fullMashupMedley = [
  ...saiyaaraMelody,
  { freq: NOTE.REST, dur: 400 },
  ...banjaaraMelody,
  { freq: NOTE.REST, dur: 400 },
  ...dilDiyanGallanMelody,
  { freq: NOTE.REST, dur: 400 },
];

export const MASHUP_TRACKS: MashupTrack[] = [
  {
    id: 'saiyaara-chillout-mashup',
    title: 'Saiyaara Mashup 💖',
    subtitle: 'Saiyaara x Barbaad • Chillout Lofi',
    movie: 'For Princess Jiya 🎀',
    notes: fullMashupMedley,
  },
  {
    id: 'saiyaara-title',
    title: 'Saiyaara (Music Box)',
    subtitle: 'Sitaron Ke Jahan Mein Milenge Ab Yaara',
    movie: 'Ek Tha Tiger 🌙',
    notes: saiyaaraMelody,
  },
  {
    id: 'banjaara',
    title: 'Banjaara (Chimes)',
    subtitle: 'Jaise Koi Kinara Deta Ho Sahara',
    movie: 'Acoustic Lofi ✨',
    notes: banjaaraMelody,
  },
  {
    id: 'dil-diyan-gallan',
    title: 'Dil Diyan Gallan 🌸',
    subtitle: 'Karange Roz Roz Beh Ke',
    movie: 'Sweet Melodies 💖',
    notes: dilDiyanGallanMelody,
  },
];

class SoundService {
  private audioCtx: AudioContext | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.55;
  private musicTimeout: number | null = null;
  private isMusicPlaying: boolean = false;
  private customAudio: HTMLAudioElement | null = null;
  private currentTrackIndex: number = 0;
  private currentStep: number = 0;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.audioCtx = new AudioCtx();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  public setVolume(v: number) {
    this.volume = Math.max(0, Math.min(1, v));
    if (this.customAudio) {
      this.customAudio.volume = this.volume;
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopMusic();
    } else {
      this.startMusic();
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public getIsPlaying(): boolean {
    return this.isMusicPlaying;
  }

  public getCurrentTrack(): MashupTrack {
    return MASHUP_TRACKS[this.currentTrackIndex] || MASHUP_TRACKS[0];
  }

  public getCurrentTrackIndex(): number {
    return this.currentTrackIndex;
  }

  public setTrackIndex(index: number, customUrl: string = '/audio/saiyaara-mashup.webm') {
    this.currentTrackIndex = (index + MASHUP_TRACKS.length) % MASHUP_TRACKS.length;
    this.currentStep = 0;
    if (this.isMusicPlaying) {
      this.stopSynthesizer();
      if (this.customAudio) {
        this.customAudio.pause();
      }
      if (this.currentTrackIndex === 0) {
        this.playAudioFile(customUrl);
      } else {
        this.startSynthesizer();
      }
    }
  }

  public nextTrack(customUrl?: string): MashupTrack {
    this.setTrackIndex(this.currentTrackIndex + 1, customUrl);
    return this.getCurrentTrack();
  }

  public prevTrack(customUrl?: string): MashupTrack {
    this.setTrackIndex(this.currentTrackIndex - 1, customUrl);
    return this.getCurrentTrack();
  }

  // Cute pop sound for collecting hearts or tapping buttons
  public playPop() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(580, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(this.volume * 0.35, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.13);
    } catch {
      // AudioContext policy
    }
  }

  // Dreamy celestial chime for opening envelopes or discovering hidden secrets
  public playChime() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const freqs = [554.37, 659.25, 830.61, 1108.73]; // C#5, E5, G#5, C#6
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.07);

        gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.07);
        gain.gain.linearRampToValueAtTime(this.volume * 0.25, ctx.currentTime + idx * 0.07 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.07 + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.07);
        osc.stop(ctx.currentTime + idx * 0.07 + 0.65);
      });
    } catch {
      // AudioContext policy
    }
  }

  // Gentle blowing whoosh for blowing out cake candles
  public playBlowingCandle() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const bufferSize = ctx.sampleRate * 0.4;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.4);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(this.volume * 0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
      noise.stop(ctx.currentTime + 0.42);
    } catch {
      // AudioContext policy
    }
  }

  // Joyful celebratory harp chord for final victory / puzzle solve
  public playCelebration() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const chords = [554.37, 659.25, 830.61, 987.77, 1108.73, 1318.51];
      chords.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);

        gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.06);
        gain.gain.linearRampToValueAtTime(this.volume * 0.2, ctx.currentTime + idx * 0.06 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.06 + 0.9);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.06);
        osc.stop(ctx.currentTime + idx * 0.06 + 0.95);
      });
    } catch {
      // AudioContext policy
    }
  }

  // 🚀 Skyshot Rocket Launch Whoosh & Screamer Whistle
  public playSkyshotLaunch(pitch: number = 1.0) {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const vol = this.volume * 0.45;

      // 1. Mortar launch pneumatic pop
      const popOsc = ctx.createOscillator();
      const popGain = ctx.createGain();
      popOsc.type = 'sine';
      popOsc.frequency.setValueAtTime(160 * pitch, now);
      popOsc.frequency.exponentialRampToValueAtTime(45, now + 0.12);

      popGain.gain.setValueAtTime(vol * 0.7, now);
      popGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      popOsc.connect(popGain);
      popGain.connect(ctx.destination);
      popOsc.start(now);
      popOsc.stop(now + 0.13);

      // 2. High whistling screamer rocket ascending into sky
      const whistleOsc = ctx.createOscillator();
      const whistleGain = ctx.createGain();
      whistleOsc.type = 'sawtooth';
      whistleOsc.frequency.setValueAtTime(500 * pitch, now);
      whistleOsc.frequency.exponentialRampToValueAtTime(1750 * pitch, now + 0.48);

      const whistleFilter = ctx.createBiquadFilter();
      whistleFilter.type = 'bandpass';
      whistleFilter.Q.setValueAtTime(12, now);
      whistleFilter.frequency.setValueAtTime(500 * pitch, now);
      whistleFilter.frequency.exponentialRampToValueAtTime(1750 * pitch, now + 0.48);

      whistleGain.gain.setValueAtTime(0, now);
      whistleGain.gain.linearRampToValueAtTime(vol * 0.4, now + 0.08);
      whistleGain.gain.linearRampToValueAtTime(vol * 0.5, now + 0.38);
      whistleGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      whistleOsc.connect(whistleFilter);
      whistleFilter.connect(whistleGain);
      whistleGain.connect(ctx.destination);

      whistleOsc.start(now);
      whistleOsc.stop(now + 0.52);
    } catch {
      // AudioContext policy
    }
  }

  private sharedNoiseBuffer: AudioBuffer | null = null;

  private getSharedNoiseBuffer(ctx: AudioContext): AudioBuffer {
    if (!this.sharedNoiseBuffer || this.sharedNoiseBuffer.sampleRate !== ctx.sampleRate) {
      const size = Math.floor(ctx.sampleRate * 1.2);
      this.sharedNoiseBuffer = ctx.createBuffer(1, size, ctx.sampleRate);
      const data = this.sharedNoiseBuffer.getChannelData(0);
      for (let i = 0; i < size; i++) {
        data[i] = Math.random() * 2 - 1;
      }
    }
    return this.sharedNoiseBuffer;
  }

  // 💥 Skyshot Apex Shell Detonation: Heavy Sub-Bass Boom + Gunpowder Shockwave Crack + Cascading Crackles
  public playSkyshotDetonation(pitch: number = 1.0) {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const vol = this.volume * 0.75;
      const noiseBuf = this.getSharedNoiseBuffer(ctx);

      // 1. Deep Sub-Bass Chest Thump (85Hz down to 24Hz)
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(90 * pitch, now);
      subOsc.frequency.exponentialRampToValueAtTime(24, now + 0.75);

      subGain.gain.setValueAtTime(vol * 0.95, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

      subOsc.connect(subGain);
      subGain.connect(ctx.destination);
      subOsc.start(now);
      subOsc.stop(now + 0.82);

      // 2. Gunpowder Explosive Shockwave (reusing pre-allocated shared noise buffer)
      const noiseSrc = ctx.createBufferSource();
      noiseSrc.buffer = noiseBuf;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'lowpass';
      noiseFilter.frequency.setValueAtTime(1100 * pitch, now);
      noiseFilter.frequency.exponentialRampToValueAtTime(160, now + 0.42);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(vol * 0.85, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      noiseSrc.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noiseSrc.start(now);
      noiseSrc.stop(now + 0.46);

      // 3. Sizzling Crackle Cascade (1 single noise node with scheduled micro-spikes - zero memory allocations)
      const crackleSrc = ctx.createBufferSource();
      crackleSrc.buffer = noiseBuf;

      const crackleFilter = ctx.createBiquadFilter();
      crackleFilter.type = 'bandpass';
      crackleFilter.frequency.setValueAtTime(2500 * pitch, now);
      crackleFilter.Q.setValueAtTime(4, now);

      const crackleGain = ctx.createGain();
      crackleGain.gain.setValueAtTime(0, now);

      // Schedule 8 rapid micro crackle pops directly in Web Audio engine thread
      const numPops = 8;
      for (let i = 0; i < numPops; i++) {
        const popTime = now + 0.14 + i * 0.075 + Math.random() * 0.03;
        const popVol = vol * (0.18 + Math.random() * 0.22);
        crackleGain.gain.setValueAtTime(popVol, popTime);
        crackleGain.gain.exponentialRampToValueAtTime(0.001, popTime + 0.025);
      }

      crackleSrc.connect(crackleFilter);
      crackleFilter.connect(crackleGain);
      crackleGain.connect(ctx.destination);
      crackleSrc.start(now + 0.14);
      crackleSrc.stop(now + 0.85);
    } catch {
      // AudioContext policy
    }
  }

  // 🎆 Full Skyshot Sequence: Launch Whistle -> Apex Explosion -> Echoing Crackles
  public playSkyshot(pitch: number = 1.0, flightDurationMs: number = 500) {
    this.playSkyshotLaunch(pitch);
    window.setTimeout(() => {
      this.playSkyshotDetonation(pitch);
    }, flightDurationMs);
  }

  // Play native audio file (e.g. downloaded YouTube WebM/MP3)
  public playAudioFile(url: string) {
    if (!this.customAudio || !this.customAudio.src.includes(url)) {
      if (this.customAudio) {
        this.customAudio.pause();
      }
      this.customAudio = new Audio(url);
      this.customAudio.loop = true;
      this.customAudio.volume = this.volume;
    }
    this.customAudio
      .play()
      .then(() => {
        this.isMusicPlaying = true;
      })
      .catch(() => {
        // Fallback to synthesizer if browser audio policy blocks audio element
        this.startSynthesizer();
      });
  }

  // Start music (plays YouTube mashup for track 0, or synthesizes acoustic chimes for others)
  public startMusic(customUrl: string = '/audio/saiyaara-mashup.webm') {
    if (this.isMusicPlaying) return;
    this.isMuted = false;

    if (this.currentTrackIndex === 0) {
      this.playAudioFile(customUrl);
      return;
    }

    this.startSynthesizer();
  }

  // Synthesize Saiyaara Mashup in real-time with dual-voice music box & bass harmony
  private startSynthesizer() {
    const ctx = this.getContext();
    if (!ctx) return;

    this.isMusicPlaying = true;
    const track = this.getCurrentTrack();

    const scheduleNextNote = () => {
      if (!this.isMusicPlaying || this.isMuted) return;

      const note = track.notes[this.currentStep % track.notes.length];
      this.currentStep++;

      if (note.freq > 0) {
        try {
          // 1. Lead Melody Note (Music box / celestial bell)
          const osc1 = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          const gainNode = ctx.createGain();

          osc1.type = 'triangle';
          osc1.frequency.setValueAtTime(note.freq, ctx.currentTime);

          // Soft octave harmonic sparkle
          osc2.type = 'sine';
          osc2.frequency.setValueAtTime(note.freq * 2, ctx.currentTime);

          const noteVol = this.volume * 0.16;
          gainNode.gain.setValueAtTime(0, ctx.currentTime);
          gainNode.gain.linearRampToValueAtTime(noteVol, ctx.currentTime + 0.015);
          gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.95);

          osc1.connect(gainNode);
          osc2.connect(gainNode);
          gainNode.connect(ctx.destination);

          osc1.start();
          osc2.start();
          osc1.stop(ctx.currentTime + 1.0);
          osc2.stop(ctx.currentTime + 1.0);

          // 2. Warm Root Bass Harmony Note (if note has bass)
          if (note.bass && note.bass > 0) {
            const bassOsc = ctx.createOscillator();
            const bassGain = ctx.createGain();

            bassOsc.type = 'sine';
            bassOsc.frequency.setValueAtTime(note.bass, ctx.currentTime);

            const bassVol = this.volume * 0.12;
            bassGain.gain.setValueAtTime(0, ctx.currentTime);
            bassGain.gain.linearRampToValueAtTime(bassVol, ctx.currentTime + 0.03);
            bassGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.4);

            bassOsc.connect(bassGain);
            bassGain.connect(ctx.destination);

            bassOsc.start();
            bassOsc.stop(ctx.currentTime + 1.5);
          }
        } catch {
          // Audio policy
        }
      }

      // Schedule the next note according to its duration
      this.musicTimeout = window.setTimeout(scheduleNextNote, note.dur);
    };

    scheduleNextNote();
  }

  private stopSynthesizer() {
    if (this.musicTimeout !== null) {
      clearTimeout(this.musicTimeout);
      this.musicTimeout = null;
    }
  }

  public stopMusic() {
    this.isMusicPlaying = false;
    this.stopSynthesizer();
    if (this.customAudio) {
      this.customAudio.pause();
    }
  }
}

export const sound = new SoundService();
export default sound;
