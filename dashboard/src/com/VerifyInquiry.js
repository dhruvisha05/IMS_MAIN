import React, { useState } from 'react';
import Header from './Header';
import { Container, Row ,Col} from 'react-bootstrap';
import Fromdata from './Fromdata';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function VerifyInquiry() {
    const [otp, setOtp] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const verifyotp = (e) => {
        console.log(otp)
        console.log(e)
        e.preventDefault(); 
        axios.post('http://localhost:3000/inquiry/verify-otp',{otp:JSON.parse(otp)} ,{headers: {
            authorization: token
        }},
     
    )
    .then(function(res) {
                console.log(res.data);
                navigate("/inquiry/View-inquiry"); 
            })
        
        .catch(function(err) {
            console.log(err);
        });
    }

    return (
        <div>
            <Header></Header>
            <Container  fluid className="ps-0">
                <Row className="gx-0">
                <Col xl={2} lg={3} md={4}   className="bg-black height text-white text-opacity-50 border-top border-secondary">
                        
                        <Fromdata></Fromdata>
                    </Col>
                    <Col className='d-flex justify-content-center '> 
                        
                        <div>
                        <form method='post' className='my-5 '  onSubmit={verifyotp} >
                            <table border={1} className=' border-1  border-black p-3 rounded-2'>
                                <tr className='my-3 text-center'>
                                    <th colSpan={2} className='h1 py-3'>VERIFY</th>  
                                </tr>
                                <tbody>
                                    <tr>
                                        <td className='py-1'>Otp :</td>
                                        <td className='py-1'>
                                            <input  type="number" name='otp'  value={otp}  onChange={(e) => setOtp(e.target.value)} />
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
                    </Col>
                </Row>
            </Container>
        </div>
    );
}


export default VerifyInquiry;
