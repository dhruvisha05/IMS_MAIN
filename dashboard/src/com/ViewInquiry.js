import React, { useState, useEffect } from 'react';
import Header from './Header';
import { Container, Row ,Col} from 'react-bootstrap';
import Fromdata from './Fromdata';
import { Link, Route, Routes, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

import { RiDeleteBinFill } from "react-icons/ri";
import { FaPenToSquare } from "react-icons/fa6";
import axios from 'axios';
function ViewInquiry() {
    const [inquiry, setInquiry] = useState("");
    const navigate =useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        axios.get('http://localhost:3000/inquiry/view_inquiry', {
            headers: {
                authorization: token
            }
            
        })

        .then(response => {
            if (response.data && Array.isArray(response.data.data)) {
                setInquiry(response.data.data);
            } else {
                console.error('Invalid API response format', response.data);
            }
        })
        .catch(error => {
            console.log(error);
        });
    }, []);
    console.log(inquiry);

    const Delete_Inquiry = (id) => {
        axios.get(`http://localhost:3000/inquiry/inquiry_delete/${id}`, {
            headers: {
                authorization: token
            }
        })
        .then(response => {
            if (response.status === 200) {
                setInquiry(inquiry.filter(inquiry => inquiry._id !== id));
            }
            navigate("/inquiry/View-inquiry");
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
                    <Col className='overflow'>
                        
                        <p className='fs-1  text-center'>View Inquiry</p>
                        <div className=' text-center'>
                        <table className='view_table '>
                            <tr className='bg-black text-white'>
                                <th className='py-2 px-2 fs-5 border-1 border-white'>Branch</th>
                                <th className='py-2 px-2 fs-5 border-1 border-white'>Name</th>
                                <th className='py-2 px-2 fs-5 border-1 border-white'>Conatct</th>
                                <th className='py-2 px-2 fs-5 border-1 border-white'>Join Date</th>
                                <th className='py-2 px-2 fs-5 border-1 border-white'>Reference</th>
                                <th className='py-2 px-2 fs-5 border-1 border-white'>Ref_by</th>
                                <th className='py-2 px-2 fs-5 border-1 border-white'>Inquiry_by</th>
                                <th className='py-2 px-2 fs-5 border-1 border-white'>Status</th>
                                <th className='py-2 px-2 fs-5 border-1 border-white'>Status Date</th>
                                <th className='py-2 px-2 fs-5 border-1 border-white'>Inquiry Date</th>

                                <th className='py-2 px-2 fs-5 border-1 border-white'>Email</th>
                                <th className='py-2 px-2 fs-5 border-1 border-white'>Verify</th>
                                <th className='py-2 px-2 fs-5 border-1 border-white'>D / U</th>
                                

                            </tr>
                            <>
                            {inquiry && inquiry.map((item,index)=>(
                                    <tr key={index}>
                                        <td className='inquiry border-1 border-black'>{item?.branch.name}</td>
                                        <td className='inquiry border-1 border-black'>{item.name}</td>
                                        <td className='inquiry border-1 border-black'>{item?.contact}</td>
                                        <td className='inquiry border-1 border-black'>{item.joindate}</td>
                                        <td className='inquiry border-1 border-black'>{item?.reference.name}</td>
                                        <td className='inquiry border-1 border-black'>{item.ref_by}</td>
                                        <td className='inquiry border-1 border-black'>{item?.inquiry_by ? item?.inquiry_by.admin_name:null}</td>
                                        <td className='inquiry border-1 border-black'>{item.status.name}</td>
                                        <td className='inquiry border-1 border-black'>{item.status_date}</td>
                                        <td className='inquiry border-1 border-black'>{item.inquiry_date}</td>
                                        <td className='inquiry border-1 border-black'>{item.email}</td>
                                        <td className='inquiry border-1 border-black'>{item.verify ? "Active":"inActive"}</td>


                                        <td className='inquiry border-1 border-black'>
                                            <button className='border-0 bg-white fs-4' onClick={() => Delete_Inquiry(item._id)}><RiDeleteBinFill /></button> /  <Link to={`/inquiry/Updateinquiry/${item._id}`}>
                                            <button className='border-0 bg-white fs-4'
                                            ><FaPenToSquare />
                                            </button>
                                        </Link>
                                        </td>
                                    </tr>
                                ))}
                                </>
                        </table>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default ViewInquiry;