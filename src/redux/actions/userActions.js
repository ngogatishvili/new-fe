import {
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  CHANGE_USERNAME_SUCCESS,
  CHANGE_USERNAME_ERROR,
  LOGOUT_USER,
} from './userTypes';
import axios from 'axios';
import '../../axios';
import {showAlert} from './alertActions';


const user=JSON.parse(localStorage.getItem("user"))

// pure action creators

export const registerUserSuccess = (user) => {
  return {
    type: REGISTER_USER_SUCCESS,
    payload: user,
  };
};

export const registerUserError = (error) => {
  return {
    type: REGISTER_USER_ERROR,
    payload: error,
  };
};

export const loginUserSuccess = (user) => {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: user,
  };
};

export const loginUserError = (error) => {
  return {
    type: LOGIN_USER_ERROR,
    payload: error,
  };
};


export const changeUsernameSuccess=(updatedUsername)=>{
  return {
    type:CHANGE_USERNAME_SUCCESS,
    payload:updatedUsername
  }
}
export const changeUsernameError=(error)=>{
  return {
    type:CHANGE_USERNAME_ERROR,
    payload:error
  }
}
export const logout = () => {
  return {
    type: LOGOUT_USER,
  };
};

// async action creators

export const registerUser = (userInput) => {
  return (dispatch) => {
    axios
      .post(`/auth/register`, {...userInput})
      .then((response) => {
        const {token, user} = response.data;
        dispatch(registerUserSuccess(user.name));
        localStorage.setItem('user', JSON.stringify({token, name: user.name,id:user.id}));
      })

      .catch((error) => {
        dispatch(registerUserError({msg: error.response.data.msg}));
        dispatch(showAlert());

      });
  };
};

export const loginUser = (userInput) => {
  return (dispatch) => {
    axios
      .post(`/auth/login`, {...userInput})
      .then((response) => {
        const {token, user} = response.data;
        dispatch(loginUserSuccess(user.name));
        localStorage.setItem('user', JSON.stringify({token, name: user.name,id:user.id}));
      })
      .catch((error) => {
        dispatch(loginUserError({msg: error.response.data.msg}));
        dispatch(showAlert());
      });
  };
};

export const changeUsername=(id,value)=>{
  return async(dispatch)=>{
     try {
      const {data}=await axios.patch(`/auth/${id}/changeUsername`,{value})
      dispatch(changeUsernameSuccess(data))
        const updatedLocalData={...user,name:data}
        localStorage.setItem("user",JSON.stringify(updatedLocalData));
        return data;
     }catch(err) {
      dispatch(changeUsernameError({msg:err.response.data.msg}))
     }
        

      
     
        
      
  }
}