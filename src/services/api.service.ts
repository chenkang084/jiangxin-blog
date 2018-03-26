import { openStackService, OpenStackServiceOpts } from "./axios.service";
import { Request, Response } from "express";

export async function commonApiService(
  opts: OpenStackServiceOpts,
  res: Response
) {
  try {
    const result = await openStackService(opts);
    res.send({ type: "success", items: result.data });
  } catch (error) {
    setTimeout(() => {
      console.log(error);
    res.status(error.status);
    res.send({ type: "failed", msg: error.msg || error });
    }, 8000);
  }
}
