import React from "react";
import { auth, db } from "../shared/firebase";
import { signInWithEmailAndPassword } from "firebase/auth"
import { getDocs, where, query, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; 

//label 달기!

const Login = () => {
    const navigate = useNavigate();

    const id_ref = React.useRef(null);
    const pw_ref = React.useRef(null);

    const submit = async () => {
        console.log(id_ref.current.value, pw_ref.current.value)

        const user = await signInWithEmailAndPassword(
            auth,
            id_ref.current.value,
            pw_ref.current.value
        );

        console.log(user);

        const user_docs = await getDocs(query(
            collection(db, "users"), where("user_id", "==", user.user.email))
            );
        user_docs.forEach((u) => {
            console.log(u.data());
        });

        alert('환영합니다!');

        navigate('/');
    }

    return (
        <div className="login">
            <div className="login-title">
                <h2>로그인하기</h2>
            </div>
            <div className="login-inputs">
                <p>◼ 아이디(이메일)</p><input ref={id_ref} placeholder="아이디를 입력하세요"/>
                <p>◼ 비밀번호</p><input ref={pw_ref} type="password" placeholder="비밀번호를 입력하세요"/>
            </div>
            <div>
                <button onClick={submit}>로그인</button>
            </div>
        </div>
    )
}

export default Login;
