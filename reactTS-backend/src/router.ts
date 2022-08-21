// import fs from "fs";
// import path from "path";
// import { Router, Request, Response, NextFunction } from "express";
// import Crowller from "./crowller";
// import { getResponseData } from "./utils/util";

// const checkLogin = (req: Request, res: Response, next: NextFunction) => {
//   const isLogin = req.session ? req.session.login : false;
//   if (isLogin) {
//     next();
//   } else {
//     res.json(getResponseData(null, "请先登录"));
//   }
// };

// interface RequestWithBody extends Request {
//   body: {
//     [key: string]: string | undefined;
//   };
// }

// const router = Router();
// router.get("/", () => {
  
// });

// router.post("/login", (req: RequestWithBody, res: Response) => {
//   const isLogin = req.session ? req.session.login : false;
//   if (isLogin) {
//     res.json(getResponseData(false, "已经登陆过"));
//   } else {
//     if (req.body.password === "123" && req.session) {
//       req.session.login = true;
//       res.json(getResponseData(true));
//     } else {
//       res.json(getResponseData(false, "登陆失败"));
//     }
//   }
// });

// router.get("/getData", checkLogin, (req: RequestWithBody, res: Response) => {
//   new Crowller();
//   res.json(getResponseData(true));
// });
// router.get("/showData", checkLogin, (req: RequestWithBody, res: Response) => {
//   try {
//     const position = path.resolve(__dirname, "../data/course.json");
//     const result = fs.readFileSync(position, "utf8");
//     res.json(getResponseData(JSON.parse(result)));
//   } catch (error) {
//     res.json(getResponseData(false, "数据不存在"));
//   }
// });

// router.get("/logout", (req: RequestWithBody, res: Response) => {
//   if (req.session) {
//     req.session.login = undefined;
//   }
//   res.json(getResponseData(true));
// });

// export default router;
