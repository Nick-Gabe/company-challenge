import api from "api/instance";
import { Options } from "ky";

type ApiOptions = Options & Record<"errorHandler", ApiError>;

export const generateApiFunction = async <T>(
  method: "get" | "post" | "patch" | "put" | "delete",
  route: string,
  options: Partial<ApiOptions> = {},
): ApiReturn<T> => {
  const { errorHandler, ...requestOptions } = options;

  try {
    const response = await api[method](route, requestOptions);
    const data =
      response.statusText !== "NO CONTENT" ? await response.json<T>() : "";
    return [data as T, response.ok];
  } catch (error) {
    const errorMsg = await error.response.json();
    errorHandler?.(errorMsg.error, error);
    console.error(error);
    return [error as T, false];
  }
};
