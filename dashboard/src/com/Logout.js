import { FaPowerOff } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Logout(){
    const navigate =useNavigate();

    const logout = async () =>{
        axios.get('http://localhost:3000/auth/logout_admin')
        .then(function(res) {
            localStorage.removeItem('token');
            console.log('Logout') // Corrected method name
            navigate("/"); 
        })
    }

    return(
        <>
            <button className="bg-black border-0" onClick={logout}><FaPowerOff  className='text-white text-opacity-50' /></button>
        </>
    )
}
    

export default Logout;