import axios from "axios";

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("/auth/login", userCredential);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};
export const logoutCall = async (user, dispatch,history) => {
  
 
  try {
    dispatch({ type: "LOG_OUT" ,payload:user});
    history.push("/login");
  } catch (err) {
    console.log(err);
  }
};
