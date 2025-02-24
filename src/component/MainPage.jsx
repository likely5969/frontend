import React ,{ useEffect,useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';
 import checkPermission from "./commonPerm.js";
 
  const MainPage = () => {
  const[memberId,setMemberId] = useState("");
  const[roleMenuPerm,setRoleMenuPerm] = useState(null);
  const[menuApis,setMenuApis] = useState(null);
  const[articles,setArticles] = useState([]);
  const[boardId,setBoardId] = useState(1);
  
  const navigate = useNavigate();
  const location = useLocation();  // 현재 경로 가져오기
  const accessToken = sessionStorage.getItem("accessToken");
  useEffect(()=>{
        fetchPermission();
    },[location,navigate]);
    const fetchPermission = async () => {
      const result = await checkPermission(location,navigate);
      if(result)
        {
          console.log(result.roleMenuPerm);
          setRoleMenuPerm(result.roleMenuPerm);
          setMemberId(result.memberId);
          setMenuApis(result.menuApis);
          getBoardList();
       }
    }
 
    const getBoardList = async ()=>{
      try{
         let pageNo = 1;
         const url = "http://localhost:8080/api/v2/board/list/"+boardId+"/"+pageNo;
     
        const response = await axios.get(url,{
          withCredentials:true,
          headers : {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}` // 토큰 포함
          }
          
        });
        if(response.status ==200){
           setArticles(response.data.data);
           setBoardId(response.data.data[0].boardId);
          }
      }catch(error){
        console.log(error);
      }
    }

    const handleWriteMove = ( )=>{
      navigate(`/board/write/${boardId}`);  
    }
    const goArticle = (boardId,articleId)=>{
      navigate(`/board/view/${boardId}/${articleId}`);  
       
    }
  return (
    <div className="">
      <span>{memberId || "값을 로딩중..................................... "} 님 안녕하세요</span>
      <br/>
      <br/><span> {roleMenuPerm?.url ? roleMenuPerm?.url : "❌"} </span>
      <br/><span> 읽기권한 {roleMenuPerm?.canRead ? "✅" : "❌"} </span>
      <br/><span> 쓰기권한 {roleMenuPerm?.canWrite ? "✅" : "❌"} </span>
      <br/><span> 삭제권한 {roleMenuPerm?.canDelete ? "✅" : "❌"} </span>
      <br/><span> 관리권한 {roleMenuPerm?.canManaged ? "✅" : "❌"} </span>
            
      
      
      <table border="1">
        <thead>
          <tr>
            <th>제목:</th>
            <th>내용:</th>
            <th>등록자:</th>
            <th>등록일:</th>
 
          </tr>
        </thead>
        <tbody>

          {articles.map((article,index)=>(
            <tr key={index}> 
            <td>
              <a href="#" onClick={(e)=>{e.preventDefault(); goArticle(boardId,article.id)}} >{article.title}</a> </td>
              <td>{article.content} </td>
              <td>{article.regId} </td>
              <td>{article.createdAt} </td>
          
            </tr>
          ))}
      </tbody>

      </table>



      {roleMenuPerm?.canWrite? (<button onClick={handleWriteMove}>글쓰기</button>) : (<span>권한없다 </span>)}
      <ul>
      {  menuApis && menuApis.length > 0 ? 
        (menuApis.map((menuApi,index) => (<li key={index}>사용가능한 api는 :{menuApi}</li>)))  : (<li>없다</li>) 
      }
      </ul>
    </div>
  )
}

export default MainPage