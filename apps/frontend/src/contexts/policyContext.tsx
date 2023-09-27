import { getPolicy } from "api";
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
import { generateInitialDiagramNodes } from "widgets/PolicyMaker/model";

type PolicyContext = {
  nodes: Node[];
  edges: Edge[];
  title: string;
  policyId: number | null;
  setNodes: Dispatch<SetStateAction<Node[]>>;
  setEdges: Dispatch<SetStateAction<Edge[]>>;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  updateNodeData: (id: string, data: Record<string, unknown>) => void;
  updateTitle: (title: string | null) => void;
  setPolicyId: Dispatch<SetStateAction<number | null>>;
  resetPolicyBoard: () => void;
  loadPolicy: (policy: Policy) => void;
};

export const PolicyContext = createContext({} as PolicyContext);

export const PolicyContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [title, setTitle] = useState("Untitled");
  const [policyId, setPolicyId] = useState<number | null>(
    Number(localStorage.policyId) || null,
  );

  const updateNodeData = (id: string, newData: Record<string, unknown>) => {
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...newData } } : node,
      ),
    );
  };

  useEffect(() => {
    const { initialEdges, initialNodes } = generateInitialDiagramNodes();
    setEdges(initialEdges);
    setNodes(initialNodes);

    (async function () {
      if (policyId) {
        const [data, ok] = await getPolicy(policyId);

        if (!ok) return setPolicyId(null);

        setNodes(data.nodes);
        setEdges(data.edges);
        setTitle(data.title);
      }
    })();
  }, []);

  useEffect(() => {
    if (policyId) {
      localStorage.policyId = policyId;
    } else {
      localStorage.removeItem("policyId");
    }
  }, [policyId]);

  const updateTitle = (title: string | null) => {
    setTitle(title || "Untitled");
  };

  const resetPolicyBoard = () => {
    const { initialEdges, initialNodes } = generateInitialDiagramNodes();
    setNodes(initialNodes);
    setEdges(initialEdges);
    updateTitle(null);
    setPolicyId(null);
  };

  const loadPolicy = (policy: Policy) => {
    setNodes(policy.nodes);
    setEdges(policy.edges);
    updateTitle(policy.title);
    setPolicyId(policy.id);
  };

  return (
    <PolicyContext.Provider
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
        policyId,
        setPolicyId,
        resetPolicyBoard,
        loadPolicy,
      }}
    >
      {children}
    </PolicyContext.Provider>
  );
};
