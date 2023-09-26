import { FC } from "react";
import { Modal } from "shared";

import { useDiagramsModel } from "../model";

type DiagramsMenuModalProps = {
  onCloseModal: () => void;
};

export const DiagramsMenuModal: FC<DiagramsMenuModalProps> = ({
  onCloseModal,
}) => {
  const [diagramsState, diagramModel] = useDiagramsModel();

  return (
    <Modal onCloseModal={onCloseModal}>
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
              <tr className="border-bottom-1 border-slate-700" key={diagram.id}>
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
                  <button
                    className="btn btn-ghost w-10 h-10 p-2"
                    onClick={() => diagramModel.deleteDiagram(diagram.id)}
                  >
                    <img
                      className="w-full h-full"
                      src="assets/trash.svg"
                      alt="Trash"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Modal>
  );
};
