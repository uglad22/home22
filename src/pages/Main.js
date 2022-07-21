import React from "react";
import { useSelector } from "react-redux";
import { loadPostFB } from "../redux/modules/post";
import { useDispatch } from "react-redux";
//div 이름 정리할 것

const Main = () => {

    const post_data = useSelector((state) => state.post);
    const dispatch = useDispatch();
    // console.log(post_data);
    
    React.useEffect(() => {
        dispatch(loadPostFB());
    }, []);

    return (
        <div className="main">

            <div className="list">
                {post_data.map((u, idx) => {
                    // console.log(u);
                    return (
                        <div key={idx}>
                            <div className="list-title">
                                <p> 작성자 {u.user_name}님 </p>
                                <p> {u.today} </p>
                            </div>
                            <div className="list-body">
                                <img src={u.image_url} alt="" />
                                <p> {u.content} </p>
                            </div>
                            <div className="list-foot">
                                <div className="list-foot-list">
                                    <p> 좋아요 {u.like} 개 </p>
                                    <p> 댓글 {u.comment_list} 개 </p>
                                </div>
                                <div>
                                    <img className="list-foot-btn" src="img/heart_empty.png" alt=""/>
                                </div>
                            </div>
                       </div>
                    )
                })}
                
            </div>
        </div>
    )
}

export default Main;
