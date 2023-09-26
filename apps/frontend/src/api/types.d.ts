type Diagram = {
  id: number;
  title: string;
  edges: Edge[];
  nodes: DiagramNode[];
  viewport: Viewport;
  created_at: string;
  updated_at: string;
};

type Edge = {
  id: string;
  source: string;
  target: string;
  animated: boolean;
  label: string;
  sourceHandle: string;
  targetHandle: string;
};

type DiagramNode = {
  id: string;
  data: string;
  height: number;
  position: NodePosition;
  positionAbsolute: NodePosition;
  type: string;
  width: number;
  deletable: boolean;
  selected: boolean;
  dragging: boolean;
  text: string;
};

type NodePosition = {
  x: number;
  y: number;
};

type NodeData = {
  maxConnections?: number;
  isConnectable?: boolean;
  parameter?: string;
  operation?: string;
  value?: string;
  decision?: string;
};

type Viewport = {
  x: number;
  y: number;
  zoom: number;
};

type ApiReturn<T> = Promise<[T, boolean]>;
type ApiError = (error: unknown) => void;
