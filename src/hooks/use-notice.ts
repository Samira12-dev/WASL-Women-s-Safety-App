import { useState } from 'react';

export function useNotice() {
  const [notice, setNotice] = useState<string | null>(null);

  return {
    notice,
    showNotice: (message: string) => setNotice(message),
    clearNotice: () => setNotice(null),
  };
}
