import {useSelector, useDispatch} from 'react-redux';

const useAuth = () =>{
    const dispatch = useDispatch();
    const {auth} = useSelector((state) => state.auth);
    const setAuth = (auth)=>{
        dispatch({type:"ADD_AUTH",auth:auth});
    };

    return[
        auth,
        setAuth,
    ];

};

export default useAuth;