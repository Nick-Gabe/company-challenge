import { forwardRef, useImperativeHandle } from "react";
import ReactFlow, {
  Background,
  Controls,
  ReactFlowProps,
  MiniMap,
} from "reactflow";

import "reactflow/dist/style.css";
import { useDiagramModel } from "../model";
import { nodeTypes } from "./CustomNodes";

type DiagramBoardProps = ReactFlowProps;

export type DiagramImperativeHandle = {
  createNode: ReturnType<typeof useDiagramModel>[1]["createNode"];
  export: ReturnType<typeof useDiagramModel>[1]["export"];
};

export const DiagramBoard = forwardRef<
  DiagramImperativeHandle,
  DiagramBoardProps
>((flowProps, ref) => {
  const [diagramState, diagramModel] = useDiagramModel();

  useImperativeHandle(ref, () => ({
    createNode: diagramModel.createNode,
    export: diagramModel.export,
  }));

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={diagramState.nodes}
        edges={diagramState.edges}
        onNodesChange={diagramModel.onNodesChange}
        onEdgesChange={diagramModel.onEdgesChange}
        onConnect={diagramModel.onConnect}
        nodeTypes={nodeTypes}
        fitView
        {...flowProps}
      >
        <Background className="bg-white" />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
});
