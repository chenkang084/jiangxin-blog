import { Request, Response } from 'express';
import BaseController from './base.controller';
import { log } from '../utils/common';
import { BaseResult } from '../pojos/baseResult';
import config from '../config';
import * as session from 'express-session';
import { login, logout } from '../services/auth.service';
export default class AuthController extends BaseController {
  // sign in the app
  signIn = (req: Request, res: Response) => {
    const url = req.url.replace(/^\/auth\/+/, '');
    const { userName, password } = req.body;
    const data = {
      auth: {
        identity: {
          methods: ['password'],
          password: {
            user: {
              name: userName,
              domain: {
                name: 'Default',
              },
              password,
            },
          },
        },
      },
    };

    login.call(this, { url, method: 'post', data }, res);
  };

  // sign out the app
  signOut = (req: Request, res: Response) => {
    const url = req.url.replace(/^\/auth\/+/, '');
    logout.call(
      this,
      { url, method: 'delete', headers: this.processHeaders() },
      res,
    );
  };
}
