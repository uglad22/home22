import {db} from "../../shared/firebase";
import { collection, getDocs } from "firebase/firestore";

const LOAD = "post/LOAD";
const CREATE = "post/CREATE";

export const post_upload = (post_id , user_name, image_url, content, like, comment_list, today) => {
  return {type: CREATE, post_id , user_name, image_url, content, like, comment_list, today}
}

export const post_load = (post_list) => {
  return {type: LOAD, post_list};
}


const initialState = [
//   {
//   post_id : 1,
//   user_name : "김다희",
//   image_url : "사진",
//   content : "글 블라블라블라",
//   like : 0,
//   comment_list : 0,
//   today : "2022-07-05 06:30:22"
// }
];


export const loadPostFB = () => {
  return async function (dispatch) {
    //포스트 정보 가져온다 파이어 스토어에서!
    const post_data = await getDocs(collection(db, "post"));

    // console.log(post_data);
    let post_list = [];

    post_data.forEach((r) => {
      post_list.push({...r.data()});
    });

    // console.log(post_list);
    //넣어준다 리덕스 데이터에
    dispatch(post_load(post_list));
  }
}


export default function createPost(state = initialState, action = {}) {
    switch (action.type) {
      case "post/LOAD": {
        const temp = action.post_list;
        return [...temp];
      }

      case "post/CREATE": {
        return [{ ...state,
          post_id : action.post_id,
          user_name : action.user_name,
          image_url : action.picture,
          content : action.content,
          like : action.like,
          comment_list : action.comment_list,
          today : action.today
        }];
      }
      default:
        return state;
    }
  }
