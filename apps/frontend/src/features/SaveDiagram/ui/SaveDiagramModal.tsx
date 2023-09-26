import { DiagramImperativeHandle } from "entities";
import { FC, RefObject } from "react";
import { Modal } from "shared";

import { useSaveDiagram } from "../model";

type SaveDiagramModalProps = {
  onCloseModal: () => void;
  diagramRef: RefObject<DiagramImperativeHandle>;
};

export const SaveDiagramModal: FC<SaveDiagramModalProps> = ({
  onCloseModal,
  diagramRef,
}) => {
  const [saveDiagramState, saveDiagramModel] = useSaveDiagram({ diagramRef });

  return (
    <Modal
      onCloseModal={onCloseModal}
      boxClass="max-w-md"
      title="Save your diagram!"
      confirmButtonLabel="Save"
      confirmButtonDisabled={saveDiagramState.error || !saveDiagramState.title}
      onConfirm={() => {
        saveDiagramModel.createDiagram();
        onCloseModal();
      }}
    >
      <input
        type="text"
        placeholder="Insert your diagram title"
        value={saveDiagramState.title}
        onChange={(e) => saveDiagramModel.setTitle(e.target.value)}
        className={`input mt-4 border-0 rounded-none border-b-1 border-b-white w-full ${
          saveDiagramState.error ? "input-error" : ""
        }`}
      />
      <label className="label">
        <span className="label-text-alt">
          The title must have a length between 3 and 30 characters
        </span>
      </label>
      <div className="max-h-80  overflow-y-scroll"></div>
    </Modal>
  );
};
