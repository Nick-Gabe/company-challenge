import { FC } from "react";
import { Handle, NodeProps, Position } from "reactflow";

const decisionOptions = [
  {
    label: "TRUE",
    value: true,
  },
  {
    label: "FALSE",
    value: false,
  },
];

type DecisionNodeData = {
  decision: boolean;
};

const DecisionNode: FC<NodeProps<DecisionNodeData>> = ({
  isConnectable,
  data,
}) => {
  return (
    <div className="react-flow__node-default bg-gray-300">
      <Handle
        type="target"
        id="decision-target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <p>DECISION</p>
      <select
        className="mt-1 select select-bordered bg-white select-xs"
        defaultValue={String(data.decision)}
      >
        {decisionOptions.map((decision) => (
          <option key={decision.label} value={String(decision.value)}>
            {decision.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DecisionNode;
