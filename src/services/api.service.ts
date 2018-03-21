import { openstackService, OpenstackServiceOpts } from "./axios.service";
import { Request, Response } from "express";

export async function commonApiService(
  opts: OpenstackServiceOpts,
  res: Response
) {
  try {
    const result = await openstackService(opts);
    res.send({ type: "success", items: result.data });
  } catch (error) {
    console.log(error);
    res.send({ type: "failed", msg: error.message || error });
  }
}
