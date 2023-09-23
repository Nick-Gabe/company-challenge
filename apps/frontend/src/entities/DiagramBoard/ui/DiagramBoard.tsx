import { FC } from "react";
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

export const DiagramBoard: FC<DiagramBoardProps> = ({
  initialNodes,
  initialEdges,
  ...flowProps
}) => {
  const [diagramState, diagramModel] = useDiagramModel({
    initialNodes,
    initialEdges,
  });

  return (
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
  );
};
