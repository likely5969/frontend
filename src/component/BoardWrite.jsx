import React ,{ useEffect,useState } from 'react';
import { useLocation, useNavigate ,useParams} from 'react-router-dom';
import axios from 'axios';
import checkPermission from "./commonPerm.js";

 const BoardWrite = () => {
  const[memberId,setMemberId] = useState("");
  const[roleMenuPerm,setRoleMenuPerm] = useState(null);
  const[menuApis,setMenuApis] = useState(null);
  const[article,setArticle] = useState({title:"",content:"",boardId:""});
  const location = useLocation();
  const navigate = useNavigate();
  const accessToken  = sessionStorage.getItem("accessToken");
   const { boardId } = useParams(); // URL 파라미터에서 boardId 가져오기


 useEffect(()=>{
  fetchPermission();
},[location]);
const fetchPermission = async () => {

 const result = await checkPermission(location,navigate);
    if(result)
      {
        setRoleMenuPerm(result.roleMenuPerm);
        setMemberId(result.memberId);
        setMenuApis(result.menuApis);
      }
 }
  
 const handleInput = (e) => {
   e.preventDefault();
   const {name,value} = e.target;
   setArticle((prevArticle)=>({
    ...prevArticle,
    [name] : value,
    boardId : boardId,
   }));
 }

const submitForm = async(e)=>{
 try{
  e.preventDefault(); // 기본 폼 제출 방지
   
  const response = await axios.post("http://localhost:8080/api/v2/board/writeAction",article,{
    withCredentials:true,
    headers : {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}` ,// 토큰 포함
    }
});
if(response.status == 200){
  console.log(response.data);
  if(response.data.data >0){
    navigate("/main");
  }
}
  }catch(error){
    console.log(error);
  }
}
 
return (
  <>
        <span>{memberId || "값을 로딩중..................................... "} 님 안녕하세요</span>
      <br/>
      <br/><span> {roleMenuPerm?.url ? roleMenuPerm?.url : "❌"} </span>
      <br/><span> 읽기권한 {roleMenuPerm?.canRead ? "✅" : "❌"} </span>
      <br/><span> 쓰기권한 {roleMenuPerm?.canWrite ? "✅" : "❌"} </span>
      <br/><span> 삭제권한 {roleMenuPerm?.canDelete ? "✅" : "❌"} </span>
      <br/><span> 관리권한 {roleMenuPerm?.canManaged ? "✅" : "❌"} </span>
            
  <form id="boardForm">
  <div>
    <input type="text" name="title"  onChange={handleInput}/>
    <textarea id="content" name="content"  onChange={handleInput}/>
  </div>
  <button onClick={submitForm}>저장</button>
  </form>
  </>

)
 
};
export default BoardWrite;