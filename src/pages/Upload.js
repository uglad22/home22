import React from "react";
import { db, storage } from "../shared/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { post_upload } from "../redux/modules/post";
import { useNavigate } from "react-router-dom"; 

import moment from 'moment';
import 'moment/locale/ko';
//로그인 안 하면 숨김
//label 달기!

const Upload = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const file_link_ref = React.useRef(null);
    const text_ref = React.useRef(null);

    // const [attachment, setAttachment] = useState();

    const uploadPic = async(e) => {
        console.log(e.target.files);
        const uploaded_file = await uploadBytes(
            ref(storage, `images/${e.target.files[0].name}`),
            e.target.files[0]
        );

        // console.log(uploaded_file);

        const file_url = await getDownloadURL(uploaded_file.ref);

        console.log(file_url);
        file_link_ref.current = { url: file_url };
            const new_date = moment().format('YYYY-MM-DD HH:mm:ss');
        console.log(new_date);
        
        const post_doc =  await addDoc (collection(db, "post"), {
            post_id : 1,
            user_name : "달구",
            image_url: file_link_ref?.current.url,
            content : text_ref.current.value,
            like : 0,
            comment_list : 0,
            today : new_date
        });
        

    }

    const uploadPost = async () => {

        dispatch(post_upload(file_link_ref?.current.url, text_ref.current.value));
        alert("작성이 완료되었습니다!");
        navigate("/")

    }


    return (
        <div className="upload">
            <div className="upload-title">
                <h2>게시글 작성</h2>
            </div>
            <div className="upload-inputs">
                <input type="file" accept="image/*" onChange={uploadPic} placeholder="이미지를 선택해주세요"/>
                {/* <button>사진 찾기</button> */}
                {/* <img src={} width="50px" heght="50px" /> */}
                <p>◼ 게시물 내용</p><textarea ref={text_ref} placeholder="내용을 입력하세요"/>
            </div>
            <div>
                <button onClick={uploadPost}>작성완료✔</button>
            </div>
        </div>
    )
}

export default Upload;
