import { Edge } from "reactflow";

type CustomNodeInfo = {
  [key: string]: {
    handles: Partial<Edge> & {
      labels?: Record<string, string>;
    };
    size?: [number, number];
  };
};

export const useCustomNode = () => {
  const customNodes: CustomNodeInfo = {
    comparison: {
      handles: {
        labels: {
          "comparison-left": "YES",
          "comparison-right": "NO",
        },
      },
      size: [412, 152],
    },
    start: {
      handles: {
        animated: true,
      },
    },
  };

  const getHandleInfo = (type: string) => {
    return customNodes[type as keyof typeof customNodes]?.handles;
  };

  const state = { info: customNodes };

  const model = {
    getHandleInfo,
  };

  return [state, model] as const;
};
