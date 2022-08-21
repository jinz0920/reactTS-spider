import "reflect-metadata";
import fs from "fs";
import path from "path";
import Crowller from "../crowller";
import { getResponseData } from "../utils/util";
import { Request, Response, NextFunction } from "express";
import { get, controller, post, use } from "./decorator";

interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined;
  };
}
interface CoursItem {
  title: string;
  count: number;
}

interface DataStructure {
  [key: string]: CoursItem[];
}
const checkLogin = (req: Request, res: Response, next: NextFunction): void => {
  // !!true转换成false false传换成true把isLogin变成boolean不让是any类型
  const isLogin = !!(req.session ? req.session.login : false);
  if (isLogin) {
    next();
  } else {
    res.json(getResponseData(null, "请先登录"));
  }
  // console.log('checkLogin')
};
const hello = (req: Request, res: Response, next: NextFunction): void => {
  // console.log("hello");
  next();
};

@controller("/api")
export class LoginController {
  @use(hello)
  @use(checkLogin)
  @get("/getData")
  getData(req: Request, res: Response): void {
    new Crowller();
    res.json(getResponseData<boolean>(true));
  }
  @get("/isLogin")
  isLogin(req: Request, res: Response) {
    const isLogin = !!(req.session ? req.session.login : false);
    res.json(getResponseData<boolean>(isLogin));
  }

  @use(checkLogin)
  @get("/showData")
  showData(req: Request, res: Response): void {
    try {
      const position = path.resolve(__dirname, "../../data/course.json");
      const result = fs.readFileSync(position, "utf8");
      res.json(getResponseData<DataStructure>(JSON.parse(result)));
    } catch (error) {
      res.json(getResponseData(false, "数据不存在"));
    }
  }
  @post("/login")
  login(req: RequestWithBody, res: Response): void {
    const isLogin = req.session ? req.session.login : false;
    if (isLogin) {
      res.json(getResponseData<boolean>(false, "已经登陆过"));
    } else {
      if (
        req.body.password === "123" &&
        req.body.username === "jira" &&
        req.session
      ) {
        req.session.login = true;
        res.json(getResponseData<boolean>(true));
      } else {
        res.json(getResponseData<boolean>(false, "登陆失败"));
      }
    }
  }
  @get("/logout")
  logout(req: Request, res: Response): void {
    if (req.session) {
      req.session.login = undefined;
    }
    res.json(getResponseData<boolean>(true));
  }
}
