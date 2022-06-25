import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link, Redirect } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router";
import { logoutCall } from "../../apiCalls";
import { useEffect } from "react";
import axios from "axios";
export default function Topbar() {

  const history = useHistory();
  const { dispatch, user } = useContext(AuthContext);
  const [getSearchUser, setSearchUser] = useState();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  let [getSearchUsers,setSearchUsers] = useState([]);
  // let getSearchUsers  = []
  useEffect(async () => {
    if (getSearchUser) {
      const response = (await axios.get(`/users/${getSearchUser}`));
      if(response.data.length>0){
        console.log(getSearchUsers.username,response.data[0].username)
        if(getSearchUsers.username!=response.data[0].username)
          setSearchUsers(response.data)
      }
      console.log(getSearchUsers);
    }
  },[getSearchUser,getSearchUsers])
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Lamasocial</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            value={getSearchUser} onChange={(e) => { setSearchUser(e.target.value) }}
            className="searchInput"
          />
        </div>
        {
          (getSearchUser) ? <div>
            fafdsa
            {
              
              (getSearchUsers.length > 0)? getSearchUsers.map((singleUser, index) => {
                console.log(singleUser)
                return (
                  <div className="search-result-user">
                    <div> fajhakjf</div>
                  </div>
                )
              }):<div>nothing</div>
            }
          </div> :
            <div></div>
        }
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <Link to="/messenger">
            <div className="topbarIconItem">
              <Chat />
              <span className="topbarIconBadge">2</span>
            </div>
          </Link>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        
          <button className ="logOut" onClick={(e)=>{
            e.preventDefault();
            localStorage.clear();
            logoutCall({user},dispatch,history);
      
          }} >Log Out</button>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}
