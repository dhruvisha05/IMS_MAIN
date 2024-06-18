import React, { useState, useEffect } from 'react';
import Header from './Header';
import { Container, Row, Col } from 'react-bootstrap';
import Fromdata from './Fromdata';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddAdmin() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [role, setRole] = useState('');
    const [roles, setRoles] = useState([]); 
    const [branch, setBranch] = useState('');
    const [branches, setBranches] = useState([]);
    const [contact, setContact] = useState('');
    const [image, setImage] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        axios.get('http://localhost:3000/role/view_role', {
            headers: {
                authorization: token
            }
        })

        .then(response => {
            if (response.data && Array.isArray(response.data.data)) {
                setRoles(response.data.data);
            } else {
                console.error('Invalid API response format', response.data);
            }
        })
        .catch(error => {
            console.log(error);
        });
    }, [token]);
    useEffect(() => {
        axios.get('http://localhost:3000/branch/view_branch', {
            headers: {
                authorization: token
            }
        })
        .then(response => {
            if (response.data && Array.isArray(response.data.data)) {
                setBranches(response.data.data);
            } else {
                console.error('Invalid API response format', response.data);
            }
        })
        .catch(error => {
            console.log(error);
        });
    }, [token]);

    const addadmin = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/auth/register', {
            admin_name: name,
            admin_email: email,
            admin_pass: pass,
            role: role,
            branch: branch,
            contact: contact,
        })
        .then(function(res) {
            console.log(res.data);
            navigate("/Dashboard"); 
        })
        .catch(function(err) {
            console.log(err);
        });
    }

    return (
        <div>
            <Header></Header>
            <Container fluid className="ps-0">
                <Row className="gx-0">
                    <Col xl={2} lg={3} md={4} className="bg-black height text-white text-opacity-50 border-top border-secondary">
                        <Fromdata></Fromdata>
                    </Col>
                    <Col className='d-flex justify-content-center '>
                        <div className='mx-auto '>
                            <form method='post' className='my-3 w-75' onSubmit={addadmin}>
                                <table border={1} className='border-1 border-black p-3 rounded-2'>
                                    <thead>
                                        <tr className='text-center'>
                                            <th colSpan={2} className='h1 py-3'>ADD ADMIN</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className='py-1'>Name:</td>
                                            <td className='py-1'><input type='text' name='admin_name' className='w-100' value={name} onChange={(e) => setName(e.target.value)} required /></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'>Email:</td>
                                            <td className='py-1'><input type='email' name='admin_email' className='w-100' value={email} onChange={(e) => setEmail(e.target.value)} required /></td>
                                        </tr>
                                        <tr>
                                            <td className='pe-3 py-1'>Password:</td>
                                            <td className='py-1'><input type='password' name='admin_pass' className='w-100' value={pass} onChange={(e) => setPass(e.target.value)} required /></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'>Role:</td>
                                            <td className='py-1'>
                                            <select name='role' className='w-100' value={role} onChange={(e) => setRole(e.target.value)} required>
                                                    <option value=''>Select Role</option>
                                                    {roles.map(role => (<option key={role._id} value={role._id}>{role.name}</option>))}
                                            </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'>Branch:</td>
                                            <td className='py-1'>
                                            <select name='branch' className='w-100' value={branch} onChange={(e) => setBranch(e.target.value)} required>
                                                <option value=''>Select Branch</option>
                                                    {branches.map(branch => (<option key={branch._id} value={branch._id}>{branch.name}</option>))}
                                                </select>

                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'>Contact:</td>
                                            <td className='py-1'><input type='number' name='contact' className='w-100' value={contact} onChange={(e) => setContact(e.target.value)} required /></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'>Image:</td>
                                            <td className='py-1'><input type='file' name='image' onChange={(e) => setImage(e.target.files[0])} /></td>
                                        </tr>
                                        <tr className='text-center'>
                                            <td colSpan={2} className='py-2'>
                                                <button className='bg-black text-white rounded-2 px-5 py-2' type='submit'>Submit</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default AddAdmin;
