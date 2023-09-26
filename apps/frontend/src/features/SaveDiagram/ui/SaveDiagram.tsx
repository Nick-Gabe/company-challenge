import { DiagramImperativeHandle } from "entities";
import { FC, RefObject, useState } from "react";
import { createPortal } from "react-dom";

import { useSaveDiagram } from "../model";
import { SaveDiagramModal } from "./SaveDiagramModal";

type SaveDiagramProps = {
  diagramRef: RefObject<DiagramImperativeHandle>;
};

export const SaveDiagram: FC<SaveDiagramProps> = ({ diagramRef }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [saveDiagramState, saveDiagramModel] = useSaveDiagram({ diagramRef });

  return (
    <>
      <button
        className="btn bg-green-300 text-black z-10"
        onClick={() => {
          saveDiagramState.isNewDiagram
            ? setModalOpen(true)
            : saveDiagramModel.updateDiagram();
        }}
      >
        Save
      </button>
      {modalOpen
        ? createPortal(
            <SaveDiagramModal
              onCloseModal={() => setModalOpen(false)}
              saveDiagramModel={[saveDiagramState, saveDiagramModel]}
            />,
            document.getElementById("root")!,
          )
        : null}
    </>
  );
};
