import {
  getAllDiagrams as getAllDiagramsRequest,
  deleteDiagram as deleteDiagramRequest,
} from "api";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

export const useDiagramsModel = () => {
  const [diagrams, setDiagrams] = useState<Diagram[]>([]);

  const errorHandler = () => {
    toast("Oops! Something went wrong on our end. Please try again later.", {
      type: "error",
      position: "bottom-right",
    });
  };

  const successHandler = () => {
    toast("Diagram deleted successfully!", {
      type: "success",
      position: "bottom-right",
    });
  };

  const getDiagrams = async () => {
    return await getAllDiagramsRequest(errorHandler);
  };

  const fetchDiagrams = async () => {
    const [data] = await getDiagrams();

    if (data) {
      setDiagrams(data);
    }
  };

  const deleteDiagram = async (id: number) => {
    const [data, ok] = await deleteDiagramRequest(id, errorHandler);

    if (ok) {
      fetchDiagrams();
      successHandler();
    }
    return [data, ok];
  };

  useEffect(() => {
    fetchDiagrams();
  }, []);

  const state = useMemo(
    () => ({
      diagrams,
    }),
    [diagrams],
  );

  const model = {
    getDiagrams,
    deleteDiagram,
  };

  return [state, model] as const;
};
