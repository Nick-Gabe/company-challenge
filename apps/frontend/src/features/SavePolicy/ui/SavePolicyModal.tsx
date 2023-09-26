import { FC } from "react";
import { Modal } from "shared";

import { useSavePolicy } from "../model";

type SavePolicyModalProps = {
  onCloseModal: () => void;
  savePolicyModel: ReturnType<typeof useSavePolicy>;
};

export const SavePolicyModal: FC<SavePolicyModalProps> = (props) => {
  const [savePolicyState, savePolicyModel] = props.savePolicyModel;

  return (
    <Modal
      onCloseModal={() => {
        props.onCloseModal();
        savePolicyModel.setTitle("");
      }}
      boxClass="max-w-md"
      title="Save your policy!"
      confirmButtonLabel="Save"
      confirmButtonDisabled={
        savePolicyState.error || !savePolicyState.inputTitle
      }
      onConfirm={() => {
        savePolicyModel.createPolicy();
        savePolicyModel.setTitle("");
        props.onCloseModal();
      }}
    >
      <input
        type="text"
        placeholder="Insert your policy title"
        value={savePolicyState.inputTitle}
        onChange={(e) => savePolicyModel.setTitle(e.target.value)}
        className={`input mt-4 border-0 rounded-none border-b-1 border-b-white w-full ${
          savePolicyState.error ? "input-error" : ""
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
