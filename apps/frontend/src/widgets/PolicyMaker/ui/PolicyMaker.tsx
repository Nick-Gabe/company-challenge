import { PolicyContextProvider } from "contexts/policyContext";
import { PolicyBoard, PolicyImperativeHandle, Header } from "entities";
import { AddNodeButton } from "features";
import { useRef } from "react";

export const PolicyMaker = () => {
  const policyRef = useRef<PolicyImperativeHandle>(null);

  return (
    <PolicyContextProvider>
      <Header policyRef={policyRef} />
      <PolicyBoard ref={policyRef} />
      <AddNodeButton policyRef={policyRef} />
    </PolicyContextProvider>
  );
};
