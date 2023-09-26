import ky, { Options } from "ky";

const api = ky.create({
  prefixUrl: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const generateApiFunction = async <T>(
  method: "get" | "post" | "patch" | "put" | "delete",
  route: string,
  options?: Options,
): ApiReturn<T> => {
  try {
    const response = await api[method](route, options);
    const data = await response.json<T>();
    return [data, response.ok];
  } catch (error) {
    console.error(error);
    return [error as T, false];
  }
};

export default api;
