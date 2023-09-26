import {
  createDiagram as createDiagramRequest,
  updateDiagram as updateDiagramRequest,
} from "api";
import { DiagramContext } from "contexts";
import { DiagramImperativeHandle } from "entities";
import { RefObject, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

type UseSaveDiagramProps = {
  diagramRef: RefObject<DiagramImperativeHandle>;
};

export const useSaveDiagram = ({ diagramRef }: UseSaveDiagramProps) => {
  const { updateTitle, setDiagramId, diagramId, title } =
    useContext(DiagramContext);
  const [inputTitle, setInputTitle] = useState("");
  const [error, setError] = useState(false);

  const errorHandler = () => {
    toast("Oops! Something went wrong while saving. Please try again later!", {
      type: "error",
      position: "bottom-right",
    });
  };

  const successHandler = () => {
    toast("Diagram saved successfully!", {
      type: "success",
      position: "bottom-right",
    });
  };

  useEffect(() => {
    setError(!!inputTitle && (inputTitle.length < 3 || inputTitle.length > 30));
  }, [inputTitle]);

  const createDiagram = async () => {
    if (error) return;

    const diagram = diagramRef.current?.export();
    if (diagram) {
      const [data, ok] = await createDiagramRequest(
        { ...diagram, title: inputTitle },
        errorHandler,
      );
      if (ok) {
        successHandler();
        updateTitle(inputTitle);
        setDiagramId(data.id);
      }
    }
  };

  const updateDiagram = async () => {
    if (error) return;
    if (!diagramId) return errorHandler();

    const diagram = diagramRef.current?.export();
    if (diagram) {
      const [, ok] = await updateDiagramRequest(
        diagramId,
        { ...diagram, title: inputTitle || title },
        errorHandler,
      );
      if (ok) {
        successHandler();
      }
    }
  };

  const state = { inputTitle, error, isNewDiagram: !diagramId };

  const model = { createDiagram, updateDiagram, setTitle: setInputTitle };

  return [state, model] as const;
};
