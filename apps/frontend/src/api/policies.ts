import { generateApiFunction } from "./utils/apiUtils";

export const getAllPolicies = async (
  errorHandler?: ApiError,
): ApiReturn<Policy[]> =>
  generateApiFunction<Policy[]>("get", "policies/", { errorHandler });

export const getPolicy = async (
  id: number,
  errorHandler?: ApiError,
): ApiReturn<Policy> =>
  generateApiFunction<Policy>("get", `policies/${id}`, { errorHandler });

export const createPolicy = async (
  payload: Omit<Policy, "id">,
  errorHandler?: ApiError,
): ApiReturn<Policy> =>
  generateApiFunction<Policy>("post", "policies/", {
    json: { ...payload },
    errorHandler,
  });

export const updatePolicy = async (
  id: number,
  payload: Partial<Omit<Policy, "id">>,
  errorHandler?: ApiError,
): ApiReturn<Policy> =>
  generateApiFunction<Policy>("put", `policies/${id}`, {
    json: { ...payload },
    errorHandler,
  });

export const deletePolicy = async (
  id: number,
  errorHandler?: ApiError,
): ApiReturn<undefined> =>
  generateApiFunction<undefined>("delete", `policies/${id}`, { errorHandler });
