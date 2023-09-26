/* eslint-disable react-refresh/only-export-components */
import { withReactFlow } from "app/providers/reactflow";
import { PolicyMaker } from "widgets";

const HomePage = () => {
  return (
    <div className="w-screen h-screen">
      <PolicyMaker />
    </div>
  );
};

export default withReactFlow(HomePage);
