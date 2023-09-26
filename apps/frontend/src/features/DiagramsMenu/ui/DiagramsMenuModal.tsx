import { DiagramContext } from "contexts";
import { FC, useContext } from "react";
import { Modal } from "shared";

import { useDiagramsModel } from "../model";

type DiagramsMenuModalProps = {
  onCloseModal: () => void;
};

export const DiagramsMenuModal: FC<DiagramsMenuModalProps> = ({
  onCloseModal,
}) => {
  const { resetDiagramBoard, loadDiagram } = useContext(DiagramContext);
  const [diagramsState, diagramModel] = useDiagramsModel();

  return (
    <Modal
      onCloseModal={onCloseModal}
      title="Diagrams List"
      resetButtonLabel="New"
      onReset={() => {
        resetDiagramBoard();
        onCloseModal();
      }}
    >
      <div className="max-h-80  overflow-y-scroll">
        <table className="table">
          <thead className="sticky top-0 bg-[#1D232A]">
            <tr>
              <th></th>
              <th>Title</th>
              <th>Updated at</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {diagramsState.diagrams?.map((diagram, index) => {
              const isDeleting = diagramsState.deleteClickedItems.includes(
                diagram.id,
              );

              return (
                <tr
                  className="border-bottom-1 border-slate-700"
                  key={diagram.id}
                >
                  <td className="py-0">{index + 1}</td>
                  <td className="py-0">
                    <p className="max-w-[120px] sm:max-w-[200px] text-ellipsis overflow-hidden whitespace-nowrap">
                      {diagram.title}
                    </p>
                  </td>
                  <td className="py-0">
                    {new Date(
                      diagram.updated_at || diagram.created_at,
                    ).toLocaleString()}
                  </td>
                  <td className="flex justify-center gap-2 pt-0 pb-1">
                    <button
                      className="btn btn-ghost"
                      onClick={() => {
                        loadDiagram(diagram);
                        onCloseModal();
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className={`btn ${
                        isDeleting ? "btn-error" : "btn-ghost"
                      } w-10 h-10 p-2 relative`}
                      onClick={() => diagramModel.clickDelete(diagram.id)}
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
