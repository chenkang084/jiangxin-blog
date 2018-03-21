import { openstackService, OpenstackServiceOpts } from "./axios.service";
import { Request, Response } from "express";

export async function login(
  opts: OpenstackServiceOpts,
  // tokenHeaders: any,
  res: Response
) {
  try {
    const result = await openstackService(opts);
    // tokenHeaders["X-auth-token"] = result.headers["x-subject-token"];
    // tokenHeaders["X-subject-token"] = result.headers["x-subject-token"];
    res.send({ type: "success", items: result.data });
  } catch (error) {
    console.log(error);
    res.send({ type: "failed", msg: error.message || error });
  }
}

export async function logout(
  opts: OpenstackServiceOpts,
  tokenHeaders: any,
  res: Response
) {
  try {
    const result = await openstackService(opts);
    // tokenHeaders["X-auth-token"] = "";
    // tokenHeaders["X-subject-token"] = "";
    res.send({ type: "success" });
  } catch (error) {
    console.log(error);
    res.send({ type: "failed", msg: error.message || error });
  }
}
