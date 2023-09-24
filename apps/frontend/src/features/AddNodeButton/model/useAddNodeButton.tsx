import { useState } from "react";

export const useAddNodeButtonModel = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((isOpen) => !isOpen);
  };

  const state = { isMenuOpen };

  const model = { toggleMenu };

  return [state, model] as const;
};
