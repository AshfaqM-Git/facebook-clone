import axios from "axios";
import { useContext,useState,useRef } from "react";
import "./update.css";
import { useHistory } from "react-router";
import { AuthContext } from "../../context/AuthContext";

export default function Update() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const description = useRef();
  const history = useHistory();
  const [file,setFile] = useState(null);
  const { user: currentUser } = useContext(AuthContext);
  
  const registerHandler = (e)=>{
    e.preventDefault();
    history.push("/login");
 };
  const handleClick = async (e) => {
    e.preventDefault();
  
    const user = {
      userId : currentUser._id,
      email: email.current.value,
      password: password.current.value,
      desc : description.current.value,
      profilePicture:file.name
    };
    
         const data = new FormData();
         const filename = Date.now + file.name ;
         data.append("file",file);
         data.append("name",filename);
         try {
          await axios.post("/upload", data);
          history.push("/");
        } catch (err) {
          console.log(err);
        }
  
      
      
      try {
        await axios.put(`/users/${currentUser._id}`, user);
        history.push("/");
      } catch (err) {
        console.log(err);
      }
    };
  

  return (
  
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Update Profile</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on ChatterX.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              required
              ref={username}
              className="loginInput"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className="loginInput"
              type="email"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              className="loginInput"
              type="password"
              minLength="6"
            />
            <input
              placeholder="description"
              required
              ref={description}
              className="loginInput"
              type="text"
            />
      
            <input
             type="file"
             required
              placeholder="Profile Picture"
              onChange={(e)=>setFile(e.target.files[0])}
              className="loginInput"
              id="file"
             
            />
            <button className="loginButton" type="submit" >
              Update Profile
            </button>
            <button className="loginRegisterButton" onClick={registerHandler}>Log into Account</button>
          </form>
        </div>
      </div>
    </div>
    
  );

  }