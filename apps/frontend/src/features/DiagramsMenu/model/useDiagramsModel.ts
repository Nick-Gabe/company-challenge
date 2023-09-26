import {
  getAllDiagrams as getAllDiagramsRequest,
  deleteDiagram as deleteDiagramRequest,
} from "api";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const DOUBLE_CLICK_TIME_TO_DELETE = 3000;

export const useDiagramsModel = () => {
  const [diagrams, setDiagrams] = useState<Diagram[]>([]);
  const [deleteClickedItems, setDeletedClickedItems] = useState<number[]>([]);

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

  const clickDelete = (idToDelete: number) => {
    if (deleteClickedItems.includes(idToDelete)) {
      deleteDiagram(idToDelete);
    } else {
      setDeletedClickedItems((ids) => [...ids, idToDelete]);

      setTimeout(() => {
        setDeletedClickedItems((ids) => ids.filter((id) => id !== idToDelete));
      }, DOUBLE_CLICK_TIME_TO_DELETE);
    }
  };

  useEffect(() => {
    fetchDiagrams();
  }, []);

  const state = useMemo(
    () => ({
      diagrams,
      deleteClickedItems,
    }),
    [diagrams, deleteClickedItems],
  );

  const model = {
    getDiagrams,
    deleteDiagram,
    clickDelete,
  };

  return [state, model] as const;
};
