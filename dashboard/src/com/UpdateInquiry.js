import React, { useState, useEffect } from 'react';
import Header from './Header';
import { Container, Row, Col } from 'react-bootstrap';
import Fromdata from './Fromdata';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; 

function UpdateInquiry() {
    const [branch, setBranch] = useState('');
    const [branches, setBranches] = useState([]);
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [joindate, setJoindate] = useState('');
    const [reference, setReference] = useState('');
    const [references, setReferences] = useState([]);
    const [ref_by, setRef_by] = useState('');
    const [inquiry_by, setInquiry_by] = useState('');
    const [inquiry, setInquiry] = useState([]);
    const [status, setStatus] = useState('');
    const [statuss, setStatuss] = useState([]);
    const [status_date, setStatus_date] = useState('');
    const [inquiry_date, setInquiry_date] = useState('');
    const [email, setEmail] = useState('');

    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const { id } = useParams(); 

    const fetchData = async (url, setState) => {
        try {
            const response = await axios.get(url, {
                headers: { authorization: token }
            });
            if (response.data && Array.isArray(response.data.data)) {
                setState(response.data.data);
            } else {
                console.error('Invalid API response format', response.data);
            }
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };

    useEffect(() => {
        fetchData('http://localhost:3000/ref/view_reference', setReferences);
        fetchData('http://localhost:3000/branch/view_branch', setBranches);
        fetchData('http://localhost:3000/auth/view_admin', setInquiry);
        fetchData('http://localhost:3000/status/view_status', setStatuss);

        axios.get(`http://localhost:3000/inquiry/inquiry_update/${id}`, {
            headers: { authorization: token }
        })
        .then(response => {
            if (response.data && response.data.data) {
                const { branch, name, contact, inquiry_by, status, status_date, inquiry_date, email } = response.data.data;
                setBranch(branch);
                setName(name);
                setContact(contact);
                setInquiry_by(inquiry_by);
                setStatus(status);
                setStatus_date(status_date);
                setInquiry_date(inquiry_date);
                setEmail(email);
            } else {
                console.error('Invalid API response format', response.data);
            }
        })
        .catch(error => {
            console.log(error);
        });
    }, [id, token]);

    const handleUpdateInquiry = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:3000/inquiry/inquiry_update/${id}`, {
            branch,
            name,
            joindate,
            inquiry_by,
            status,
            status_date,
            inquiry_date,
            email
        }, {
            headers: { authorization: token },
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
                            <form method='post' className='my-5' onSubmit={handleUpdateInquiry}>
                                <table border={1} className='border-1 border-black p-3 rounded-2'>
                                    <thead>
                                        <tr className='my-3 text-center'>
                                            <th colSpan={2} className='h1 py-3'>UPDATE INQUIRY</th>  
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className='my-3'>
                                            <td className='py-1'>Branch:</td>
                                            <td className='py-1'>
                                                <select name='branch' value={branch} className='w-100' onChange={(e) => setBranch(e.target.value)} required>
                                                    <option value=''>Branch</option>
                                                    {branches.map(branch => (
                                                        <option key={branch._id} value={branch._id}>{branch.name}</option>
                                                    ))}
                                                </select>
                                            </td>
                                        </tr>
                                        <tr className='my-3'>
                                            <td className='py-1'>Name:</td>
                                            <td className='py-1'><input type='text' name='name' value={name} className='w-100' onChange={(e) => setName(e.target.value)} required /></td>
                                        </tr>
                                        <tr className='my-3'>
                                            <td className='py-1'>Contact:</td>
                                            <td className='py-1'><input type='text' name='contact' value={contact} className='w-100' onChange={(e) => setContact(e.target.value)} required /></td>
                                        </tr>
                                        <tr className='my-3'>
                                            <td className='py-1'>Join Date:</td>
                                            <td className='py-1'><input type='date' name='joindate' value={joindate} className='w-100' onChange={(e) => setJoindate(e.target.value)} required /></td>
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
                                        <tr className='my-3'>
                                            <td className='py-1'>Status:</td>
                                            <td className='py-1'>
                                                <select name='status' value={status} className='w-100' onChange={(e) => setStatus(e.target.value)} required>
                                                    <option value=''>Select Inquiry By</option>
                                                    {statuss.map(statuss => (
                                                        <option key={statuss._id} value={statuss._id}>{statuss.name}</option>
                                                    ))}
                                                </select>
                                            </td>
                                        </tr>
                                        <tr className='my-3'>
                                            <td className='py-1'>Status Date:</td>
                                            <td className='py-1'><input type='date' name='status_date' value={status_date} className='w-100' onChange={(e) => setStatus_date(e.target.value)} required /></td>
                                        </tr>
                                        <tr className='my-3'>
                                            <td className='py-1'>Inquiry Date:</td>
                                            <td className='py-1'><input type='date' name='inquiry_date' value={inquiry_date} className='w-100' onChange={(e) => setInquiry_date(e.target.value)} required /></td>
                                        </tr>
                                        <tr className='my-3'>
                                            <td className='py-1'>Email:</td>
                                            <td className='py-1'><input type='email' name='email' value={email} readOnly className='w-100' required /></td>
                                        </tr>
                                        <tr className='text-center'>
                                            <td colSpan={2} className='py-1'>
                                                <button className='bg-black text-white rounded-2 px-3 py-2' type='submit'>Submit</button>
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

export default UpdateInquiry;
