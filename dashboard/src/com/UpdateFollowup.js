import React, { useState, useEffect } from 'react';
import Header from './Header';
import { Container, Row, Col } from 'react-bootstrap';
import Fromdata from './Fromdata';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; 

function UpdateFollowup() {
    const [reason, setReason] = useState('');
    const [date, setDate] = useState('');
    const [by, setBy] = useState('');
    const [inquiry_by, setInquiry_by] = useState('');
    const [inquiry, setInquiry] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const { id } = useParams(); 
    
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
    }, [token]);

    useEffect(() => {
        axios.get(`http://localhost:3000/follow/followup_update/${id}`, {
            headers: {
                authorization: token
            }
        })
        .then(response => {
            if (response.data && response.data.data) {
                const { reason, date, by, inquiry_by } = response.data.data;
                setReason(reason);
                setDate(date);
                setBy(by);
                setInquiry_by(inquiry_by);
            } else {
                console.error('Invalid API response format', response.data);
            }
        })
        .catch(error => {
            console.log(error);
        });
    }, [id, token]);

    const updateFollowup = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:3000/follow/followup_update/${id}`, {
            reason: reason,
            date: date,
            by: by,
            inquiry_by: inquiry_by,
        }, {
            headers: {
                authorization: token
            },
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
            <Header />
            <Container fluid className="ps-0">
                <Row className="gx-0">
                    <Col xl={2} lg={3} md={4} className="bg-black height text-white text-opacity-50 border-top border-secondary">
                        <Fromdata />
                    </Col>
                    <Col className='d-flex justify-content-center'> 
                        <div>
                            <form method='post' className='my-5' onSubmit={updateFollowup}>
                                <table border={1} className='border-1 border-black p-3 rounded-2'>
                                    <tr className='my-3 text-center'>
                                        <th colSpan={2} className='h1 py-3'>UPDATE FOLLOW-UP</th>  
                                    </tr>
                                    <tr className='my-3'>
                                        <td className='py-1'>Reason:</td>
                                        <td className='py-1'><input type='text' name='reason' value={reason} className='w-100' onChange={(e) => setReason(e.target.value)} required /></td>
                                    </tr>
                                    <tr className='my-3'>
                                        <td className='py-1'>Date:</td>
                                        <td className='py-1'><input type='date' name='date' value={date} className='w-100' onChange={(e) => setDate(e.target.value)} required /></td>
                                    </tr>
                                    <tr className='my-3'>
                                        <td className='py-1'>By:</td>
                                        <td className='py-1'><input type='text' name='by' value={by} className='w-100' onChange={(e) => setBy(e.target.value)} required /></td>
                                    </tr>
                                    <tr className='my-3'>
                                        <td className='py-1'>Inquiry By:</td>
                                        <td className='py-1'>
                                            <select name='inquiry_by' value={inquiry_by} className='w-100' onChange={(e) => setInquiry_by(e.target.value)} required>
                                                <option value=''>Select Inquiry By</option>
                                                {inquiry.map(inquirer => (
                                                    <option key={inquirer._id} value={inquirer._id}>{inquirer.name}</option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                    <tr className='text-center'>
                                        <td colSpan={2} className='py-1'>
                                            <button className='bg-black text-white rounded-2 px-3 py-2' type='submit'>Submit</button>
                                        </td>
                                    </tr>
                                </table>
                            </form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default UpdateFollowup;
