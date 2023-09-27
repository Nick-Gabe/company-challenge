import { Node, Edge } from "reactflow";
import { generateId } from "shared";

export const generateInitialDiagramNodes = () => {
  const startId = generateId(),
    compId = generateId(),
    decisionId = generateId();

  const initialNodes: Node[] = [
    {
      width: 150,
      height: 40,
      id: startId,
      type: "start",
      data: {
        maxConnections: 1,
        isConnectable: true,
      },
      position: {
        x: 34,
        y: -20,
      },
      deletable: false,
      selected: false,
      positionAbsolute: {
        x: 34,
        y: -20,
      },
      dragging: false,
    },
    {
      width: 206,
      height: 76,
      id: compId,
      type: "comparison",
      data: {
        parameter: "",
        operation: "=",
        value: "",
      },
      position: {
        x: 69.5,
        y: 48,
      },
      selected: false,
      positionAbsolute: {
        x: 69.5,
        y: 48,
      },
      dragging: false,
    },
    {
      width: 150,
      height: 68,
      id: decisionId,
      position: {
        x: -5.5,
        y: 163.25,
      },
      type: "decision",
      data: {
        decision: true,
      },
      selected: false,
      positionAbsolute: {
        x: -5.5,
        y: 163.25,
      },
      dragging: false,
    },
  ];

  const initialEdges: Edge[] = [
    {
      id: "start",
      source: startId,
      target: compId,
      animated: true,
    },
    {
      source: compId,
      sourceHandle: "comparison-left",
      target: decisionId,
      targetHandle: "decision-target",
      label: "YES",
      id: "reactflow__edge-compcomparison-left-1decision-target",
    },
  ];

  return { initialNodes, initialEdges };
};
