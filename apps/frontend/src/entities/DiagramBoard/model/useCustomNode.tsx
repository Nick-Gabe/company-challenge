import { ComponentProps } from "react";
import { Edge } from "reactflow";

import { nodeTypes } from "../ui/CustomNodes";

type CustomNodeInfo = {
  [key in keyof typeof nodeTypes]: {
    handles: Partial<Edge> & {
      labels?: Record<string, string>;
    };
    size?: [number, number];
    initialData?: ComponentProps<(typeof nodeTypes)[key]>["data"];
  };
};

export const useCustomNode = () => {
  const customNodes = {
    comparison: {
      handles: {
        labels: {
          "comparison-left": "YES",
          "comparison-right": "NO",
        },
      },
      size: [412, 152],
      initialData: {
        parameter: "",
        operation: "=",
        value: "",
      },
    },
    start: {
      handles: {
        animated: true,
      },
      size: [300, 80],
      initialData: {},
    },
    decision: {
      handles: {},
      size: [300, 136],
      initialData: {
        decision: true,
      },
    },
  } as CustomNodeInfo;

  const getHandleInfo = (type: string) => {
    return customNodes[type as keyof typeof customNodes]?.handles;
  };

  const getInitialData = (type: string) => {
    return customNodes[type as keyof typeof customNodes]?.initialData;
  };

  const state = { info: customNodes };

  const model = {
    getHandleInfo,
    getInitialData,
  };

  return [state, model] as const;
};
