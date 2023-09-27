import { PolicyContext } from "contexts";
import { FC, useContext } from "react";
import { Modal } from "shared";

import { usePoliciesModel } from "../model";

type PoliciesMenuModalProps = {
  onCloseModal: () => void;
};

export const PoliciesMenuModal: FC<PoliciesMenuModalProps> = ({
  onCloseModal,
}) => {
  const { resetPolicyBoard, loadPolicy } = useContext(PolicyContext);
  const [policiesState, policyModel] = usePoliciesModel();

  return (
    <Modal
      onCloseModal={onCloseModal}
      title="Policies List"
      resetButtonLabel="New"
      onReset={() => {
        resetPolicyBoard();
        onCloseModal();
      }}
    >
      <div className="max-h-80  overflow-y-scroll">
        <table className="table">
          <thead className="sticky top-0 bg-[#1D232A]">
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Updated at</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {policiesState.policies?.map((policy) => {
              const isDeleting = policiesState.deleteClickedItems.includes(
                policy.id,
              );

              return (
                <tr
                  className="border-bottom-1 border-slate-700"
                  key={policy.id}
                >
                  <td className="py-0">{policy.id}</td>
                  <td className="py-0">
                    <p className="max-w-[120px] sm:max-w-[200px] text-ellipsis overflow-hidden whitespace-nowrap">
                      {policy.title}
                    </p>
                  </td>
                  <td className="py-0">
                    {new Date(
                      policy.updated_at || policy.created_at,
                    ).toLocaleString()}
                  </td>
                  <td className="flex justify-center gap-2 pt-0 pb-1">
                    <button
                      className="btn btn-ghost"
                      onClick={() => {
                        loadPolicy(policy);
                        onCloseModal();
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className={`btn ${
                        isDeleting ? "btn-error" : "btn-ghost"
                      } w-10 h-10 p-2 relative`}
                      onClick={() => policyModel.clickDelete(policy.id)}
                    >
                      {isDeleting ? (
                        <div
                          className={
                            "tooltip tooltip-open tooltip-error absolute w-full h-full lowercase font-normal"
                          }
                          data-tip="Click again"
                        />
                      ) : null}
                      <img
                        className={`w-full h-full ${
                          isDeleting ? "grayscale brightness-200" : ""
                        }`}
                        src="assets/trash.svg"
                        alt="Trash"
                      />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Modal>
  );
};
