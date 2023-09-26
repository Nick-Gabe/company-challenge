import { DiagramContext } from "contexts/diagramContext";
import { useCallback, MouseEvent, useContext } from "react";
import { Connection, Edge, addEdge, useReactFlow } from "reactflow";

import { useCustomNode } from ".";

export const useDiagramModel = () => {
  const { nodes, setNodes, onNodesChange, edges, setEdges, onEdgesChange } =
    useContext(DiagramContext);
  const { project, getNode, toObject } = useReactFlow();
  const [, customNodeModel] = useCustomNode();

  const getId = useCallback(() => {
    const lastId = Number(nodes.at(-1)?.id);
    return String((lastId || 0) + 1);
  }, [nodes]);

  const onConnect = useCallback(
    (params: Edge | Connection) => {
      const alreadyConnected = edges.some(
        (edge) => edge.target === params.target,
      );
      const alreadyConnects = edges.some(
        (edge) => edge.source === params.sourceHandle,
      );

      if (alreadyConnected || alreadyConnects || !params.source) {
        return;
      }

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
      const id = getId();

      const [width, height] = customNodeModel.getSize(type) || [0, 0];
      const initialData = customNodeModel.getInitialData(type);

      const newNode = {
        id,
        position: project({
          x: event.clientX - width / 2,
          y: event.clientY - height / 2,
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
    export: toObject as unknown as () => Diagram,
  };

  return [state, model] as const;
};
