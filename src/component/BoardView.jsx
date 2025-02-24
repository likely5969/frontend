import React ,{ useEffect,useState } from 'react';
import { useLocation, useNavigate ,useParams} from 'react-router-dom';
import axios from 'axios';
import checkPermission from "./commonPerm.js";
import axiosInstance, { setAuthorizationHeader } from './axiosInstance';

 const BoardView = () => {
  const[memberId,setMemberId] = useState("");
  const[roleMenuPerm,setRoleMenuPerm] = useState(null);
  const[menuApis,setMenuApis] = useState(null);
  const[article,setArticle] = useState({title:"",content:"",boardId:"",id:""});
  const location = useLocation();
  const navigate = useNavigate();
  const accessToken  = sessionStorage.getItem("accessToken");
  const { boardId,articleId } = useParams(); // URL 파라미터에서 boardId 가져오기
  const [isEditable, setIsEditable] = useState(true);

 useEffect(()=>{
  fetchPermission();
},[location]);
const fetchPermission = async () => {

 const result = await checkPermission(location,navigate);
    if(result)
      {
        console.log(result.roleMenuPerm);
        setRoleMenuPerm(result.roleMenuPerm);
        setMemberId(result.memberId);
        setMenuApis(result.menuApis);
        setAuthorizationHeader(accessToken);
        boardOne(boardId,articleId );
      }
 }


 const boardOne =async (boardId,articleId)=>{
  try{
    const url = "http://localhost:8080/api/v2/board/view/"+boardId+"/"+articleId;
    const response = await axios.get(url,{
    withCredentials:true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}` // 토큰 포함
    }


  });
  if(response.status == 200){
    console.log(response.data.data);
    setArticle(response.data.data);
   }
  }catch(error){
    console.log(error);
  }
}

const goList = ()=>{
  navigate("/main");

 }
 

const  goModify = ()=>{
   const shouldModify = window.confirm("수정하시겠습니까?");
   if(shouldModify){
    setIsEditable(false);

   }
}

const save = async(e)=>{
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

const inputChange = (e)=>{
  const {name,value} = e.target;
  setArticle((prevArticle)=>({
       ...prevArticle, [name]:value,boardId:boardId,id:articleId
  }))
}
const goDelete =async (boardId,id)=>{
 
  try{
    const response = await axiosInstance.delete(`http://localhost:8080/api/v2/board/delete/${boardId}/${id}`); 
    if(response.status == 200){
        navigate("/main");
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
            
   <div>
    <input type="text" name="title"  value={article?.title} readOnly ={isEditable} onChange={inputChange}/>
    <textarea id="content" name="content"  value={article?.content} readOnly ={isEditable} onChange={inputChange}/>
  </div>
   <div className="buttonArea">
  <button className="" onClick={goList} >목록</button>
  
  
  {roleMenuPerm?.canWrite &&  ( <button className="" onClick={isEditable ? goModify: save} >{isEditable ? "수정": "저장"} </button> )}
  {roleMenuPerm?.canDelete  && ( <button className="" onClick={(e)=>{goDelete(boardId,articleId,e)}} >삭제</button>   )}
  </div>
    </>
)
 
};
export default BoardView;