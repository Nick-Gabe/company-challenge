import {
  getAllPolicies as getAllPoliciesRequest,
  deletePolicy as deletePolicyRequest,
} from "api";
import { PolicyContext } from "contexts";
import { useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const DOUBLE_CLICK_TIME_TO_DELETE = 3000;

export const usePoliciesModel = () => {
  const { policyId, resetPolicyBoard } = useContext(PolicyContext);
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [deleteClickedItems, setDeletedClickedItems] = useState<number[]>([]);

  const errorHandler = (errorMsg?: string) => {
    toast(
      errorMsg ||
        "Oops! Something went wrong on our end. Please try again later.",
      {
        type: "error",
        position: "bottom-right",
      },
    );
  };

  const successHandler = () => {
    toast("Policy deleted successfully!", {
      type: "success",
      position: "bottom-right",
    });
  };

  const getPolicies = async () => {
    return await getAllPoliciesRequest(errorHandler);
  };

  const fetchPolicies = async () => {
    const [data] = await getPolicies();

    if (data) {
      setPolicies(data);
    }
  };

  const deletePolicy = async (id: number) => {
    const [data, ok] = await deletePolicyRequest(id, errorHandler);

    if (ok) {
      if (id === policyId) {
        resetPolicyBoard();
      }
      fetchPolicies();
      successHandler();
    }
    return [data, ok];
  };

  const clickDelete = (idToDelete: number) => {
    if (deleteClickedItems.includes(idToDelete)) {
      deletePolicy(idToDelete);
    } else {
      setDeletedClickedItems((ids) => [...ids, idToDelete]);

      setTimeout(() => {
        setDeletedClickedItems((ids) => ids.filter((id) => id !== idToDelete));
      }, DOUBLE_CLICK_TIME_TO_DELETE);
    }
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  const state = useMemo(
    () => ({
      policies,
      deleteClickedItems,
    }),
    [policies, deleteClickedItems],
  );

  const model = {
    getPolicies,
    deletePolicy,
    clickDelete,
  };

  return [state, model] as const;
};
