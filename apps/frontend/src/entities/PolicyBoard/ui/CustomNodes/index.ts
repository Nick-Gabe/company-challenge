import ComparisonNode from "./Comparison";
import DecisionNode from "./Decision";
import StartNode from "./Start";
import TextNode from "./Text";

export const nodeTypes = {
  start: StartNode,
  comparison: ComparisonNode,
  decision: DecisionNode,
  text: TextNode,
};
