import { getDiagram } from "api";
import {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import {
  Node,
  Edge,
  OnEdgesChange,
  OnNodesChange,
  useEdgesState,
  useNodesState,
} from "reactflow";

type DiagramContext = {
  nodes: Node[];
  edges: Edge[];
  title: string;
  diagramId: number | null;
  setNodes: Dispatch<SetStateAction<Node[]>>;
  setEdges: Dispatch<SetStateAction<Edge[]>>;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  updateNodeData: (id: string, data: Record<string, unknown>) => void;
  updateTitle: (title: string | null) => void;
  setDiagramId: Dispatch<SetStateAction<number | null>>;
  resetDiagramBoard: () => void;
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
  const [title, setTitle] = useState("Untitled");
  const [diagramId, setDiagramId] = useState<number | null>(
    localStorage.diagramId || null,
  );

  const updateNodeData = (id: string, newData: Record<string, unknown>) => {
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...newData } } : node,
      ),
    );
  };

  useEffect(() => {
    (async function () {
      if (diagramId) {
        const [data, ok] = await getDiagram(diagramId);

        if (!ok) return setDiagramId(null);

        setNodes(data.nodes);
        setEdges(data.edges);
        setTitle(data.title);
      }
    })();
  }, []);

  useEffect(() => {
    if (diagramId) {
      localStorage.diagramId = diagramId;
    } else {
      localStorage.removeItem("diagramId");
    }
  }, [diagramId]);

  const updateTitle = (title: string | null) => {
    setTitle(title || "Untitled");
  };

  const resetDiagramBoard = () => {
    setNodes(initialNodes);
    setEdges(initialEdges);
    updateTitle(null);
    setDiagramId(null);
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
        title,
        updateTitle,
        diagramId,
        setDiagramId,
        resetDiagramBoard,
      }}
    >
      {children}
    </DiagramContext.Provider>
  );
};
