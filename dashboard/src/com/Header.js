import 'bootstrap/dist/css/bootstrap.min.css';
import './../App.css';
import { Col, Container, Row } from 'react-bootstrap';
import Logout from './Logout';

function Header(){
    return(
        <>
            <div className="bg-black header">
                <Container fluid>
                    <Row className='gx-0'>
                        <Col lg={6} className='my-4'>
                            <h2 className='text-white text-opacity-50 text-lg-start mb-0'>Inquiry Management System</h2>
                        </Col>
                        <Col className='text-end fs-3 mt-3 me-3'>
                            <Logout></Logout>

                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Header;