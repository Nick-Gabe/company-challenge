import { FC } from "react";
import { Handle, NodeProps, Position } from "reactflow";

const StartNode: FC<NodeProps> = ({ isConnectable }) => {
  return (
    <div className="react-flow__node-default bg-green-300">
      <p>START</p>
      <Handle
        type="source"
        id="start"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default StartNode;
