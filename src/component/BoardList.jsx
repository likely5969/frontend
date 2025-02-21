import React ,{ useEffect,useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';  

 const BoardList = () => {
   const navigate = useNavigate();
    const accessToken = sessionStorage.getItem("accessToken");  
    const { boardId, pageNo } = useParams();

    useEffect(()=>{
        fetchArticles(boardId,pageNo);
    },[pageNo,boardId]);


  const fetchArticles = async(boardId,pageNo)=>{
    const response =await fetch("http://localhost:8080/api/v2/board/"+boardId+"/"+pageNo,{
      headers: {
        'Content-Type' : 'application/json',
        'Authorization': `Bearer ${accessToken}`  // Access Token을 Authorization 헤더에 포함
      },
  });
  if(response.ok){
   const data = await response.json();
  }
}
  return (
    <>
    </>
  )
}
 export default BoardList;  