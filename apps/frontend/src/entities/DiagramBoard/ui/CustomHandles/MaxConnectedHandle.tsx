import { useCallback } from "react";
import {
  getConnectedEdges,
  Handle,
  HandleProps,
  ReactFlowStore,
  useNodeId,
  useStore,
} from "reactflow";

type MaxConnectedHandleData = {
  maxConnections: number;
};

const selector =
  (nodeId: string | null, isConnectable = true, maxConnections = Infinity) =>
  (s: ReactFlowStore) => {
    if (!isConnectable || !nodeId) return false;

    const node = s.nodeInternals.get(nodeId);
    if (!node) return;

    const connectedEdges = getConnectedEdges([node], s.edges);

    const alreadyConnectedFromBlock = connectedEdges.some(
      (edge) => edge.source === nodeId,
    );

    return !alreadyConnectedFromBlock && connectedEdges.length < maxConnections;
  };

export const MaxConnectedHandle = ({
  maxConnections,
  ...props
}: HandleProps & MaxConnectedHandleData) => {
  const nodeId = useNodeId();
  const isConnectable = useStore(
    useCallback(selector(nodeId, props.isConnectable, maxConnections), [
      nodeId,
      props.isConnectable,
      maxConnections,
    ]),
  );

  return <Handle {...props} type="target" isConnectable={isConnectable} />;
};
