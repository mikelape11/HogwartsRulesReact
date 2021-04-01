  
const INITIAL_STATE = {
    auth: "false",
};
//20.71.38.29
const loadauth = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case "ADD_AUTH":
            return { ...state, auth:action.auth};
        default:
            return state;
    }
};

export default loadauth;