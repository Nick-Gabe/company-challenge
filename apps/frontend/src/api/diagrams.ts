import { generateApiFunction } from "./utils/apiUtils";

export const getAllDiagrams = async (
  errorHandler?: ApiError,
): ApiReturn<Diagram[]> =>
  generateApiFunction<Diagram[]>("get", "diagrams/", { errorHandler });

export const getDiagram = async (
  id: number,
  errorHandler?: ApiError,
): ApiReturn<Diagram> =>
  generateApiFunction<Diagram>("get", `diagrams/${id}`, { errorHandler });

export const createDiagram = async (
  payload: Omit<Diagram, "id">,
  errorHandler?: ApiError,
): ApiReturn<Diagram> =>
  generateApiFunction<Diagram>("post", "diagrams/", {
    json: { ...payload },
    errorHandler,
  });

export const updateDiagram = async (
  id: number,
  payload: Partial<Omit<Diagram, "id">>,
  errorHandler?: ApiError,
): ApiReturn<Diagram> =>
  generateApiFunction<Diagram>("put", `diagrams/${id}`, {
    json: { ...payload },
    errorHandler,
  });

export const deleteDiagram = async (
  id: number,
  errorHandler?: ApiError,
): ApiReturn<undefined> =>
  generateApiFunction<undefined>("delete", `diagrams/${id}`, { errorHandler });
