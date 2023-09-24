import { useState } from "react";

export const useAddSubNodeButtonModel = () => {
  const [dragTip, setDragTip] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | string>("");

  const showDragTip = () => {
    setDragTip(true);

    if (timeoutId) clearTimeout(timeoutId);

    setTimeoutId(
      setTimeout(() => {
        setDragTip(false);
      }, 5000),
    );
  };

  const state = { dragTip };

  const model = { showDragTip };

  return [state, model] as const;
};
