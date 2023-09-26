import { Options } from "ky";

import api from "./instance";

const generateApiFunction = async <T>(
  method: "get" | "post" | "patch" | "put" | "delete",
  route: string,
  options?: Options,
): ApiReturn<T> => {
  const response = await api[method](route, options);
  const data = await response.json<T>();
  return [data, response.ok];
};

export const getAllDiagrams = async (): ApiReturn<Diagram[]> =>
  generateApiFunction<Diagram[]>("get", "/");

export const getDiagram = async (id: number): ApiReturn<Diagram> =>
  generateApiFunction<Diagram>("get", `/${id}`);

export const createDiagram = async (
  payload: Omit<Diagram, "id">,
): ApiReturn<Diagram> =>
  generateApiFunction<Diagram>("post", "/", { json: { ...payload } });

export const updateDiagram = async (
  id: number,
  payload: Partial<Omit<Diagram, "id">>,
): ApiReturn<Diagram> =>
  generateApiFunction<Diagram>("put", `/${id}`, { json: { ...payload } });

export const deleteDiagram = async (id: number): ApiReturn<undefined> =>
  generateApiFunction<undefined>("delete", `/${id}`);
