import { useState } from "react";
import { createPortal } from "react-dom";

import { PoliciesMenuModal } from "./PoliciesMenuModal";

export const PoliciesMenu = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button
        className="btn bg-blue-300 text-black z-10"
        onClick={() => setModalOpen(true)}
      >
        Policies
      </button>
      {modalOpen
        ? createPortal(
            <PoliciesMenuModal onCloseModal={() => setModalOpen(false)} />,
            document.getElementById("root")!,
          )
        : null}
    </>
  );
};
