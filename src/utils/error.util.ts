import { Response } from "express";

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

export function successResult(data: any) {
    this.result.type = "success";
    this.result.items = data;
}

export function failResult(error: any, res: Response) {
    this.result.type = "failed";
    this.result.msg = error;
    res.status(500);
    res.send(this.result);
}
