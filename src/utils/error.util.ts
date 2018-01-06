import { Response } from "express";
import { BaseResult } from "../pojos/baseResult";

/**
 * handle function runtime error
 * @param fn
 */
export function handleFuntionError(fn: () => Promise<any>) {
  try {
    return fn();
  } catch (error) {
    return Promise.reject(error.message);
  }
}

export function successResult(data: any): BaseResult {
  return {
    type: "success",
    items: data
  };
}

export function failResult(error: any, res: Response) {
  const result = {
    type: "failed",
    msg: error.message
  };
  res.status(500);
  res.send(result);
}
