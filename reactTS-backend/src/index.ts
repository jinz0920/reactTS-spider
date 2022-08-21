import bodyParser from "body-parser";
import express, { Request, Response, NextFunction } from "express";
import cookieSession from 'cookie-session'
import './controller/loginController'
import {router} from './controller/decorator'

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieSession({
  name: 'session',
  keys: ['lala'],
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))
// 中间件不好使
app.use((req: Request, res: Response, next: NextFunction) => {
  // req.teacherName = "dell";
  next();
});
// 路由永远在中间件最后
app.use(router);
app.listen(7001, () => {
  console.log("server is running");
});
