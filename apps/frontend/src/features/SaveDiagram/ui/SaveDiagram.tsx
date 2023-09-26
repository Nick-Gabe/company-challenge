import { DiagramImperativeHandle } from "entities";
import { FC, RefObject, useState } from "react";
import { createPortal } from "react-dom";

import { SaveDiagramModal } from "./SaveDiagramModal";

type SaveDiagramProps = {
  diagramRef: RefObject<DiagramImperativeHandle>;
};

export const SaveDiagram: FC<SaveDiagramProps> = ({ diagramRef }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button
        className="btn bg-green-300 text-black z-10"
        onClick={() => setModalOpen(true)}
      >
        Save
      </button>
      {modalOpen
        ? createPortal(
            <SaveDiagramModal
              onCloseModal={() => setModalOpen(false)}
              diagramRef={diagramRef}
            />,
            document.getElementById("root")!,
          )
        : null}
    </>
  );
};
