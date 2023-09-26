import { getAllDiagrams } from "api";
import { useEffect, useMemo, useState } from "react";

export const useDiagramsModel = () => {
  const [error, setError] = useState(false);
  const [diagrams, setDiagrams] = useState<Diagram[]>([]);

  const handleError = () => {
    setError(true);

    setTimeout(() => {
      setError(false);
    }, 5000);
  };

  const getDiagrams = async () => {
    const [data, ok] = await getAllDiagrams();

    if (!ok) return handleError();
    return data;
  };

  useEffect(() => {
    (async function () {
      const data = await getDiagrams();

      if (data) {
        setDiagrams(data);
      }
    })();
  }, []);

  const state = useMemo(
    () => ({
      error,
      diagrams,
    }),
    [error, diagrams],
  );

  const model = {
    getDiagrams,
  };

  return [state, model] as const;
};
