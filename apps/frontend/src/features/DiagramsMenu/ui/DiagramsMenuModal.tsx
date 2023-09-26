import { FC, useRef } from "react";

import { useDiagramsModel } from "../model";

type DiagramsMenuModalProps = {
  onCloseModal: () => void;
};

export const DiagramsMenuModal: FC<DiagramsMenuModalProps> = ({
  onCloseModal,
}) => {
  const [diagramsState] = useDiagramsModel();
  const containerRef = useRef<HTMLDialogElement>(null);

  return (
    <dialog
      className="modal modal-open"
      ref={containerRef}
      onClick={function (event) {
        event.target === containerRef.current && onCloseModal();
      }}
    >
      <div className="modal-box w-[90vw] max-w-3xl">
        <h2 className="font-bold text-lg border-b-1 border-b-slate-700 pb-4 w-full">
          Diagram List
        </h2>
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Updated at</th>
              <th>Created at</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {diagramsState.diagrams.map((diagram, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{diagram.title}</td>
                <td>{new Date(diagram.updated_at).toLocaleString()}</td>
                <td>{new Date(diagram.created_at).toLocaleString()}</td>
                <td>
                  <button className="btn btn-ghost">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="modal-action">
          <button className="btn" onClick={onCloseModal}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};
