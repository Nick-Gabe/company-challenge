import { useState } from "react";
import { createPortal } from "react-dom";

import { DiagramsMenuModal } from "./DiagramsMenuModal";

export const DiagramsMenu = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button
        className="btn bg-blue-300 text-black z-10"
        onClick={() => setModalOpen(true)}
      >
        Diagrams
      </button>
      {modalOpen
        ? createPortal(
            <DiagramsMenuModal onCloseModal={() => setModalOpen(false)} />,
            document.getElementById("root")!,
          )
        : null}
    </>
  );
};
