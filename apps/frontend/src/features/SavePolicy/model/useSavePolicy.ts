import {
  createPolicy as createPolicyRequest,
  updatePolicy as updatePolicyRequest,
} from "api";
import { PolicyContext } from "contexts";
import { PolicyImperativeHandle } from "entities";
import { RefObject, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

type UseSavePolicyProps = {
  policyRef: RefObject<PolicyImperativeHandle>;
};

export const useSavePolicy = ({ policyRef }: UseSavePolicyProps) => {
  const { updateTitle, setPolicyId, policyId, title } =
    useContext(PolicyContext);
  const [inputTitle, setInputTitle] = useState("");
  const [error, setError] = useState(false);

  const errorHandler = () => {
    toast("Oops! Something went wrong while saving. Please try again later!", {
      type: "error",
      position: "bottom-right",
    });
  };

  const successHandler = () => {
    toast("Policy saved successfully!", {
      type: "success",
      position: "bottom-right",
    });
  };

  useEffect(() => {
    setError(!!inputTitle && (inputTitle.length < 3 || inputTitle.length > 30));
  }, [inputTitle]);

  const createPolicy = async () => {
    if (error) return;

    const policy = policyRef.current?.export();
    if (policy) {
      const [data, ok] = await createPolicyRequest(
        { ...policy, title: inputTitle },
        errorHandler,
      );
      if (ok) {
        successHandler();
        updateTitle(inputTitle);
        setPolicyId(data.id);
      }
    }
  };

  const updatePolicy = async () => {
    if (error) return;
    if (!policyId) return errorHandler();

    const policy = policyRef.current?.export();
    if (policy) {
      const [, ok] = await updatePolicyRequest(
        policyId,
        { ...policy, title: inputTitle || title },
        errorHandler,
      );
      if (ok) {
        successHandler();
      }
    }
  };

  const state = { inputTitle, error, isNewPolicy: !policyId };

  const model = { createPolicy, updatePolicy, setTitle: setInputTitle };

  return [state, model] as const;
};
