import { PolicyContextProvider } from "contexts/policyContext";
import { PolicyBoard, PolicyImperativeHandle, Header } from "entities";
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

export const PolicyMaker = () => {
  const policyRef = useRef<PolicyImperativeHandle>(null);

  return (
    <PolicyContextProvider
      initialEdges={initialEdges}
      initialNodes={initialNodes}
    >
      <Header policyRef={policyRef} />
      <PolicyBoard ref={policyRef} />
      <AddNodeButton policyRef={policyRef} />
    </PolicyContextProvider>
  );
};
