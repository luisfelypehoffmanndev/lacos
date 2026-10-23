export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  gender: string;
  caregiverFor: string;
  bio?: string;
  isOnboarded: boolean;
}

export type ReactionType = 'abraco' | 'compreendo' | 'forca';

export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  createdAt: string;
  timeAgo: string;
  content: string;
  tags: string[];
  isAuthorCurrentUser?: boolean;
  hasSensitiveContent?: boolean;
  sensitiveReason?: string;
  reactions: {
    abraco: number;
    compreendo: number;
    forca: number;
  };
  userReactions: {
    abraco?: boolean;
    compreendo?: boolean;
    forca?: boolean;
  };
  commentsCount: number;
}

export interface Article {
  id: string;
  title: string;
  tag: string;
  category: 'crise' | 'escola' | 'direitos' | 'autocuidado';
  readTimeMinutes: number;
  authorName: string;
  authorCRP: string;
  date: string;
  summary: string;
  paragraphs: string[];
  references: string[];
  disclaimer: string;
  audioAvailable: boolean;
}

export interface PsychologistSlot {
  id: string;
  dateStr: string; // Ex: '24/10'
  dayOfWeek: string; // Ex: 'Segunda-feira'
  time: string; // Ex: '14:30'
}

export interface Psychologist {
  id: string;
  name: string;
  crp: string;
  approach: string;
  specialty: string;
  avatar: string;
  bio: string;
  socialPriceRange: string;
  slots: PsychologistSlot[];
}

export interface ScheduledSession {
  id: string;
  psychologistId: string;
  psychologistName: string;
  psychologistCRP: string;
  psychologistAvatar: string;
  dateStr: string;
  dayOfWeek: string;
  time: string;
  bookedAt: string;
  status: 'agendada' | 'cancelada';
}

export interface DailyMessage {
  id: string;
  text: string;
  author: string;
}

export type EmotionalState = 'sobrecarregado' | 'ansioso' | 'respirando' | 'esperancoso' | 'acolhido';

export interface AppPreferences {
  isCalmMode: boolean;
  fontSize: 'normal' | 'large' | 'extra-large';
  deviceMode: 'frame' | 'fullscreen';
  phoneType: 'iphone' | 'android';
}
