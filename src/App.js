import React from "react";
import './App.css';
import Main from "./pages/Main";
import Join from "./pages/Join";
import Login from "./pages/Login";
import Upload from "./pages/Upload";
import Detail from "./pages/Detail";
import { BiPlus } from "react-icons/bi";
import { Routes, Route, useNavigate } from "react-router-dom";
import { auth } from "./shared/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

function App() {

  const [is_login, setIsLogin] = React.useState(false);

  // console.log(auth.currentUser);

  const loginCheck = async (user) => {
    if(user) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  };

  React.useEffect(() => {
    onAuthStateChanged(auth, loginCheck);
  },[]);

  const navigate = useNavigate();
  return (

    <div className="total">
              <div className="header">
             <h1 onClick={() => {
                navigate("/", {replace: true});
                }} style={{fontSize:"6vw", fontWeight:"bolder", cursor: "pointer"}}> ◼ Magazine </h1>

            {is_login? (
                <div className="header-btns">
                    <button onClick={() => {
                      signOut(auth);
                    }}>로그아웃</button>
                <BiPlus className="upload-btn" onClick={() => {
                navigate("/upload");
              }} />
                </div>
            ) : (
              <div className="header-btns">
                  <button onClick={() => {
                  navigate('/join');
                  }}>회원가입</button>
                  <button onClick={() => {
                  navigate('/login');
                  }}>로그인</button>
              </div>)} 
          
    </div>
      <Routes>
            {is_login? (
              <>
                <Route path="/" element={ <Main />}/>
                <Route path="/join" element={ <Join /> } />
                <Route path="/login" element={ <Login /> } />
                <Route path="/upload" element={ <Upload /> } />
                <Route path="/detail:index" element={ <Detail /> } />
              </>
            ) : (
              <>
                <Route path="/" element={ <Main />}/>
                <Route path="/upload" element={ <Upload /> } />
                <Route path="/join" element={ <Join /> } />
                <Route path="/login" element={ <Login /> } />
              </>
            )}

      </Routes>

    </div>

  )
}

export default App;
