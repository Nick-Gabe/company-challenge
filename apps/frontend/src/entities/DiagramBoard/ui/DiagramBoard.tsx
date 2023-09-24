import { forwardRef, useImperativeHandle, useRef } from "react";
import ReactFlow, {
  Node,
  Background,
  Edge,
  Controls,
  ReactFlowProps,
  MiniMap,
} from "reactflow";

import "reactflow/dist/style.css";
import { useDiagramModel } from "../model";
import { nodeTypes } from "./CustomNodes";

type DiagramBoardProps = {
  initialNodes: Node[];
  initialEdges: Edge[];
} & ReactFlowProps;

export type DiagramImperativeHandle = {
  createNode: ReturnType<typeof useDiagramModel>[1]["createNode"];
};

export const DiagramBoard = forwardRef<
  DiagramImperativeHandle,
  DiagramBoardProps
>(({ initialNodes, initialEdges, ...flowProps }, ref) => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [diagramState, diagramModel] = useDiagramModel({
    initialNodes,
    initialEdges,
    reactFlowWrapper,
  });

  useImperativeHandle(ref, () => ({
    createNode: diagramModel.createNode,
  }));

  return (
    <div className="w-full h-full" ref={reactFlowWrapper}>
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
