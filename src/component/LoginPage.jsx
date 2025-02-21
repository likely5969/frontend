import { useState } from "react";
import "./LoginPage.css";
const LoginPage=()=>{
    const [userId,setUserId] = useState("yellowplace");
    const [password,setPassword] = useState("123123123");
    const [error,setError]= useState("");

    const handleLogin = async (e) =>{
        e.preventDefault(); // 폼의 기본 동작인 새로고침 방지

         console.log(JSON.stringify({userId,password}));
         const response = await fetch("http://localhost:8080/api/v2/login/loginAction",{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body:JSON.stringify({userId,password}),
        });
         if(response.ok){
            const data = await response.json();
            sessionStorage.setItem("accessToken",data.data.accessToken);
            sessionStorage.setItem("memberId",data.data.memberId);
            if(data.data.accessToken.length > 1){
                window.location.href ='/main';
            }
            debugger;
        }
        else
        {
            setError("비번이나 계정명이 틀렸어요");
       }
    };
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin} className="login-form">
                <div className="input-group">
                    <label>userId</label>
                    <input type="text" value={userId} onChange={(e)=>setUserId(e.target.value)} required/>
                </div>
                <div className="input-group">
                    <label>password</label>
                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}   required/>
                    <button type="submit" className="login-button">로그인1111111111</button>
                </div>

                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};
export default LoginPage;
