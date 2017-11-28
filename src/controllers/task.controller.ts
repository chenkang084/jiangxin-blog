import { Express, Router, Request, Response } from "express";
import * as express from "express";
import { BaseResult } from "../pojos/baseResult";
import TaskService from "../services/task.service";
import config from "../config";

export default class TaskController {
  public app: Express;
  private taskService: TaskService;

  constructor(app: Express) {
    this.app = app;
    this.taskService = new TaskService();
  }

  test = async (req: Request, res: Response) => {
    const temp = await this.taskService.queryHomeAlertInfo(req);
    res.send(temp.data);
  };
}
