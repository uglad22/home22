import React from "react";
import { db, auth } from "../shared/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; 

//label 달기!

const Join = () => {
    const navigate = useNavigate();
    // 값이 전부 말짱해! === 벨리데이션
    // if(id_ref.current.value === ""){
    //     return false;
    // }
    
    //input 값 ref로 받아오기
    const id_ref = React.useRef(null);
    const name_ref = React.useRef(null);
    const pw_ref = React.useRef(null);

    // signup 함수 : 파이어베이스에 user 값 저장
    const signup = async () => {
        const user = await createUserWithEmailAndPassword(
            auth,
            id_ref.current.value,
            pw_ref.current.value
        );
        console.log(user);

        // addDoc 사용해서 데이터 넣기
        // const user_doc = await addDoc(콜렉션(어디 콜렉션에 저장할거야!), 넣을 데이터!);
        const user_doc = await addDoc(collection(db, "users"), {
            user_id : user.user.email,
            name : name_ref.current.value
        });
        
        console.log(user_doc.id)

        alert("가입이 완료되었습니다.");
        navigate('/login', {replace: true})
    }

    return (
        <div className="join">
            <div className="join-title">
                <h2>회원가입</h2>
            </div>
            <div className="join-inputs">
                <p>◼ 아이디(이메일)</p><input ref={id_ref} placeholder="아이디를 입력하세요"/>
                <p>◼ 닉네임</p><input ref={name_ref} placeholder="닉네임을 입력하세요"/>
                <p>◼ 비밀번호</p><input ref={pw_ref} type="password" placeholder="비밀번호를 입력하세요"/>
                <p>◼ 비밀번호 확인</p><input type="password" placeholder="비밀번호를 다시 입력하세요"/>
            </div>
            <div className="join-btns">
                <button onClick={signup}>가입하기✔</button>
            </div>
        </div>
    )
}

export default Join;
