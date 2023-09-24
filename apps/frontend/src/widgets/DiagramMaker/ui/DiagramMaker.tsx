import { DiagramBoard, DiagramImperativeHandle } from "entities";
import { AddNodeButton } from "features";
import { useRef } from "react";
import { Node } from "reactflow";

const initialNodes: Node[] = [
  {
    id: "start",
    type: "start",
    data: { maxConnections: 1, isConnectable: true },
    position: { x: 0, y: 0 },
    deletable: false,
  },
  {
    id: "2",
    type: "comparison",
    data: {},
    position: { x: 100, y: 100 },
  },
  {
    id: "3",
    type: "comparison",
    data: {},
    position: { x: 140, y: 200 },
  },
];

const initialEdges = [
  {
    id: "start->2",
    source: "start",
    target: "2",
    animated: true,
  },
];

export const DiagramMaker = () => {
  const diagramRef = useRef<DiagramImperativeHandle>(null);

  return (
    <>
      <DiagramBoard
        ref={diagramRef}
        initialNodes={initialNodes}
        initialEdges={initialEdges}
      />
      <AddNodeButton diagramRef={diagramRef} />
    </>
  );
};
