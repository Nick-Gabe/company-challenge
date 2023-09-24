import {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  createContext,
} from "react";
import {
  Edge,
  Node,
  OnEdgesChange,
  OnNodesChange,
  useEdgesState,
  useNodesState,
} from "reactflow";

type DiagramContext = {
  nodes: Node[];
  edges: Edge[];
  setNodes: Dispatch<SetStateAction<Node[]>>;
  setEdges: Dispatch<SetStateAction<Edge[]>>;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  updateNodeData: (id: string, data: Record<string, unknown>) => void;
};

export const DiagramContext = createContext({} as DiagramContext);

type DiagramContextProviderProps = {
  initialNodes: Node[];
  initialEdges: Edge[];
};

export const DiagramContextProvider: FC<
  PropsWithChildren & DiagramContextProviderProps
> = ({ initialEdges, initialNodes, children }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const updateNodeData = (id: string, newData: Record<string, unknown>) => {
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...newData } } : node,
      ),
    );
  };

  return (
    <DiagramContext.Provider
      value={{
        nodes,
        setNodes,
        onNodesChange,
        edges,
        setEdges,
        onEdgesChange,
        updateNodeData,
      }}
    >
      {children}
    </DiagramContext.Provider>
  );
};
