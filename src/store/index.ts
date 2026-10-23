import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  UserProfile, 
  Post, 
  ReactionType, 
  ScheduledSession, 
  EmotionalState, 
  AppPreferences 
} from './types';
import { INITIAL_POSTS } from '../seed/communitySeed';
import { INITIAL_ARTICLES } from '../seed/articlesSeed';
import { INITIAL_PSYCHOLOGISTS } from '../seed/psychologistsSeed';
import { DAILY_MESSAGES } from '../seed/dailyMessagesSeed';

interface AppState {
  // Usuário e Onboarding
  user: UserProfile;
  completeOnboarding: (data: Partial<UserProfile>) => void;
  updateProfile: (data: Partial<UserProfile>) => void;

  // Comunidade
  customPosts: Post[];
  reactionsMap: Record<string, Record<ReactionType, boolean>>;
  addPost: (content: string, tags: string[], hasSensitiveContent: boolean, sensitiveReason?: string) => void;
  toggleReaction: (postId: string, reaction: ReactionType) => void;
  deletePost: (postId: string) => void;

  // Conteúdos
  savedArticleIds: string[];
  toggleSaveArticle: (articleId: string) => void;

  // Psicoterapia
  scheduledSessions: ScheduledSession[];
  bookSession: (psychologistId: string, slotId: string) => boolean;
  cancelSession: (sessionId: string) => void;

  // Check-in Emocional & Mensagem do Dia
  emotionalState: EmotionalState | null;
  setEmotionalState: (state: EmotionalState | null) => void;

  // Navegação e Preferências
  currentTab: 'inicio' | 'comunidade' | 'conteudos' | 'terapia' | 'perfil';
  setCurrentTab: (tab: 'inicio' | 'comunidade' | 'conteudos' | 'terapia' | 'perfil') => void;
  preferences: AppPreferences;
  toggleCalmMode: () => void;
  setFontSize: (size: 'normal' | 'large' | 'extra-large') => void;
  toggleDeviceMode: () => void;
  setPhoneType: (type: 'iphone' | 'android') => void;

  // Reset Geral do Protótipo
  resetDemo: () => void;
}

