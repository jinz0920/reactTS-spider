import axios from "axios";
import ReactECharts from "echarts-for-react";
import "./home.css";
import { Button, message } from "antd";
import { Component, ReactNode } from "react";
import { Navigate } from "react-router-dom";

class Home extends Component {
  constructor(props: any) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleCrowllerClick = this.handleCrowllerClick.bind(this);
  }

  state = {
    loaded: false,
    isLogin: true,
  };

  componentDidMount(): void {
    axios.get("api/islogin").then((res) => {
      const _this = this;
      if (!res.data.data) {
        // console.log(res);
        _this.setState({
          isLogin: false,
        });
      } else {
        _this.setState({ loaded: true });
      }
    });
  }
  handleClick() {
    localStorage.removeItem("login");
    axios.get("api/logout").then((res) => {
      if (res.data.data) {
        // console.log(res);
        this.setState({
          isLogin: false,
        });
      }
    });
  }

  handleCrowllerClick() {
    axios.get("api/getData").then((res) => {
      if (res.data.data) {
        console.log(res);
        message.success("数据爬取成功");
      }
    });
  }

  // getOption() {
  //   return {
  //     xAxis: {
  //       data: ["A", "B", "C", "D", "E"],
  //     },
  //     yAxis: {},
  //     series: [
  //       {
  //         data: [10, 22, 28, 23, 19],
  //         type: "line",
  //         areaStyle: {},
  //       },
  //       {
  //         data: [25, 14, 23, 35, 10],
  //         type: "line",
  //         areaStyle: {
  //           color: "#ff0",
  //           opacity: 0.5,
  //         },
  //       },
  //     ],
  //   };
  // }

  option = {
    xAxis: {
      data: ["A", "B", "C", "D", "E"],
    },
    yAxis: {},
    series: [
      {
        data: [10, 22, 28, 23, 19],
        type: "line",
        areaStyle: {},
      },
      {
        data: [25, 14, 23, 35, 10],
        type: "line",
        areaStyle: {
          color: "#ff0",
          opacity: 0.5,
        },
      },
    ],
  };
  render(): ReactNode {
    const { isLogin, loaded } = this.state;
    if (isLogin) {
      if (loaded) {
        return (
          <div className="home-page">
            <div className="buttons">
              <Button
                type="primary"
                shape="round"
                onClick={this.handleCrowllerClick}
              >
                爬取数据
              </Button>
              <Button type="primary" shape="round">
                展示数据
              </Button>
              <Button type="primary" shape="round" onClick={this.handleClick}>
                退出
              </Button>
            </div>
            <div className="echart">
              <ReactECharts option={this.option} />
            </div>
          </div>
        );
      }
      return null;
    }
    return <Navigate to="/login" />;
  }
}

export default Home;
