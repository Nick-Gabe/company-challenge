import { PolicyImperativeHandle } from "entities";
import { FC, RefObject, useState } from "react";
import { createPortal } from "react-dom";

import { useSavePolicy } from "../model";
import { SavePolicyModal } from "./SavePolicyModal";

type SavePolicyProps = {
  policyRef: RefObject<PolicyImperativeHandle>;
};

export const SavePolicy: FC<SavePolicyProps> = ({ policyRef }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [savePolicyState, savePolicyModel] = useSavePolicy({ policyRef });

  return (
    <>
      <button
        className={`btn  ${
          savePolicyState.disabled ? "btn-disabled" : "bg-green-300"
        } text-black z-10`}
        disabled={savePolicyState.disabled}
        onClick={() => {
          savePolicyState.isNewPolicy
            ? setModalOpen(true)
            : savePolicyModel.updatePolicy();
        }}
      >
        Save
      </button>
      {modalOpen
        ? createPortal(
            <SavePolicyModal
              onCloseModal={() => setModalOpen(false)}
              savePolicyModel={[savePolicyState, savePolicyModel]}
            />,
            document.getElementById("root")!,
          )
        : null}
    </>
  );
};