const DEFAULT_USER: UserProfile = {
  id: 'usr-demo',
  name: 'Mariana Duarte',
  email: 'mariana.duarte@email.com',
  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256',
  role: 'Mãe atípica • TEA Nível 1 e TDAH',
  gender: 'Mulher',
  caregiverFor: 'Filho (6 anos)',
  bio: 'Mãe em tempo integral, aprendendo a cada dia sobre neurodiversidade e buscando equilíbrio.',
  isOnboarded: false, // começa na tela de boas-vindas na primeira vez
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: DEFAULT_USER,

      completeOnboarding: (data) => {
        set((state) => ({
          user: {
            ...state.user,
            ...data,
            isOnboarded: true,
          },
          currentTab: 'inicio',
        }));
      },

      updateProfile: (data) => {
        set((state) => ({
          user: {
            ...state.user,
            ...data,
          },
        }));
      },

      customPosts: [],
      reactionsMap: {},

      addPost: (content, tags, hasSensitiveContent, sensitiveReason) => {
        const { user } = get();
        const newPost: Post = {
          id: `post-user-${Date.now()}`,
          authorId: user.id,
          authorName: user.name || 'Você',
          authorRole: user.role || 'Familiar cuidador(a)',
          authorAvatar: user.avatar,
          createdAt: new Date().toISOString(),
          timeAgo: 'Agora mesmo',
          content,
          tags: tags.length > 0 ? tags : ['Desabafo'],
          isAuthorCurrentUser: true,
          hasSensitiveContent,
          sensitiveReason,
          reactions: { abraco: 0, compreendo: 0, forca: 0 },
          userReactions: {},
          commentsCount: 0,
        };

        set((state) => ({
          customPosts: [newPost, ...state.customPosts],
        }));
      },

      toggleReaction: (postId, reaction) => {
        set((state) => {
          const currentMap = state.reactionsMap[postId] || { abraco: false, compreendo: false, forca: false };
          const isCurrentlyActive = !!currentMap[reaction];

          return {
            reactionsMap: {
              ...state.reactionsMap,
              [postId]: {
                ...currentMap,
                [reaction]: !isCurrentlyActive,
              },
            },
          };
        });
      },

      deletePost: (postId) => {
        set((state) => ({
          customPosts: state.customPosts.filter((p) => p.id !== postId),
        }));
      },

      savedArticleIds: ['art-1'],

      toggleSaveArticle: (articleId) => {
        set((state) => {
          const exists = state.savedArticleIds.includes(articleId);
          return {
            savedArticleIds: exists 
              ? state.savedArticleIds.filter((id) => id !== articleId)
              : [...state.savedArticleIds, articleId],
          };
        });
      },

      scheduledSessions: [],

      bookSession: (psychologistId, slotId) => {
        const psych = INITIAL_PSYCHOLOGISTS.find((p) => p.id === psychologistId);
        if (!psych) return false;
        const slot = psych.slots.find((s) => s.id === slotId);
        if (!slot) return false;

        const newSession: ScheduledSession = {
          id: `sess-${Date.now()}`,
          psychologistId: psych.id,
          psychologistName: psych.name,
          psychologistCRP: psych.crp,
          psychologistAvatar: psych.avatar,
          dateStr: slot.dateStr,
          dayOfWeek: slot.dayOfWeek,
          time: slot.time,
          bookedAt: new Date().toISOString(),
          status: 'agendada',
        };

        set((state) => ({
          scheduledSessions: [newSession, ...state.scheduledSessions],
        }));
        return true;
      },

      cancelSession: (sessionId) => {
        set((state) => ({
          scheduledSessions: state.scheduledSessions.map((s) =>
            s.id === sessionId ? { ...s, status: 'cancelada' } : s
          ),
        }));
      },

      emotionalState: null,
      setEmotionalState: (state) => set({ emotionalState: state }),

      currentTab: 'inicio',
      setCurrentTab: (tab) => set({ currentTab: tab }),

      preferences: {
        isCalmMode: false,
        fontSize: 'normal',
        deviceMode: 'frame',
        phoneType: 'iphone',
      },

      toggleCalmMode: () => {
        set((state) => ({
          preferences: {
            ...state.preferences,
            isCalmMode: !state.preferences.isCalmMode,
          },
        }));
      },

      setFontSize: (fontSize) => {
        set((state) => ({
          preferences: {
            ...state.preferences,
            fontSize,
          },
        }));
      },

      toggleDeviceMode: () => {
        set((state) => ({
          preferences: {
            ...state.preferences,
            deviceMode: state.preferences.deviceMode === 'frame' ? 'fullscreen' : 'frame',
          },
        }));
      },

      setPhoneType: (phoneType) => {
        set((state) => ({
          preferences: {
            ...state.preferences,
            phoneType,
          },
        }));
      },

      resetDemo: () => {
        set({
          user: DEFAULT_USER,
          customPosts: [],
          reactionsMap: {},
          savedArticleIds: ['art-1'],
          scheduledSessions: [],
          emotionalState: null,
          currentTab: 'inicio',
          preferences: {
            isCalmMode: false,
            fontSize: 'normal',
            deviceMode: 'frame',
            phoneType: 'iphone',
          },
        });
      },
    }),
    {
      name: 'lacos-prototype-storage',
      partialize: (state) => ({
        user: state.user,
        customPosts: state.customPosts,
        reactionsMap: state.reactionsMap,
        savedArticleIds: state.savedArticleIds,
        scheduledSessions: state.scheduledSessions,
        emotionalState: state.emotionalState,
        preferences: state.preferences,
      }),
    }
  )
);

// Seletor inteligente para juntar posts do seed com posts do usuário e calcular reações ativas
export const useCommunityPosts = () => {
  const customPosts = useAppStore((state) => state.customPosts);
  const reactionsMap = useAppStore((state) => state.reactionsMap);

  const allPosts = [...customPosts, ...INITIAL_POSTS];

  return allPosts.map((post) => {
    const postReactions = reactionsMap[post.id] || { abraco: false, compreendo: false, forca: false };
    
    return {
      ...post,
      userReactions: postReactions,
      reactions: {
        abraco: post.reactions.abraco + (postReactions.abraco ? 1 : 0),
        compreendo: post.reactions.compreendo + (postReactions.compreendo ? 1 : 0),
        forca: post.reactions.forca + (postReactions.forca ? 1 : 0),
      },
    };
  });
};

export { INITIAL_ARTICLES, INITIAL_PSYCHOLOGISTS, DAILY_MESSAGES };
