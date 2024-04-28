import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/SideBarStyle.css'
import axios from 'axios';
interface userInfo {
    name:string,
    imageSrc:string,
    email:string,
}
const Navbar:React.FC = () => {
    const [userInfo,setUserInfo] = useState<userInfo>({name:"",imageSrc:"",email:""});

    const getUserInfo = async ()=>{
        try{
            const response = await axios.get('localhost:5000/user',{withCredentials: true});
            setUserInfo(response.data);
            console.log('user info',response.data);
        }catch(error){
            console.error('error during fetching user info',error);
        }
    }

    const userLogout = async ()=>{
        try{
            const response = await axios.get('localhost:5000/logout',{withCredentials: true});
            console.log('user info',response.data);
        }catch(error){
            console.error('error during fetching user info',error);
        }
    }

    useEffect(()=>{
        getUserInfo();
    },[]);
    return (
        <div className="sidebar">
            <div className="top">
                <div className="logo">
                    <span>HabiTrack</span>
                </div>
            </div>
            <div className="user">
                <img src={userInfo.imageSrc} alt="user-image" className="user-image" />
                <div>
                    <p>{userInfo.name}</p>
                </div>
            </div>
            <ul className="nav-list">
                <li>
                    <Link to="/home" className="nav-items">
                        <span >Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Link to="/user" className="nav-items">
                        <span >User Info</span>
                    </Link>
                </li>
                <li>
                    <Link to="/habits" className="nav-items">
                        <span >Habits</span>
                    </Link>
                </li>
                <li>
                    <Link to="/logout" className="nav-items">
                        <span onClick={()=>userLogout()} >Log out</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
}               

export default Navbar;