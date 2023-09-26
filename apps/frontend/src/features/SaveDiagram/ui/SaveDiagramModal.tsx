import { FC } from "react";
import { Modal } from "shared";

import { useSaveDiagram } from "../model";

type SaveDiagramModalProps = {
  onCloseModal: () => void;
  saveDiagramModel: ReturnType<typeof useSaveDiagram>;
};

export const SaveDiagramModal: FC<SaveDiagramModalProps> = (props) => {
  const [saveDiagramState, saveDiagramModel] = props.saveDiagramModel;

  return (
    <Modal
      onCloseModal={() => {
        props.onCloseModal();
        saveDiagramModel.setTitle("");
      }}
      boxClass="max-w-md"
      title="Save your diagram!"
      confirmButtonLabel="Save"
      confirmButtonDisabled={
        saveDiagramState.error || !saveDiagramState.inputTitle
      }
      onConfirm={() => {
        saveDiagramModel.createDiagram();
        saveDiagramModel.setTitle("");
        props.onCloseModal();
      }}
    >
      <input
        type="text"
        placeholder="Insert your diagram title"
        value={saveDiagramState.inputTitle}
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
