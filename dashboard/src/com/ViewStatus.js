import React, { useState, useEffect } from 'react';
import Header from './Header';
import { Container, Row ,Col} from 'react-bootstrap';
import Fromdata from './Fromdata';
import { Link, Route, Routes, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import { RiDeleteBinFill } from "react-icons/ri";
import { FaPenToSquare } from "react-icons/fa6";
function ViewStatus() {
    const [status, setStatus] = useState([]);
    const navigate =useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        axios.get('http://localhost:3000/status/view_status', {
            headers: {
                authorization: token
            }
        })

        .then(response => {
            if (response.data && Array.isArray(response.data.data)) {
                setStatus(response.data.data);
            } else {
                console.error('Invalid API response format', response.data);
            }
        })
        .catch(error => {
            console.log(error);
        });
    }, [token]);
    
    const Delete_Status = (id) => {
        axios.get(`http://localhost:3000/status/status_delete/${id}`, {
            headers: {
                authorization: token
            }
        })
        .then(response => {
            if (response.status === 200) {
                setStatus(status.filter(status => status._id !== id));
            }
            navigate("/status/View-status");
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
                    <Col>
                        
                        <p className='fs-1 mt-3 text-center'>View Status</p>
                        <div className='d-flex justify-content-center mt-4'>
                        <table className='view_table text-center'>
                            <tr className='bg-black text-white'>
                                <th className='py-2 px-4 fs-4 border-1 border-white'>Name</th>
                                <th className='py-2 px-4 fs-4 border-1 border-white'>D / U</th>

                            </tr>
                            {status.map(status => (
                                    <tr key={status.id}>
                                        <td className='py-2 px-4 border-1 border-black'>{status.name}</td>
                                        <td className='py-2 px-4 border-1 border-black'>
                                            <button className='border-0 bg-white fs-4' onClick={() => Delete_Status(status._id)}><RiDeleteBinFill /></button> /  <Link to={`/status/Updatestatus/${status._id}`}>
                                            <button className='border-0 bg-white fs-4'
                                            ><FaPenToSquare />
                                            </button>
                                        </Link>
                                        </td>
                                    </tr>
                                ))}
                        </table>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default ViewStatus;