import { DiagramBoard } from "entities";
import { Node } from "reactflow";

const initialNodes: Node[] = [
  {
    id: "start",
    type: "start",
    data: { maxConnections: 1, isConnectable: true },
    position: { x: 250, y: 5 },
    connectable: false,
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

const HomePage = () => {
  return (
    <div className="w-screen h-screen">
      <DiagramBoard initialNodes={initialNodes} initialEdges={initialEdges} />
    </div>
  );
};

export default HomePage;
