import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link, Redirect } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router";
import { logoutCall } from "../../apiCalls";
import { useEffect } from "react";
import axios from "axios";

const PF = process.env.REACT_APP_PUBLIC_FOLDER;

async function startSearching(e) {
  const searchUser = e.target.value;
  console.log(searchUser)
  if (searchUser) {
    const response = (await axios.get(`/users/${searchUser}`));
    console.log(response, response.data.length > 0);
    if (response.data.length > 0) {
      document.querySelector('.searchResult').innerHTML = `
      <a href="/profile/${response.data[0].username}">
        <div class = "searchedUser">
          <img src="${(response.data[0].profilePicture) ? (PF + response.data[0].profilePicture) : (PF + 'person/noAvatar.png')}"/>
          <h2>${response.data[0].username}</h2>
        <div>
      </a>
      `;
    }
    else {
      document.querySelector('.searchResult').innerHTML = ""
    }
  }

}
export default function Topbar() {

  const history = useHistory();
  const { dispatch, user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  let [getSearchUser, setSearchUser] = useState("");
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
            value={getSearchUser} onChange={(e) => { setSearchUser(e.target.value); startSearching(e) }}
            className="searchInput"
          />
        </div>
        <div className="searchResult">
        </div>
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
