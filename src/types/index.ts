export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  sweetReaction: string;
}

export interface ComplimentCard {
  id: number;
  emoji: string;
  title: string;
  message: string;
  highlight?: string;
}

export interface HiddenHeartItem {
  id: number;
  title: string;
  description: string;
  icon: string;
  message: string;
  position: { x: number; y: number }; // Percentage in room
}

export interface OpenWhenLetter {
  id: string;
  triggerTitle: string;
  envelopeColor: string;
  icon: string;
  subtitle: string;
  dateTag: string;
  letterContent: string[];
}

export interface GalleryPhoto {
  id: number;
  url: string;
  images?: string[];
  imageLabels?: string[];
  title: string;
  dateText: string;
  caption: string;
  rotation: number;
  objectPosition?: string;
}

export interface BirthdayConfig {
  girlfriendName: string;
  myName: string;
  birthdayDate: string; // YYYY-MM-DD
  subheading: string;
  introMessage: string;
  birthdayWish: string;
  birthdaySecondaryWish: string;
  loveLetter: {
    greeting: string;
    paragraphs: string[];
    signoff: string;
    senderName: string;
  };
  quizQuestions: QuizQuestion[];
  compliments: ComplimentCard[];
  hiddenHearts: HiddenHeartItem[];
  openWhenLetters: OpenWhenLetter[];
  chocolateSurprise: {
    title: string;
    subtitle: string;
    sweetNote: string;
    followUpNote: string;
    productName: string;
  };
  galleryPhotos: GalleryPhoto[];
  finalReveal: {
    headline: string;
    message: string[];
    signoff: string;
  };
  music: {
    enabled: boolean;
    customAudioUrl?: string; // Optional custom audio file or webm URL
    youtubeUrl?: string; // YouTube link provided for the song
    trackTitle?: string;
    artist?: string;
    volume: number;
  };
}

export interface ScoreRecord {
  id?: number;
  gameType: string;
  score: number;
  completedAt?: string;
}
