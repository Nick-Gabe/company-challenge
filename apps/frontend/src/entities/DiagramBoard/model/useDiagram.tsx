import { RefObject, useCallback, MouseEvent } from "react";
import {
  Connection,
  Edge,
  Node,
  addEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "reactflow";

import { useCustomNode } from ".";

export type useDiagramBoardParams = {
  initialNodes: Node[];
  initialEdges: Edge[];
  reactFlowWrapper: RefObject<HTMLElement>;
};

export const useDiagramModel = (params: useDiagramBoardParams) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(params.initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(params.initialEdges);
  const { project, getNode, toObject } = useReactFlow();
  const [customNodesState, customNodeModel] = useCustomNode();

  const getId = useCallback(
    () => `${(Number(nodes.at(-1)?.id) || 0) + 1}`,
    [nodes],
  );

  const onConnect = useCallback(
    (params: Edge | Connection) => {
      const alreadyConnected = edges.some(
        (edge) => edge.target === params.target,
      );
      const alreadyConnects = edges.some(
        (edge) => edge.source === params.sourceHandle,
      );

      if (alreadyConnected || alreadyConnects) {
        return;
      }

      if (!params.source) return;

      const node = getNode(params.source);

      if (node?.type && params.sourceHandle) {
        const handleInfo = customNodeModel.getHandleInfo(node?.type);
        const label = handleInfo.labels?.[params.sourceHandle];

        setEdges((els) =>
          addEdge(
            {
              ...params,
              ...handleInfo,
              label,
            },
            els,
          ),
        );
      }
    },
    [edges, setEdges],
  );

  const createNode = useCallback(
    (event: MouseEvent, type: string) => {
      if (!params.reactFlowWrapper.current) return;

      const { top, left } =
        params.reactFlowWrapper.current.getBoundingClientRect();
      const id = getId();

      const [width, height] = customNodesState.info[
        type as keyof (typeof customNodesState)["info"]
      ].size || [0, 0];

      const initialData = customNodeModel.getInitialData(type);

      const newNode = {
        id,
        position: project({
          x: event.clientX - left - width / 2,
          y: event.clientY - top - height / 2,
        }),
        type,
        data: initialData,
      };

      setNodes((nds) => nds.concat([newNode]));
    },
    [project, nodes],
  );

  const state = {
    nodes,
    edges,
  };

  const model = {
    onNodesChange,
    onEdgesChange,
    onConnect,
    createNode,
    export: toObject,
  };

  return [state, model] as const;
};
