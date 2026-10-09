import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      loading: false,
      
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      setLoading: (loading) => set({ loading }),
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      // login: (token, user) => set({ isAuthenticated: true, token, user }),
      // logout: () => set({ isAuthenticated: false, token: null, user: null }),
    }),
    {
      name: 'auth-storage', // Name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), 
      // storage: undefined, 
    }
  )
);

// useAuthStore.subscribe(
//    (state , prevState) => {
//       if(state.isAuthenticated !== prevState.isAuthenticated) {
         
//          const channel = new BroadcastChannel('auth');
//          if(state.isAuthenticated) {
//             channel.postMessage('login');
//             // channel.close();
//             // prompt("login broadcasted") ;
//          } else {
//             channel.postMessage('logout');
//             // channel.close();
//             // prompt("logout broadcasted") ;
//          }
        
//       }
      
      
//    }
// );

