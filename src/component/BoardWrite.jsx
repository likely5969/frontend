import React ,{ useEffect,useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

 const BoardWrite = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const accessToken  = sessionStorage.getItem("accessToken");
  const[board,setBoard] = useState({title:"",content:""});
  const[userData,setUserData] = useState({});
  const[isAdmin,setIsAdmin] = useState(false);
 
 useEffect(()=>{
        checkPermission(sessionStorage.getItem("memberId"));
    },[]);


    const checkPermission = async (memberId)=>
      {
          const response =await fetch("http://localhost:8080/api/v2/board/write",{
              method:'GET',
              headers: {
                  'Content-Type' : 'application/json',
                  'Authorization': `Bearer ${accessToken}`  // Access Token을 Authorization 헤더에 포함
    
              },
           });
         if(response.ok){
          const data = await response.json();
          const isAdmin = data.data.memberRoleList.some((memberRole)=> memberRole.role.roleName ==="ADMIN");
  
          setUserData(data.data);
          setIsAdmin(isAdmin);
  
  
        }
      }






  const writeTitle = (e)=>{
    setBoard({...board,title: e.target.value});
  }


  const writeContent = (e)=>{
    setBoard({...board,content: e.target.value});
  }
  const submitBoard = async (e) =>{
    e.preventDefault();
     const requestBoard = {
      title: board.title,
      content : board.content,
    };

    try{
      const response = await axios.get('http://localhost:8080/api/v2/board/write',{
        headers : {
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${accessToken}`
        }
        
      });
      debugger
    }catch(error){
      console.log(error)
    }finally{

    }
  }
  const goList = ()=>{
    const boardId= 13;
    const pageNo = 1;
    const goUrl = `/board/list/${boardId}/${pageNo}`;  // 상대 경로로 변경

    navigate(goUrl);



  }

  return (
    <div>
      <h1>글쓰기 페이지</h1>
      {isAdmin? 
      <form className="formData" onSubmit={submitBoard}> 
        <input 
          type="text"
          name="title" 
          id="title"
           
          value={board.title}   
          onChange={writeTitle}     
        />
        <textarea 
          name="content" 
          id="content"
          value={board.content}
          onChange={writeContent}     
        />
        {board.title? <button>수정</button>: <button className="submitButton" type="button" onClick={submitBoard}>저장</button>
        }
        <button className='list' onClick={goList}>목록</button>
      </form> 
      : <p>권한이 없다 </p> }






    </div>
    
  )
 };
 export default BoardWrite;  