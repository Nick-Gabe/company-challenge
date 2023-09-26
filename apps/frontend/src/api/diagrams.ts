import { generateApiFunction } from "./instance";

export const getAllDiagrams = async (): ApiReturn<Diagram[]> =>
  generateApiFunction<Diagram[]>("get", "diagrams/");

export const getDiagram = async (id: number): ApiReturn<Diagram> =>
  generateApiFunction<Diagram>("get", `diagrams/${id}/`);

export const createDiagram = async (
  payload: Omit<Diagram, "id">,
): ApiReturn<Diagram> =>
  generateApiFunction<Diagram>("post", "diagrams/", { json: { ...payload } });

export const updateDiagram = async (
  id: number,
  payload: Partial<Omit<Diagram, "id">>,
): ApiReturn<Diagram> =>
  generateApiFunction<Diagram>("put", `diagrams/${id}/`, {
    json: { ...payload },
  });

export const deleteDiagram = async (id: number): ApiReturn<undefined> =>
  generateApiFunction<undefined>("delete", `diagrams/${id}/`);
