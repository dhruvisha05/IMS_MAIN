import React, { useState, useEffect } from 'react';
import Header from './Header';
import { Container, Row ,Col} from 'react-bootstrap';
import Fromdata from './Fromdata';
import { Link, Route, Routes, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
function ViewAdmin() {
    const [admin, setAdmin] = useState([]);
    const navigate =useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        axios.get('http://localhost:3000/auth/view_admin', {
            headers: {
                authorization: token
            }
        })

        .then(response => {
            if (response.data && Array.isArray(response.data.data)) {
                setAdmin(response.data.data);
            } else {
                console.error('Invalid API response format', response.data);
            }
        })
        .catch(error => {
            console.log(error);
        });
    }, [token]);
    const Delete_admin = (id) => {
        axios.get(`http://localhost:3000/auth/admin_delete/${id}`, {
            headers: {
                authorization: token
            }
        })
        .then(response => {
            if (response.status === 200) {
                setAdmin(admin.filter(admin => admin._id !== id));
            }
            navigate("/View-admin");
        })
        .catch(error => {
            console.log(error);
        });
    };

    return (
        <div>
            <Header></Header>
            <Container  fluid className="ps-0">
                <Row className="gx-0">
                <Col xl={2} lg={3} md={4}   className="bg-black height text-white text-opacity-50 border-top border-secondary">
                        
                        <Fromdata></Fromdata>
                    </Col>
                    <Col className='ms-5 ps-4'>
                        
                        <p className='fs-1  text-center'>View Admin</p>
                        <table className='view_table '>
                            <tr className='bg-black text-white'>
                                <th className='py-2 px-4 fs-4 border-1 border-white'>Name</th>
                                <th className='py-2 px-4 fs-4 border-1 border-white'>Email</th>
                                <th className='py-2 px-4 fs-4 border-1 border-white'>Password</th>
                                <th className='py-2 px-4 fs-4 border-1 border-white'>Role</th>
                                <th className='py-2 px-4 fs-4 border-1 border-white'>Branch</th>
                                <th className='py-2 px-4 fs-4 border-1 border-white'>Contact</th>
                                <th className='py-2 px-4 fs-4 border-1 border-white'>Delete</th>
                                <th className='py-2 px-4 fs-4 border-1 border-white'>Upadte</th>

                            </tr>
                            {admin.map(admin => (
                                    <tr key={admin.id}>
                                        <td className='py-2 px-4 border-1 border-black'>{admin.admin_name}</td>
                                        <td className='py-2 px-4 border-1 border-black'>{admin.admin_email}</td>
                                        <td className='py-2 px-4 border-1 border-black'>{admin.pass}</td>
                                        <td className='py-2 px-4 border-1 border-black'>{admin.role.name}</td>
                                        <td className='py-2 px-4 border-1 border-black'>{admin.branch.name}</td>
                                        <td className='py-2 px-4 border-1 border-black'>{admin.contact}</td>
                                        <td className='py-2 px-4 border-1 border-black'>
                                            <button className='bg-black text-white py-1 px-2 rounded-2' onClick={() => Delete_admin(admin._id)}>Delete</button>
                                        </td>
                                        <td className='py-2 px-4 border-1 border-black'>
                                            <button className='bg-black text-white py-1 px-2 rounded-2'>Update</button>
                                        </td>
                                    </tr>
                                ))}
                        </table>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default ViewAdmin;