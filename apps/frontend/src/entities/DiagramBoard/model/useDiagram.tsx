import { useCallback } from "react";
import {
  Connection,
  Edge,
  Node,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";

export type useDiagramBoardParams = {
  initialNodes: Node[];
  initialEdges: Edge[];
};

export const useDiagramModel = (params: useDiagramBoardParams) => {
  const [nodes, , onNodesChange] = useNodesState(params.initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(params.initialEdges);

  const onConnect = useCallback(
    (params: Edge | Connection) => {
      const isStart = params.sourceHandle === "start";
      const alreadyConnected = edges.some(
        (edge) =>
          edge.target === params.target && edge.source === params.source,
      );
      const startAlreadyConnects = edges.some(
        (edge) => edge.source === params.sourceHandle,
      );

      if (alreadyConnected || (isStart && startAlreadyConnects)) {
        return;
      }

      setEdges((els) => addEdge(params, els));
    },
    [edges, setEdges],
  );

  const state = {
    nodes,
    edges,
  };

  const model = {
    onNodesChange,
    onEdgesChange,
    onConnect,
  };

  return [state, model] as const;
};
