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
          Diagrams List
        </h2>

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
              {diagramsState.diagrams.map((diagram, index) => (
                <tr className="border-bottom-1 border-slate-700">
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
                  <td className="flex justify-center gap-2 py-0">
                    <button className="btn btn-ghost">Edit</button>
                    <button className="btn btn-ghost w-10 h-10 p-2">
                      <img className="w-full h-full" src="assets/trash.svg" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="modal-action">
          <button className="btn z-10" onClick={onCloseModal}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};
