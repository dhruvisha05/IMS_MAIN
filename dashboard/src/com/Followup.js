import React, { useState, useEffect } from 'react';
import Header from './Header';
import { Container, Row, Col } from 'react-bootstrap';
import Fromdata from './Fromdata';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddFollowup() {
    const [reason, setReason] = useState('');
    const [date, setDate] = useState('');
    const [by, setBy] = useState('');
    const [inquiry_by, setInquiry_by] = useState('');
    const [inquiry, setInquiry] = useState([]);
    const navigate = useNavigate();
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
    }, [token]);

    const addFollowup = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/follow/followup', {
            reason: reason,
            date: date,
            by: by,
            inquiry_by: inquiry_by,
        },{
            headers: {
                authorization: token
            }
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
                        <div className='mx-auto'>
                            <form method='post' className='my-3 w-100' onSubmit={addFollowup}>
                                <table border={1} className='border-1 border-black p-3 rounded-2'>
                                    <thead>
                                        <tr className='text-center'>
                                            <th colSpan={2} className='h1 py-3'>ADD FOLLOWUP</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className='py-1'>Reason:</td>
                                            <td className='py-1'><input type='text' name='reason' className='w-100' value={reason} onChange={(e) => setReason(e.target.value)} required /></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'>Date:</td>
                                            <td className='py-1'><input type='Date' name='date' className='w-100' value={date} onChange={(e) => setDate(e.target.value)} required /></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'>By:</td>
                                            <td className='py-1'><input type='text' name='by' className='w-100' value={by} onChange={(e) => setBy(e.target.value)} required /></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'>Inquiry By:</td>
                                            <td className='py-1'>
                                                <select name='inquiry_by' className='w-100' value={inquiry_by} onChange={(e) => setInquiry_by(e.target.value)} required>
                                                    <option value=''>Select Inquiry By</option>
                                                    {inquiry.map(inquirer => (
                                                        <option key={inquirer._id} value={inquirer._id}>{inquirer.name}</option>
                                                    ))}
                                                </select>
                                            </td>
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

export default AddFollowup;
