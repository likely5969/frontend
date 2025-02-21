import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./component/LoginPage"; 
import MainPage  from "./component/MainPage";
import BoardWrite from "./component/BoardWrite";
import BoardList from "./component/BoardList";

function App() {
 
  return (
    <>
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage/>}></Route>
        <Route path="/main" element={<MainPage/>}></Route>
        <Route path="/board/write" element={<BoardWrite/>}></Route>
        <Route path="/board/list/:boardId/:pageNo" element={<BoardList/>}></Route>

      </Routes>
    </Router>
    </>
  )
}

export default App
