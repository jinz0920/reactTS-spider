import { Router, RequestHandler } from "express";
import { LoginController } from "./loginController";
export const router = Router();

enum Methods {
  get = "get",
  post = "post",
}

export function controller(root: string) {
  return function (target: new (...args: any[]) => any) {
    // target是构造函数
    const result = Object.getOwnPropertyDescriptors(target.prototype);
    // console.log(result)
    for (let key in result) {
      const path: string = Reflect.getMetadata("path", target.prototype, key);
      // Reflect.getMetadata('键名',类名,'属性名称')
      const method: Methods = Reflect.getMetadata(
        "method",
        target.prototype,
        key
      );
      const middleware: RequestHandler[] = Reflect.getMetadata(
        "middleware",
        target.prototype,
        key
      );
      // console.log('函数',key)
      const handler = target.prototype[key];
      if (path && method && handler) {
        const fullPath = root === "/" ? path : `${root}${path}`;
        if (middleware && middleware.length) {
          router[method](fullPath, ...middleware, handler);
        } else {
          // console.log(router[method])
          router[method](fullPath, handler);
        }
      }
    }
  };
}

export function use(middleware: RequestHandler) {
  return function (target: LoginController, key: string) {
    const middlewares = Reflect.getMetadata("middleware", target, key) || [];
    middlewares.push(middleware);
    Reflect.defineMetadata("middleware", middlewares, target, key);
    //  Reflect.defineMetadata('键名',值,类的构造函数,'属性名称')
    // console.log(target.getData)
  };
}
// export function get(path: string) {
//   return function (target: any, key: string) {
//     Reflect.defineMetadata("path", path, target, key);
//     Reflect.defineMetadata("method", "get", target, key);
//   };
// }
// export function post(path: string) {
//   return function (target: any, key: string) {
//     Reflect.defineMetadata("path", path, target, key);
//     Reflect.defineMetadata("method", "post", target, key);
//   };
// }

function getRequestDecorator(type: Methods) {
  return function (path: string) {
    return function (target: LoginController, key: string) {
      Reflect.defineMetadata("path", path, target, key);
      Reflect.defineMetadata("method", type, target, key);
    };
  };
}

export const get = getRequestDecorator(Methods.get);
export const post = getRequestDecorator(Methods.post);
