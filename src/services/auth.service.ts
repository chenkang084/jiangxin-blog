import { openStackService, OpenStackServiceOpts } from './axios.service';
import { Request, Response } from 'express';

export async function login(opts: OpenStackServiceOpts, res: Response) {
  try {
    const result = await openStackService(opts);

    this.processHeaders({
      'X-Auth-Token': result.headers['x-subject-token'],
      'X-Subject-Token': result.headers['x-subject-token'],
    });

    res.send({ type: 'success', items: result.data });
  } catch (error) {
    console.log(error);
    res.status(error.status);
    res.send({ type: 'failed', msg: error.message || error });
  }
}

export async function logout(opts: OpenStackServiceOpts, res: Response) {
  try {
    const result = await openStackService(opts);

    this.processHeaders({
      'X-Auth-Token': '',
      'X-Subject-Token': '',
    });
    res.send({ type: 'success' });
  } catch (error) {
    console.log(error);
    res.status(error.status);
    res.send({
      type: 'failed',
      msg: error.message || error,
    });
  }
}
