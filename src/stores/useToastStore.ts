import { create } from "zustand";

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
}

interface ToastState {
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, "id">) => void;
  removeToast: (id: string) => void;
  toast: {
    success: (title: string, description?: string) => void;
    error: (title: string, description?: string) => void;
    info: (title: string, description?: string) => void;
    warning: (title: string, description?: string) => void;
  };
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: (toast) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    set((state) => ({ toasts: [...state.toasts, { ...toast, id }] }));

    const duration = toast.duration ?? 4000;
    if (duration > 0) {
      setTimeout(() => {
        set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
      }, duration);
    }
  },
  removeToast: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
  toast: {
    success: (title, description) =>
      useToastStore.getState().addToast({ type: "success", title, description }),
    error: (title, description) =>
      useToastStore.getState().addToast({ type: "error", title, description }),
    info: (title, description) =>
      useToastStore.getState().addToast({ type: "info", title, description }),
    warning: (title, description) =>
      useToastStore.getState().addToast({ type: "warning", title, description }),
  },
}));

export const toast = useToastStore.getState().toast;
