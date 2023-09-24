import { ReactNode } from "react";
import { ReactFlowProvider } from "reactflow";

export const withReactFlow = (component: () => ReactNode) => () => (
  <ReactFlowProvider>{component()}</ReactFlowProvider>
);
