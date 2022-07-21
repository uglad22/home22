const CHANGE_TEXT = "text/CHANGE_TEXT";

const initialState = {
    pic : "사진",
    text : "글",
}

export const changeText = (pic, text) => {
    return {type: CHANGE_TEXT, pic, text}
}

export default function reducer(state = initialState, action ={}) {
    switch(action.type){
        case "text/CHANGE_TEXT": {
            return {...state, pic: action.pic, text: action.text}
        }

        default:
            return state;
    }
}