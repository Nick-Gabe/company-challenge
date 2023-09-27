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

const BUTTON_DISABLED_TIME = 5000;

export const useSavePolicy = ({ policyRef }: UseSavePolicyProps) => {
  const { updateTitle, setPolicyId, policyId, title } =
    useContext(PolicyContext);
  const [inputTitle, setInputTitle] = useState("");
  const [error, setError] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const errorHandler = (errorMsg?: string) => {
    toast(
      errorMsg ||
        "Oops! Something went wrong while saving. Please try again later!",
      {
        type: "error",
        position: "bottom-right",
      },
    );
  };

  const successHandler = () => {
    toast("Policy saved successfully!", {
      type: "success",
      position: "bottom-right",
    });
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, BUTTON_DISABLED_TIME);
  };

  useEffect(() => {
    setError(!!inputTitle && (inputTitle.length < 3 || inputTitle.length > 30));
  }, [inputTitle]);

  const createPolicy = async () => {
    if (error) return errorHandler();

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
    if (!policyId || error) return errorHandler();

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

  const state = { inputTitle, error, disabled, isNewPolicy: !policyId };

  const model = { createPolicy, updatePolicy, setTitle: setInputTitle };

  return [state, model] as const;
};
