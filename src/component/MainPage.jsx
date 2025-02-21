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
    useEffect(()=>{
       fetchPermission();
    },[]);
    const fetchPermission = async () => {
      const result = await checkPermission();
      if(result)
        {
          setRoleMenuPerm(result.roleMenuPerm);
          setMemberId(result.memberId);
          setMenuApis(result.menuApis);
        }
    
    
    
    }
 
    const getBoardList = async ()=>{
      try{
        let pageNo = 1;
        const response = await axios.get("http://localhost:8080/api/v2/board/list/"+boardId+"/"+pageNo,{
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

  return (
    <div className="">
      <span>{memberId || "값을 로딩중..................................... "} 안녕</span>
      메뉴 권한은 {roleMenuPerm===null? 0 :roleMenuPerm.memberPermVal} 이다 
      <ul>
      {articles.map((article,index)=>(
        <li key={index}>
          <p>{article.title}</p>
          <p>{article.content}</p>
          <p>{article.regId}</p>
          <p>{article.createdAt}</p>
          <p>{article.updId}</p>
          <p>{article.updatedAt}</p>
        </li>
      ))}
      </ul>



      {roleMenuPermiss?.memberPermVal == 15? (<button onClick={handleWriteMove}>글쓰기</button>) : (<span>권한없다 </span>)}
      <ul>
      {  menuApis && menuApis.length > 0 ? 
        (menuApis.map((menuApi,index) => (<li key={index}>사용가능한 api는 :{menuApi}</li>)))  : (<li>없다</li>) 
      }
      </ul>
    </div>
  )
}

export default MainPage