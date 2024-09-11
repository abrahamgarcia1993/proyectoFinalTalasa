// src/store/useAuthStore.js
import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  role: null,
  isAuthenticated: false,
  
  // Función para iniciar sesión y guardar el token
  login: (user, token) => {
    localStorage.setItem('token', token);
    set({
      user,
      role: ( user.role == 1 ) ? 'admin' : 'user',
      token,
      isAuthenticated: true,
    });
  },
  
  // Función para cerrar sesión
  logout: () => {
    localStorage.removeItem('token');
    set({
      user: null,
      token: null,
      role: null,
      isAuthenticated: false,
    });
  },

  // Verificar el JWT en el localStorage
  verifyToken: async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await fetch('http://localhost:3000/api/auth/verifyToken', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.isValid) {
          set({
            user: data.user,
            token,
            role: ( data.user.role == 1 ) ? 'admin' : 'user',
            isAuthenticated: true,
          });
        } else {
          set({
            user: null,
            token: null,
            role: null,
            isAuthenticated: false,
          });
        }
      } catch (error) {
        console.error("Error verifying token: ", error);
        set({ user: null, token: null, isAuthenticated: false });
      }
    }
  },
}));

export default useAuthStore;
