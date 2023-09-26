import { ThemeContext } from "contexts";
import { forwardRef, useContext, useImperativeHandle } from "react";
import ReactFlow, {
  Background,
  Controls,
  ReactFlowProps,
  MiniMap,
} from "reactflow";

import "reactflow/dist/style.css";

import { usePolicyModel } from "../model";
import { nodeTypes } from "./CustomNodes";

type PolicyBoardProps = ReactFlowProps;

export type PolicyImperativeHandle = {
  createNode: ReturnType<typeof usePolicyModel>[1]["createNode"];
  export: ReturnType<typeof usePolicyModel>[1]["export"];
};

export const PolicyBoard = forwardRef<PolicyImperativeHandle, PolicyBoardProps>(
  (flowProps, ref) => {
    const [policyState, policyModel] = usePolicyModel();
    const { isDark } = useContext(ThemeContext);

    useImperativeHandle(ref, () => ({
      createNode: policyModel.createNode,
      export: policyModel.export,
    }));

    return (
      <div className="w-full h-full">
        <ReactFlow
          nodes={policyState.nodes}
          edges={policyState.edges}
          onNodesChange={policyModel.onNodesChange}
          onEdgesChange={policyModel.onEdgesChange}
          onConnect={policyModel.onConnect}
          nodeTypes={nodeTypes}
          fitView
          {...flowProps}
        >
          <Background className={isDark ? "bg-gray-800" : "bg-white"} />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    );
  },
);
