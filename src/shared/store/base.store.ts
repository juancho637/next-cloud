import { StateCreator, create } from "zustand";

// 📌 Interfaz base con loading y error
export interface BaseState {
  loading: boolean;
  error: string | null;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

// 📌 Función para crear stores sin sobrescribir `BaseState`
export const createBaseStore = <T extends object>(
  storeCreator: StateCreator<T, [], [], T>
) => {
  return create<T & BaseState>((set, get, api) => {
    
    const enhancedStore = storeCreator(
        (partial) => set({ ...partial } as Partial<T & BaseState>),
        get,
        api
      );
    
    return {
    loading: false,
    error: null,
    setLoading: (loading: boolean) => set((state) => ({ ...state, loading })),
    setError: (error: string | null) => set((state) => ({ ...state, error })),
    ...enhancedStore,
  }});
};

