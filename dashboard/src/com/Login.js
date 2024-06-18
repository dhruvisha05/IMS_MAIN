import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate();

    const login = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        axios.post('http://localhost:3000/auth/admin_login', {
            admin_email: email,
            admin_pass: pass,
        })
        
            .then(function(res) {
                console.log(res.data);
                localStorage.setItem("token", res.data.token);
                navigate("/Dashboard"); // Corrected the route to "/Dashboard"
            })
        
        .catch(function(err) {
            console.log(err);
        });
    }

    return (
        <>
            <div className='m-auto d-flex justify-content-center'>
                <div>
                    <form method='post' onSubmit={login} className='my-5'>
                        <table border={1} className='border-1 border-black p-3 rounded-2'>
                            <thead>
                                <tr className='text-center'>
                                    <th colSpan={2} className='h1 py-3'>LOGIN...!</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className='py-1'>Email :</td>
                                    <td className='py-1'>
                                        <input 
                                            type="email" 
                                            name='admin_email' 
                                            value={email} 
                                            onChange={(e) => setEmail(e.target.value)} 
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className='py-1'>Password :</td>
                                    <td className='py-1'>
                                        <input 
                                            type="password" 
                                            name='admin_pass' 
                                            value={pass} 
                                            onChange={(e) => setPass(e.target.value)} 
                                        />
                                    </td>
                                </tr>
                                <tr className='text-center'>
                                    <td colSpan={2} className='py-1'>
                                        <button className='bg-black text-white rounded-2 px-3 py-2' type='submit'>
                                            Submit
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;
