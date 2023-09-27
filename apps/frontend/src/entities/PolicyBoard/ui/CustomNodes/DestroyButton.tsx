import { PolicyContext } from "contexts";
import { FC, useContext } from "react";

type DestroyButtonProps = {
  id: string;
};

export const DestroyButton: FC<DestroyButtonProps> = ({ id }) => {
  const { setNodes, setEdges } = useContext(PolicyContext);
  const destroy = () => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    setEdges((edges) => edges.filter((edge) => edge.target !== id));
  };

  return (
    <div
      className="tooltip absolute -top-1.5 -right-1.5 text-xs/1px"
      data-tip="Click to delete"
    >
      <button
        className="btn btn-ghost hidden rounded-full w-4 h-4 p-0 min-h-0 destroy-btn bg-white"
        onClick={destroy}
      >
        <img src="assets/close.svg" className="w-full h-full" />
      </button>
    </div>
  );
};
