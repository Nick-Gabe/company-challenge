import { createDiagram as createDiagramRequest } from "api";
import { DiagramContext } from "contexts";
import { DiagramImperativeHandle } from "entities";
import { RefObject, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

type UseSaveDiagramProps = {
  diagramRef: RefObject<DiagramImperativeHandle>;
};

export const useSaveDiagram = ({ diagramRef }: UseSaveDiagramProps) => {
  const { updateTitle, setDiagramId } = useContext(DiagramContext);
  const [title, setTitle] = useState("");
  const [error, setError] = useState(false);

  const errorHandler = () => {
    toast("Oops! Something went wrong while saving. Please try again later!", {
      type: "error",
      position: "bottom-right",
    });
  };

  const successHandler = () => {
    toast("Diagram created successfully!", {
      type: "success",
      position: "bottom-right",
    });
  };

  useEffect(() => {
    setError(!!title && (title.length < 3 || title.length > 30));
  }, [title]);

  const createDiagram = async () => {
    if (error) return;

    const diagram = diagramRef.current?.export();
    if (diagram) {
      const [data, ok] = await createDiagramRequest(
        { ...diagram, title },
        errorHandler,
      );
      if (ok) {
        successHandler();
        updateTitle(title);
        setDiagramId(data.id);
      }
    }
  };

  const state = { title, error };

  const model = { createDiagram, setTitle };

  return [state, model] as const;
};
