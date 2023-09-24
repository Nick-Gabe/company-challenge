/* eslint-disable react-refresh/only-export-components */
import { withReactFlow } from "app/providers/reactflow";
import { DiagramMaker } from "widgets";

const HomePage = () => {
  return (
    <div className="w-screen h-screen">
      <DiagramMaker />
    </div>
  );
};

export default withReactFlow(HomePage);
