import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./component/LoginPage"; 
import MainPage  from "./component/MainPage";
import BoardWrite from "./component/BoardWrite";
import BoardView from "./component/BoardView";


function App() {
 
  return (
    <>
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage/>}></Route>
        <Route path="/main" element={<MainPage/>}></Route>
        <Route path="/board/write/:boardId" element={<BoardWrite/>}></Route>
        <Route path="/board/view/:boardId/:articleId" element={<BoardView/>}></Route>

      </Routes>
    </Router>
    </>
  )
}

export default App
