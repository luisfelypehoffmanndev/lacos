import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserProfileState {
  name: string;
  email: string;
  avatar: string;
  gender: string;
  isRegistered: boolean;
}

export interface CommunityPostItem {
  id: string;
  author: string;
  avatar: string;
  role: string;
  text: string;
  timeAgo: string;
  replies: number;
  likes: number;
  userLiked: boolean;
  threadReplies?: Array<{
    id: string;
    author: string;
    avatar: string;
    handle: string;
    timeAgo: string;
    text: string;
  }>;
}

export interface BookedSessionItem {
  id: string;
  psychologist: string;
  crp: string;
  slot: string;
  bookedAt: string;
}

export type ScreenId = 'screen-1' | 'screen-2' | 'screen-3' | 'screen-4' | 'screen-5' | 'screen-6' | 'screen-7';

interface MockStoreState {
  // Navigation & View
  activeScreen: ScreenId;
  presentationMode: 'interactive' | 'side-by-side';
  setActiveScreen: (screen: ScreenId) => void;
  setPresentationMode: (mode: 'interactive' | 'side-by-side') => void;

  // User Profile
  user: UserProfileState;
  updateUser: (data: Partial<UserProfileState>) => void;

  // Community Feed
  posts: CommunityPostItem[];
  expandedThreadId: string | null;
  toggleLike: (postId: string) => void;
  toggleThread: (postId: string) => void;
  addPost: (text: string) => void;

  // Feedback Bottom Sheet (S3)
  isFeedbackOpen: boolean;
  openFeedback: () => void;
  closeFeedback: () => void;

  // Article Reader Modal (S5)
  isArticleReaderOpen: boolean;
  openArticleReader: () => void;
  closeArticleReader: () => void;

  // Psychotherapy Booking (S6)
  selectedSlot: string;
  bookedSessions: BookedSessionItem[];
  bookingSuccess: boolean;
  selectSlot: (slot: string) => void;
  confirmBooking: () => boolean;
  clearBookingSuccess: () => void;

  // Reset
  resetDemoData: () => void;
}

const DEFAULT_USER: UserProfileState = {
  name: 'Joiciele Nascimento',
  email: 'joiciele@exemplo.com',
  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120',
  gender: 'Mulher',
  isRegistered: true,
};

const INITIAL_COMMUNITY_POSTS: CommunityPostItem[] = [
  {
    id: 'post-1',
    author: 'Mariana (Mãe atípica - TEA/TDAH)',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120',
    role: 'Mãe atípica',
    text: 'Hoje a rotina foi exaustiva. Às vezes sinto culpa por não dar conta de tudo. Mais alguém passando por isso hoje?',
    timeAgo: 'há 1h',
    replies: 12,
    likes: 34,
    userLiked: false,
    threadReplies: [
      {
        id: 'reply-1',
        author: 'Karen Kotlewski',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120',
        handle: '@karen_psico',
        timeAgo: 'há 45m',
        text: 'Mariana, seu cansaço é legítimo. Cuidar de si mesma não é egoísmo, é a única garantia de continuar cuidando bem. Respira fundo!'
      },
      {
        id: 'reply-2',
        author: 'Carlos Jung',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
        handle: '@carlos_pai',
        timeAgo: 'há 20m',
        text: 'Por aqui também foi difícil hoje com a transição da escola. Estamos juntos nessa rede!'
      }
    ]
  },
  {
    id: 'post-2',
    author: 'Carlos (Pai atípico - TOD/TEA)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
    role: 'Pai atípico',
    text: 'Dica de acolhimento: tirei 15 minutos hoje só para respirar antes de buscar meu filho na escola. Fez toda a diferença.',
    timeAgo: 'há 3h',
    replies: 8,
    likes: 41,
    userLiked: false,
    threadReplies: [
      {
        id: 'reply-3',
        author: 'Joiciele Oliveira',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120',
        handle: '@joi_cuidado',
        timeAgo: 'há 1h',
        text: 'Excelente iniciativa! Às vezes esquecemos de colocar a máscara de oxigênio em nós primeiro.'
      }
    ]
  }
];

export const useMockStore = create<MockStoreState>()(
  persist(
    (set, get) => ({
      activeScreen: 'screen-3',
      presentationMode: 'interactive',

      setActiveScreen: (screen) => set({ activeScreen: screen }),
      setPresentationMode: (mode) => set({ presentationMode: mode }),

      user: DEFAULT_USER,
      updateUser: (data) => set((state) => ({ user: { ...state.user, ...data } })),

      posts: INITIAL_COMMUNITY_POSTS,
      expandedThreadId: null,

      toggleLike: (postId) => {
        set((state) => ({
          posts: state.posts.map((post) => {
            if (post.id === postId) {
              const isLiked = !post.userLiked;
              return {
                ...post,
                userLiked: isLiked,
                likes: post.likes + (isLiked ? 1 : -1),
              };
            }
            return post;
          }),
        }));
      },

      toggleThread: (postId) => {
        set((state) => ({
          expandedThreadId: state.expandedThreadId === postId ? null : postId,
        }));
      },

      addPost: (text) => {
        const { user } = get();
        const newPost: CommunityPostItem = {
          id: `post-${Date.now()}`,
          author: `${user.name} (Familiar cuidador(a))`,
          avatar: user.avatar,
          role: 'Familiar cuidador(a)',
          text: text.trim(),
          timeAgo: 'agora mesmo',
          replies: 0,
          likes: 0,
          userLiked: false,
        };

        set((state) => ({
          posts: [newPost, ...state.posts],
        }));
      },

      isFeedbackOpen: false,
      openFeedback: () => set({ isFeedbackOpen: true }),
      closeFeedback: () => set({ isFeedbackOpen: false }),

      isArticleReaderOpen: false,
      openArticleReader: () => set({ isArticleReaderOpen: true }),
      closeArticleReader: () => set({ isArticleReaderOpen: false }),

      selectedSlot: 'Segunda-feira: 15:30',
      bookedSessions: [],
      bookingSuccess: false,

      selectSlot: (slot) => set({ selectedSlot: slot }),

      confirmBooking: () => {
        const { selectedSlot, bookedSessions } = get();
        if (!selectedSlot) return false;

        const newBooking: BookedSessionItem = {
          id: `book-${Date.now()}`,
          psychologist: 'Psicóloga Ana Souza',
          crp: 'CRP 00/00000',
          slot: selectedSlot,
          bookedAt: new Date().toLocaleDateString('pt-BR'),
        };

        set({
          bookedSessions: [newBooking, ...bookedSessions],
          bookingSuccess: true,
        });
        return true;
      },

      clearBookingSuccess: () => set({ bookingSuccess: false }),

      resetDemoData: () => {
        set({
          activeScreen: 'screen-1',
          presentationMode: 'interactive',
          user: DEFAULT_USER,
          posts: INITIAL_COMMUNITY_POSTS,
          expandedThreadId: null,
          isFeedbackOpen: false,
          isArticleReaderOpen: false,
          selectedSlot: 'Segunda-feira: 15:30',
          bookedSessions: [],
          bookingSuccess: false,
        });
      },
    }),
    {
      name: 'lacos-mockup-flow-storage',
      partialize: (state) => ({
        user: state.user,
        posts: state.posts,
        bookedSessions: state.bookedSessions,
        selectedSlot: state.selectedSlot,
      }),
    }
  )
);
