import superagent from "superagent";
import cheerio from "cheerio";
import fs from "fs";
import path from "path";
// superagent是获取网页html代码 npm install superagent --save &&npm i --save-dev @types/superagent 两个都要安装
// cheerio 解析html
interface Course {
  title: string;
  pers: string;
}

interface CourseFinal {
  time: number;
  data: Course[];
}

interface Content {
  [propName: number]: Course[];
}
export default class Crowller {
  private url = `https://coding.imooc.com/?c=tyscript`;

  // 解析html
  getCourseInfo(html: string) {
    const $ = cheerio.load(html);
    const courseInfos: Course[] = [];
    $(".ellipsis2").map(function (i, el) {
      const title = $(el).text();
      courseInfos.push({ title: title, pers: "" });
    });

    $(".numbers").map(function (i, el1) {
      const pers = $(el1).text();
      const index = pers.indexOf("·");
      const result = pers.substring(index + 2, pers.length);
      courseInfos[i]["pers"] = result;
    });

    return {
      time: new Date().getTime(),
      data: courseInfos,
    };
  }
  //   获取html
  async getRawHtml() {
    const result = await superagent.get(this.url);
    return result.text;
  }
  // 添加文件
  generateJsonContent(courseInfos: CourseFinal) {
    const filePath = path.resolve(__dirname, "../data/course.json");
    let fileContent: Content = {};
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }
    fileContent[courseInfos.time]=courseInfos.data
    fs.writeFileSync(filePath,JSON.stringify(fileContent))
  }
  // 爬虫
  async initSpiderProcess() {
    const html = await this.getRawHtml();
    const courseInfos = this.getCourseInfo(html);
    this.generateJsonContent(courseInfos);
    console.log(courseInfos);
  }
  //   构造器
  constructor() {
    this.initSpiderProcess();
  }
}

// const crowller = new Crowller();
