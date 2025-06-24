import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { Home } from "./features/Home";
import Reigster from "./features/Reigster";
import Login from "./features/Login";
import BoardList from "./features/BoardList";
import BoardDetail from "./features/BoardDetail";
import BoardRegister from "./features/BoardRegister";
import BoardModify from "./features/BoardModify";

// 페이지 이동을 위해 라우터 처리
function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={ <Home /> }></Route>
          <Route path="/register" element={ <Reigster /> }></Route>
          <Route path="/login" element={ <Login /> }></Route>

          <Route path="/board/list" element={<BoardList />}></Route>
          <Route path="/board/register" element={<BoardRegister />}></Route>
          <Route path="/board/read/:no" element={<BoardDetail />}></Route>
          <Route path="/board/modify/:no" element={<BoardModify />}></Route>


        </Route>
        

      </Routes>

    </div>

  );
}

export default App;
