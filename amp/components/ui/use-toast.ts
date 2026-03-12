import { useState } from 'react';

export const useToast = () => {
  const [toast, setToast] = useState<{ title: string; description: string } | null>(null);

  const showToast = ({ title, description, duration = 3000 }: { title: string; description: string; duration?: number }) => {
    setToast({ title, description });
    setTimeout(() => setToast(null), duration);
  };

  return { toast, showToast };
};