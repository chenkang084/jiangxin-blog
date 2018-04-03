import { openStackService, OpenStackServiceOpts } from "./axios.service";
import { Request, Response } from "express";

export async function login(opts: OpenStackServiceOpts) {
  try {
    const result = await openStackService(opts);

    this.processHeaders({
      "X-Auth-Token": result.headers["x-subject-token"],
      "X-Subject-Token": result.headers["x-subject-token"],
    });

    return result.data;
  } catch (error) {
    console.log(error);
    return Promise.reject({
      type: "failed",
      msg: error.message || error,
      status: error.status || "",
    });
  }
}

export async function logout(opts: OpenStackServiceOpts) {
  try {
    const result = await openStackService(opts);

    this.processHeaders({
      "X-Auth-Token": "",
      "X-Subject-Token": "",
    });
    return result.data;
  } catch (error) {
    console.log(error);
    return Promise.reject({
      type: "failed",
      msg: error.message || error,
      status: error.status || "",
    });
  }
}
