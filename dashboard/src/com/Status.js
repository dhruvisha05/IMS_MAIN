import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './Header';
import Fromdata from './Fromdata';

function AddStatus() {
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const addstatus = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/status/status', { name }, {
            headers: { authorization: token }
        })
        .then(res => {
            console.log(res.data);
            navigate("/Dashboard"); 
        })
        .catch(err => {
            console.log(err);
        });
    };

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
                            <form method='post' className='my-5' onSubmit={addstatus}>
                                <table border={1} className='border-1 border-black p-3 rounded-2'>
                                    <tr className='my-3 text-center'>
                                        <th colSpan={2} className='h1 py-3'>ADD STATUS</th>  
                                    </tr>
                                    <tr className='my-3'>
                                        <td className='py-1'>Name:</td>
                                        <td className='py-1'>
                                            <input
                                                type='text'
                                                name='name'
                                                value={name}
                                                className='w-100'
                                                onChange={(e) => setName(e.target.value)}
                                                required
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
                                </table>
                            </form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default AddStatus;
