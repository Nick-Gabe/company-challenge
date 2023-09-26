import {
  getAllDiagrams as getAllDiagramsRequest,
  deleteDiagram as deleteDiagramRequest,
  createDiagram as createDiagramRequest,
  getDiagram as getDiagramRequest,
  updateDiagram as updateDiagramRequest,
} from "api";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

export const useDiagramsModel = () => {
  const [diagrams, setDiagrams] = useState<Diagram[]>([]);

  const errorHandler = () => {
    toast("Oops! Something went wrong on our end. Please try again later.", {
      type: "error",
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

    if (ok) fetchDiagrams();
    return [data, ok];
  };

  const createDiagram = async (payload: Omit<Diagram, "id">) => {
    return await createDiagramRequest(payload, errorHandler);
  };

  const getDiagram = async (id: number) => {
    return await getDiagramRequest(id, errorHandler);
  };

  const updateDiagram = async (id: number, payload: Omit<Diagram, "id">) => {
    return await updateDiagramRequest(id, payload, errorHandler);
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
    getDiagram,
    updateDiagram,
    createDiagram,
  };

  return [state, model] as const;
};
