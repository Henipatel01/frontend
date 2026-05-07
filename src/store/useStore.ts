import { create } from "zustand";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  phone: string;
  company: { name: string };
}

interface AuthState {
  // auth
  token: string | null;
  setToken: (token: string) => void;
  logout: () => void;
  loadToken: () => void;

  // users
  users: User[];
  totalUsers: number;
  setUsers: (users: User[], total: number) => void;
  fetchUsers: (limit: number, skip: number, search?: string) => Promise<void>;
}

const useStore = create<AuthState>((set) => ({
  //auth 
  token: null,
  setToken: (token) => {
    if (typeof window !== "undefined") localStorage.setItem("token", token);
    set({ token });
  },
  logout: () => {
    if (typeof window !== "undefined") localStorage.removeItem("token");
    set({ token: null });
  },
  loadToken: () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) set({ token });
    }
  },

  // users
  users: [],
  totalUsers: 0,
  setUsers: (users, total) => set({ users, totalUsers: total }),

  fetchUsers: async (limit, skip, search = "") => {
    const url = search
      ? `https://dummyjson.com/users/search?q=${search}&limit=${limit}&skip=${skip}`
      : `https://dummyjson.com/users?limit=${limit}&skip=${skip}`;

    const res = await fetch(url);
    const data = await res.json();
    set({ users: data.users, totalUsers: data.total });
  },
}));

export default useStore;