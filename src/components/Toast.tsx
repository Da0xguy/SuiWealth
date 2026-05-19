import { useEffect, useState } from "react";
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from "react-icons/fi";

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "info" | "loading";
  title: string;
  message?: string;
  duration?: number;
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (
    type: "success" | "error" | "info" | "loading",
    title: string,
    message?: string,
    duration: number = 4000,
  ) => {
    const id = Date.now().toString();
    const toast: ToastMessage = { id, type, title, message, duration };

    setToasts((prev) => [...prev, toast]);

    if (type !== "loading" && duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const updateToast = (id: string, updates: Partial<ToastMessage>) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    );
  };

  return { toasts, addToast, removeToast, updateToast };
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onRemove: (id: string) => void;
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-3 pointer-events-none">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
}

function Toast({
  toast,
  onRemove,
}: {
  toast: ToastMessage;
  onRemove: (id: string) => void;
}) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (toast.type !== "loading" && toast.duration !== 0) {
      const timer = setTimeout(() => setIsVisible(false), 3800);
      return () => clearTimeout(timer);
    }
  }, [toast.duration, toast.type]);

  if (!isVisible) return null;

  const bgColor = {
    success: "bg-emerald-950/95 border-emerald-400/30",
    error: "bg-red-950/95 border-red-400/30",
    info: "bg-cyan-950/95 border-cyan-400/30",
    loading: "bg-slate-800/95 border-cyan-400/30",
  }[toast.type];

  const IconComponent = {
    success: FiCheckCircle,
    error: FiAlertCircle,
    info: FiInfo,
    loading: FiInfo,
  }[toast.type];

  const iconColor = {
    success: "text-emerald-400",
    error: "text-red-400",
    info: "text-cyan-400",
    loading: "text-cyan-400 animate-spin",
  }[toast.type];

  return (
    <div
      className={`pointer-events-auto rounded-2xl border ${bgColor} p-4 shadow-lg shadow-slate-950/50 animate-in slide-in-from-bottom-4 fade-in duration-300`}
    >
      <div className="flex items-start gap-3">
        <IconComponent
          className={`h-5 w-5 flex-shrink-0 mt-0.5 ${iconColor}`}
        />
        <div className="flex-1">
          <p className="text-sm font-semibold text-white">{toast.title}</p>
          {toast.message && (
            <p className="mt-1 text-xs text-slate-300">{toast.message}</p>
          )}
        </div>
        {toast.type !== "loading" && (
          <button
            onClick={() => onRemove(toast.id)}
            className="flex-shrink-0 text-slate-400 hover:text-slate-200 transition"
          >
            <FiX className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
