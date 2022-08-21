// import Cookies from "cookies-ts"
import Login from "./pages/Login/Login";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./pages/Home";
 
function App() {
  // const cookies = new Cookies()
  // const msg= cookies.
  // console.log(msg)
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
