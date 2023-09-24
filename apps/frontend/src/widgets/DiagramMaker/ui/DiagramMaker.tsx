import { DiagramContextProvider } from "contexts/diagramContext";
import { DiagramBoard, DiagramImperativeHandle, Header } from "entities";
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
    data: {
      parameter: "",
      operation: "=",
      value: "",
    },
    position: { x: 100, y: 100 },
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
    <DiagramContextProvider
      initialEdges={initialEdges}
      initialNodes={initialNodes}
    >
      <Header diagramRef={diagramRef} />
      <DiagramBoard ref={diagramRef} />
      <AddNodeButton diagramRef={diagramRef} />
    </DiagramContextProvider>
  );
};
