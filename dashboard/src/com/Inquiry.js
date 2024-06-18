import React, { useState, useEffect } from 'react';
import Header from './Header';
import { Container, Row, Col } from 'react-bootstrap';
import Fromdata from './Fromdata';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddInquiry() {
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
    const [loading, setLoading] = useState(false);


    const navigate = useNavigate();
    const token = localStorage.getItem("token");

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
    }, [token]);

    const addinquiry = async (e) => {
        e.preventDefault();
        setLoading(true);
       
        try {
            const res = await axios.post('http://localhost:3000/inquiry/inquiry', {
                branch,
                name,
                contact,
                joindate,
                email: email,
                reference,
                ref_by,
                inquiry_by,
                status,
                status_date,
                inquiry_date
            }, {
                headers: { authorization: token }
            });
            setTimeout(() => navigate("/Dashboard"), 2000);
        } catch (err) {
            
            console.error(err);
        } finally {
            setLoading(false);
        }
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
                        <div className='mx-auto'>
                            <form method='post' className='my-3 w-100' onSubmit={addinquiry}>
                                <table border={1} className='border-1 border-black p-3 rounded-2'>
                                    <thead>
                                        <tr className='text-center'>
                                            <th colSpan={2} className='h1 py-3'>ADD INQUIRY</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className='py-1'>Branch:</td>
                                            <td className='py-1'>
                                                <select name='branch' className='w-100' value={branch} onChange={(e) => setBranch(e.target.value)} required>
                                                    <option value=''>Select Branch</option>
                                                    {branches.map(branch => (
                                                        <option key={branch._id} value={branch._id}>{branch.name}</option>
                                                    ))}
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'>Name:</td>
                                            <td className='py-1'><input type='text' name='admin_name' className='w-100' value={name} onChange={(e) => setName(e.target.value)} required /></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'>Contact:</td>
                                            <td className='py-1'><input type='number' name='contact' className='w-100' value={contact} onChange={(e) => setContact(e.target.value)} required /></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'>Join Date :</td>
                                            <td><input type='date' name='joindate' value={joindate} onChange={(e) => setJoindate(e.target.value)} required className='w-100' /></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'>Reference:</td>
                                            <td className='py-1'>
                                                <select name='reference' className='w-100' value={reference} onChange={(e) => setReference(e.target.value)} required>
                                                    <option value=''>Select Reference</option>
                                                    {references.map(reference => (
                                                        <option key={reference._id} value={reference._id}>{reference.name}</option>
                                                    ))}
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'>Ref By:</td>
                                            <td className='py-1'><input type='text' name='ref_by' className='w-100' value={ref_by} onChange={(e) => setRef_by(e.target.value)} required /></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'>Inquiry By:</td>
                                            <td className='py-1'>
                                                <select name='inquiry_by' className='w-100' value={inquiry_by} onChange={(e) => setInquiry_by(e.target.value)} required>
                                                    <option value=''>Select Inquiry By</option>
                                                    {inquiry.map(inquirer => (
                                                        <option key={inquirer._id} value={inquirer._id}>{inquirer.admin_name}</option>
                                                    ))}
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'>Status:</td>
                                            <td className='py-1'>
                                                <select name='status' className='w-100' value={status} onChange={(e) => setStatus(e.target.value)} required>
                                                    <option value=''>Select Status</option>
                                                    {statuss.map(status => (
                                                        <option key={status._id} value={status._id}>{status.name}</option>
                                                    ))}
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'>Status Date :</td>
                                            <td><input type='date' name='status_date' value={status_date} onChange={(e) => setStatus_date(e.target.value)} required className='w-100' /></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'>Inquiry Date :</td>
                                            <td><input type='date' name='inquiry_date' value={inquiry_date} onChange={(e) => setInquiry_date(e.target.value)} required className='w-100' /></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'>Email:</td>
                                            <td className='py-1'><input type='email' name='email' className='w-100' value={email} onChange={(e) => setEmail(e.target.value)} required /></td>
                                        </tr>
                                        <tr className='text-center'>
                                            <td colSpan={2} className='py-2'>
                                                <button className='bg-black text-white rounded-2 px-5 py-2' type='submit' disabled={loading}>
                                                    {loading ? 'Submitting...' : 'Submit'}
                                                </button>
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

export default AddInquiry;
