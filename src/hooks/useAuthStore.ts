import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
  phone_number: string;
  email?: string;
}

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  // expiresAt: number; // Unix timestamp
}

interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  setUser: (user: User | null) => void;
  setTokens: (tokens: AuthTokens | null) => void;
  login: (user: User, tokens: AuthTokens) => void;
  logout: () => void;
  // updateAccessToken: (accessToken: string, expiresAt: number) => void;
  // isTokenExpired: () => boolean;
  getAccessToken: () => string | null;
  getRefreshToken: () => string | null;
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      tokens: null,
      isAuthenticated: false,
      isLoading: false,

      setUser: (user) => set({ user, isAuthenticated: !!user }),

      setTokens: (tokens) => set({ tokens }),

      login: (user, tokens) => set({
        user,
        tokens,
        isAuthenticated: true,
      }),

      logout: () => set({
        user: null,
        tokens: null,
        isAuthenticated: false,
      }),

      getAccessToken: () => {
        const tokens = get().tokens;
        return tokens?.accessToken || null;
      },

      getRefreshToken: () => {
        const tokens = get().tokens;
        return tokens?.refreshToken || null;
      },
    }),
    {
      name: 'alphachap-auth',
      partialize: (state) => ({
        user: state.user,
        tokens: state.tokens,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Helper function to refresh token (to be used with your API)
// export const refreshAccessToken = async (refreshToken: string): Promise<AuthTokens | null> => {
//   try {
//     // TODO: Replace with your actual API endpoint
//     const response = await fetch('/api/auth/refresh', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ refreshToken }),
//     });

//     if (!response.ok) {
//       throw new Error('Failed to refresh token');
//     }

//     const data = await response.json();
//     return {
//       accessToken: data.accessToken,
//       refreshToken: data.refreshToken,
//       expiresAt: data.expiresAt,
//     };
//   } catch (error) {
//     console.error('Token refresh failed:', error);
//     return null;
//   }
// };

// // Hook for automatic token refresh
// export const useTokenRefresh = () => {
//   const { tokens, updateAccessToken, logout, isTokenExpired } = useAuth();

//   const refreshIfNeeded = async () => {
//     if (!tokens || !isTokenExpired()) return;

//     const newTokens = await refreshAccessToken(tokens.refreshToken);
//     if (newTokens) {
//       updateAccessToken(newTokens.accessToken, newTokens.expiresAt);
//     } else {
//       logout();
//     }
//   };

//   return { refreshIfNeeded };
// };
