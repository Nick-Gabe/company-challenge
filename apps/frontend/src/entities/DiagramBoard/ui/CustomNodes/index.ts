import ComparisonNode from "./Comparison";
import DecisionNode from "./Decision";
import StartNode from "./Start";

export const nodeTypes = {
  start: StartNode,
  comparison: ComparisonNode,
  decision: DecisionNode,
};
